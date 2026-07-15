# SUY0G.99 — Portfolio (Next.js port)

The single-file HTML portfolio ported to **Next.js 16.2 · React 19.2 · TypeScript · GSAP**.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Deploy

Easiest: push to GitHub → import on Vercel (zero config). GitHub Pages needs a
static export (`output: "export"` in next.config.ts) — everything here is
static-compatible, so that works too.

## Structure

```
app/
  layout.tsx        Jost font, metadata
  page.tsx          renders <Site/>
  globals.css       tokens, shared buttons/socials, cursor, glyph primitives
components/
  Site.tsx          ScrollSmoother, reveals, nav tracking, goTo, modal pause
  Hero.tsx          full-page-scatter Rubik's mosaic (canvas engine)
  About.tsx         bio, education, certificate lightbox
  TechStack.tsx     animated skill bars, official logos
  Projects.tsx      truncated-icosahedron football + project modal
  Values.tsx        pinned horizontal 10-values scroll + glyph loops
  ValueGlyphs.tsx   the ten animated SVG glyphs
  Contact.tsx       contact section + footer
  Nav / Cursor / Socials / Icons
lib/
  gsapSetup.ts      plugin registration (ScrollTrigger, ScrollSmoother)
  data.ts           projects, stack, values, socials, certs
public/
  portrait.jpg, certs/, icons/   (extracted from the HTML build's base64)
styles/             CSS Modules per component
```

## Port notes

- **ScrollSmoother replaces Lenis** — same inertial feel, one library.
- The values section pins via ScrollTrigger `pin` (sticky doesn't work inside
  ScrollSmoother's transformed content).
- Assets are real files in `public/` instead of base64 — smaller HTML,
  cacheable images.
- Modals pause the smoother instead of stopping Lenis.
- All GSAP work lives in `useGSAP` with scoped selectors, so cleanup is
  automatic on unmount / hot reload.
