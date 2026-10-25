import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function SmoothScrollProvider({ children }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !matchMedia('(pointer: fine)').matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
    const tick = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
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
