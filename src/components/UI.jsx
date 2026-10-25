import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, BedDouble, MoveUpRight, Trees } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { image } from '../data/project';
gsap.registerPlugin(useGSAP, ScrollTrigger);
export function Picture({ n, alt, className = '', priority = false }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`picture ${loaded ? 'loaded' : ''} ${className}`}>
      <img
        src={image(n)}
        srcSet={`${image(n, 720)} 720w, ${image(n)} 1671w`}
        sizes={priority ? '100vw' : '(max-width: 700px) 100vw, 65vw'}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
export function AnimatedReveal({ children, className = '' }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
          y: 38,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        });
        ref.current
          .querySelectorAll('[data-parallax]')
          .forEach((el) =>
            gsap.fromTo(
              el,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: 'none',
                scrollTrigger: {
                  trigger: ref.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              },
            ),
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
export function SectionHeading({ eyebrow, children, text, light = false }) {
  return (
    <div className={`section-heading ${light ? 'light' : ''}`} data-reveal>
      <span className="eyebrow">
        <span />
        {eyebrow}
      </span>
      <h2>{children}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function Button({ children, to = '/contact', className = '', ...props }) {
  return (
    <Link to={to} className={`button ${className}`} {...props}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function PropertyCard({ property, index }) {
  return (
    <article className="property-card" data-reveal>
      <Link to={`/residences#${property.id}`} className="property-image">
        <Picture
          n={property.image}
          alt={`${property.name} architectural concept in a mountain landscape`}
        />
        <span className="image-number">0{index + 1}</span>
        <span className="round-arrow">
          <ArrowUpRight size={23} />
        </span>
      </Link>
      <span className="micro">{property.category}</span>
      <h3>
        <Link to={`/residences#${property.id}`}>{property.name}</Link>
      </h3>
      <div className="property-spec">
        <span>
          <BedDouble size={15} />
          {property.beds} bedrooms
        </span>
        <span>Approx. {property.area} sq ft</span>
      </div>
    </article>
  );
}
export function CTASection() {
  return (
    <section className="cta">
      <Picture n={5} alt="Mountain residences and pool at sunset" />
      <div className="cta-overlay" />
      <AnimatedReveal className="cta-content">
        <span className="eyebrow" data-reveal>
          A PLACE TO CALL YOUR OWN
        </span>
        <h2 data-reveal>
          Your mountain
          <br />
          retreat <em>awaits.</em>
        </h2>
        <Button className="gold">Arrange a Private Visit</Button>
      </AnimatedReveal>
    </section>
  );
}
export function PageHero({ eyebrow, title, italic, n = 6, children }) {
  return (
    <section className="page-hero">
      <Picture n={n} alt="Emeralds Greens supplied architectural visualization" priority />
      <div className="hero-shade" />
      <div className="page-hero-content">
        <span className="eyebrow">{eyebrow}</span>
        <h1>
          {title} <em>{italic}</em>
        </h1>
        {children}
      </div>
      <span className="render-label">ARCHITECTURAL VISUALIZATION</span>
    </section>
  );
}
export function Brand() {
  return (
    <span className="brand">
      <Trees aria-hidden="true" size={33} strokeWidth={1} />
      <span>
        EMERALDS GREENS<small>LUXURY HOMES DEFINED BY NATURE</small>
      </span>
    </span>
  );
}
export function TextLink({ to, children }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={19} />
    </Link>
  );
}
