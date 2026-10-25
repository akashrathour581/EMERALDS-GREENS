import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Picture } from './UI';
import { image } from '../data/project';
const labels = [
  'A life above the valley',
  'The arrival experience',
  'Contemporary mountain villas',
  'A community in the hills',
  'Sunset at the retreat',
  'The golden hour',
  'Life among the pines',
  'Landscaped mountain living',
  'A moment of stillness',
  'An evening by the pool',
];
export default function ImageGallery() {
  const [active, setActive] = useState(null),
    [zoom, setZoom] = useState(1);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const move = (delta) => {
    setActive((n) => (n + delta + 10) % 10);
    setZoom(1);
  };
  useEffect(() => {
    if (active === null) return;
    const el = dialog.current;
    el.showModal();
    const key = (e) => {
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    };
    el.addEventListener('keydown', key);
    return () => {
      el.removeEventListener('keydown', key);
      el.close();
      trigger.current?.focus();
    };
  }, [active === null]);
  const close = () => {
    setActive(null);
    setZoom(1);
  };
  return (
    <>
      <div className="gallery-grid">
        {labels.map((label, i) => (
          <button
            className={`gallery-tile tile-${i}`}
            key={label}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setActive(i);
            }}
            aria-label={`Open ${label}`}
          >
            <Picture n={i + 1} alt={label} />
            <span>
              <small>0{String(i + 1).slice(-2)} / ARCHITECTURAL VISUALIZATION</small>
              {label}
              <Maximize size={19} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        aria-label="Project image viewer"
        data-lenis-prevent
      >
        <div className="lightbox-top">
          <span>
            EMERALDS GREENS <small>{active !== null ? active + 1 : ''} / 10</small>
          </span>
          <button onClick={close} aria-label="Close image viewer">
            <X />
          </button>
        </div>
        {active !== null && (
          <>
            <div className="lightbox-stage">
              <img
                src={image(active + 1)}
                alt={labels[active]}
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
            <div className="lightbox-bottom">
              <button onClick={() => move(-1)} aria-label="Previous image">
                <ChevronLeft />
              </button>
              <span>{labels[active]}</span>
              <div className="zoom-controls">
                <button
                  onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                  disabled={zoom === 1}
                  aria-label="Zoom out"
                >
                  <ZoomOut />
                </button>
                <span>{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
                  disabled={zoom === 2.5}
                  aria-label="Zoom in"
                >
                  <ZoomIn />
                </button>
              </div>
              <button onClick={() => move(1)} aria-label="Next image">
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
