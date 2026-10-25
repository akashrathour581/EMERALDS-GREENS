import { FileText, Download, ArrowUpRight } from 'lucide-react';
import { PageHero, SectionHeading, Button } from '../components/UI';
import ImageGallery from '../components/ImageGallery';
import { contact } from '../data/project';
export default function Gallery() {
  return (
    <>
      <PageHero eyebrow="THE VISUAL JOURNEY" title="See life" italic="differently." n={5} />
      <section className="section gallery-section">
        <div className="section-title-row">
          <SectionHeading eyebrow="EXPLORE THE COLLECTION">
            A sense of <em>place.</em>
          </SectionHeading>
          <p className="body-text gallery-description">
            10 supplied architectural visualizations.
            <br />
            Select an image to explore in fullscreen.
          </p>
        </div>
        <ImageGallery />
        <p className="fine-print">
          All gallery images are supplied architectural visualizations, for illustrative purposes.
          They do not confirm completed construction, final specifications or available facilities.
        </p>
      </section>
      <section className="section plans-section" id="floor-plans">
        <div>
          <SectionHeading eyebrow="A CLOSER LOOK">
            The finer <em>details.</em>
          </SectionHeading>
          <p className="body-text">
            Verified floor plans and the project brochure will appear here when the original files
            are provided.
          </p>
        </div>
        <div className="document-cards">
          <article>
            <FileText size={30} strokeWidth={1} />
            <h3>Floor Plans</h3>
            <p>Original layouts are awaiting client confirmation.</p>
            <Button to="/contact?subject=Floor%20plans" className="outline">
              Request Floor Plans
            </Button>
          </article>
          <article>
            <Download size={30} strokeWidth={1} />
            <h3>Project Brochure</h3>
            <p>Explore the vision, residences and planned lifestyle.</p>
            {contact.brochure ? (
              <a className="button outline" href={contact.brochure} download>
                Download Brochure
                <Download size={17} />
              </a>
            ) : (
              <Button to="/contact?subject=Brochure" className="outline">
                Request Brochure
              </Button>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
