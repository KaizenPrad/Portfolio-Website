/**
 * Build-time environment variables.
 *
 * Vite inlines `import.meta.env` at build time, so anything prefixed with
 * `VITE_` can be supplied by the host (Render, Vercel, Netlify…) as an
 * environment variable — no source edit required.
 *
 * The file is also imported by `scripts/generate-sitemap.mjs`, which runs in
 * plain Node where `import.meta.env` is `undefined`, hence the guard.
 */

const env = import.meta.env ?? {}

export const VITE_CONTACT_ENDPOINT = env.VITE_CONTACT_ENDPOINT ?? ''
