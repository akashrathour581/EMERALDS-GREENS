import { useState } from 'react';
import { BedDouble, Maximize2, ArrowUpRight } from 'lucide-react';
import {
  PageHero,
  Picture,
  SectionHeading,
  AnimatedReveal,
  Button,
  CTASection,
} from '../components/UI';
import { properties } from '../data/project';
function Residence({ property: p, index }) {
  const [active, setActive] = useState(p.gallery[0]);
  return (
    <section className={`section residence-detail ${index % 2 ? 'tinted' : ''}`} id={p.id}>
      <AnimatedReveal className="residence-detail-grid">
        <div data-reveal>
          <Picture
            n={active}
            alt={`${p.name} architectural visualization`}
            className="residence-main"
          />
          <div className="residence-thumbs">
            {p.gallery.map((n) => (
              <button
                key={n}
                onClick={() => setActive(n)}
                aria-label={`View ${p.name} image ${p.gallery.indexOf(n) + 1}`}
                aria-pressed={active === n}
              >
                <Picture n={n} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow={`0${index + 1} / THE COLLECTION`}>{p.name}</SectionHeading>
          <p className="body-text" data-reveal>
            {p.description}
          </p>
          <div className="detail-specs" data-reveal>
            <span>
              <BedDouble />
              {p.beds} BHK<small>CONFIGURATION</small>
            </span>
            <span>
              <Maximize2 />
              {p.area} sq ft<small>APPROX. CARPET AREA</small>
            </span>
          </div>
          <p className="fine-print">
            Images are illustrative project renders. Room dimensions, materials, layouts and final
            specifications require confirmation. Verified floor plans will be added when supplied.
          </p>
          <Button to={`/contact?interest=${p.id}`}>Enquire About This Home</Button>
        </div>
      </AnimatedReveal>
    </section>
  );
}
export default function Residences() {
  return (
    <>
      <PageHero eyebrow="THE RESIDENCES" title="Find your own" italic="extraordinary." n={3}>
        <p>Three collections. A shared appreciation for a life well lived.</p>
      </PageHero>
      <div className="collection-nav">
        {properties.map((p) => (
          <a key={p.id} href={`#${p.id}`}>
            {p.name}
            <ArrowUpRight size={15} />
          </a>
        ))}
      </div>
      {properties.map((p, i) => (
        <Residence key={p.id} property={p} index={i} />
      ))}
      <CTASection />
    </>
  );
}
