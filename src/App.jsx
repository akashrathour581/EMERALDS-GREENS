import { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import Home from './pages/Home';
import About from './pages/About';
import Residences from './pages/Residences';
import Amenities from './pages/Amenities';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import { PageHero } from './components/UI';
const metadata = {
  '/': [
    'Luxury Homes Defined by Nature',
    'Explore luxury villas, duplex houses and apartments in Kandaghat, Himachal Pradesh.',
  ],
  '/about': ['Our Story', 'Discover the nature-inspired vision for Emeralds Greens in Kandaghat.'],
  '/residences': [
    'The Residences',
    'Explore 3 BHK villas, 3 BHK duplex houses and 2 BHK apartments.',
  ],
  '/amenities': [
    'Planned Amenities',
    'Explore planned wellness, leisure and community facilities.',
  ],
  '/gallery': [
    'Gallery & Floor Plans',
    'View ten supplied architectural visualizations and request verified project documents.',
  ],
  '/contact': [
    'Enquire & Schedule a Visit',
    'Prepare your enquiry or a private visit request for Emeralds Greens.',
  ],
  '/legal': [
    'Privacy & Disclaimer',
    'Privacy, image attribution and project information disclaimer.',
  ],
};
function Metadata() {
  const { pathname } = useLocation();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.page-hero .picture img', { scale: 1.08, duration: 1.7, ease: 'power3.out' });
        gsap.from('.page-hero-content > *', {
          y: 25,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'all',
        });
      });
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
  useEffect(() => {
    const [title, description] = metadata[pathname] || [
      'Page Not Found',
      'Explore Emeralds Greens.',
    ];
    document.title = `${title} | Emeralds Greens`;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
  }, [pathname]);
  return null;
}
function Legal() {
  return (
    <>
      <PageHero eyebrow="INFORMATION" title="Privacy &" italic="disclaimer." n={2} />
      <article className="section legal-page">
        <h2>Project information</h2>
        <p>
          All supplied architectural visualizations are illustrative. They do not represent
          completed buildings or guarantee final views, finishes, materials, landscaping or
          amenities. Areas are approximate carpet areas from the project brief. Approximately 32
          units are mentioned in the supplied brochure description; current inventory is not
          verified.
        </p>
        <p>
          All amenities are planned and their operational status is unconfirmed. No pricing,
          availability, construction status, rental returns, developer ownership or RERA
          registration is represented on this website. Obtain verified project documents and final
          specifications from an authorized representative before making a purchase decision.
        </p>
        <h2>Your information</h2>
        <p>
          This website has no backend or enquiry database and does not store form data. The enquiry
          form and floating chat button prepare a message that you review and send in WhatsApp to
          the client-supplied number, +91 7807885417. Google Fonts and Google Maps make requests to
          their respective providers and are subject to those providers’ privacy policies. No
          analytics or advertising cookies are installed by this site.
        </p>
        <h2>Contact details & documents</h2>
        <p>
          The contact number and project brochure have been supplied by the client. The brochure and
          its floor plans are conceptual and provided for reference. Confirm all current project
          details and final approved plans with an authorized representative. A verified map pin
          will be added after confirmation.
        </p>
      </article>
    </>
  );
}
export default function App() {
  return (
    <SmoothScrollProvider>
      <Metadata />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/residences" element={<Residences />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route
            path="*"
            element={
              <>
                <PageHero eyebrow="404" title="A different" italic="path." />
                <div className="section">
                  <Link className="button" to="/">
                    Return Home
                  </Link>
                </div>
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </SmoothScrollProvider>
  );
}
