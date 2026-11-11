import fs from 'node:fs';
import sharp from 'sharp';

const src = process.argv[2];
const out = process.argv[3];

let removeBackground
try {
  ;({ removeBackground } = await import('@imgly/background-removal-node'))
} catch {
  console.error(
    '\n  @imgly/background-removal-node is not installed.\n' +
      '  It is an optional one-off tool (it ships a ~50 MB ONNX runtime), so it is\n' +
      '  intentionally NOT a project dependency — the Render build stays lean.\n\n' +
      '  Install it only when you need to re-cut the portrait:\n\n' +
      '      npm i -D @imgly/background-removal-node\n\n' +
      '  Then re-run:  npm run assets:profile\n',
  )
  process.exit(1)
}

// re-encode to a clean PNG so the library gets an explicit mime type
const png = await sharp(src).png().toBuffer();
const blob = new Blob([png], { type: 'image/png' });

console.time('remove-bg');
const result = await removeBackground(blob, {
  progress: (p) => {
    if (p.status === 'loading' || p.status === 'processing') {
      process.stdout.write(`\r${p.status} ${Math.round(p.progress ?? 0)}%   `);
    }
  },
});
console.log('\ndone in', Math.round(performance.now() / 100) / 10, 's');
const buf = Buffer.from(await result.arrayBuffer());
fs.writeFileSync(out, buf);
console.log('saved', out, buf.length, 'bytes');
