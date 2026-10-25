import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Brand } from './UI';
import { nav } from '../data/project';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 35);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!open) return;
    const key = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open]);
  return (
    <header className={`navbar ${scrolled || open ? 'solid' : ''}`}>
      <Link to="/" aria-label="Emeralds Greens home">
        <Brand />
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {nav.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {label}
          </NavLink>
        ))}
      </nav>
      <Link to="/contact" className="nav-cta">
        Enquire Now
        <ArrowUpRight size={16} />
      </Link>
      <button
        id="menu-toggle"
        className="menu-toggle"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="mobile-nav"
        className={`mobile-nav ${open ? 'open' : ''}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {nav.map(([to, label], i) => (
          <NavLink to={to} key={to}>
            <span>0{i + 1}</span>
            {label}
            <ArrowUpRight />
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
