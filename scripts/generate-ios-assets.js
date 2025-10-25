#!/usr/bin/env node

/**
 * Generate iOS Assets for Padeži App
 * Creates placeholder PNG files for Apple Touch Icons and Splash Screens
 *
 * Usage: node scripts/generate-ios-assets.js
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');
const splashDir = path.join(publicDir, 'splash');

// Ensure directories exist
if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

// Brutalist color palette
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  yellow: '#EAB308', // hsl(45, 93%, 58%)
};

/**
 * Generate Apple Touch Icon
 */
function generateTouchIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Black background
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, size, size);

  // Yellow text
  ctx.fillStyle = colors.yellow;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Main title "PADEŽI"
  const fontSize = Math.floor(size * 0.25);
  ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
  ctx.fillText('PADEŽI', size / 2, size / 2 - fontSize * 0.3);

  // Subtitle
  const subtitleSize = Math.floor(size * 0.08);
  ctx.font = `600 ${subtitleSize}px Inter, Arial, sans-serif`;
  ctx.fillStyle = colors.white;
  ctx.fillText('CROATIAN', size / 2, size / 2 + fontSize * 0.5);
  ctx.fillText('GRAMMAR', size / 2, size / 2 + fontSize * 0.5 + subtitleSize * 1.2);

  // Geometric accent - rectangle
  ctx.fillStyle = colors.yellow;
  const rectWidth = size * 0.15;
  const rectHeight = size * 0.03;
  ctx.fillRect(size / 2 - rectWidth / 2, size * 0.85, rectWidth, rectHeight);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, filename), buffer);
  console.log(`✓ Generated ${filename} (${size}x${size})`);
}

/**
 * Generate iOS Splash Screen
 */
function generateSplashScreen(width, height, filename, deviceName) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Black background
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, width, height);

  // Calculate safe area
  const safeTop = height * 0.1;
  const safeBottom = height * 0.9;
  const centerY = (safeTop + safeBottom) / 2;

  // Main title "PADEŽI"
  ctx.fillStyle = colors.yellow;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const titleSize = Math.floor(height * 0.12);
  ctx.font = `900 ${titleSize}px Inter, Arial, sans-serif`;
  ctx.fillText('PADEŽI', width / 2, centerY - titleSize * 0.5);

  // Tagline
  const taglineSize = Math.floor(height * 0.04);
  ctx.font = `600 ${taglineSize}px Inter, Arial, sans-serif`;
  ctx.fillStyle = colors.white;
  ctx.fillText('Master Croatian Grammar', width / 2, centerY + titleSize * 0.8);

  // Subtitle
  const subtitleSize = Math.floor(height * 0.03);
  ctx.font = `400 ${subtitleSize}px Inter, Arial, sans-serif`;
  ctx.fillStyle = colors.white;
  ctx.globalAlpha = 0.6;
  ctx.fillText('Interactive Learning Platform', width / 2, centerY + titleSize * 1.3);
  ctx.globalAlpha = 1.0;

  // Geometric accents
  ctx.fillStyle = colors.yellow;
  const accentWidth = width * 0.2;
  const accentHeight = height * 0.005;

  // Top accent
  ctx.fillRect(width / 2 - accentWidth / 2, centerY - titleSize * 1.2, accentWidth, accentHeight);

  // Bottom accent
  ctx.fillStyle = colors.yellow;
  ctx.fillRect(width / 2 - accentWidth / 2, centerY + titleSize * 1.8, accentWidth, accentHeight);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(splashDir, filename), buffer);
  console.log(`✓ Generated splash/${filename} (${width}x${height}) - ${deviceName}`);
}

// Generate all assets
console.log('\n🎨 Generating iOS Assets for Padeži App...\n');

console.log('📱 Apple Touch Icons:');
generateTouchIcon(180, 'apple-touch-icon.png');
generateTouchIcon(180, 'apple-touch-icon-180x180.png');
generateTouchIcon(167, 'apple-touch-icon-167x167.png');
generateTouchIcon(152, 'apple-touch-icon-152x152.png');
generateTouchIcon(120, 'apple-touch-icon-120x120.png');

console.log('\n🖼️  iOS Splash Screens:');
generateSplashScreen(1290, 2796, 'iphone-16-pro-max.png', 'iPhone 16 Pro Max');
generateSplashScreen(1179, 2556, 'iphone-16-pro.png', 'iPhone 16 Pro / 15 Pro');
generateSplashScreen(1284, 2778, 'iphone-16-plus.png', 'iPhone 16/15/14 Plus');
generateSplashScreen(1170, 2532, 'iphone-16.png', 'iPhone 16 / 15');
generateSplashScreen(2064, 2752, 'ipad-pro-13.png', 'iPad Pro 13"');
generateSplashScreen(1668, 2388, 'ipad-pro-11.png', 'iPad Pro 11"');
generateSplashScreen(1640, 2360, 'ipad-air.png', 'iPad Air / iPad 10.9"');

console.log('\n✨ All iOS assets generated successfully!');
console.log('\n📋 Next Steps:');
console.log('   1. Review generated assets in public/ directory');
console.log('   2. Replace with custom-designed assets if needed');
console.log('   3. Test on iOS device: npm run build && npm run preview');
console.log('   4. Add to Home Screen and check icon/splash display');
console.log('\n📖 See IOS_ASSETS_GUIDE.md for detailed design specifications\n');
