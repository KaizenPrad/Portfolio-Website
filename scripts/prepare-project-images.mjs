import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC_ROOT = 'F:/D Drive/images';
const OUT_ROOT = 'public/images/projects';
const SLUGS = {
  SOLEX: 'solex',
  'Luxe Haven': 'luxe-haven',
  'Maison Savour': 'maison-savour',
  CyberSentinel: 'cyber-sentinel',
  'X Clone': 'x-clone',
  'The Awaara Store': 'awaara',
  'Chat Application': 'chat-app',
};
const WIDTHS = [640, 1024, 1600];

function slugFor(name) {
  for (const key of Object.keys(SLUGS)) if (name.startsWith(key)) return SLUGS[key];
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

fs.mkdirSync(OUT_ROOT, { recursive: true });

for (const dirName of fs.readdirSync(SRC_ROOT)) {
  const srcDir = path.join(SRC_ROOT, dirName);
  if (!fs.statSync(srcDir).isDirectory()) continue;
  const slug = slugFor(dirName);
  const outDir = path.join(OUT_ROOT, slug);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  for (let i = 0; i < files.length; i++) {
    const src = path.join(srcDir, files[i]);
    const base = `${String(i + 1).padStart(2, '0')}`;
    for (const w of WIDTHS) {
      const name = w === WIDTHS[WIDTHS.length - 1] ? `${base}.webp` : `${base}-${w}.webp`;
      await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(outDir, name));
    }
    console.log(slug, base);
  }
}
