# Emeralds Greens

Premium responsive real estate website using React, Vite, Tailwind CSS, GSAP/ScrollTrigger, @gsap/react, Lenis, React Router and Lucide. Includes six primary pages, legal information, ten supplied project renders, responsive image variants, a native modal gallery with zoom, residence galleries and a configurable WhatsApp enquiry flow.

The homepage hero cycles through all ten supplied images every 5 seconds with a 1.2-second crossfade and a slow zoom. It includes pause/play, previous/next controls and a countdown indicator, waits for the next image to load, suspends playback outside the viewport or in hidden tabs, and disables autoplay for reduced-motion preferences. The timer, visibility listener and intersection observer are cleaned up when leaving the homepage.

On mobile (up to 768px, plus compact phone landscape screens), the slideshow uses a separate landscape frame with `object-fit: contain`, with its controls and hero copy below it. All ten complete photographs remain visible; mobile zoom is disabled to prevent renewed edge cropping. Desktop retains its immersive cover layout and slow zoom.

The header includes a scroll-progress line and a mobile menu with keyboard focus containment, Escape dismissal, background inertness and scroll locking. The footer provides direct call/WhatsApp actions, collection links and back-to-top. Mobile typography, image crops, form inputs and 44px controls are refined in `src/styles/polish.css`. Section reveals use each element's scroll position, with lighter motion and no image parallax on smaller viewports.

## Local development

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

The dev server listens on the local network at port 5173. On this PC use `http://localhost:5173/`; on a phone connected to the same Wi-Fi use the `Network` URL printed by Vite, not `127.0.0.1`. Keep the terminal running. `npm run dev:network` is an alias for the same network configuration. A busy port reports an error instead of silently moving to another port.

```sh
npm run build
npm run preview
```

Run `npm test` for ten React/DOM regression groups. These cover all page routes including the homepage, slideshow controls and image failures, image skeleton reset, gallery numbering/zoom/keyboard behavior, shared overlay scroll locks, enquiry validation and blocked-popup/clipboard fallback, mobile-menu focus, query-prefilled forms and Back/hash scroll restoration. GSAP and Lenis are test doubles in this suite; production build and real-browser visual QA remain separate checks.

## Configure client information

Edit `src/data/project.js`. The client-supplied number `+91 95925 03836` is configured for WhatsApp and click-to-call. The email is `emeraldgreensshimla@gmail.com`. The supplied site address is 2.6 km Kandaghat - Chail Road, Village Kotla, Tehsil Kandaghat, District Solan, Himachal Pradesh, India. `contact.whatsappMessage` controls the floating button's prefilled project-details and site-visit enquiry. Use digits only with country code for `whatsapp`, and international format for `phone`. Display text, email links and map searches all use this shared configuration.

Until WhatsApp is configured, the form prepares a locally copyable enquiry and clearly states that nothing was sent. It never displays a fake success state. Form inputs are not persisted. Once configured, it opens WhatsApp with a prefilled message; the visitor sends it there.

The supplied 32-page brochure is stored unchanged at `public/documents/emeralds-greens-brochure.pdf` (4.2 MB). Gallery has a dedicated cover preview, view/download actions and links to the original villa (pages 12-13), duplex (16-17) and apartment (19) layouts. Homepage, residence sections and footer also link to the brochure. The PDF is served as a static file, never imported into JavaScript or preloaded; lightweight WebP previews are loaded lazily. Vite copies it into `dist/documents/` during the build. `vercel.json` excludes `documents/` from SPA rewrites and sets PDF response headers. No PDF renderer dependency, backend, environment variable or extra hosting service is needed. Page-fragment navigation depends on the visitor's PDF viewer; page numbers are displayed as a fallback.

The map searches for the client-supplied site address in Village Kotla, Kandaghat - Chail Road. Visitors should confirm arrival directions when scheduling a visit. The brochure and plans are conceptual; final specifications and current details require project-representative confirmation.

All ten supplied images were converted to WebP at 720px and original-width variants. No stock photography is substituted. Images are labeled architectural visualizations. Property image groupings are illustrative and should be confirmed by the client before sale use. Areas and approximately 32 total units follow the supplied brief; there are no invented prices, availability, RERA data, testimonials or investment claims.

## Deploy to Vercel

1. Push this source folder to your Git repository, excluding `node_modules`, `.npm-cache`, `.git` from other hosts and build archives.
2. Import that repository as a Vercel project and select Vite.
3. Use `npm run build` and output directory `dist` (install command `npm ci`).
4. Deploy. `vercel.json` provides SPA deep-link routing, so `/gallery` and other routes work on refresh.
5. Replace the origin in `public/sitemap.xml` and `public/robots.txt` with your final domain. Add absolute `og:image`, canonical and Open Graph URL metadata using that domain.

No backend or environment variables are needed. The `.openai/hosting.json` file is only used by the optional private Sites preview and does not affect the Vite build or Vercel hosting.

## SEO & verification

Each route updates its page title, description and Open Graph text. A sitemap, robots file and semantic HTML are included. This is a client-rendered React application; add build-time prerendering or migrate to an SSR/static-rendered React setup before relying on complete search/social crawler visibility for every route.

Build verification passed. In this session no browser surface was available for visual QA, so real-device layout and interaction verification remains necessary at 360, 390, 768, 1024, 1440px and larger. Specifically check navigation, residence anchors, gallery focus/keyboard/zoom, enquiry validation, reduced motion and direct-route refresh before public client launch.

The polish pass also passed DOM interaction checks for exact 5-second slideshow advancement, pause/play, manual navigation and wraparound, hidden-tab suspension, reduced-motion autoplay, timer/observer cleanup, mobile-menu focus containment, Escape dismissal, route-close behavior and restoration of scroll/background interaction. These checks do not substitute for real-device visual QA.

Animations use scoped `useGSAP` contexts with cleanup and reduced-motion media queries. Lenis uses the GSAP ticker only, synchronizes ScrollTrigger and is omitted for coarse pointers and reduced motion. The floating WhatsApp button appears on all pages with a mobile-safe fixed position; visitors review and send the prefilled message in WhatsApp themselves.
