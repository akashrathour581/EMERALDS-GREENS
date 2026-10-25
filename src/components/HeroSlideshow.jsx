import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { image } from '../data/project';

const slides = Array.from({ length: 10 }, (_, i) => i + 1);
const SLIDE_INTERVAL = 2000;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const loaded = useRef(new Set());

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setPlaying(!motion.matches);
    syncMotion();
    motion.addEventListener('change', syncMotion);
    return () => motion.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((current) => {
        const next = (current + 1) % slides.length;
        // Keep the current photograph visible until the next image has loaded.
        return loaded.current.has(next) ? next : current;
      });
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <>
      <div
        className="hero-slideshow"
        role="img"
        aria-label="Architectural visualizations of Emeralds Greens mountain residences"
      >
        {slides.map((n, i) => (
          <div key={n} className={`hero-slide ${active === i ? 'is-active' : ''}`}>
            <img
              src={image(n)}
              srcSet={`${image(n, 720)} 720w, ${image(n)} 1671w`}
              sizes="100vw"
              alt=""
              loading="eager"
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              onLoad={() => loaded.current.add(i)}
            />
          </div>
        ))}
      </div>
      <div className="hero-slideshow-controls">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          title={playing ? 'Pause slideshow' : 'Play slideshow'}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <span className="hero-index" aria-hidden="true">
          {String(active + 1).padStart(2, '0')} <span>/ 10</span>
        </span>
      </div>
    </>
  );
}
