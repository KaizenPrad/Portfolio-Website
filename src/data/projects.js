/**
 * Featured projects.
 * Every image lives in /public/images/projects/<slug>/*.webp
 * Links that are not public are intentionally left empty — the UI hides them.
 */
export const projects = [
  {
    slug: 'solex',
    name: 'SOLEX',
    subtitle: 'Premium Sneakers & Branded Footwear Store',
    category: 'Personal Project',
    year: '2026',
    repo: 'Ecommerce-Design-template',
    featured: true,
    cover: '/images/projects/solex/01.webp',
    gallery: [
      '/images/projects/solex/01.webp',
      '/images/projects/solex/02.webp',
      '/images/projects/solex/03.webp',
      '/images/projects/solex/04.webp',
      '/images/projects/solex/05.webp',
    ],
    shortDescription:
      'A full-featured, production-style sneaker e-commerce storefront built with React 19 + Vite, featuring a working cart, wishlist, filters and checkout flow.',
    detailedDescription:
      'SOLEX is a complete sneaker marketplace frontend for authentic branded footwear (Nike, Adidas, Air Jordan, New Balance, Converse, Vans, Puma, Asics, Timberland, Dr. Martens). It ships 10 routed pages (Home, Shop, Product Details, Wishlist, Cart, Checkout, Account, Info Pages, 404) with route-level code splitting via React.lazy + Suspense. The catalogue contains 43 products across 7 categories (Running, Lifestyle, Basketball, Training, Sneakers, Slides, Boots) with full variants (sizes 6–12, multiple colours, ratings, sale pricing). All shop state (search query, category, gender, brands, price band, sort order) is driven by URL search params so filtered views are shareable. Cart and wishlist persist to localStorage via a custom useLocalStorage hook; shipping is calculated with a free-shipping threshold ($100) plus a flat $9.95 rate. The checkout page performs real client-side validation (email/phone/name/address) and generates an order ID on placement. I also wrote a headless-Chrome QA harness (scripts/e2e/) that runs 21 interaction checks and 56 responsive-layout checks over the Chrome DevTools Protocol — no test framework required.',
    tech: [
      'React 19',
      'React Router 7',
      'Vite 8',
      'Tailwind CSS 4',
      'Framer Motion',
      'Lucide React',
      'Oxlint',
      'Chrome DevTools Protocol',
      'localStorage',
    ],
    features: [
      '43-product catalogue with URL-driven filters, sort and search',
      'Persistent cart + wishlist with free-shipping progress bar',
      'Size/colour variant selection with quantity limits (max 10) and validated demo checkout',
      'Sliding cart drawer, search overlay, mobile drawer menu and toast system',
      'Full brand/category/benefits/sale sections plus 7 footer content pages',
    ],
    contribution:
      'Built the entire project solo — component library, contexts (CartContext, WishlistContext, ToastContext), hooks, product/brand/category data layer, all 10 pages, and the custom CDP-based E2E/QA script suite.',
    liveUrl: 'https://ecommerce-design-template.onrender.com',
    githubUrl: 'https://github.com/KaizenPrad/Ecommerce-Design-template',
    caseStudy: {
      problem:
        'Building a storefront where filtering, cart state and checkout have to survive a refresh and a shared link. Most template shops keep filters in component state, which means a filtered view cannot be bookmarked or shared, and the cart disappears on refresh.',
      solution:
        'I moved all shop state (query, category, gender, brands, price band, sort) into URL search params and rendered the grid directly from those params, so every filtered view has its own address. Cart and wishlist were lifted into dedicated Context providers backed by a reusable useLocalStorage hook, and a free-shipping threshold was added to the subtotal logic to drive a progress bar.',
      architecture:
        'React 19 + Vite 8 with React Router 7 for routing and React.lazy + Suspense for route-level code splitting. Cart, Wishlist and Toast each own a Context provider; a custom useLocalStorage hook keeps them in sync with the browser. The catalogue is a plain data module (43 products, 7 categories, 10 brands) that the UI filters against.',
      decisions: [
        'URL search params as the single source of truth for shop filters — shareable, bookmarkable, back-button friendly.',
        'Route-level code splitting so the heavy product/brand imagery never blocks the first paint.',
        'localStorage persistence with a custom hook instead of a state library — smaller bundle, full control over hydration.',
        'Shipping modelled as a threshold plus flat rate so the progress bar has real numbers behind it.',
      ],
      challenges: [
        'Keeping filter state and URL in sync without a full state library.',
        'Validating size/colour variants against per-product availability.',
        'Verifying the whole catalogue across breakpoints without a test framework.',
      ],
      howISolved:
        'Filters were derived one-way from the URL, so the two can never drift. Variant selection was modelled per product with stock-aware options. For QA I wrote a headless-Chrome harness over the Chrome DevTools Protocol that runs 21 interaction checks and 56 responsive-layout checks — no test framework required.',
      outcome:
        'Ten fully routed pages, a 43-product catalogue with working filters, cart, wishlist and validated checkout, deployed and publicly reachable, with an automated CDP-based QA suite guarding the catalogue.',
    },
  },
  {
    slug: 'luxe-haven',
    name: 'Luxe Haven Hotel',
    subtitle: 'Luxury Hotel & Reservation Website',
    category: 'Personal Project',
    year: '2026',
    repo: 'Hotel-Design-Template',
    featured: true,
    cover: '/images/projects/luxe-haven/01.webp',
    gallery: [
      '/images/projects/luxe-haven/01.webp',
      '/images/projects/luxe-haven/03.webp',
      '/images/projects/luxe-haven/04.webp',
      '/images/projects/luxe-haven/05.webp',
      '/images/projects/luxe-haven/06.webp',
    ],
    shortDescription:
      'An 11-route luxury hotel marketing and reservation site with a working availability, pricing and booking flow.',
    detailedDescription:
      'Luxe Haven is a portfolio-grade marketing + reservation website for a fictional New York hotel (200 East 50th Street). It covers eleven routes — Home, Rooms, Room Detail, Dining, Spa, Experiences, About, Contact, Booking, Events & Private Dining, Information (Privacy/Terms/Accessibility/FAQ) and a 404. The core engineering is the reservation flow: a search bar captures dates, guests and room type, filters live availability, then the guest selects a room with real per-night, multi-room and 12% tax maths, enters validated guest details, and receives a generated reservation reference code. Search criteria, selected room and reservation state are held in a BookingContext and persisted to localStorage. Design-wise it is deliberately editorial rather than template-like: Cormorant Garamond display type over Inter body, a bespoke token set (ink/cream/gold/champagne), and a hand-built stylised map panel instead of a third-party embed. The site also handles real behaviour — mobile navigation with body scroll-lock and Escape handling, focus-trapped modals, tabbed dining menus, deep-linkable experience modals, lazy images with a branded monogram fallback, SmartImage that reconciles cached images finishing before React attaches its load handler, and per-route <title>/meta descriptions via a usePageMeta hook.',
    tech: [
      'React 18',
      'React Router 6',
      'Vite 6',
      'Tailwind CSS 3',
      'Framer Motion',
      'Lucide React',
      'clsx + tailwind-merge',
      'Vercel SPA rewrites',
    ],
    features: [
      'Full booking flow with live availability, per-night/multi-room pricing, tax maths and confirmation codes',
      '11 fully built routes across hotel, dining, spa, experiences and events',
      'Editorial design system with custom Tailwind tokens, Cormorant Garamond + Inter typography and lazy SmartImage with branded fallback',
      'Real UX details — scroll-lock mobile nav, focus-trapped modals, per-route SEO metadata, responsive from 375px to 1440px',
    ],
    contribution:
      'Built the full site solo — design token system, BookingContext state layer, availability/pricing/date/validation utilities, 40+ components across booking/, common/, home/, layout/, rooms/, ui/, and all 11 page components.',
    liveUrl: 'https://hotel-design-template.onrender.com',
    githubUrl: 'https://github.com/KaizenPrad/Hotel-Design-Template',
    caseStudy: {
      problem:
        'Hotel sites usually stop at a marketing brochure. Building a reservation flow that actually computes availability, per-night pricing for multiple rooms, tax and a confirmation reference is where most portfolio projects break.',
      solution:
        'I separated the booking domain from the UI: pure availability, pricing, date and validation utilities that the BookingContext orchestrates. The guest searches dates/guests/room type, live availability narrows the inventory, the room is priced per night multiplied across selected rooms with a 12% tax line, and a reference code is generated on confirmation. The whole flow persists to localStorage so a half-finished booking survives a refresh.',
      architecture:
        'React 18 + React Router 6 + Vite 6, styled with Tailwind CSS 3 driven by a custom token set (ink / cream / gold / champagne). A single BookingContext owns search criteria, selected room and reservation state. A usePageMeta hook sets per-route <title> and meta description. SmartImage handles lazy loading, cached-image races and a branded monogram fallback.',
      decisions: [
        'Pure booking utilities outside React so pricing and availability logic is unit-testable and reusable.',
        'A bespoke design token set instead of default Tailwind colours, to get an editorial look rather than a template look.',
        'A hand-built stylised map panel rather than a third-party embed — no API key, no external request, full art direction.',
        'Per-route metadata through a hook rather than a static head tag, so every route is indexable on its own.',
      ],
      challenges: [
        'Multi-room pricing with tax staying correct as the guest changes dates or room count.',
        'Mobile navigation locking body scroll while still closing on Escape and restoring scroll position.',
        'Images that are already cached resolving before React attaches its onLoad handler, causing broken placeholders.',
      ],
      howISolved:
        'Pricing was recomputed from a single source of truth on every context change. The mobile nav used a body scroll-lock helper with Escape handling and a stored scroll offset. SmartImage reconciles the cached-image case by checking the complete flag before attaching handlers.',
      outcome:
        'Eleven routes with a working reservation pipeline — availability, pricing, tax, confirmation codes — plus an editorial design system, deployed and live.',
    },
  },
  {
    slug: 'maison-savour',
    name: 'Maison Savour',
    subtitle: 'Fine Dining Restaurant Website',
    category: 'Personal Project',
    year: '2026',
    repo: 'Restaurant-Website-template',
    featured: true,
    cover: '/images/projects/maison-savour/01.webp',
    gallery: [
      '/images/projects/maison-savour/01.webp',
      '/images/projects/maison-savour/02.webp',
      '/images/projects/maison-savour/03.webp',
      '/images/projects/maison-savour/04.webp',
      '/images/projects/maison-savour/06.webp',
    ],
    shortDescription:
      'A motion-led, single-page fine-dining restaurant site with cart, search, reservation and newsletter modals.',
    detailedDescription:
      'Maison Savour is a premium fine-dining restaurant website built as a portfolio showcase — dark, editorial and motion-led, designed to feel like a real hospitality brand rather than a template. It is a section-based single-page experience (no router) with smooth in-page scroll navigation and a sticky navbar that tracks the active section via a useScrollSpy hook plus a scroll-progress indicator. Sections include a staggered-entrance hero with a floating circular dish and custom "EST. 2024" seal, trust indicators, a Signature Collection of four menu cards with hover elevation and image zoom, a Chef\u2019s Table specials panel, an "Our Story" editorial layout with animated count-up statistics, and an infinite swipe-friendly testimonial carousel with pagination dots, arrows and a rating summary. Commerce is implemented with a CartContext (quantity controls, removal, subtotal, demo checkout, localStorage persistence) and a ToastContext for feedback. A full-screen search overlay filters the menu by dish name and allows adding items directly from results. A reservation modal handles form validation and a demo confirmation state, alongside account, privacy and terms modals, a newsletter form with success/error feedback, and a back-to-top control. Accessibility and performance were treated as first-class: semantic landmarks, labelled controls, keyboard focus trapping in modals, a skip link, aria-live cart count, prefers-reduced-motion support, lazy-loaded below-the-fold imagery, eager/preloaded hero image and image fallbacks. The repo includes render.yaml and .nvmrc for one-click Render Blueprint deployment.',
    tech: [
      'React 18',
      'Vite 6',
      'Tailwind CSS 3',
      'Framer Motion',
      'Lucide React',
      'React Context + custom hooks',
      'Render Blueprint',
    ],
    features: [
      'Motion-led single-page design with hero entrance, count-up stats and infinite testimonial carousel',
      'Working cart drawer with quantity controls, subtotal, demo checkout and localStorage persistence',
      'Search overlay that filters the menu and allows adding items',
      'Reservation modal with full validation and demo confirmation',
      'Accessibility suite — focus-trapped modals, skip link, aria-live cart count, reduced-motion support, semantic landmarks',
    ],
    contribution:
      'Built the entire project solo — the 25+ components, CartContext/ToastContext state, scroll-spy hook, design token set in tailwind.config.js, motion choreography across every section, and the Render deployment config.',
    liveUrl: 'https://restaurant-website-template-t6gx.onrender.com',
    githubUrl: 'https://github.com/KaizenPrad/Restaurant-Website-template',
    caseStudy: {
      problem:
        'A single-page site has no router, so there is no built-in way to know which section the visitor is looking at — and a restaurant site still needs a real ordering surface, a menu search and a reservation path, all without feeling bolted on.',
      solution:
        'I wrote a useScrollSpy hook that observes section elements and reports the active one, driving both the navbar highlight and a scroll-progress indicator. Commerce was kept in a CartContext with quantity controls, removal, subtotal, a demo checkout and localStorage persistence, while a ToastContext gave feedback for every action. The search overlay reads from the same menu data, so results and the cart can never disagree.',
      architecture:
        'React 18 + Vite 6 with Tailwind CSS 3 and a custom luxury token set. Section-based single page with in-page scroll navigation; Framer Motion for choreography; Lucide React for iconography; React Context for cart and toast state.',
      decisions: [
        'No router — the whole experience is one page, which keeps the transitions continuous.',
        'useScrollSpy built on IntersectionObserver rather than a scroll handler, to avoid layout thrash.',
        'Cart and Toast as separate contexts so components only re-render for the slice they use.',
        'prefers-reduced-motion honoured at the animation layer, not just in CSS.',
      ],
      challenges: [
        'Making an infinite testimonial carousel usable with mouse, keyboard and touch.',
        'Keeping focus inside modals and restoring it on close.',
        'Making motion feel premium without making the page heavy.',
      ],
      howISolved:
        'The carousel supports arrows, pagination dots, swipe and wraps infinitely. Modals trap Tab focus and restore the previously focused element on dismissal. Animation was limited to entrances, hovers and small transforms, and every below-the-fold image is lazy-loaded with the hero preloaded.',
      outcome:
        'A dark, motion-led restaurant brand site with a working cart, menu search, reservation flow and a full accessibility pass — deployed via a one-click Render Blueprint.',
    },
  },
  {
    slug: 'cyber-sentinel',
    name: 'CyberSentinel',
    subtitle: 'AI Cyber Threat Detection & Incident Response Platform',
    category: 'Personal Project',
    year: '2026',
    repo: 'Cyber-Sentinel',
    featured: true,
    cover: '/images/projects/cyber-sentinel/01.webp',
    gallery: [
      '/images/projects/cyber-sentinel/01.webp',
      '/images/projects/cyber-sentinel/02.webp',
      '/images/projects/cyber-sentinel/03.webp',
      '/images/projects/cyber-sentinel/04.webp',
      '/images/projects/cyber-sentinel/06.webp',
    ],
    shortDescription:
      'A full-stack security platform that ingests behavioural signals, scores risk 0–100, correlates them into detections and auto-opens incidents.',
    detailedDescription:
      'CyberSentinel is a multi-tenant security monitoring platform built on PERN (PostgreSQL/Neon, Express, React, Node). Its thesis: one weak signal is noise, three or four correlated signals are an attack. Any external app (SaaS, e-commerce, chat, fintech) pushes security-relevant events to POST /api/ingest; the pipeline normalises the signal against a BASE_RISK map, scores it 0–100 (base risk + device-criticality/severity/threat-intel boosts, with a machine-readable risk_factors[] array), then correlates the batch across four attack patterns — Ransomware, Phishing, Malware and Unauthorised Access — each with weighted component signals. Correlation requires \u22652 distinct signals or a single weight \u22650.35, drops anything below risk 55, and writes explainable JSON reasoning (matched signals, weights, reasoning) alongside a confidence value. Detections scoring \u226570 auto-open an OPEN incident. The backend is a layered Express app (helmet \u2192 CORS \u2192 morgan \u2192 json \u2192 cookie-parser \u2192 rate limiting \u2192 routes \u2192 404 \u2192 error handler) with JWT access tokens in HttpOnly cookies, bcrypt-12 password hashing, Zod validation, API-key middleware for server-to-server ingestion, and full multi-tenant isolation via organization_id on every table. The React/TypeScript frontend ships a marketing site plus a full analyst console: live Monitor feed with 5-second polling and severity/category/risk filters, an interactive vis-network threat graph (1h/24h/7d windows, nodes sized by risk and coloured by type), a Detection explorer showing per-signal reasoning and weights with one-click promote-to-incident, an Incidents workflow (assign, status transitions, remediation log entries), a Recharts reporting dashboard with date-range breakdowns, risky-user rankings and JSON export, plus API-key management, admin, docs and profile pages. The repo also ships a detailed integration guide, a full project report and documentation PDFs, and a make_ppt.py script that generates the presentation deck.',
    tech: [
      'Node.js (ESM)',
      'Express 4',
      'PostgreSQL (Neon)',
      'JWT (access + refresh)',
      'bcryptjs',
      'Zod',
      'Helmet',
      'express-rate-limit',
      'React 19',
      'TypeScript',
      'Vite 6',
      'Tailwind CSS 4',
      'Recharts',
      'vis-network',
      'Three.js',
    ],
    features: [
      'Signal ingest → normalise → score → correlate pipeline with explainable risk scoring (0–100) and four weighted attack patterns (ransomware, phishing, malware, unauthorised access)',
      'Auto-incident creation at risk ≥70 with assign/status/remediation workflow and full audit logs',
      'Multi-tenant org isolation with JWT cookies, API keys, rate limiting and role model (OWNER/MEMBER)',
      'Analyst console — live Monitor with 5s polling and filters, interactive vis-network threat graph, Detection reasoning explorer, Recharts reporting dashboard, API-key admin and docs pages',
    ],
    contribution:
      'Built the whole platform solo — the entire Express backend (auth, ingest, scoring, correlation, graph, detection, incident, report services and controllers), the PostgreSQL schema and migration runner, the full React/TypeScript analyst console and marketing site, the integration guide and project documentation, and the PPT-generation script.',
    liveUrl: 'https://cyber-sentinel-f5xr.onrender.com',
    githubUrl: 'https://github.com/KaizenPrad/Cyber-Sentinel',
    caseStudy: {
      problem:
        'Security dashboards usually alert on single events, which floods an analyst with noise. The interesting signal is correlation: a password reset followed by a new device followed by a credential link is an attack, but each event alone looks routine.',
      solution:
        'I split ingestion from interpretation. Any external app POSTs security-relevant signals to /api/ingest. The pipeline normalises each signal against a BASE_RISK map, scores it 0–100 with boosts for device criticality, severity and threat intelligence, and records a machine-readable risk_factors[] array. It then correlates the batch across four weighted attack patterns — Ransomware, Phishing, Malware and Unauthorised Access — requiring at least two distinct signals or one signal with weight ≥ 0.35, discarding anything below risk 55. Every detection stores explainable JSON reasoning (matched signals, weights, reasoning) plus a confidence value, and detections at risk ≥ 70 auto-open an incident.',
      architecture:
        'PERN stack: PostgreSQL on Neon with pooled pg connections and raw SQL schema plus a migration runner; Express 4 as a layered app (helmet → CORS → morgan → json → cookie-parser → rate limiting → routes → 404 → error handler); React 19 + TypeScript + Vite 6 + Tailwind CSS 4 for the analyst console, with Recharts for reporting and vis-network for the threat graph. Multi-tenant isolation via organization_id on every table, JWT access tokens in HttpOnly cookies, bcrypt-12 hashing, Zod validation and API-key middleware for server-to-server ingestion.',
      decisions: [
        'Explainable scoring over black-box confidence — every detection carries its matched signals and weights as JSON.',
        'A correlation threshold (>2 distinct signals or one weight ≥0.35) instead of alerting on every event, to cut noise.',
        'API-key middleware separate from JWT, because ingestion comes from server-to-server calls, not browsers.',
        'organization_id on every table so multi-tenant isolation is enforced in queries rather than in the UI.',
      ],
      challenges: [
        'Making correlation deterministic and explainable rather than a scoring black box.',
        'Keeping organisation isolation airtight across every query path.',
        'Rendering an interactive threat graph over live data without the UI stuttering.',
      ],
      howISolved:
        'Detection reasoning is persisted as structured JSON so the UI can render exactly why a detection fired. Tenant scoping was applied at the data-access layer rather than per-route. The graph renders with vis-network over windowed queries (1h/24h/7d) with nodes sized by risk and coloured by type, and the Monitor polls on a 5-second cycle with severity, category and risk filters.',
      outcome:
        'A working multi-tenant security platform with an explainable ingest→score→correlate pipeline, automatic incident creation, an analyst console and a full reporting dashboard — deployed, documented and open-source.',
    },
  },
  {
    slug: 'x-clone',
    name: 'X Clone',
    subtitle: 'Full-Stack Twitter/X Social Platform',
    category: 'Personal Project',
    year: '2026',
    repo: 'Twitter-Clone',
    featured: false,
    cover: '/images/projects/x-clone/01.webp',
    gallery: [
      '/images/projects/x-clone/01.webp',
      '/images/projects/x-clone/02.webp',
      '/images/projects/x-clone/03.webp',
      '/images/projects/x-clone/04.webp',
    ],
    shortDescription:
      'A MERN-stack Twitter/X clone with posts, likes, retweets, follows, notifications and Cloudinary image uploads.',
    detailedDescription:
      'The app is a full-stack Twitter/X clone built on the MERN stack, split into a backend/ (Express + MongoDB + Mongoose) and a frontend/ (React 19 + Vite + Tailwind + DaisyUI) that are deployed independently. The backend provides JWT-protected auth (signup, login, logout, session check), a post system with create/delete/like/unlike/retweet, a follow graph with a suggested-users endpoint, and a notifications collection. Media uploads go to Cloudinary. The frontend is a responsive Twitter-like three-column UI (sidebar nav, centre feed, right-side trends panel) with skeleton loaders for every panel, react-hot-toast notifications, React Query for server-state caching with optimistic updates, and Tailwind + DaisyUI theming with data-theme="black". A distinguishing piece of work is the CyberSentinel integration: the backend pushes security-relevant events to the Sentinel platform via a fire-and-forget reportToSentinel helper (3s timeout, never blocks the request, silently disabled when SENTINEL_URL/SENTINEL_API_KEY are absent). It maps brute-force login bursts, off-hours logins, new signups, plain links in posts, credential-harvesting links (which are deliberately paired as two signals in one batch to trip Sentinel\u2019s \u22652-signal rule), first-seen domains, spam posting, bot-like liking/following and password changes into Sentinel signal types — turning the social clone into a live testbed for account-takeover and spam detection.',
    tech: [
      'Node.js',
      'Express 4',
      'MongoDB',
      'Mongoose 8',
      'JWT (access + refresh)',
      'bcryptjs',
      'Cloudinary',
      'React 19',
      'Vite 6',
      'Tailwind CSS 3',
      'DaisyUI 5',
      'TanStack React Query',
      'React Router 7',
    ],
    features: [
      'Full auth + social graph — signup/login/logout, follow/unfollow, suggested users, editable profile with avatar and bio',
      'Content engine — create/delete posts, like, retweet, and a home feed built from followed users plus an explore feed',
      'Cloudinary image upload on posts plus a notifications system',
      'CyberSentinel security integration mapping 9 app behaviours into Sentinel signals (brute-force burst, off-hours login, phishing links, bot-like activity) with fire-and-forget reporting that never blocks the user request',
    ],
    contribution:
      'Built the entire clone solo — Express/Mongoose backend with auth, posts, users and notification controllers and models, the React frontend (feed, post composer, profile, edit-profile modal, notifications, sidebar, right panel) with React Query caching and skeleton loaders, and the entire CyberSentinel integration layer including the reportToSentinel helper and signal-mapping logic.',
    liveUrl: 'https://just-copy-of-twitter-clone.onrender.com',
    githubUrl: 'https://github.com/KaizenPrad/Twitter-Clone',
    caseStudy: {
      problem:
        'A social clone looks easy until you account for server state. Posts, likes, retweets, follows and notifications all invalidate each other, and naively refetching every panel on every interaction makes the UI feel sluggish.',
      solution:
        'The frontend uses TanStack React Query for server-state caching with optimistic updates — a like applies instantly and rolls back on failure — while react-hot-toast handles feedback and every panel has a skeleton loader for the initial paint. The interesting engineering is the CyberSentinel integration: a fire-and-forget reportToSentinel helper posts security-relevant events to the Sentinel platform with a 3-second timeout, never blocks the user request, and disables itself silently when SENTINEL_URL / SENTINEL_API_KEY are not configured.',
      architecture:
        'MERN split into two independently deployed apps. backend/: Express 4 + MongoDB + Mongoose with JWT access + refresh tokens in cookies, bcryptjs hashing, Cloudinary uploads and notification collection. frontend/: React 19 + Vite 6 + Tailwind CSS 3 + DaisyUI 5 (data-theme="black") with React Query, React Router 7 and react-hot-toast.',
      decisions: [
        'React Query over a global client store — server state is cached, invalidated and optimistically updated by the library.',
        'Optimistic likes/retweets so the interaction never waits on the network.',
        'Fire-and-forget telemetry with a hard 3s timeout, so security reporting can never slow down or break a user request.',
        'Credential-harvesting links are deliberately reported as two signals in one batch to exercise Sentinel\u2019s ≥2-signal correlation rule.',
      ],
      challenges: [
        'Mapping nine distinct application behaviours into a meaningful Sentinel signal vocabulary.',
        'Keeping the security integration completely invisible and non-blocking for end users.',
        'Avoiding stale panels when a post is liked in the feed but also appears on a profile.',
      ],
      howISolved:
        'Each behaviour was translated into a typed signal with the relevant metadata (brute-force login bursts, off-hours logins, new signups, plain links in posts, credential-harvesting links, first-seen domains, spam posting, bot-like liking/following, password changes). The reporting helper is awaited only in the background with a 3-second timeout and an env-guard, and React Query invalidation targets exactly the affected queries.',
      outcome:
        'A complete Twitter/X clone — auth, social graph, posts, media, notifications — that doubles as a live testbed for account-takeover and spam detection inside CyberSentinel.',
    },
  },
  {
    slug: 'awaara-store',
    name: 'The Awaara Store',
    subtitle: 'Premium Streetwear E-Commerce',
    category: 'Client Project',
    year: '2026',
    repo: 'Awaara-Store-Testing',
    featured: true,
    cover: '/images/projects/awaara/01.webp',
    gallery: [
      '/images/projects/awaara/01.webp',
      '/images/projects/awaara/02.webp',
      '/images/projects/awaara/03.webp',
      '/images/projects/awaara/05.webp',
      '/images/projects/awaara/06.webp',
    ],
    shortDescription:
      'A production streetwear storefront with Supabase-backed auth, catalogue, cart, Razorpay checkout, reviews and an admin command centre.',
    detailedDescription:
      'The Awaara Store is a live, production-grade streetwear e-commerce platform ("Wear Your Freedom. Refined Street Essentials. For the Unbound."). It is a React + Vite SPA with Supabase as the backend-as-a-service — a real Postgres database with Row Level Security, Supabase Auth (email/password with onAuthStateChange session handling), and Cloudinary for media delivery/optimisation. Data lives in products, categories, profiles, reviews, orders and carousel_images tables. The storefront covers Home (hero, "STAY WILD. STAY AWAARA" tagline, new arrivals, premium drops, top-rated rail, image carousel), Shop (collection grid with inventory states), Product Detail (gallery, size selection with stock validation, size chart, add-to-cart, and a full reviews module where verified purchasers can post an "intel report" review with uploaded media), Cart (quantity, size, per-line totals, out-of-stock handling) and a full Checkout that creates a Razorpay order, validates stock server-side, verifies the payment signature and writes the order with a pendingCheckoutState reconciliation step. Customer account area covers Profile (name, phone, delivery address, state and pincode) and Orders (reference ID, date, payment status, size/qty/price breakdown). A complete Admin Command Centre provides separate management for Products, Categories, Orders, Users and Carousel Images, behind its own admin-authentication and clearance check with a dedicated storefront/logout flow. The store also ships legal/policy pages (About Us, Terms of Service, Privacy Policy, Exchange & Refund Policy, Shipping Policy), an AI-style error boundary ("SYSTEM CRASH / REBOOT SYSTEM"), a toast system, a theme music toggle, and a WhatsApp "Chat with Awaara Team" widget. It is deployed on Hostinger with CDN-style caching, Brotli compression, preload hints for the hero image and fonts, a generated sitemap, and Cloudinary-hosted imagery.',
    tech: [
      'React 19',
      'Vite',
      'Supabase (PostgreSQL + Auth + RLS)',
      'Cloudinary',
      'Razorpay',
      'React Router',
      'Tailwind CSS',
      'Hostinger (LiteSpeed)',
    ],
    features: [
      'Full shopping flow — catalogue with live inventory states, size/quantity selection, persistent localStorage cart and a Razorpay-integrated checkout that creates, verifies and reconciles orders before writing them to the database',
      'Customer account area — editable profile with delivery address, order history with payment status, size/qty breakdown, and product reviews with verified-purchase gating and media upload',
      'Admin Command Centre with role-scoped management of products, categories, orders, users and carousel images, plus legal/policy pages, WhatsApp support widget, theme audio toggle and a branded error boundary',
    ],
    contribution:
      'Built the complete store — Supabase database schema and RLS policies, auth and session handling, product/category/review/order data layer, storefront pages (Home, Shop, Product Detail, Cart, Checkout, Profile, Orders), Razorpay order creation + payment verification + reconciliation logic, the admin command centre, policy pages, and the deployment/CDN/sitemap configuration.',
    liveUrl: 'https://theawaarastore.com/',
    githubUrl: '', // private repository — GitHub link intentionally omitted
    caseStudy: {
      problem:
        'A real storefront cannot fake payments. The order has to survive a redirect to Razorpay and back, the payment signature has to be verified, and stock has to be re-checked at write time — otherwise a customer can pay for an item that was sold out ten minutes earlier.',
      solution:
        'Checkout creates the Razorpay order first, validates stock server-side, verifies the payment signature on return and then writes the order to Postgres. A pendingCheckoutState reconciliation step handles the case where the user closes the tab after paying: the order is still recovered and reconciled. The rest of the catalogue is backed by Supabase with Row Level Security, so policies are enforced in the database rather than only in the React layer.',
      architecture:
        'React 19 + Vite SPA. Supabase provides Postgres with Row Level Security, Auth (email/password with onAuthStateChange session handling) and the products / categories / profiles / reviews / orders / carousel_images tables. Cloudinary handles media delivery and optimisation; a custom cloudinaryOptimize helper builds delivery URLs. Razorpay handles payments. Deployed on Hostinger with CDN-style caching, Brotli compression, preload hints and a generated sitemap.',
      decisions: [
        'Row Level Security instead of application-only authorisation, so permissions hold even if the UI is bypassed.',
        'Server-side stock validation at checkout, not just in the cart UI.',
        'Payment signature verification before an order is written, with a reconciliation step for interrupted payments.',
        'Verified-purchase gating on reviews, with media upload handled through Cloudinary.',
      ],
      challenges: [
        'Recovering a paid-but-unconfirmed order when the customer closes the tab during the Razorpay redirect.',
        'Keeping size selection and inventory states consistent between catalogue, cart and checkout.',
        'Delivering media-heavy pages without sacrificing load time.',
      ],
      howISolved:
        'pendingCheckoutState persisted locally at order creation and reconciled on return. Inventory states are read from Supabase at each stage and re-validated server-side before the write. All imagery is served through Cloudinary with a custom optimisation helper, the hero image and fonts are preloaded, and Brotli plus CDN caching are enabled at the host.',
      outcome:
        'A live production streetwear store — catalogue, cart, Razorpay checkout with reconciliation, customer accounts with order history and reviews, an admin command centre, and a WhatsApp support widget.',
    },
  },
  {
    slug: 'chat-application',
    name: 'Chat Application',
    subtitle: 'Real-Time Messaging Platform by KaizenPrad',
    category: 'Personal Project',
    year: '2026',
    repo: 'Chat_Application',
    featured: false,
    cover: '/images/projects/chat-app/02.webp',
    gallery: [
      '/images/projects/chat-app/02.webp',
      '/images/projects/chat-app/01.webp',
      '/images/projects/chat-app/04.webp',
    ],
    shortDescription:
      'A real-time 1:1 chat app with Socket.io messaging, live online status, Cloudinary media sharing and JWT auth.',
    detailedDescription:
      'A full-stack real-time chat application built with the MERN stack plus Socket.io, split into backend/ (Express 5 + MongoDB + Socket.io) and frontend/ (React 19 + Vite + Tailwind 4 + DaisyUI). The real-time layer runs over Socket.io attached to the Express HTTP server: on connection the server records the user in an in-memory userSocketMap and broadcasts getOnlineUsers, and on disconnect it removes the entry and re-broadcasts, giving every client a live roster of who\u2019s online. Messages are sent over REST (POST /api/messages/send/:userId) and delivered instantly over the socket (newMessage → subscribeToMessages in the Zustand store, with unsubscribeFromMessages on teardown). The backend handles JWT access + refresh tokens in cookies, bcrypt password hashing, and Cloudinary for image/file attachments (50 MB JSON body limit). The frontend is a clean three-pane chat UI — conversation sidebar with avatars and last message, chat header with online status, message bubble list, and a composer with image attachment — with skeleton loaders for both the sidebar and message list. Zustand stores manage auth (including the Socket.io client instance), chat state and a light/dark theme. The app includes login/sign-up pages with a split auth image pattern, a profile page, a settings page, toast notifications and a "no chat selected" empty state. For production the Express server serves the built frontend dist/ as static assets and falls back to index.html for all non-API GET routes, so a single Render service hosts both API and SPA.',
    tech: [
      'Node.js',
      'Express 5',
      'Socket.io 4',
      'MongoDB',
      'Mongoose 8',
      'JWT (access + refresh)',
      'Cloudinary',
      'React 19',
      'Vite 7',
      'Tailwind CSS 4',
      'DaisyUI 5',
      'Zustand',
    ],
    features: [
      'Real-time 1:1 messaging over Socket.io with instant delivery and a live online-user roster broadcast on connect/disconnect',
      'Secure auth with access + refresh tokens, bcrypt hashing, and full profile/settings management',
      'Cloudinary media sharing with image attachment in the message composer',
      'Polished React UI with skeleton loaders, empty states, toast feedback, light/dark theme switching and 32 customisable themes',
      'Single-service production deployment — Express serves the built SPA with an API-aware catch-all fallback',
    ],
    contribution:
      'Built the entire app solo — the Express 5 + Socket.io server with the online-user map and connection lifecycle, JWT auth and refresh flow, message and user controllers/models/routes, Cloudinary upload handling, the React frontend with the three-pane chat UI, the three Zustand stores (auth with Socket.io client, chat with subscribe/unsubscribe, theme), and the single-service production deployment setup.',
    liveUrl: 'https://chat-application-ivnb.onrender.com',
    githubUrl: 'https://github.com/KaizenPrad/Chat_Application',
    caseStudy: {
      problem:
        'Real-time chat looks easy until you consider the lifecycle. Messages sent over REST need to appear instantly over a socket, the online roster has to stay accurate as users connect and disconnect, and listeners have to be torn down correctly or the client keeps receiving events for a conversation you have left.',
      solution:
        'Socket.io is attached directly to the Express HTTP server. On connection the user is recorded in an in-memory userSocketMap and getOnlineUsers is broadcast; on disconnect the entry is removed and the roster is re-broadcast, so every client always has a live picture. Messages are persisted over REST (POST /api/messages/send/:userId) and delivered over the socket; the client subscribes via subscribeToMessages in a Zustand store and unsubscribes on teardown so listeners never leak.',
      architecture:
        'backend/: Express 5 + MongoDB/Mongoose + Socket.io, JWT access and refresh tokens in cookies, bcrypt hashing, Cloudinary uploads with a 50 MB JSON body limit. frontend/: React 19 + Vite 7 + Tailwind CSS 4 + DaisyUI 5 with three Zustand stores — auth (holding the Socket.io client instance), chat (subscribe/unsubscribe lifecycle) and theme.',
      decisions: [
        'Messages persisted over REST and delivered over the socket — the socket is a delivery channel, not the source of truth.',
        'A single in-memory userSocketMap for presence, broadcast on every connect and disconnect.',
        'The Socket.io client instance lives inside the Zustand auth store so it is created once and shared.',
        'Express serves the built SPA with an API-aware catch-all fallback, so one Render service hosts both API and client.',
      ],
      challenges: [
        'Preventing socket listener leaks when switching or leaving a conversation.',
        'Keeping the online roster correct across reconnects and multiple tabs.',
        'Serving a client-side-routed SPA from the same process as the API without API routes falling through to index.html.',
      ],
      howISolved:
        'Every subscription is paired with an explicit unsubscribe on teardown. Presence is derived from the server-side map rather than client claims. The catch-all fallback only serves index.html for non-API GET routes, so /api/* always hits the router.',
      outcome:
        'A working real-time 1:1 chat product — instant delivery, live online status, image attachments, refresh tokens, theme switching — shipped as a single deployment.',
    },
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export const allTech = [
  ...new Set(projects.flatMap((p) => p.tech)),
]
