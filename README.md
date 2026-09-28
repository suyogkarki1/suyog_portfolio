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
  admin/            password-protected content editor (see "Admin panel" below)
  api/admin/        login/logout + content & file upload routes (commit to GitHub)
content/            *.json — the actual editable data, read by lib/data.ts
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
  data.ts           typed re-exports of content/*.json
  github.ts         GitHub Contents API client used by the admin panel
  auth.ts           admin session cookie signing/verification
public/
  portrait.jpg, certs/, icons/   (extracted from the HTML build's base64)
styles/             CSS Modules per component
```

## Admin panel

`/admin` is a password-protected dashboard for editing all site content
(projects, tech stack, values, socials, certifications, hero/about/contact
text, and the CV PDF) without touching code. Saving a section commits the
change straight to this GitHub repo via the GitHub API; Vercel's existing
auto-deploy then rebuilds and publishes automatically (~1–2 min per save,
same as pushing a commit yourself, just automatic).

**One-time setup:**

1. On GitHub, create a **fine-grained personal access token** scoped to only
   this repository, with **Contents: Read and write** permission (Settings →
   Developer settings → Personal access tokens → Fine-grained tokens).
2. Set these environment variables — in `.env.local` for local dev, and in
   Vercel → Project → Settings → Environment Variables for production:
   - `ADMIN_PASSWORD` — the password you'll use to log into `/admin`
   - `ADMIN_SESSION_SECRET` — any long random string (signs the login cookie)
   - `GITHUB_TOKEN` — the token from step 1
   - `GITHUB_REPO` — `suyogkarki1/suyog_portfolio`
   - `GITHUB_BRANCH` — `main`
3. Redeploy (or restart `npm run dev`) so the new env vars take effect.

Content lives in `content/*.json` (imported by `lib/data.ts`); the admin
panel reads/writes those files. Editing them by hand and pushing still works
exactly as before — the admin panel is just a UI for the same files.

## Port notes

- **ScrollSmoother replaces Lenis** — same inertial feel, one library.
- The values section pins via ScrollTrigger `pin` (sticky doesn't work inside
  ScrollSmoother's transformed content).
- Assets are real files in `public/` instead of base64 — smaller HTML,
  cacheable images.
- Modals pause the smoother instead of stopping Lenis.
- All GSAP work lives in `useGSAP` with scoped selectors, so cleanup is
  automatic on unmount / hot reload.
