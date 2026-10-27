import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, MapPin, Phone } from 'lucide-react';
import { Brand, AnimatedReveal } from './UI';
import { nav, contact, properties } from '../data/project';
export default function Footer() {
  const backToTop = () => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
    document.querySelector('.navbar-brand')?.focus({ preventScroll: true });
  };
  return (
    <footer>
      <AnimatedReveal className="footer-invitation">
        <div data-reveal>
          <span className="eyebrow">A NEW CHAPTER, NATURALLY</span>
          <h2>
            Somewhere you
            <br />
            <em>belong.</em>
          </h2>
        </div>
        <Link data-reveal to="/contact" className="footer-visit">
          <span>
            Let's find your
            <br />
            mountain home
          </span>
          <ArrowUpRight size={30} strokeWidth={1} />
        </Link>
      </AnimatedReveal>
      <AnimatedReveal className="footer-top">
        <div data-reveal>
          <Link to="/" aria-label="Emeralds Greens home">
            <Brand />
          </Link>
          <p>
            A quieter rhythm.
            <br />
            An extraordinary way of life.
          </p>
          <span className="footer-location">
            <MapPin size={15} />
            {contact.address}
          </span>
        </div>
        <div data-reveal>
          <span className="micro">EXPLORE</span>
          <div className="footer-links">
            {nav.slice(1).map(([to, label]) => (
              <Link key={to} to={to}>
                {label}
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
        </div>
        <div data-reveal>
          <span className="micro">THE COLLECTION</span>
          <div className="footer-links">
            {properties.map((p) => (
              <Link key={p.id} to={`/residences#${p.id}`}>
                {p.name}
                <ArrowUpRight size={13} />
              </Link>
            ))}
            <Link to="/gallery#floor-plans">
              Floor Plans
              <ArrowUpRight size={13} />
            </Link>
            <a href={contact.brochure} target="_blank" rel="noopener noreferrer">
              Project Brochure
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-contact" data-reveal>
          <span className="micro">LET'S TALK</span>
          <a className="footer-phone" href={`tel:${contact.phone}`}>
            <Phone size={16} />
            +91 78078 85417
          </a>
          <a
            className="text-link"
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
            <ArrowUpRight size={16} />
          </a>
          <p>
            Or come and discover
            <br />
            the setting for yourself.
          </p>
          <Link className="text-link" to="/contact">
            Arrange a private visit
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </AnimatedReveal>
      <div className="footer-signature" aria-hidden="true">
        EMERALDS GREENS
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Emeralds Greens</span>
        <Link to="/legal">Privacy & Disclaimer</Link>
        <button type="button" className="back-to-top" onClick={backToTop}>
          Back to top
          <ArrowUp size={15} />
        </button>
      </div>
      <p className="legal-note">
        Images are supplied architectural visualizations and are illustrative. Areas are
        approximate. Planned amenities, specifications and project details are subject to
        verification. No prices or unit availability are represented.
      </p>
    </footer>
  );
}
