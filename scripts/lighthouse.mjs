import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const URL_ = process.argv[2] ?? 'http://localhost:4173';
const THROTTLE = process.argv[3] ?? 'simulate';
const chrome = await launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new', '--no-sandbox'] });

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
for (const m of ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index']) {
  console.log(m.padEnd(30), lhr.audits[m]?.displayValue);
}
console.log('\n--- failed / warn audits ---');
for (const [id, a] of Object.entries(lhr.audits)) {
  if (a.score !== null && a.score < 0.9 && !['informative','manual','notApplicable'].includes(a.scoreDisplayMode)) {
    console.log(`[${a.score}] ${id}: ${a.title}`);
    if (a.details?.items?.length) {
      for (const it of a.details.items.slice(0, 4)) {
        console.log('     ', JSON.stringify(it).slice(0, 220));
      }
    }
  }
}

console.log('\n--- long tasks ---');
for (const it of lhr.audits['long-tasks']?.details?.items ?? []) {
  console.log(`${Math.round(it.duration)}ms  ${it.url ?? ''}  ${JSON.stringify(it.attribution ?? '')}`.slice(0, 240));
}

console.log('\n--- LCP element ---');
const lcpEl = lhr.audits['lcp-discovery-insight']?.details?.items?.find((i) => i.type === 'node');
console.log(JSON.stringify(lcpEl?.node?.selector ?? lcpEl?.items ?? lcpEl ?? {}).slice(0, 400));
const lcpBd = lhr.audits['lcp-breakdown-insight']?.details?.items?.[0];
console.log(JSON.stringify(lcpBd?.items ?? lcpBd ?? {}).slice(0, 600));

await chrome.kill();

