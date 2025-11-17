// Simple script to generate placeholder PWA icons
// For production, replace these with custom designed icons

const fs = require('fs');
const path = require('path');

// Create SVG icons with a cute pill emoji
function createSVGIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff69ab;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad1)"/>
  <text x="50%" y="50%" font-size="${size * 0.6}" text-anchor="middle" dominant-baseline="central">💊</text>
</svg>`;
}

// Generate icons
const sizes = [192, 512];
const publicDir = path.join(__dirname, 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

sizes.forEach(size => {
  const svg = createSVGIcon(size);
  const filename = `icon-${size}.png`;
  const svgFilename = `icon-${size}.svg`;
  const filepath = path.join(publicDir, svgFilename);

  fs.writeFileSync(filepath, svg);
  console.log(`✨ Created ${svgFilename}`);
});

console.log('\n💖 Icon files created successfully!');
console.log('📝 Note: For best results, convert the SVG files to PNG using an image editor');
console.log('   or an online tool like https://cloudconvert.com/svg-to-png');
console.log('\n   Alternatively, you can use a tool like imagemagick:');
console.log('   brew install imagemagick');
console.log('   convert public/icon-192.svg public/icon-192.png');
console.log('   convert public/icon-512.svg public/icon-512.png\n');
