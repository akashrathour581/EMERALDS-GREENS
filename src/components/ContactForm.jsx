import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { contact, properties } from '../data/project';
export default function ContactForm() {
  const [params] = useSearchParams();
  const [draft, setDraft] = useState(''),
    [copied, setCopied] = useState(false);
  const [copyHint, setCopyHint] = useState('');
  const draftField = useRef(null);
  const configured = /^\d{10,15}$/.test(contact.whatsapp);
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(draft)}`;
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const digits = phone.replace(/\D/g, '');
    const nameField = e.currentTarget.elements.namedItem('name');
    const phoneField = e.currentTarget.elements.namedItem('phone');
    nameField.setCustomValidity(name ? '' : 'Please enter your name.');
    phoneField.setCustomValidity(
      /^\+?[\d\s()-]+$/.test(phone) && digits.length >= 10 && digits.length <= 15
        ? ''
        : 'Enter a phone number with 10 to 15 digits.',
    );
    if (!e.currentTarget.reportValidity()) return;
    const message = `Hello Emeralds Greens, I would like to enquire about ${data.get('interest')}.\nName: ${name}\nPhone: ${phone}\nEmail: ${String(data.get('email') || '').trim() || 'Not provided'}\n${String(data.get('message') || '').trim() || 'I would like to schedule a visit.'}`;
    setCopied(false);
    setCopyHint('');
    // Always expose a real link as a fallback for blocked popups and mobile browsers.
    setDraft(message);
    if (configured) {
      try {
        window.open(
          `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`,
          '_blank',
          'noopener,noreferrer',
        );
      } catch {
        /* The visible WhatsApp link below still works. */
      }
    }
  };
  return (
    <form onSubmit={submit} className="contact-form">
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input
            name="name"
            placeholder="Full name"
            autoComplete="name"
            required
            maxLength={100}
            onInput={(e) => e.currentTarget.setCustomValidity('')}
          />
        </label>
        <label>
          Phone number <span>*</span>
          <input
            name="phone"
            type="tel"
            placeholder="+91"
            autoComplete="tel"
            pattern={String.raw`\+?[0-9\s\(\)\-]{10,24}`}
            minLength={10}
            maxLength={24}
            onInput={(e) => e.currentTarget.setCustomValidity('')}
            title="Enter a phone number with 10 to 15 digits."
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
          <h3>Your enquiry is ready</h3>
          <p>
            {configured
              ? 'Review and send your message in WhatsApp. If a new tab did not open, use the link below.'
              : 'Contact setup is pending. This message has not been sent.'}
          </p>
          {configured && (
            <a
              className="button outline"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp
              <ArrowUpRight size={17} />
            </a>
          )}
          <textarea
            ref={draftField}
            aria-label="Prepared enquiry"
            value={draft}
            readOnly
            rows={7}
          />
          <button
            className="text-link"
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(draft);
                setCopied(true);
              } catch {
                setCopied(false);
                draftField.current?.focus();
                draftField.current?.select();
                setCopyHint(
                  'Automatic copy is unavailable here. The message is selected; use your device’s Copy action.',
                );
              }
            }}
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}{' '}
            {copied ? 'Copied to clipboard' : 'Copy Enquiry'}
          </button>
          {copyHint && <p role="status">{copyHint}</p>}
        </div>
      )}
    </form>
  );
}
