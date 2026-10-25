import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { PageHero, SectionHeading } from '../components/UI';
import ContactForm from '../components/ContactForm';
import { contact } from '../data/project';
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
                {contact.phone}
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
          <h3>Kandaghat, Himachal Pradesh</h3>
          <p>Map shows Kandaghat town; the exact project pin is awaiting confirmation.</p>
          <a
            className="text-link"
            href="https://www.google.com/maps/search/?api=1&query=Kandaghat+Himachal+Pradesh"
            target="_blank"
            rel="noreferrer"
          >
            Open Google Maps
            <ArrowUpRight size={16} />
          </a>
        </div>
        <iframe
          title="Map of Kandaghat town, Himachal Pradesh"
          src="https://maps.google.com/maps?q=Kandaghat%2C%20Himachal%20Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
