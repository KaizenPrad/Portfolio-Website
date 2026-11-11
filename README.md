# Pradyumn Dwivedi — Developer Portfolio

A premium, dark-editorial portfolio website for **Pradyumn Dwivedi**, Full-Stack Developer
(Kanpur, India). Built with React 19, Vite, Tailwind CSS 4 and Motion (Framer Motion).

Live demo of the design system, the seven case studies, the multi-tenant security
platform write-ups and the freelance-focused service section.

---

## Stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Build      | Vite 8                                             |
| UI         | React 19, React Router 7                           |
| Styling    | Tailwind CSS 4 (CSS-first `@theme` tokens)        |
| Animation  | Motion / Framer Motion (`LazyMotion` + `domAnimation`) |
| Icons      | Lucide React + inline SVG brand marks             |
| Fonts      | Self-hosted variable fonts (Space Grotesk / Inter / JetBrains Mono) |
| Data       | Centralised ES modules in `src/data/`              |

---

## Project structure

```
src/
  assets/            (reserved)
  components/
    Navbar.jsx       Floating, blurred nav with scroll-spy + mobile drawer
    Hero.jsx         Split hero: portrait left, copy right
    Stats.jsx        Verified counters (derived from real project data)
    About.jsx        Story + principles + quick facts
    Skills.jsx       Six skill groups, "core" vs "currently exploring"
    Projects.jsx     Bento project grid
    ProjectCard.jsx  Standard card + wide feature card
    Experience.jsx   Vertical timeline (work / teaching / education)
    Services.jsx     What I can build
    CaseStudies.jsx  Problem → solution → architecture → challenges → outcome
    Contact.jsx      Validated contact form + direct channels
    Footer.jsx       Nav, socials, back-to-top
    ui/
      Reveal.jsx     Scroll-triggered reveal (respects reduced motion)
      SectionHeading.jsx
      BrandIcons.jsx GitHub / LinkedIn / WhatsApp marks (lucide v1 dropped brand icons)
  data/
    personal.js      Name, contact, socials, nav links, résumé, contact-form config
    env.js           Build-time env vars (VITE_*)
    projects.js      All seven projects + their case studies
    skills.js        Skill groups and proficiency levels
    experience.js    Timeline, education and certification
    services.js      Service cards and case-study picks
    about.js         About copy and working principles
  pages/
    Home.jsx
    ProjectDetails.jsx  Individual case-study pages (/projects/:slug)
    NotFound.jsx
  utils/images.js    Responsive srcset helpers
  App.jsx, main.jsx, index.css
scripts/             Asset pipeline + QA helpers (see below)
index.template.html  <head> template — index.html is generated from it
render.yaml          Render Blueprint (Static Site) — build command, routes, headers
public/
  images/            Portrait cut-out, project screenshots (webp), OG image, noise tile
  fonts/             Self-hosted woff2 variable fonts
  Full_Stack_Developer_Resume.pdf
  favicon.svg, robots.txt, sitemap.xml, _redirects
```

---

## Editing content

Everything editable lives in `src/data/`:

- **`personal.js`** — name, title, tagline, location, email, phone, WhatsApp,
  social URLs, availability, years of experience, education and the résumé URL.
  Buttons for missing links are hidden automatically (no broken links).
- **`projects.js`** — one entry per project: cover + gallery images, short and
  detailed descriptions, tech stack, feature list, contribution, live/GitHub URLs
  and a full case study (problem, solution, architecture, decisions, challenges,
  how I solved them, outcome).
- **`skills.js`** — the six skill groups, flagged `core` or `learning`.
- **`experience.js`** — timeline entries and education details.
- **`about.js` / `services.js`** — about copy, principles and service cards.

### Outstanding placeholders

| What                     | Where                        | Action                        |
| ------------------------ | ---------------------------- | ----------------------------- |
| Contact form endpoint    | `contactForm.endpoint` (empty)| Optional. Paste a hosted form endpoint (Formspree/Basin/Web3Forms) and messages are POSTed straight to your inbox. Never an API secret. |
| Canonical domain         | `personal.siteUrl`           | Point at the final domain — sitemap, robots and OG tags follow it |

The résumé is already wired up: `public/Full_Stack_Developer_Resume.pdf` is served from
`personal.resumeUrl`, and the **Résumé** buttons in the navbar and hero appear automatically.

### How the contact form delivers messages

The form never stores anything on the site. On a valid submit the message is formatted
once and then handed to the visitor's own client, in one canonical layout:

```
New portfolio enquiry — <subject>

Name: <name>
Email: <email>
Subject: <subject>

<message>

— Sent from the portfolio contact form
```

The visitor then chooses the channel:

- **Send on WhatsApp** — a `wa.me` deep link with the whole message pre-filled (also opened
  automatically on submit), which lands directly on your number.
- **Send via Gmail** — a `mail.google.com` compose link addressed to you with the same body.
- **Email app** — a plain `mailto:` link for desktop mail clients.
- **Copy text** — puts the same message on the clipboard.

If you later add a hosted endpoint in `contactForm.endpoint`, the form POSTs there instead and
the WhatsApp/Gmail buttons remain as a manual fallback.

---

## Scripts

```bash
npm run dev              # start the dev server
npm run build            # generate sitemap + robots, then build
npm run preview          # serve the production build
npm run lint             # oxlint

npm run assets:projects  # rebuild project screenshots (640/1024/1600 webp)
npm run assets:profile   # AI background removal + cleanup for the portrait
npm run assets:og        # regenerate the Open Graph image
npm run assets:noise     # regenerate the grain tile
npm run assets:fonts     # re-download the self-hosted fonts
```

`npm run assets:profile` expects the original photo at `public/images/profile-source.jpg`.
It runs an on-device segmentation model (`@imgly/background-removal-node`, no API and no
upload) and then `scripts/finalize-profile.mjs`, which drops stray background fragments,
keeps only the subject, fills interior holes, trims to the subject's bounding box and
exports `profile.webp` (776 px) + `profile-480.webp` for the responsive `srcset`.

That model ships a ~50 MB ONNX runtime, so it is **not** a project dependency — the
Render build stays lean. Install it only when you need to re-cut the portrait:

```bash
npm i -D @imgly/background-removal-node
npm run assets:profile
```

Likewise, `lighthouse` is not a dependency (it downloads a full Chrome). Install it
only to re-run the audit:

```bash
npm i -D lighthouse
npm run preview
node scripts/lighthouse.mjs http://localhost:4173            # simulated slow-4G
node scripts/lighthouse.mjs http://localhost:4173 provided   # unthrottled
```

---

## Accessibility, SEO and performance

- Semantic landmarks, a skip link, visible focus rings, `aria-live` form feedback
  and labelled controls.
- `prefers-reduced-motion` honoured globally and per component.
- Per-route `<title>` and meta descriptions; OG/Twitter cards; canonical URL;
  generated `sitemap.xml` and `robots.txt`; custom 404; semantic favicon.
- Responsive images (`srcset`/`sizes`) at 640/1024/1600 px, WebP throughout,
  `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image.
- Route-level code splitting, `LazyMotion` to keep the animation payload small,
  and vendor chunking for long-term caching.

Lighthouse (desktop, production build): **Performance 100 · Accessibility 100 ·
Best Practices 100 · SEO 100** unthrottled (LCP 0.6 s, CLS 0, TBT 0 ms); ~74 performance
under Lighthouse's simulated slow-4G profile.

---

## Deployment

### Render (Static Site)

Create a **Static Site** on Render → connect the repo:

| Setting            | Value                                |
| ------------------ | ------------------------------------ |
| Build Command      | `npm ci --include=dev && npm run build` |
| Publish Path       | `./dist`                             |
| Environment        | `NODE_VERSION` = `22.14.0` (see below) |

Or use the included Blueprint — `render.yaml` encodes all of the above:

```bash
render blueprint launch      # then pick this repo
```

**Build command breakdown**

- `npm ci --include=dev` — reproducible install from `package-lock.json`.
  `--include=dev` forces the build toolchain (Vite, Tailwind, `@vitejs/plugin-react`)
  to install even if `NODE_ENV=production` is set in the Render dashboard.
- `npm run build` — runs `scripts/generate-sitemap.mjs` (regenerates
  `sitemap.xml` + `robots.txt`) and `scripts/generate-head.mjs` (regenerates
  `index.html` from `index.template.html` using the canonical URL, title and
  meta description in `src/data/personal.js`), then `vite build` → `dist/`.

> The build needs Node `^20.19 || >=22.12` (Vite 8). `package.json` declares
> `"engines": { "node": ">=22.12.0" }` and Render should pick it up, but set
> `NODE_VERSION=22.14.0` explicitly to be safe — Render's default runtime can be older.

### ⚠️ Two dashboard settings Render does NOT read from the repo

Render configures redirects/rewrites and response headers **in the dashboard**, not from
files in the repo. A Blueprint only applies them when you sync it. If you created the
site from the dashboard, set these by hand:

**1. SPA routing** — Dashboard → your site → **Settings → Redirects and Rewrites** → add:

| Field        | Value          |
| ------------ | -------------- |
| Source       | `/*`           |
| Action       | **Rewrite**    |
| Destination  | `/index.html`  |

Without this, `/projects/solex` returns **404** on a hard refresh, a shared link or a
crawler visit (client-side navigation still works). Render only applies a rule when no
file exists at the requested path, so real assets are never shadowed.

**2. Cache headers** — Dashboard → your site → **Settings → Headers**:

| Path           | Name          | Value                                     |
| -------------- | ------------- | ----------------------------------------- |
| `/`            | Cache-Control | `no-cache, no-store, must-revalidate`      |
| `/index.html`  | Cache-Control | `no-cache, no-store, must-revalidate`      |
| `/assets/*`    | Cache-Control | `public, max-age=31536000, immutable`      |
| `/images/*`    | Cache-Control | `public, max-age=31536000, immutable`      |
| `/fonts/*`     | Cache-Control | `public, max-age=31536000, immutable`      |

This matters: Render's CDN caches the HTML for up to 5 minutes by default. Right after a
deploy, a visitor can be served the **previous** `index.html`, which references hashed
asset filenames that no longer exist → the JS 404s → **blank page**. `no-cache` on the
HTML removes that window entirely.

Both blocks are also in `render.yaml` — running `render blueprint launch` (or pressing
**Apply** on the Blueprint) applies them for you.

### Environment variables

**None are required** — the site is fully static and builds with zero configuration.

| Variable                  | Required | Purpose                                                                 |
| ------------------------- | -------- | ----------------------------------------------------------------------- |
| `NODE_VERSION`            | optional | Pin the Node runtime for the build (`22.14.0` recommended)               |
| `VITE_CONTACT_ENDPOINT`   | optional | A hosted form endpoint (Formspree / Basin / Web3Forms). When set, the contact form POSTs straight to your inbox instead of handing the message to WhatsApp/Gmail. **Public endpoint only — never an API secret.** |

Anything prefixed with `VITE_` is inlined into the bundle at build time, so it
must be set as a Render environment variable **before** the build runs (Render
rebuilds automatically when env vars change). To use it:

1. Add `VITE_CONTACT_ENDPOINT` in the Render dashboard → *Environment*.
2. Trigger a rebuild — the value is baked into `dist/assets/*.js`.

Leave it unset and the form behaves as designed: the visitor's message is
formatted and handed to WhatsApp (`wa.me`), Gmail (`mail.google.com`), their
mail client, or the clipboard.

### Changing the domain

`src/data/personal.js` → `siteUrl` is the single source of truth. It drives the
canonical URL, the Open Graph/Twitter tags, `sitemap.xml` and `robots.txt`.
Change it to your custom domain once Render attaches one — no other file to edit.

`index.html` is regenerated from `index.template.html` on every `npm run dev` / `npm run build`
by `scripts/generate-head.mjs`, using the canonical URL, title and meta description in
`src/data/personal.js`. Edit the **template** for markup changes and `personal.js` for
content changes — the generated `index.html` is committed but always overwritten by the
build, so it can never go stale.

### SPA routing on other hosts

`public/_redirects` ships `/*  /index.html  200` for Netlify / Cloudflare Pages.
Render ignores that file (use the dashboard rule above). For Vercel use a
`vercel.json` rewrite; for Nginx use `try_files $uri /index.html`.

### Other static hosts

```bash
npm ci --include=dev && npm run build   # -> dist/
```

---

© 2026 Pradyumn Dwivedi. All project screenshots belong to their respective
projects.
