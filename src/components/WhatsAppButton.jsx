import { contact } from '../data/project';

export default function WhatsAppButton() {
  if (!/^\d{10,15}$/.test(contact.whatsapp)) return null;

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Emeralds Greens on WhatsApp (opens in a new tab)"
    >
      <span className="whatsapp-float-label">Chat with us</span>
      <svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
        <path d="M16 .8A15.1 15.1 0 0 0 3 23.6L.9 31.2l7.8-2A15.2 15.2 0 1 0 16 .8Zm0 27.6c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.6 1.2 1.2-4.4-.3-.5a12.5 12.5 0 1 1 10.6 5.8Zm6.9-9.4c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2l-1.2 1.4c-.2.3-.4.3-.8.1-2.2-1.1-3.7-2-5.2-4.6-.4-.6.4-.6 1.1-2 .1-.2 0-.5-.1-.7l-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1c0 1.9 1.4 3.6 1.6 3.9.2.2 2.7 4.1 6.5 5.7 2.4 1 3.3 1.1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z" />
      </svg>
    </a>
  );
}
