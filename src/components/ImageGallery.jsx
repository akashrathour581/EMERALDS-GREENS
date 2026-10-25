import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Picture } from './UI';
import { image } from '../data/project';
import useScrollLock from '../hooks/useScrollLock';
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
  const stage = useRef(null);
  const [failedImage, setFailedImage] = useState(null);
  const isOpen = active !== null;
  useScrollLock(isOpen);
  const close = useCallback(() => {
    setActive(null);
    setZoom(1);
  }, []);
  const move = useCallback((delta) => {
    setActive((n) => (n === null ? null : (n + delta + labels.length) % labels.length));
    setZoom(1);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const el = dialog.current;
    if (!el.open) {
      if (typeof el.showModal === 'function') el.showModal();
      else el.setAttribute('open', '');
    }
    el.querySelector('button')?.focus();
    const key = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'Escape'].includes(e.key)) e.preventDefault();
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') move(-1);
      else if (e.key === 'ArrowRight') move(1);
      else if (e.key === 'Tab') {
        const buttons = [...el.querySelectorAll('button:not(:disabled)')];
        const first = buttons[0],
          last = buttons.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    el.addEventListener('keydown', key);
    return () => {
      el.removeEventListener('keydown', key);
      if (typeof el.close === 'function') el.close();
      else el.removeAttribute('open');
      if (trigger.current?.isConnected) trigger.current.focus({ preventScroll: true });
    };
  }, [isOpen, move, close]);
  useEffect(() => {
    if (stage.current) {
      stage.current.scrollTop = 0;
      stage.current.scrollLeft = 0;
    }
  }, [active]);
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
              <small>{String(i + 1).padStart(2, '0')} / ARCHITECTURAL VISUALIZATION</small>
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
        aria-modal="true"
        onClose={close}
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
            <div className="lightbox-stage" ref={stage}>
              <div
                className="lightbox-canvas"
                style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}
              >
                {failedImage === active ? (
                  <p className="lightbox-error" role="status">
                    This image could not be loaded. Try another image.
                  </p>
                ) : (
                  <img
                    key={active}
                    src={image(active + 1)}
                    alt={labels[active]}
                    onError={() => setFailedImage(active)}
                  />
                )}
              </div>
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
