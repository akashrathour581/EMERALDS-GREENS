# Emeralds Greens

Premium responsive real estate website using React, Vite, Tailwind CSS, GSAP/ScrollTrigger, @gsap/react, Lenis, React Router and Lucide. Includes six primary pages, legal information, ten supplied project renders, responsive image variants, a native modal gallery with zoom, residence galleries and a configurable WhatsApp enquiry flow.

## Local development

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Configure client information

Edit `src/data/project.js`. The client-supplied number `+91 7807885417` is configured for WhatsApp and click-to-call. `contact.whatsappMessage` controls the floating button's prefilled project-details and site-visit enquiry. Use digits only with country code for `whatsapp`, and international format for `phone`. Add verified email and a brochure URL when available.

Until WhatsApp is configured, the form prepares a locally copyable enquiry and clearly states that nothing was sent. It never displays a fake success state. Form inputs are not persisted. Once configured, it opens WhatsApp with a prefilled message; the visitor sends it there.

Place original floor plans and brochure under `public/documents/` once provided. The gallery currently explains their unavailability and offers enquiry links rather than invented documents. The map shows Kandaghat town, not a verified project location. Replace its embed after the project pin is verified.

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

Animations use scoped `useGSAP` contexts with cleanup and reduced-motion media queries. Lenis uses the GSAP ticker only, synchronizes ScrollTrigger and is omitted for coarse pointers and reduced motion. The floating WhatsApp button appears on all pages with a mobile-safe fixed position; visitors review and send the prefilled message in WhatsApp themselves.
