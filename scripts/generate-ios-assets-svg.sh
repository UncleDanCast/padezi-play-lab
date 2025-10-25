#!/bin/bash

# Generate iOS Assets for Padeži App (Simple SVG version)
# Creates basic SVG placeholders that can be converted to PNG

PUBLIC_DIR="../public"
SPLASH_DIR="../public/splash"

# Colors
BLACK="#000000"
YELLOW="#EAB308"
WHITE="#FFFFFF"

# Create directories
mkdir -p "$SPLASH_DIR"

echo ""
echo "🎨 Generating iOS Assets for Padeži App..."
echo ""

# Function to create Apple Touch Icon SVG
create_touch_icon() {
  local size=$1
  local filename=$2

  cat > "$PUBLIC_DIR/$filename.svg" <<EOF
<svg width="$size" height="$size" xmlns="http://www.w3.org/2000/svg">
  <rect width="$size" height="$size" fill="$BLACK"/>
  <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="$(($size/5))" font-weight="bold" fill="$YELLOW" text-anchor="middle" dominant-baseline="middle">PADEŽI</text>
  <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="$(($size/12))" font-weight="600" fill="$WHITE" text-anchor="middle" dominant-baseline="middle">CROATIAN</text>
  <text x="50%" y="68%" font-family="Arial, sans-serif" font-size="$(($size/12))" font-weight="600" fill="$WHITE" text-anchor="middle" dominant-baseline="middle">GRAMMAR</text>
  <rect x="$(($size*35/100))" y="$(($size*85/100))" width="$(($size*30/100))" height="$(($size*3/100))" fill="$YELLOW"/>
</svg>
EOF

  echo "✓ Generated $filename.svg (${size}x${size})"
}

# Function to create Splash Screen SVG
create_splash_screen() {
  local width=$1
  local height=$2
  local filename=$3
  local device=$4

  cat > "$SPLASH_DIR/$filename.svg" <<EOF
<svg width="$width" height="$height" xmlns="http://www.w3.org/2000/svg">
  <rect width="$width" height="$height" fill="$BLACK"/>
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="$(($height/10))" font-weight="900" fill="$YELLOW" text-anchor="middle" dominant-baseline="middle">PADEŽI</text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="$(($height/30))" font-weight="600" fill="$WHITE" text-anchor="middle" dominant-baseline="middle">Master Croatian Grammar</text>
  <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="$(($height/40))" font-weight="400" fill="$WHITE" text-anchor="middle" dominant-baseline="middle" opacity="0.6">Interactive Learning Platform</text>
  <rect x="$(($width*40/100))" y="$(($height*38/100))" width="$(($width*20/100))" height="$(($height/200))" fill="$YELLOW"/>
  <rect x="$(($width*40/100))" y="$(($height*62/100))" width="$(($width*20/100))" height="$(($height/200))" fill="$YELLOW"/>
</svg>
EOF

  echo "✓ Generated splash/$filename.svg (${width}x${height}) - $device"
}

echo "📱 Apple Touch Icons:"
create_touch_icon 180 "apple-touch-icon"
create_touch_icon 180 "apple-touch-icon-180x180"
create_touch_icon 167 "apple-touch-icon-167x167"
create_touch_icon 152 "apple-touch-icon-152x152"
create_touch_icon 120 "apple-touch-icon-120x120"

echo ""
echo "🤖 Android Icons:"
create_touch_icon 192 "android-icon-192"
create_touch_icon 512 "android-icon-512"
# Maskable icons (with safe zone padding)
create_touch_icon 192 "android-icon-192-maskable"
create_touch_icon 512 "android-icon-512-maskable"

echo ""
echo "🖼️  iOS Splash Screens (iPhones):"
create_splash_screen 1290 2796 "iphone-16-pro-max" "iPhone 16 Pro Max"
create_splash_screen 1179 2556 "iphone-16-pro" "iPhone 16 Pro / 15 Pro"
create_splash_screen 1284 2778 "iphone-16-plus" "iPhone 16/15/14 Plus"
create_splash_screen 1170 2532 "iphone-16" "iPhone 16 / 15"

echo ""
echo "📱 iPad Splash Screens (Portrait & Landscape):"
create_splash_screen 2064 2752 "ipad-pro-13-portrait" "iPad Pro 13\" Portrait"
create_splash_screen 2752 2064 "ipad-pro-13-landscape" "iPad Pro 13\" Landscape"
create_splash_screen 1668 2388 "ipad-pro-11-portrait" "iPad Pro 11\" Portrait"
create_splash_screen 2388 1668 "ipad-pro-11-landscape" "iPad Pro 11\" Landscape"
create_splash_screen 1640 2360 "ipad-air-portrait" "iPad Air Portrait"
create_splash_screen 2360 1640 "ipad-air-landscape" "iPad Air Landscape"
create_splash_screen 1640 2360 "ipad-10-portrait" "iPad 10.9\" Portrait"
create_splash_screen 2360 1640 "ipad-10-landscape" "iPad 10.9\" Landscape"
create_splash_screen 1620 2160 "ipad-10-2-portrait" "iPad 10.2\" Portrait"
create_splash_screen 2160 1620 "ipad-10-2-landscape" "iPad 10.2\" Landscape"
create_splash_screen 1488 2266 "ipad-mini-portrait" "iPad mini Portrait"
create_splash_screen 2266 1488 "ipad-mini-landscape" "iPad mini Landscape"

echo ""
echo "✨ SVG assets generated successfully!"
echo ""
echo "📊 Summary:"
echo "   - 5 Apple Touch Icons"
echo "   - 4 Android Icons (regular + maskable)"
echo "   - 4 iPhone Splash Screens"
echo "   - 12 iPad Splash Screens (6 models × portrait/landscape)"
echo "   Total: 25 SVG files"
echo ""
echo "⚠️  NOTE: iOS and Android require PNG files. Convert SVGs to PNGs using:"
echo "   - ImageMagick: convert file.svg file.png"
echo "   - Online: https://cloudconvert.com/svg-to-png"
echo "   - Inkscape: inkscape file.svg --export-filename=file.png"
echo "   - Web Converter: npm run convert-svg"
echo ""
echo "📋 Quick conversion with ImageMagick:"
echo "   cd public && for f in *.svg; do convert \$f \${f%.svg}.png; done"
echo "   cd splash && for f in *.svg; do convert \$f \${f%.svg}.png; done"
echo ""
echo "📖 Documentation:"
echo "   - IOS_ASSETS_GUIDE.md - Detailed design specifications"
echo "   - ASSET_CONVERSION_README.md - Conversion instructions"
echo "   - TABLET_TESTING_GUIDE.md - Tablet testing checklist"
echo ""
