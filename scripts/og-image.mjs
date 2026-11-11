import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="18%" cy="12%" r="62%">
      <stop offset="0%" stop-color="#FF6A00" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#FF6A00" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="86%" cy="88%" r="58%">
      <stop offset="0%" stop-color="#D94B13" stop-opacity="0.36"/>
      <stop offset="100%" stop-color="#D94B13" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="flame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FF6A00"/>
      <stop offset="100%" stop-color="#D94B13"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#1C100D"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <rect x="40" y="40" width="1120" height="550" rx="36" fill="#0B0B0B" stroke="rgba(255,255,255,0.10)"/>
  <circle cx="220" cy="315" r="104" fill="url(#flame)"/>
  <text x="220" y="315" font-family="Helvetica, Arial, sans-serif" font-size="62" font-weight="700" fill="#0B0B0B" text-anchor="middle" dominant-baseline="central">PD</text>
  <text x="380" y="236" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="5" fill="#FF6A00">AVAILABLE FOR OPPORTUNITIES</text>
  <text x="380" y="308" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#FFFFFF">Pradyumn</text>
  <text x="380" y="372" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" font-style="italic" fill="#FF6A00">Dwivedi</text>
  <text x="380" y="428" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#B8AAA4">Full-Stack Developer — Turning Ideas Into Powerful Digital Experiences</text>
  <text x="380" y="482" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#8D7E79">React · Node.js · PostgreSQL · MongoDB — Kanpur, India</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/images/og-image.png');
console.log('og-image written');
