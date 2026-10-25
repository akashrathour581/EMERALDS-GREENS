import { useEffect } from 'react';

const locks = new Set();
let previousOverflow = '';

// Share the lock so closing one overlay cannot unlock a second open overlay.
export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const token = Symbol('scroll-lock');
    if (!locks.size) previousOverflow = document.body.style.overflow;
    locks.add(token);
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('site:scroll-lock', { detail: { locked: true } }));
    return () => {
      locks.delete(token);
      if (!locks.size) document.body.style.overflow = previousOverflow;
      document.dispatchEvent(
        new CustomEvent('site:scroll-lock', { detail: { locked: locks.size > 0 } }),
      );
    };
  }, [locked]);
}
