import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import fs from 'node:fs';

const src = process.argv[2];
const out = process.argv[3];

// re-encode to a clean PNG so the library gets an explicit mime type
const png = await sharp(src).png().toBuffer();
const blob = new Blob([png], { type: 'image/png' });

console.time('remove-bg');
const result = await removeBackground(blob, {
  progress: (p) => {
    if (p.status === 'loading' || p.status === 'processing') {
      process.stdout.write(`\r${p.status} ${Math.round(p.progress ?? 0)}%   `)
    }
  },
});
console.log('\ndone in', Math.round(performance.now() / 100) / 10, 's');
const buf = Buffer.from(await result.arrayBuffer());
fs.writeFileSync(out, buf);
console.log('saved', out, buf.length, 'bytes');
