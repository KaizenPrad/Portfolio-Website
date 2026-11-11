import sharp from 'sharp';
import fs from 'node:fs';

const src = process.argv[2] ?? 'public/images/profile-cutout.png';

/* ------------------------------------------------------------------ *
 * 1. read raw RGBA
 * ------------------------------------------------------------------ */
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, CH = info.channels;
const at = (x, y) => (y * W + x) * CH;

/* ------------------------------------------------------------------ *
 * 2. remove the colourful bunting the model kept above the head
 *    (bright + strongly saturated + warm hue, only in the top band
 *     where no skin exists yet)
 * ------------------------------------------------------------------ */
const rgb2hsv = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, max === 0 ? 0 : d / max, max];
};

const BAND = Math.round(H * 0.13);
let cleaned = 0;
for (let y = 0; y < BAND; y++) {
  for (let x = 0; x < W; x++) {
    const i = at(x, y);
    if (data[i + 3] < 10) continue;
    const [h, s, v] = rgb2hsv(data[i], data[i + 1], data[i + 2]);
    const warm = h >= 8 && h <= 45;
    if (warm && s >= 0.4 && v >= 0.35) {
      data[i + 3] = 0;
      cleaned++;
    }
  }
}
console.log('removed bunting pixels:', cleaned);

/* ------------------------------------------------------------------ *
 * 3. binary mask from alpha
 * ------------------------------------------------------------------ */
const solid = new Uint8Array(W * H);
for (let p = 0; p < W * H; p++) solid[p] = data[p * CH + 3] > 110 ? 1 : 0;

/* ------------------------------------------------------------------ *
 * 3. connected components (8-way) — keep only the subject
 * ------------------------------------------------------------------ */
const label = new Int32Array(W * H).fill(-1);
let next = 0;
const sizes = [];
const stack = [];

for (let p = 0; p < W * H; p++) {
  if (!solid[p] || label[p] !== -1) continue;
  const id = next++;
  let size = 0;
  stack.length = 0;
  stack.push(p);
  label[p] = id;
  while (stack.length) {
    const q = stack.pop();
    size++;
    const x = q % W, y = (q - x) / W;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const n = ny * W + nx;
        if (solid[n] && label[n] === -1) { label[n] = id; stack.push(n); }
      }
    }
  }
  sizes.push(size);
}
console.log('components:', sizes.length, 'sizes(top 6):', sizes.slice().sort((a, b) => b - a).slice(0, 6).join(', '));

// the subject is the component covering the lower-centre of the frame
let subject = -1;
let bestScore = -1;
for (let id = 0; id < sizes.length; id++) {
  let hits = 0;
  for (let y = Math.round(H * 0.82); y < H; y += 4) {
    for (let x = Math.round(W * 0.35); x < Math.round(W * 0.65); x += 4) {
      if (label[y * W + x] === id) hits++;
    }
  }
  if (hits > bestScore) { bestScore = hits; subject = id; }
}
console.log('subject component:', subject, 'size', sizes[subject]);

let removed = 0;
for (let p = 0; p < W * H; p++) {
  if (solid[p] && label[p] !== subject) {
    data[p * CH + 3] = 0;
    removed++;
  }
}
console.log('removed stray fragments:', removed);

/* ------------------------------------------------------------------ *
 * 4. fill holes inside the subject
 * ------------------------------------------------------------------ */
const bg = new Uint8Array(W * H);
for (let p = 0; p < W * H; p++) bg[p] = data[p * CH + 3] <= 110 ? 1 : 0;
const reached = new Uint8Array(W * H);
stack.length = 0;
for (let x = 0; x < W; x++) { stack.push(x, (H - 1) * W + x); }
for (let y = 0; y < H; y++) { stack.push(y * W, y * W + W - 1); }
while (stack.length) {
  const q = stack.pop();
  if (reached[q] || !bg[q]) continue;
  reached[q] = 1;
  const x = q % W, y = (q - x) / W;
  if (x > 0) stack.push(q - 1);
  if (x < W - 1) stack.push(q + 1);
  if (y > 0) stack.push(q - W);
  if (y < H - 1) stack.push(q + W);
}
let filled = 0;
for (let p = 0; p < W * H; p++) {
  if (bg[p] && !reached[p]) {
    const i = p * CH;
    data[i + 3] = 255;
    filled++;
  }
}
console.log('filled interior holes:', filled);

/* ------------------------------------------------------------------ *
 * 5. bounding box + export
 * ------------------------------------------------------------------ */
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (data[at(x, y) + 3] > 16) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const pad = Math.round(W * 0.02);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const width = Math.min(W - left, maxX - minX + 1 + pad * 2);
const height = Math.min(H - top, maxY - minY + 1 + pad * 2);
console.log('subject bbox', left, top, width, height, 'of', W, H);

const cut = await sharp(data, { raw: { width: W, height: H, channels: CH } })
  .extract({ left, top, width, height })
  .png()
  .toBuffer();

for (const w of [776, 480]) {
  const name = w === 776 ? 'public/images/profile.webp' : 'public/images/profile-480.webp';
  await sharp(cut).resize({ width: w, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 100 }).toFile(name);
  console.log('wrote', name, fs.statSync(name).size, 'bytes');
}
await sharp(cut).png({ compressionLevel: 9 }).toFile('public/images/profile.png');
console.log('wrote public/images/profile.png');
