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
echo "🖼️  iOS Splash Screens:"
create_splash_screen 1290 2796 "iphone-16-pro-max" "iPhone 16 Pro Max"
create_splash_screen 1179 2556 "iphone-16-pro" "iPhone 16 Pro / 15 Pro"
create_splash_screen 1284 2778 "iphone-16-plus" "iPhone 16/15/14 Plus"
create_splash_screen 1170 2532 "iphone-16" "iPhone 16 / 15"
create_splash_screen 2064 2752 "ipad-pro-13" "iPad Pro 13\""
create_splash_screen 1668 2388 "ipad-pro-11" "iPad Pro 11\""
create_splash_screen 1640 2360 "ipad-air" "iPad Air / iPad 10.9\""

echo ""
echo "✨ SVG assets generated successfully!"
echo ""
echo "⚠️  NOTE: iOS requires PNG files. Convert SVGs to PNGs using:"
echo "   - ImageMagick: convert file.svg file.png"
echo "   - Online: https://cloudconvert.com/svg-to-png"
echo "   - Inkscape: inkscape file.svg --export-filename=file.png"
echo ""
echo "📋 Quick conversion with ImageMagick:"
echo "   cd public && for f in *.svg; do convert \$f \${f%.svg}.png; done"
echo "   cd splash && for f in *.svg; do convert \$f \${f%.svg}.png; done"
echo ""
echo "📖 See IOS_ASSETS_GUIDE.md for detailed design specifications"
echo ""
