import { PageHero, SectionHeading } from '../components/UI';
import ImageGallery from '../components/ImageGallery';
import BrochureSection from '../components/BrochureSection';

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="THE VISUAL JOURNEY"
        title="See life"
        italic="differently."
        n="emerald-08"
      />
      <section className="section gallery-section">
        <div className="section-title-row">
          <SectionHeading eyebrow="EXPLORE THE COLLECTION">
            A sense of <em>place.</em>
          </SectionHeading>
          <p className="body-text gallery-description">
            17 official architectural project renders.
            <br />
            Select an image to explore in high resolution.
          </p>
        </div>
        <ImageGallery />
        <p className="fine-print">
          All gallery images reflect official 3D architectural plans and elevations designed for
          Emeralds Greens, Kandaghat. Room dimensions, materials and final specifications are subject
          to confirmation with the project representative.
        </p>
      </section>
      <BrochureSection />
    </>
  );
}
