import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { image, heroSlides } from '../data/project';

const SLIDE_INTERVAL = 5000;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [loaded, setLoaded] = useState(() => new Set());
  const [failed, setFailed] = useState(() => new Set());
  const container = useRef(null);
  const slides = heroSlides;

  const available = (direction) => {
    for (let step = 1; step < slides.length; step++) {
      const index = (active + direction * step + slides.length) % slides.length;
      if (!failed.has(index)) return index;
    }
    return null;
  };
  const next = available(1);
  const previousIndex = available(-1);
  const running =
    playing && visible && inView && next !== null && loaded.has(active) && loaded.has(next);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setPlaying(!motion.matches);
    const syncVisibility = () => setVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    motion.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
        : null;
    observer?.observe(container.current);
    return () => {
      motion.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (failed.has(active) && next !== null && loaded.has(next)) {
      setPrevious(null);
      setActive(next);
    }
  }, [active, failed, loaded, next]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setPrevious(active);
      setActive(next);
    }, SLIDE_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [active, next, running]);

  const go = (direction) => {
    const target = direction === 1 ? next : previousIndex;
    if (target === null || !loaded.has(target)) return;
    setPrevious(active);
    setActive(target);
  };

  return (
    <>
      <div
        ref={container}
        className={`hero-slideshow ${playing && visible && inView ? 'is-playing' : ''}`}
        role="img"
        aria-label="Architectural visualizations of Emeralds Greens mountain residences"
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hero-slide ${active === i ? 'is-active' : ''} ${previous === i ? 'was-active' : ''} ${failed.has(i) ? 'has-error' : ''}`}
          >
            <img
              src={image(s.id)}
              srcSet={`${image(s.id, 720)} 720w, ${image(s.id)} 1671w`}
              sizes="100vw"
              alt={s.label}
              loading="eager"
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              onLoad={() => setLoaded((current) => new Set(current).add(i))}
              onError={() => setFailed((current) => new Set(current).add(i))}
            />
          </div>
        ))}
      </div>
      <div
        className="hero-slideshow-controls"
        style={{ '--slide-duration': `${SLIDE_INTERVAL}ms` }}
      >
        <span className="hero-index" aria-label={`Image ${active + 1} of 10`}>
          {String(active + 1).padStart(2, '0')} <span>/ 10</span>
        </span>
        <div className="slide-progress" aria-hidden="true">
          <span key={`${active}-${running}`} className={running ? 'is-running' : ''} />
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={previousIndex === null || !loaded.has(previousIndex)}
          aria-label="Previous image"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={next === null || !loaded.has(next)}
          aria-label="Next image"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  );
}
