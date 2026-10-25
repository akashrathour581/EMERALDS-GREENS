import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { contact, properties } from '../data/project';
export default function ContactForm() {
  const [params] = useSearchParams();
  const [draft, setDraft] = useState(''),
    [copied, setCopied] = useState(false);
  const configured = /^\d{10,15}$/.test(contact.whatsapp);
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Hello Emeralds Greens, I would like to enquire about ${data.get('interest')}.\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email') || 'Not provided'}\n${data.get('message') || 'I would like to schedule a visit.'}`;
    setCopied(false);
    if (configured)
      window.open(
        `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer',
      );
    else setDraft(message);
  };
  return (
    <form onSubmit={submit} className="contact-form">
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input name="name" placeholder="Full name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Phone number <span>*</span>
          <input
            name="phone"
            type="tel"
            placeholder="+91"
            autoComplete="tel"
            pattern="[+0-9 ()-]{10,20}"
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Email address <small>(optional)</small>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={150}
          />
        </label>
        <label>
          I am interested in
          <select
            name="interest"
            defaultValue={
              properties.find((p) => p.id === params.get('interest'))?.name || 'All residences'
            }
          >
            <option>All residences</option>
            {properties.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Your message
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          defaultValue={
            params.get('subject') ? `Please share the ${params.get('subject').toLowerCase()}.` : ''
          }
          placeholder="Tell us a little about the home you have in mind…"
        />
      </label>
      <p className="fine-print">
        {configured
          ? 'Your enquiry opens in WhatsApp. You review and send the message there.'
          : 'The project’s verified contact number is pending. Prepare and copy your enquiry below; no message or personal data is sent or stored by this website.'}
      </p>
      <button className="button" type="submit">
        {configured ? 'Continue to WhatsApp' : 'Prepare My Enquiry'}
        <ArrowUpRight size={18} />
      </button>
      {draft && (
        <div className="enquiry-draft" aria-live="polite">
          <h3>Your enquiry is ready to copy</h3>
          <p>Contact setup is pending. This message has not been sent.</p>
          <textarea aria-label="Prepared enquiry" value={draft} readOnly rows={7} />
          <button
            className="text-link"
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(draft);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}{' '}
            {copied ? 'Copied to clipboard' : 'Copy Enquiry'}
          </button>
        </div>
      )}
    </form>
  );
}
