import { PageHero, SectionHeading } from '../components/UI';
import ImageGallery from '../components/ImageGallery';
import BrochureSection from '../components/BrochureSection';
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
      <BrochureSection />
    </>
  );
}
