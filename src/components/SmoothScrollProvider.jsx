import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function SmoothScrollProvider({ children }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
      const tick = (time) => lenis.raf(time * 1000);
      const menu = (event) => (event.detail.open ? lenis.stop() : lenis.start());
      document.addEventListener('site:menu', menu);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      if (document.body.style.overflow === 'hidden') lenis.stop();
      return () => {
        gsap.ticker.remove(tick);
        document.removeEventListener('site:menu', menu);
        lenis.destroy();
      };
    });
    return () => mm.revert();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: 'instant' });
      ScrollTrigger.refresh();
    }, 80);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return children;
}
