#!/usr/bin/env node

/**
 * SVG to PNG Converter for iOS Assets
 *
 * This script provides instructions and a web-based solution for converting
 * the generated SVG files to PNG format required by iOS.
 *
 * Since native image processing libraries require system dependencies,
 * we provide multiple conversion options.
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║          iOS Assets - SVG to PNG Conversion Guide              ║
╔════════════════════════════════════════════════════════════════╗

✅ SVG files have been generated successfully!

📁 Location:
   - Apple Touch Icons: public/*.svg
   - Splash Screens: public/splash/*.svg

⚠️  iOS requires PNG format for icons and splash screens.

═══════════════════════════════════════════════════════════════

🔧 CONVERSION OPTIONS:

Option 1: Online Converter (Easiest)
────────────────────────────────────
1. Visit: https://cloudconvert.com/svg-to-png
2. Upload all SVG files from public/ and public/splash/
3. Download converted PNGs
4. Place them in the same directories

Option 2: ImageMagick (Local, Batch)
─────────────────────────────────────
Install ImageMagick, then run:

cd public
for f in *.svg; do
  convert "\$f" "\${f%.svg}.png"
done

cd splash
for f in *.svg; do
  convert "\$f" "\${f%.svg}.png"
done

Option 3: Inkscape (Local, High Quality)
─────────────────────────────────────────
Install Inkscape, then run:

cd public
for f in *.svg; do
  inkscape "\$f" --export-filename="\${f%.svg}.png"
done

cd splash
for f in *.svg; do
  inkscape "\$f" --export-filename="\${f%.svg}.png"
done

Option 4: Web Browser (No Installation)
────────────────────────────────────────
1. Run: npm run convert-svg
2. Open browser to http://localhost:3000
3. Drag & drop SVG files
4. Download converted PNGs

Option 5: Use Existing Design Tool
───────────────────────────────────
Open SVG files in:
- Figma: Import → Export as PNG
- Adobe Illustrator: Open → Export As → PNG
- Sketch: Import → Export → PNG

═══════════════════════════════════════════════════════════════

📋 FILES TO CONVERT:

Apple Touch Icons (5 files):
├─ apple-touch-icon.svg → apple-touch-icon.png (180x180)
├─ apple-touch-icon-180x180.svg → apple-touch-icon-180x180.png
├─ apple-touch-icon-167x167.svg → apple-touch-icon-167x167.png
├─ apple-touch-icon-152x152.svg → apple-touch-icon-152x152.png
└─ apple-touch-icon-120x120.svg → apple-touch-icon-120x120.png

iOS Splash Screens (7 files):
├─ splash/iphone-16-pro-max.svg → splash/iphone-16-pro-max.png
├─ splash/iphone-16-pro.svg → splash/iphone-16-pro.png
├─ splash/iphone-16-plus.svg → splash/iphone-16-plus.png
├─ splash/iphone-16.svg → splash/iphone-16.png
├─ splash/ipad-pro-13.svg → splash/ipad-pro-13.png
├─ splash/ipad-pro-11.svg → splash/ipad-pro-11.png
└─ splash/ipad-air.svg → splash/ipad-air.png

═══════════════════════════════════════════════════════════════

✨ AFTER CONVERSION:

1. Verify PNG files exist:
   ls public/*.png public/splash/*.png

2. Test locally:
   npm run build
   npm run preview

3. Test on iOS device:
   - Connect to same network
   - Open http://YOUR_IP:4173
   - Add to Home Screen
   - Check icon and splash screen

4. Commit assets:
   git add public/*.png public/splash/*.png
   git commit -m "feat: Add iOS PNG assets"
   git push

═══════════════════════════════════════════════════════════════

💡 TIP: For production, consider hiring a designer to create
custom assets that match your brand perfectly. The SVG files
serve as excellent placeholders for development and testing.

📖 See IOS_ASSETS_GUIDE.md for detailed design specifications.

╚════════════════════════════════════════════════════════════════╝
`);

console.log('\n📂 Current SVG files:\n');

import { readdir } from 'fs/promises';
import { join } from 'path';

async function listSVGs() {
  try {
    const publicFiles = await readdir('./public');
    const svgFiles = publicFiles.filter(f => f.endsWith('.svg'));

    console.log('   Apple Touch Icons:');
    svgFiles.forEach(f => console.log(`   ✓ ${f}`));

    const splashFiles = await readdir('./public/splash');
    const splashSvgs = splashFiles.filter(f => f.endsWith('.svg'));

    console.log('\n   Splash Screens:');
    splashSvgs.forEach(f => console.log(`   ✓ ${f}`));

    console.log(`\n   Total: ${svgFiles.length + splashSvgs.length} SVG files generated\n`);
  } catch (err) {
    console.log('   (Run from project root to see file list)\n');
  }
}

listSVGs();
