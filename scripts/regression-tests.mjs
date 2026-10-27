import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import React, { act } from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

// Exercise real React handlers. Motion engines are test doubles, not browser/layout tests.
const output = resolve('outputs/regression-components.mjs');
await mkdir(resolve('outputs'), { recursive: true });
const mocks = {
  gsap: `const chain={from(){return this},fromTo(){return this}};export default {registerPlugin(){},from(){return chain},fromTo(){return chain},timeline(){return chain},ticker:{add(){},remove(){}},matchMedia(){const cleanups=[];return {add(query,fn){if(typeof query==='string'){if(!matchMedia(query).matches)return;}const conditions=typeof query==='object'?Object.fromEntries(Object.entries(query).map(([k,v])=>[k,matchMedia(v).matches])):{};const cleanup=fn({conditions});if(typeof cleanup==='function')cleanups.push(cleanup)},revert(){cleanups.splice(0).forEach(fn=>fn())}}}};`,
  'gsap/ScrollTrigger': 'export const ScrollTrigger={update(){},refresh(){}};',
  '@gsap/react':
    "import {useEffect} from 'react'; export function useGSAP(fn, options={}){useEffect(fn,options.dependencies||[]);}",
  lenis:
    'export default class Lenis {constructor(){globalThis.__scroller=this;this.calls=[]}raf(){}on(){}stop(){this.stopped=true}start(){this.stopped=false}scrollTo(top){this.calls.push(top);window.scrollTo({top})}destroy(){this.destroyed=true}}',
};
await build({
  stdin: {
    contents: `export {default as App} from './src/App.jsx';export {default as HeroSlideshow} from './src/components/HeroSlideshow.jsx';export {default as ImageGallery} from './src/components/ImageGallery.jsx';export {default as ContactForm} from './src/components/ContactForm.jsx';export {Picture} from './src/components/UI.jsx';export {default as useScrollLock} from './src/hooks/useScrollLock.js';`,
    resolveDir: process.cwd(),
    loader: 'jsx',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  jsx: 'automatic',
  packages: 'external',
  outfile: output,
  plugins: [
    {
      name: 'motion-test-doubles',
      setup(b) {
        b.onResolve({ filter: /^(gsap|gsap\/ScrollTrigger|@gsap\/react|lenis)$/ }, (args) => ({
          path: args.path,
          namespace: 'mock',
        }));
        b.onLoad({ filter: /.*/, namespace: 'mock' }, (args) => ({
          contents: mocks[args.path],
          resolveDir: process.cwd(),
        }));
      },
    },
  ],
});

const runtimeErrors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', (error) => runtimeErrors.push(error.message));
const dom = new JSDOM(
  '<!doctype html><html><head><meta name="description"><meta property="og:title"><meta property="og:description"></head><body><div id="root"></div></body></html>',
  { url: 'http://localhost', pretendToBeVisual: true, virtualConsole },
);
for (const key of [
  'window',
  'document',
  'HTMLElement',
  'HTMLDialogElement',
  'Event',
  'CustomEvent',
  'KeyboardEvent',
  'MouseEvent',
  'FormData',
])
  globalThis[key] = dom.window[key];
globalThis.getComputedStyle = window.getComputedStyle.bind(window);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let reduced = false,
  pointerFine = false,
  now = 0,
  sequence = 0;
globalThis.matchMedia = window.matchMedia = (query) => ({
  matches: query.includes('no-preference')
    ? !reduced && (!query.includes('pointer: fine') || pointerFine)
    : query.includes('reduced-motion: reduce')
      ? reduced
      : query.includes('min-width')
        ? false
        : query.includes('pointer: fine')
          ? pointerFine
          : false,
  addEventListener() {},
  removeEventListener() {},
});
let observer;
globalThis.IntersectionObserver = class {
  constructor(fn) {
    observer = fn;
  }
  observe() {}
  disconnect() {}
};
const timers = new Map(),
  frames = new Map();
window.setTimeout = (fn, delay) => {
  const id = ++sequence;
  timers.set(id, { fn, at: now + delay });
  return id;
};
window.clearTimeout = (id) => timers.delete(id);
globalThis.requestAnimationFrame = window.requestAnimationFrame = (fn) => {
  const id = ++sequence;
  frames.set(id, fn);
  return id;
};
globalThis.cancelAnimationFrame = window.cancelAnimationFrame = (id) => frames.delete(id);
window.scrollTo = ({ top = 0 }) => {
  Object.defineProperty(window, 'scrollY', { value: top, configurable: true });
};
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open');
};
// Import the renderer after creating the DOM so React detects native input events.
const { createRoot } = await import('react-dom/client');
const components = await import(pathToFileURL(output).href);
const root = createRoot(document.getElementById('root'));
const el = React.createElement;
async function render(node) {
  await act(async () => root.render(node));
}
async function click(node) {
  assert.ok(node);
  await act(async () =>
    node.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })),
  );
}
async function key(node, value, shiftKey = false) {
  await act(async () =>
    node.dispatchEvent(
      new KeyboardEvent('keydown', { key: value, shiftKey, bubbles: true, cancelable: true }),
    ),
  );
}
async function advance(ms) {
  now += ms;
  await act(async () => {
    for (const [id, timer] of [...timers])
      if (timer.at <= now) {
        timers.delete(id);
        timer.fn();
      }
  });
}
async function flushFrames() {
  await act(async () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((fn) => fn(0));
  });
}
async function event(node, type) {
  await act(async () => node.dispatchEvent(new Event(type, { bubbles: true, cancelable: true })));
}
function field(form, name, value) {
  form.elements.namedItem(name).value = value;
  form.elements.namedItem(name).dispatchEvent(new Event('input', { bubbles: true }));
}
let groups = 0;
function passed(name) {
  groups++;
  console.log(`PASS ${name}`);
}

try {
  await render(el(components.HeroSlideshow));
  assert.equal(document.querySelectorAll('.hero-slide').length, 10);
  await act(async () =>
    document
      .querySelectorAll('.hero-slide img')
      .forEach((img) => img.dispatchEvent(new Event('load'))),
  );
  await advance(4999);
  assert.match(document.querySelector('.hero-index').textContent, /^01/);
  await advance(1);
  assert.match(document.querySelector('.hero-index').textContent, /^02/);
  await click(document.querySelector('[aria-label="Pause slideshow"]'));
  await advance(10000);
  assert.match(document.querySelector('.hero-index').textContent, /^02/);
  await click(document.querySelector('[aria-label="Previous image"]'));
  await click(document.querySelector('[aria-label="Previous image"]'));
  assert.match(document.querySelector('.hero-index').textContent, /^10/);
  await click(document.querySelector('[aria-label="Next image"]'));
  assert.match(document.querySelector('.hero-index').textContent, /^01/);
  await event(document.querySelectorAll('.hero-slide img')[1], 'error');
  await click(document.querySelector('[aria-label="Next image"]'));
  assert.match(document.querySelector('.hero-index').textContent, /^03/, 'failed slide is skipped');
  await click(document.querySelector('[aria-label="Play slideshow"]'));
  await act(async () => observer([{ isIntersecting: false }]));
  assert.equal(timers.size, 0);
  await render(null);
  assert.equal(timers.size, 0);
  reduced = true;
  await render(el(components.HeroSlideshow));
  assert.ok(document.querySelector('[aria-label="Play slideshow"]'));
  assert.equal(timers.size, 0);
  await render(null);
  reduced = false;
  passed(
    'slideshow timing, pause, wraparound, failed-image skip, offscreen stop and reduced motion',
  );

  await render(el(components.Picture, { n: 1, alt: 'Test residence' }));
  await event(document.querySelector('.picture img'), 'load');
  assert.ok(document.querySelector('.picture.loaded'));
  await render(el(components.Picture, { n: 2, alt: 'Next residence' }));
  assert.equal(document.querySelector('.picture.loaded'), null, 'new image resets loading state');
  await event(document.querySelector('.picture img'), 'error');
  assert.equal(document.querySelector('.picture img'), null);
  assert.equal(
    document.querySelector('.image-unavailable').getAttribute('aria-label'),
    'Next residence',
  );
  await render(null);
  passed('image switch resets skeleton and failed images show an accessible fallback');

  await render(el(components.ImageGallery));
  const tile = document.querySelectorAll('.gallery-tile')[9];
  assert.match(tile.querySelector('small').textContent, /^10 /);
  assert.doesNotMatch(tile.querySelector('small').textContent, /^010/);
  await click(tile);
  const modal = document.querySelector('dialog');
  assert.ok(modal.open);
  assert.equal(document.body.style.overflow, 'hidden');
  await key(modal, 'ArrowRight');
  assert.match(document.querySelector('.lightbox-top small').textContent, /^1 /);
  for (let i = 0; i < 10; i++) await click(document.querySelector('[aria-label="Zoom in"]'));
  assert.equal(document.querySelector('.lightbox-canvas').style.width, '250%');
  assert.ok(document.querySelector('[aria-label="Zoom in"]').disabled);
  await key(modal, 'ArrowLeft');
  assert.equal(document.querySelector('.lightbox-canvas').style.width, '100%');
  await key(modal, 'Escape');
  assert.equal(modal.open, false);
  assert.equal(document.body.style.overflow, '');
  assert.equal(document.activeElement, tile);
  await click(tile);
  await render(null);
  assert.equal(document.body.style.overflow, '');
  passed(
    'gallery numbering, keyboard wraparound, zoom limits/reset, modal lock, focus and cleanup',
  );

  function Lock({ open }) {
    components.useScrollLock(open);
    return null;
  }
  function Locks({ first, second }) {
    return el(React.Fragment, null, el(Lock, { open: first }), el(Lock, { open: second }));
  }
  document.body.style.overflow = 'auto';
  await render(el(Locks, { first: true, second: true }));
  await render(el(Locks, { first: false, second: true }));
  assert.equal(document.body.style.overflow, 'hidden');
  await render(el(Locks, { first: false, second: false }));
  assert.equal(document.body.style.overflow, 'auto');
  await render(null);
  document.body.style.overflow = '';
  passed('overlapping overlay locks restore scrolling only after the final overlay closes');

  await render(
    el(MemoryRouter, { initialEntries: ['/contact?interest=villas'] }, el(components.ContactForm)),
  );
  const form = document.querySelector('form');
  assert.equal(form.elements.interest.value, 'Luxury Villas');
  assert.doesNotThrow(() => new RegExp(form.elements.phone.pattern, 'v'));
  let opens = 0;
  window.open = () => {
    opens++;
    return null;
  }; // Simulate a blocked mobile popup.
  field(form, 'name', '   ');
  field(form, 'phone', '7807885417');
  await event(form, 'submit');
  assert.equal(opens, 0);
  assert.ok(form.elements.name.validationMessage);
  field(form, 'name', 'Test Buyer');
  field(form, 'phone', '----------');
  await event(form, 'submit');
  assert.equal(opens, 0);
  assert.ok(form.elements.phone.validationMessage);
  field(form, 'phone', '+91 78078 85417');
  await event(form, 'submit');
  assert.equal(opens, 1);
  const url = new URL(document.querySelector('.enquiry-draft a').href);
  assert.equal(url.pathname, '/917807885417');
  assert.match(url.searchParams.get('text'), /Luxury Villas/);
  await click(document.querySelector('.enquiry-draft button'));
  assert.match(document.querySelector('[role="status"]').textContent, /message is selected/);
  await render(null);
  passed(
    'valid phone pattern, trimmed-name/digit validation, correct enquiry and popup/clipboard fallback',
  );

  let navigate;
  function Navigation() {
    navigate = useNavigate();
    return null;
  }
  function AppHarness() {
    return el(MemoryRouter, null, el(Navigation), el(components.App));
  }
  await render(el(AppHarness));
  await flushFrames();
  const toggle = document.getElementById('menu-toggle');
  await click(toggle);
  await flushFrames();
  assert.equal(document.querySelector('main').inert, true);
  const menuLinks = [...document.querySelectorAll('#mobile-nav a')];
  assert.equal(document.activeElement, menuLinks[0]);
  menuLinks.at(-1).focus();
  await key(document, 'Tab');
  assert.equal(document.activeElement, toggle);
  await key(document, 'Tab', true);
  assert.equal(document.activeElement, menuLinks.at(-1));
  await key(document, 'Escape');
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(document.body.style.overflow, '');
  await click(toggle);
  await click(document.querySelector('#mobile-nav a[href="/residences"]'));
  await flushFrames();
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.notEqual(document.querySelector('main').inert, true);
  assert.equal(document.activeElement, document.getElementById('main-content'));
  passed('mobile menu focus containment, Escape, route close and restored page focus');

  for (const path of [
    '/about',
    '/residences',
    '/amenities',
    '/gallery',
    '/contact',
    '/legal',
    '/missing',
  ]) {
    await act(async () => navigate(path));
    await flushFrames();
    assert.ok(document.querySelector('main h1'), `${path} has a page heading`);
    assert.ok(document.title.endsWith('| Emeralds Greens'));
  }
  await act(async () => navigate('/contact?interest=villas'));
  await flushFrames();
  assert.equal(document.querySelector('[name="interest"]').value, 'Luxury Villas');
  await act(async () => navigate('/contact?interest=apartments&subject=Brochure'));
  await flushFrames();
  assert.equal(document.querySelector('[name="interest"]').value, 'High-End Apartments');
  assert.match(document.querySelector('[name="message"]').value, /brochure/);
  passed(
    'all routes/404 render, metadata updates, and same-page query navigation refreshes enquiry context',
  );

  await act(async () => navigate('/gallery'));
  await flushFrames();
  const { contact, brochureDetails, properties } = await import('../src/data/project.js');
  const pdf = await readFile(resolve('public', contact.brochure.slice(1)));
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', 'brochure is a real PDF');
  assert.equal(
    document.querySelector('.brochure-actions a[download]').getAttribute('href'),
    contact.brochure,
  );
  assert.equal(
    document.querySelector('.brochure-actions a[download]').download,
    brochureDetails.fileName,
  );
  assert.equal(
    document.querySelector('.brochure-actions a[target="_blank"]').getAttribute('href'),
    contact.brochure,
  );
  for (const property of properties) {
    assert.ok(
      document.querySelector(
        `.brochure-plan-card[href="${contact.brochure}#page=${property.planPage}"]`,
      ),
    );
    assert.ok((await readFile(`public/images/floor-plan-${property.id}.webp`)).length > 0);
  }
  const hosting = JSON.parse(await readFile('vercel.json', 'utf8'));
  assert.equal(
    new RegExp(`^${hosting.rewrites[0].source}$`).test(contact.brochure),
    false,
    'PDF bypasses SPA rewrite',
  );
  assert.equal(new RegExp(`^${hosting.rewrites[0].source}$`).test('/gallery'), true);
  assert.equal(
    hosting.headers
      .find((rule) => rule.source === contact.brochure)
      .headers.find((header) => header.key === 'Content-Type').value,
    'application/pdf',
  );
  assert.equal(
    document.querySelector('iframe[src*="brochure"]'),
    null,
    'PDF is not loaded automatically',
  );
  passed('brochure view/download links, actual PDF/previews and static PDF routing');

  window.scrollTo({ top: 340 });
  window.dispatchEvent(new Event('scroll'));
  await act(async () => navigate('/about'));
  await flushFrames();
  assert.equal(window.scrollY, 0);
  await act(async () => navigate(-1));
  await flushFrames();
  assert.equal(window.scrollY, 340);
  await act(async () => navigate('/residences#villas'));
  document.documentElement.style.scrollPaddingTop = '90px';
  document.getElementById('villas').getBoundingClientRect = () => ({ top: 500 });
  const before = window.scrollY;
  await flushFrames();
  assert.equal(window.scrollY, Math.max(0, before + 500 - 90));
  assert.equal(document.activeElement.id, 'villas');
  passed('browser Back restores scroll and hash navigation respects fixed-header offset and focus');
  await render(null);

  pointerFine = true;
  await render(el(AppHarness));
  await flushFrames();
  assert.ok(globalThis.__scroller.calls.length, 'route changes reset Lenis target');
  await act(async () => navigate('/gallery'));
  await flushFrames();
  await click(document.querySelector('.gallery-tile'));
  assert.equal(globalThis.__scroller.stopped, true);
  await key(document.querySelector('dialog'), 'Escape');
  assert.equal(globalThis.__scroller.stopped, false);
  const scroller = globalThis.__scroller;
  await render(null);
  assert.equal(scroller.destroyed, true);
  passed('desktop smooth-scroller target reset, lightbox stop/resume and lifecycle cleanup');
  assert.deepEqual(runtimeErrors, [], 'no unhandled DOM runtime errors');
  console.log(`\n${groups} regression groups passed. Browser visual QA is separate.`);
} finally {
  await act(async () => root.unmount());
  dom.window.close();
  await rm(output, { force: true });
}
