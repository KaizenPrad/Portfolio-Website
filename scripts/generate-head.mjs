import fs from 'node:fs';
import { personal } from '../src/data/personal.js';

/**
 * Generates `index.html` from `index.template.html` using the values in
 * src/data/personal.js, so the canonical URL, Open Graph tags, title and
 * meta description can never drift from the single source of truth.
 *
 * `index.html` is generated (and git-ignored) — edit `index.template.html`
 * for markup changes and `src/data/personal.js` for content changes.
 */

const TEMPLATE = 'index.template.html';
const OUTPUT = 'index.html';

if (!fs.existsSync(TEMPLATE)) {
  console.error(`\n  Missing ${TEMPLATE} — cannot generate ${OUTPUT}.\n`)
  process.exit(1)
}

const base = personal.siteUrl.replace(/\/$/, '');
const title = `${personal.name} — ${personal.title}`;

const html = fs
  .readFileSync(TEMPLATE, 'utf8')
  .replaceAll('{{SITE_URL}}', base)
  .replaceAll('{{TITLE}}', title)
  .replaceAll('{{DESCRIPTION}}', personal.metaDescription)
  .replaceAll('{{OG_IMAGE}}', `${base}/images/og-image.png`);

const leftover = [...new Set(html.match(/{{\w+}}/g) ?? [])];
if (leftover.length) {
  console.error(`\n  Unresolved placeholders in ${TEMPLATE}: ${leftover.join(', ')}\n`)
  process.exit(1)
}

fs.writeFileSync(OUTPUT, html)
console.log(`index.html generated for ${base}`)
