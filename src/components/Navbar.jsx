import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, MapPin } from 'lucide-react';
import { Brand } from './UI';
import { nav, contact } from '../data/project';
import useScrollLock from '../hooks/useScrollLock';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);
  const menu = useRef(null);
  const { pathname } = useLocation();
  useScrollLock(open);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 35);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      header.current?.style.setProperty(
        '--page-progress',
        height > 0 ? Math.min(1, window.scrollY / height) : 0,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const desktop = matchMedia('(min-width: 901px)');
    const closeDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeDesktop);
    return () => desktop.removeEventListener('change', closeDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const background = [...document.querySelectorAll('main, footer, .whatsapp-float')];
    const previousInert = background.map((el) => el.inert);
    background.forEach((el) => {
      el.inert = true;
    });
    const frame = requestAnimationFrame(() => menu.current?.querySelector('a')?.focus());
    const key = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key !== 'Tab') return;
      const links = [...menu.current.querySelectorAll('a')];
      const first = toggle.current;
      const last = links.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      cancelAnimationFrame(frame);
      background.forEach((el, i) => {
        el.inert = previousInert[i];
      });
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  return (
    <header
      ref={header}
      className={`navbar ${scrolled || open ? 'solid' : ''} ${open ? 'menu-is-open' : ''}`}
    >
      <Link to="/" className="navbar-brand" aria-label="Emeralds Greens home">
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
        Arrange a Visit
        <ArrowUpRight size={16} />
      </Link>
      <button
        ref={toggle}
        id="menu-toggle"
        className="menu-toggle"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav
        ref={menu}
        id="mobile-nav"
        className={`mobile-nav ${open ? 'open' : ''}`}
        aria-label="Mobile navigation"
        inert={!open}
        data-lenis-prevent
      >
        <p className="mobile-menu-intro">YOUR LIFE IN THE MOUNTAINS</p>
        <div className="mobile-menu-links">
          {nav.map(([to, label], i) => (
            <NavLink
              to={to}
              key={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              style={{ '--menu-delay': `${i * 45}ms` }}
            >
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </NavLink>
          ))}
        </div>
        <div className="mobile-menu-contact">
          <span>
            <MapPin size={14} />
            Kandaghat, Himachal Pradesh
          </span>
          <a href={`tel:${contact.phone}`}>
            <Phone size={15} />
            +91 78078 85417
            <ArrowUpRight size={15} />
          </a>
        </div>
      </nav>
      <span className="nav-scroll-progress" aria-hidden="true" />
    </header>
  );
}
