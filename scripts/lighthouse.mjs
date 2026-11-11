/**
 * Lighthouse audit helper.
 *
 * `lighthouse` is intentionally NOT a project dependency — it pulls in a full
 * Chrome downloader and would slow every deployment build down. Install it
 * only when you want to audit:
 *
 *     npm i -D lighthouse
 *
 * Then:
 *     npm run preview
 *     node scripts/lighthouse.mjs http://localhost:4173            # simulated slow-4G
 *     node scripts/lighthouse.mjs http://localhost:4173 provided   # unthrottled
 */

let lighthouse, launch
try {
  ;({ default: lighthouse } = await import('lighthouse'))
  ;({ launch } = await import('chrome-launcher'))
} catch {
  console.error(
    '\n  lighthouse is not installed.\n' +
      '  Run:  npm i -D lighthouse\n',
  )
  process.exit(1)
}

const URL_ = process.argv[2] ?? 'http://localhost:4173';
const THROTTLE = process.argv[3] ?? 'simulate';
const chrome = await launch({
  chromePath:
    process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  chromeFlags: ['--headless=new', '--no-sandbox'],
});

const { lhr } = await lighthouse(URL_, {
  port: chrome.port,
  output: 'json',
  logLevel: 'error',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: 'desktop',
  throttlingMethod: THROTTLE,
  screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
});

console.log('URL:', URL_);
for (const v of Object.values(lhr.categories)) {
  console.log(`${v.title.padEnd(16)} ${Math.round(v.score * 100)}`);
}
console.log('\n--- metrics ---');
for (const m of ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index']) {
  console.log(m.padEnd(30), lhr.audits[m]?.displayValue);
}
console.log('\n--- failed / warn audits ---');
for (const [id, a] of Object.entries(lhr.audits)) {
  if (a.score !== null && a.score < 0.9 && !['informative', 'manual', 'notApplicable'].includes(a.scoreDisplayMode)) {
    console.log(`[${a.score}] ${id}: ${a.title}`);
  }
}

await chrome.kill();
