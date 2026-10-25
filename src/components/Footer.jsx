import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Brand, AnimatedReveal } from './UI';
import { nav, contact } from '../data/project';
export default function Footer() {
  return (
    <footer>
      <AnimatedReveal className="footer-top">
        <div data-reveal>
          <Link to="/">
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
          <span className="micro">LET’S BEGIN A CONVERSATION</span>
          <h3>
            Find your place
            <br />
            in the <em>mountains.</em>
          </h3>
          <Link className="text-link" to="/contact">
            Schedule a visit
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </AnimatedReveal>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Emeralds Greens</span>
        <span>Luxury Homes Defined by Nature</span>
        <Link to="/legal">Privacy & Disclaimer</Link>
      </div>
      <p className="legal-note">
        Images are supplied architectural visualizations and are illustrative. Areas are
        approximate. Planned amenities, specifications and project details are subject to
        verification. No prices or unit availability are represented.
      </p>
    </footer>
  );
}
