import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, MapPin, Mountain, Leaf, Sparkles, Compass } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Picture,
  AnimatedReveal,
  SectionHeading,
  Button,
  PropertyCard,
  CTASection,
  TextLink,
} from '../components/UI';
import { contact, mapLinks, properties } from '../data/project';
import HeroSlideshow from '../components/HeroSlideshow';
export default function Home() {
  const hero = useRef();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(
          '.hero [data-enter]',
          { y: 30, opacity: 0, stagger: 0.14, duration: 1.2 },
          0.25,
        ).from('.hero-bottom', { opacity: 0, duration: 1 }, 1);
      });
      return () => mm.revert();
    },
    { scope: hero },
  );
  return (
    <>
      <section className="hero" ref={hero}>
        <HeroSlideshow />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="hero-location" data-enter>
            <span />
            KANDAGHAT · HIMACHAL PRADESH
          </span>
          <h1 data-enter>
            A Life Above
            <br />
            the <em>Ordinary.</em>
          </h1>
          <p data-enter>
            Discover an extraordinary collection of luxury residences
            <br className="desktop-break" /> nestled in the serene hills of Kandaghat.
          </p>
          <div className="hero-actions" data-enter>
            <Button to="/residences" className="gold">
              Explore Residences
            </Button>
            <Link className="hero-secondary" to="/contact">
              Schedule a Visit
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <a
            href="#introduction"
            className="scroll-cue"
            aria-label="Scroll to discover the project"
          >
            <span className="scroll-line" />
            SCROLL TO DISCOVER
            <ArrowDown size={15} />
          </a>
          <span className="hero-caption">A MORE ELEVATED WAY OF LIVING</span>
        </div>
        <span className="render-label">ARCHITECTURAL VISUALIZATION</span>
      </section>
      <div className="intro-ribbon">
        <span>
          <Mountain />A Himalayan Address
        </span>
        <i />
        <span>
          <Leaf />
          Inspired by Nature
        </span>
        <i />
        <span>
          <Sparkles />
          Thoughtfully Designed
        </span>
        <i />
        <span>
          <Compass />
          Extraordinary Perspectives
        </span>
      </div>
      <section className="section introduction" id="introduction">
        <AnimatedReveal className="intro-grid">
          <div className="intro-copy">
            <SectionHeading eyebrow="WELCOME TO EMERALDS GREENS">
              Where nature meets
              <br />
              <em>refined living.</em>
            </SectionHeading>
            <p data-reveal>
              Some places invite you to pause.
              <br />
              This one invites you to stay.
            </p>
            <p className="body-text" data-reveal>
              Set in the serene hills of Kandaghat, Emeralds Greens brings together contemporary
              residences and the beauty of Himachal Pradesh. An intimate collection of homes for
              those who seek a little more from life—and a little less from the everyday.
            </p>
            <div className="intro-links">
              <TextLink to="/about">Discover Our Story</TextLink>
              <a
                className="text-link"
                href={contact.brochure}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project Brochure
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="intro-facts" data-reveal>
              <div>
                <strong>03</strong>
                <span>RESIDENCE COLLECTIONS</span>
              </div>
              <div>
                <strong>01</strong>
                <span>EXTRAORDINARY ADDRESS</span>
              </div>
            </div>
          </div>
          <div className="intro-visual" data-reveal>
            <div className="intro-image" data-parallax data-mask>
              <Picture
                n="emerald-06"
                alt="Emeralds Greens twilight architectural elevation with illuminated residences and mountain backdrop"
              />
            </div>
            <div className="image-seal">
              <Leaf size={22} strokeWidth={1} />
              <span>
                ROOTED IN NATURE.
                <br />
                CRAFTED FOR YOU.
              </span>
            </div>
            <span className="photo-caption">01 / ARCHITECTURAL ELEVATION · KANDAGHAT</span>
          </div>
        </AnimatedReveal>
      </section>
      <section className="section residences-section">
        <AnimatedReveal>
          <div className="section-title-row">
            <SectionHeading eyebrow="THE RESIDENCES">
              Exceptional homes.
              <br />
              <em>Distinctly yours.</em>
            </SectionHeading>
            <div className="section-side">
              <p>
                Three expressions of refined living.
                <br />
                One remarkable setting.
              </p>
              <TextLink to="/residences">View All Residences</TextLink>
            </div>
          </div>
          <div className="property-grid">
            {properties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </AnimatedReveal>
      </section>
      <section className="lifestyle-section">
        <AnimatedReveal className="lifestyle-grid">
          <div className="lifestyle-photo" data-reveal data-mask>
            <Picture
              n="emerald-12"
              alt="Emeralds Greens rooftop pergola lounge overlooking pine forest canopy"
            />
            <span className="photo-tag">THE LUXURY OF DOING LESS.</span>
          </div>
          <div className="lifestyle-copy">
            <SectionHeading eyebrow="A LIFE WELL LIVED" light>
              Make room for
              <br />
              <em>what matters.</em>
            </SectionHeading>
            <p data-reveal>
              Unhurried mornings. Meaningful moments. A setting that makes everyday rituals feel
              extraordinary.
            </p>
            <div className="amenity-preview" data-reveal>
              {[
                'Wellness & rejuvenation',
                'Spaces to come together',
                'Nature at your doorstep',
                'Evenings under the stars',
              ].map((x, i) => (
                <span key={x}>
                  <small>0{i + 1}</small>
                  {x}
                  <ArrowUpRight size={16} />
                </span>
              ))}
            </div>
            <TextLink to="/amenities">Explore Planned Amenities</TextLink>
          </div>
        </AnimatedReveal>
      </section>
      <section className="section location-section">
        <AnimatedReveal className="location-grid">
          <div>
            <SectionHeading eyebrow="CONNECTED, YET A WORLD AWAY">
              A little closer
              <br />
              to <em>paradise.</em>
            </SectionHeading>
            <p className="body-text" data-reveal>
              A mountain setting in Kandaghat, with the charm of Shimla, Chail and Solan in the
              surrounding region. Discover a different pace of life in Himachal Pradesh.
            </p>
            <span className="location-pin">
              <MapPin size={18} />
              {contact.locality}
            </span>
            <p className="body-text site-address">{contact.address}</p>
            <a className="text-link" href={mapLinks.directions} target="_blank" rel="noreferrer">
              Explore the Location
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="location-image" data-reveal>
            <Picture
              n="emerald-04"
              alt="Emeralds Greens master hillside development on Kandaghat-Chail Road"
            />
            <div className="location-card">
              <MapPin size={21} />
              <div>
                In the heart of the hills.<small>KANDAGHAT · HIMACHAL PRADESH</small>
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </section>
      <CTASection />
    </>
  );
}
