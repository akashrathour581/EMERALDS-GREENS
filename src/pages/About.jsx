import {
  PageHero,
  SectionHeading,
  AnimatedReveal,
  Picture,
  CTASection,
  TextLink,
} from '../components/UI';
import { contact } from '../data/project';
export default function About() {
  return (
    <>
      <PageHero
        eyebrow="THE EMERALDS GREENS STORY"
        title="A natural sense of"
        italic="belonging."
        n={2}
      />
      <section className="section">
        <AnimatedReveal className="editorial-grid">
          <SectionHeading eyebrow="OUR PHILOSOPHY">
            Less ordinary.
            <br />
            More <em>meaningful.</em>
          </SectionHeading>
          <div data-reveal>
            <p className="lead">
              A home should offer more than an address. It should change the way you feel.
            </p>
            <p className="body-text">
              Emeralds Greens is a luxury residential development in Kandaghat, Himachal Pradesh.
              Inspired by its mountain setting, the project brings a contemporary architectural
              vision to a landscape of green hills and open skies.
            </p>
            <p className="body-text">
              The collection comprises luxury 3 BHK villas, premium 3 BHK duplex houses and high-end
              2 BHK apartments. Each offers a different way to make the mountains your own.
            </p>
            <TextLink to="/residences">Find Your Residence</TextLink>
          </div>
        </AnimatedReveal>
      </section>
      <div className="wide-image">
        <Picture n={8} alt="Supplied visualization of landscaped mountain homes" />
      </div>
      <section className="section">
        <AnimatedReveal className="editorial-grid">
          <div>
            <SectionHeading eyebrow="THE PROJECT AT A GLANCE">
              Thoughtfully
              <br />
              <em>considered.</em>
            </SectionHeading>
            <p className="body-text">
              Information below is drawn from the supplied project brief. Please confirm final
              specifications and all purchase details with an authorized project representative.
            </p>
          </div>
          <dl className="fact-list" data-reveal>
            {[
              ['Address', contact.address],
              ['Collection', 'Villas, duplex houses & apartments'],
              ['Project scale', 'Approximately 32 units, as mentioned in the brochure'],
              ['Carpet areas', 'Approx. 850–2,170 sq ft'],
              ['Lifestyle', 'Planned wellness, recreation & community facilities'],
            ].map(([a, b]) => (
              <div key={a}>
                <dt>{a}</dt>
                <dd>{b}</dd>
              </div>
            ))}
          </dl>
        </AnimatedReveal>
      </section>
      <CTASection />
    </>
  );
}
