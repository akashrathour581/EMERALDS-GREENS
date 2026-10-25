import {
  Heart,
  Trees,
  Stars,
  Users,
  Zap,
  Droplets,
  Dumbbell,
  Utensils,
  Clapperboard,
  Baby,
  Car,
  Sun,
  Building2,
} from 'lucide-react';
import { PageHero, Picture, AnimatedReveal, SectionHeading, CTASection } from '../components/UI';
import { amenities } from '../data/project';
const icons = [
  Building2,
  Heart,
  Dumbbell,
  Trees,
  Utensils,
  Clapperboard,
  Baby,
  Trees,
  Stars,
  Car,
  Zap,
  Droplets,
  Sun,
];
export default function Amenities() {
  return (
    <>
      <PageHero
        eyebrow="PLANNED LIFESTYLE & AMENITIES"
        title="The art of living"
        italic="well."
        n={10}
      />
      <section className="section">
        <AnimatedReveal className="editorial-grid">
          <SectionHeading eyebrow="BEYOND YOUR FRONT DOOR">
            A richer rhythm.
            <br />A <em>fuller life.</em>
          </SectionHeading>
          <p className="lead" data-reveal>
            Find your balance in spaces for wellbeing, play, connection and quiet contemplation. A
            considered collection of planned facilities, inspired by life in the hills.
          </p>
        </AnimatedReveal>
        <p className="notice">
          Planned amenities · Facilities listed are advertised in the project brief. Operational
          status, scope, charges and access are unconfirmed and should be verified before purchase.
        </p>
      </section>
      <section className="amenity-feature">
        <Picture n={9} alt="Illustrative landscaped gardens and poolside terrace" />
        <div>
          <span className="eyebrow">TIME TO RECONNECT</span>
          <h2>
            For the moments
            <br />
            that make <em>a life.</em>
          </h2>
          <p>
            From a quiet meditation to evenings in good company, imagine a daily rhythm with more
            room for you.
          </p>
        </div>
      </section>
      <section className="section">
        <AnimatedReveal>
          <SectionHeading eyebrow="CONSIDERED IN EVERY DETAIL">
            Planned for
            <br />
            <em>everyday possibility.</em>
          </SectionHeading>
          <div className="amenities-grid">
            {amenities.map((a, i) => {
              const Icon = icons[i];
              return (
                <div key={a} data-reveal>
                  <Icon size={29} strokeWidth={1} />
                  <span>{a}</span>
                  <small>PLANNED FACILITY</small>
                </div>
              );
            })}
          </div>
        </AnimatedReveal>
      </section>
      <CTASection />
    </>
  );
}
