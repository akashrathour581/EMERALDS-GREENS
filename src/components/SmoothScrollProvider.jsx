import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function SmoothScrollProvider({ children }) {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const scroller = useRef(null);
  const positions = useRef(new Map());
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
      scroller.current = lenis;
      const tick = (time) => lenis.raf(time * 1000);
      const lock = (event) => (event.detail.locked ? lenis.stop() : lenis.start());
      document.addEventListener('site:scroll-lock', lock);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      if (document.body.style.overflow === 'hidden') lenis.stop();
      return () => {
        gsap.ticker.remove(tick);
        document.removeEventListener('site:scroll-lock', lock);
        scroller.current = null;
        lenis.destroy();
      };
    });
    return () => mm.revert();
  }, []);
  useEffect(() => {
    const restored = positions.current.get(key) || 0;
    const frame = requestAnimationFrame(() => {
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* Use the literal fragment if malformed. */
      }
      const target = id ? document.getElementById(id) : null;
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const top = target
        ? Math.max(0, target.getBoundingClientRect().top + window.scrollY - padding)
        : navigationType === 'POP'
          ? restored
          : 0;
      // Reset Lenis's target too; native scrollTo alone can jump back to its old position.
      if (scroller.current) scroller.current.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo({ top, behavior: 'instant' });
      const focusTarget = target || document.getElementById('main-content');
      if (focusTarget && !focusTarget.hasAttribute('tabindex'))
        focusTarget.setAttribute('tabindex', '-1');
      focusTarget?.focus({ preventScroll: true });
      ScrollTrigger.refresh();
    });
    const save = () => positions.current.set(key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', save);
    };
  }, [key, pathname, hash, navigationType]);
  return children;
}
