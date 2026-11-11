import fs from 'node:fs';
import { personal } from '../src/data/personal.js';
import { projects } from '../src/data/projects.js';

const base = personal.siteUrl.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${base}/`, priority: '1.0', changefreq: 'monthly' },
  { loc: `${base}/#projects`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${base}/#about`, priority: '0.7', changefreq: 'yearly' },
  { loc: `${base}/#skills`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${base}/#experience`, priority: '0.6', changefreq: 'yearly' },
  { loc: `${base}/#case-studies`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${base}/#contact`, priority: '0.8', changefreq: 'yearly' },
  ...projects.map((p) => ({
    loc: `${base}/projects/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`sitemap.xml written (${urls.length} urls)`);

const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
fs.writeFileSync('public/robots.txt', robots);
console.log('robots.txt written');
