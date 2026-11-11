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

node scripts/lighthouse.mjs http://localhost:4173            # simulated slow-4G
node scripts/lighthouse.mjs http://localhost:4173 provided   # unthrottled
```

`npm run assets:profile` expects the original photo at `public/images/profile-source.jpg`.
It runs an on-device segmentation model (`@imgly/background-removal-node`, no API and no
upload) and then `scripts/finalize-profile.mjs`, which drops stray background fragments,
keeps only the subject, fills interior holes, trims to the subject's bounding box and
exports `profile.webp` (776 px) + `profile-480.webp` for the responsive `srcset`.

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

Any static host works. For SPA routing add a rewrite of all unknown paths to
`/index.html` — a `_redirects` file (Netlify) is already included. For Vercel
use a `vercel.json` rewrite, and for GitHub Pages a 404 fallback.

```bash
npm run build   # -> dist/
```

---

© 2026 Pradyumn Dwivedi. All project screenshots belong to their respective
projects.
