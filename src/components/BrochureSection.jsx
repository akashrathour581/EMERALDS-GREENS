import { ArrowUpRight, Download, FileText } from 'lucide-react';
import { AnimatedReveal, SectionHeading } from './UI';
import { brochureDetails, contact, properties } from '../data/project';

export default function BrochureSection() {
  if (!contact.brochure) return null;
  return (
    <section className="section brochure-section" id="project-brochure">
      <AnimatedReveal className="brochure-layout">
        <a
          className="brochure-preview"
          href={contact.brochure}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View the Emeralds Greens project brochure PDF in a new tab"
          data-reveal
        >
          <img
            src={brochureDetails.cover}
            alt="Emeralds Greens brochure cover: Private View"
            width="1000"
            height="707"
            loading="lazy"
            decoding="async"
          />
          <span className="brochure-preview-caption">
            <FileText size={16} />
            <span>
              A PRIVATE VIEW<small>THE PROJECT BROCHURE</small>
            </span>
            <ArrowUpRight size={20} />
          </span>
        </a>
        <div className="brochure-copy">
          <SectionHeading eyebrow="THE PROJECT, IN DETAIL">
            A closer look.
            <br />
            <em>A clearer picture.</em>
          </SectionHeading>
          <p className="body-text" data-reveal>
            Take your time with the collection. Explore the residences, architectural layouts,
            mountain setting and planned lifestyle in the supplied Emeralds Greens brochure.
          </p>
          <div className="brochure-meta" data-reveal>
            <span>PDF DOCUMENT</span>
            <span>{brochureDetails.pages} pages</span>
            <span>{brochureDetails.sizeLabel}</span>
          </div>
          <div className="brochure-actions" data-reveal>
            <a className="button" href={contact.brochure} target="_blank" rel="noopener noreferrer">
              View Brochure
              <ArrowUpRight size={17} />
            </a>
            <a
              className="button outline"
              href={contact.brochure}
              download={brochureDetails.fileName}
            >
              Download PDF
              <Download size={17} />
            </a>
          </div>
          <p className="fine-print" data-reveal>
            Opens in your browser's PDF viewer. The brochure is conceptual; confirm current details
            and final specifications with the project representative.
          </p>
        </div>
      </AnimatedReveal>
      <AnimatedReveal className="brochure-plans">
        <div className="brochure-plans-heading" id="floor-plans" data-reveal>
          <div>
            <span className="eyebrow">SPACE, THOUGHTFULLY PLANNED</span>
            <h3>
              Find your <em>perspective.</em>
            </h3>
          </div>
          <p className="body-text">Go straight to your residence layout in the brochure.</p>
        </div>
        <div className="brochure-plan-grid">
          {properties.map((property) => (
            <a
              key={property.id}
              className="brochure-plan-card"
              href={`${contact.brochure}#page=${property.planPage}`}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
            >
              <img
                src={`/images/floor-plan-${property.id}.webp`}
                alt={`${property.name} floor-plan preview from the supplied brochure`}
                width="600"
                height="424"
                loading="lazy"
                decoding="async"
              />
              <div>
                <span>
                  <small>
                    BROCHURE · {property.planPages.includes('-') ? 'PAGES' : 'PAGE'}{' '}
                    {property.planPages}
                  </small>
                  <strong>{property.name}</strong>
                </span>
                <ArrowUpRight size={20} />
              </div>
            </a>
          ))}
        </div>
        <p className="fine-print">
          Layouts and areas in the brochure are indicative. Some mobile PDF viewers may open at the
          first page; use the page numbers shown above.
        </p>
      </AnimatedReveal>
    </section>
  );
}
