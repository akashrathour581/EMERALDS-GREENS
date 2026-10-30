import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, BedDouble, Trees } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { image } from '../data/project';
gsap.registerPlugin(useGSAP, ScrollTrigger);
export function Picture({ n, alt, className = '', priority = false }) {
  return <PictureAsset key={n} n={n} alt={alt} className={className} priority={priority} />;
}
function PictureAsset({ n, alt, className, priority }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={`picture ${loaded || failed ? 'loaded' : ''} ${className}`}>
      {failed ? (
        <span
          className="image-unavailable"
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
          aria-hidden={!alt}
        >
          Image unavailable
        </span>
      ) : (
        <img
          src={image(n)}
          srcSet={`${image(n, 720)} 720w, ${image(n)} 1671w`}
          sizes={priority ? '100vw' : '(max-width: 700px) 100vw, 65vw'}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
export function AnimatedReveal({ children, className = '' }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)' },
        ({ conditions }) => {
          if (!conditions.motion) return;
          const targets = [...ref.current.querySelectorAll('[data-reveal]')].filter(
            (el) => !el.parentElement.closest('[data-reveal]'),
          );
          // Keep long mobile sections readable by revealing each item at its own position.
          targets.forEach((el) => {
            const itemIndex = [...el.parentElement.children].indexOf(el);
            gsap.from(el, {
              y: conditions.desktop ? 32 : 18,
              opacity: 0,
              duration: conditions.desktop ? 0.95 : 0.65,
              delay:
                conditions.desktop && el.matches('.property-card, .amenities-grid > div')
                  ? (itemIndex % 4) * 0.07
                  : 0,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            });
          });
          ref.current.querySelectorAll('[data-mask]').forEach((el) =>
            gsap.from(el, {
              clipPath: 'inset(0 0 12% 0)',
              duration: 1.3,
              ease: 'power3.out',
              clearProps: 'clipPath',
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            }),
          );
          if (conditions.desktop) {
            ref.current.querySelectorAll('[data-parallax]').forEach((el) =>
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
          }
        },
      );
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
      <Picture n="emerald-10" alt="Mountain residences at sunset in Kandaghat" />
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
export function PageHero({ eyebrow, title, italic, n = 'emerald-11', children }) {
  return (
    <section className="page-hero">
      <Picture n={n} alt="Emeralds Greens official architectural visualization" priority />
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
