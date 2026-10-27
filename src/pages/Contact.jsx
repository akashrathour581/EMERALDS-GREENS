import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { PageHero, SectionHeading } from '../components/UI';
import ContactForm from '../components/ContactForm';
import { contact, mapLinks } from '../data/project';
import { useLocation } from 'react-router-dom';
export default function Contact() {
  const { search } = useLocation();
  return (
    <>
      <PageHero
        eyebrow="LET’S BEGIN A CONVERSATION"
        title="Your next chapter"
        italic="starts here."
        n={7}
      />
      <section className="section contact-grid">
        <div>
          <SectionHeading eyebrow="ENQUIRE / SCHEDULE A VISIT">
            Come for the view.
            <br />
            Stay for the <em>feeling.</em>
          </SectionHeading>
          <p className="body-text">
            Tell us what you are looking for, or prepare a request for a private visit to discover
            the setting for yourself.
          </p>
          <div className="contact-details">
            <span>
              <MapPin />
              {contact.address}
            </span>
            {contact.phone ? (
              <a href={`tel:${contact.phone}`}>
                <Phone />
                {contact.phoneDisplay}
              </a>
            ) : (
              <span>
                <Phone />
                Verified phone number coming soon
              </span>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`}>
                <Mail />
                {contact.email}
              </a>
            )}
          </div>
        </div>
        <ContactForm key={search} />
      </section>
      <section className="map-section">
        <div className="map-title">
          <span className="eyebrow">FIND THE SETTING</span>
          <h3>{contact.locality}</h3>
          <p>{contact.address}</p>
          <p>Please call ahead to confirm directions for your visit.</p>
          <a className="text-link" href={mapLinks.directions} target="_blank" rel="noreferrer">
            Open Google Maps
            <ArrowUpRight size={16} />
          </a>
        </div>
        <iframe
          title="Map search for the supplied Emeralds Greens site address in Village Kotla"
          src={mapLinks.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
