# iOS Assets Generation Guide

This guide explains how to create all required iOS assets for the Padeži Croatian Grammar app.

## Required Assets

### 1. Apple Touch Icons

Create PNG images with the Padeži logo on a black background with the brutalist yellow accent:

| Filename | Size | Purpose |
|----------|------|---------|
| `public/apple-touch-icon.png` | 180x180px | Default iOS icon |
| `public/apple-touch-icon-180x180.png` | 180x180px | iPhone, iPad |
| `public/apple-touch-icon-167x167.png` | 167x167px | iPad Pro |
| `public/apple-touch-icon-152x152.png` | 152x152px | iPad, iPad mini |
| `public/apple-touch-icon-120x120.png` | 120x120px | iPhone retina |

**Design Specifications:**
- Background: `#000000` (black)
- Logo color: `hsl(45, 93%, 58%)` (brutalist yellow)
- Include "PADEŽI" text in bold, uppercase, brutalist font
- No rounded corners (iOS applies them automatically)
- No transparency (use solid black background)
- Minimum safe area: 40px margin from edges for important content

**Quick Design Tips:**
```
Black square background
Center: Large "PADEŽI" text in yellow
Subtitle: "CROATIAN GRAMMAR" in smaller yellow text
Geometric shapes (rectangles, lines) in brutalist style
```

### 2. iOS Splash Screens

Create PNG splash screens with the app branding for a smooth launch experience:

| Filename | Size | Device |
|----------|------|--------|
| `public/splash/iphone-16-pro-max.png` | 2796x1290px | iPhone 16 Pro Max |
| `public/splash/iphone-16-pro.png` | 2556x1179px | iPhone 16 Pro, 15 Pro |
| `public/splash/iphone-16-plus.png` | 2778x1284px | iPhone 16/15/14 Plus |
| `public/splash/iphone-16.png` | 2532x1170px | iPhone 16, 15 |
| `public/splash/ipad-pro-13.png` | 2752x2064px | iPad Pro 13" |
| `public/splash/ipad-pro-11.png` | 2388x1668px | iPad Pro 11" |
| `public/splash/ipad-air.png` | 2360x1640px | iPad Air, iPad 10.9" |

**Design Specifications:**
- Background: `#000000` (black)
- Center content vertically and horizontally
- Main text: "PADEŽI" in yellow, large brutalist font
- Tagline: "Master Croatian Grammar" in white, smaller text
- Consider Dynamic Island area (top 59px) on Pro models
- Include safe area margins (44px top, 34px bottom on iPhones)

**Quick Design Template:**
```
[--- Safe Area Top (44-59px) ---]

          PADEŽI
   (large yellow text)

  Master Croatian Grammar
   (medium white text)

[--- Safe Area Bottom (34px) ---]
```

## Asset Generation Tools

### Option 1: Design Tools
- **Figma**: Use frames with exact dimensions, export as PNG @3x
- **Adobe Illustrator**: Create artboards, export as PNG
- **Sketch**: Create artboards, export as PNG

### Option 2: Online Generators
- **PWA Asset Generator**: https://progressier.com/pwa-icons-and-splash-screens-generator
- **RealFaviconGenerator**: https://realfavicongenerator.net/ (includes iOS)
- **PWA Builder**: https://www.pwabuilder.com/imageGenerator

### Option 3: Command Line (ImageMagick)

Create a base 1024x1024 icon, then resize:

```bash
# Create Apple Touch Icons
convert base-icon.png -resize 180x180 public/apple-touch-icon.png
convert base-icon.png -resize 180x180 public/apple-touch-icon-180x180.png
convert base-icon.png -resize 167x167 public/apple-touch-icon-167x167.png
convert base-icon.png -resize 152x152 public/apple-touch-icon-152x152.png
convert base-icon.png -resize 120x120 public/apple-touch-icon-120x120.png
```

For splash screens:
```bash
# Example for iPhone 16 Pro Max
convert -size 2796x1290 xc:black \
  -font Arial-Bold -pointsize 200 -fill 'rgb(234,179,8)' \
  -gravity center -annotate +0-100 'PADEŽI' \
  -pointsize 60 -fill white \
  -annotate +0+100 'Master Croatian Grammar' \
  public/splash/iphone-16-pro-max.png
```

## Quick Start: Placeholder Assets

For development/testing, you can use simple placeholder images:

```bash
# Create directories
mkdir -p public/splash

# Create black squares for icons (using ImageMagick)
for size in 180 167 152 120; do
  convert -size ${size}x${size} xc:black public/apple-touch-icon-${size}x${size}.png
done
cp public/apple-touch-icon-180x180.png public/apple-touch-icon.png

# Create black splash screens
convert -size 2796x1290 xc:black public/splash/iphone-16-pro-max.png
convert -size 2556x1179 xc:black public/splash/iphone-16-pro.png
convert -size 2778x1284 xc:black public/splash/iphone-16-plus.png
convert -size 2532x1170 xc:black public/splash/iphone-16.png
convert -size 2752x2064 xc:black public/splash/ipad-pro-13.png
convert -size 2388x1668 xc:black public/splash/ipad-pro-11.png
convert -size 2360x1640 xc:black public/splash/ipad-air.png
```

## Brutalist Design Inspiration

The Padeži app uses a brutalist design aesthetic:

**Color Palette:**
- Primary Background: `#000000` (Black)
- Primary Text: `#FFFFFF` (White)
- Accent Yellow: `hsl(45, 93%, 58%)` = `#EAB308`
- Accent Red: `hsl(0, 84%, 60%)` = `#F03E3E`
- Accent Blue: `hsl(217, 91%, 60%)` = `#2E90FA`

**Typography:**
- Font: Inter (Bold, Black weights)
- Style: UPPERCASE, tight tracking
- Transform: Slight skew (-6deg to -12deg)

**Geometric Elements:**
- Bold borders (4-8px)
- Rectangular shapes
- Sharp corners (no border-radius)
- High contrast
- Minimal decoration

## Testing Your Assets

1. **Test Locally:**
   - Build: `npm run build`
   - Preview: `npm run preview`
   - Open on iOS device via local network

2. **Test on iOS:**
   - Safari: Add to Home Screen
   - Check icon appearance
   - Launch app to see splash screen
   - Verify no visual glitches

3. **Validate:**
   - iOS icon should have rounded corners (applied by iOS)
   - Splash screen should display briefly on launch
   - No white flashes or loading artifacts

## Priority Order

**P0 - Critical (Do These First):**
1. `apple-touch-icon.png` (180x180) - Shows on Home Screen
2. `apple-touch-icon-180x180.png` (180x180) - iPhone backup

**P1 - High (Do These Next):**
3. Splash screens for iPhone 16 series (most common new devices)
4. Remaining Apple Touch Icons (iPad support)

**P2 - Medium (Nice to Have):**
5. Splash screens for iPad (if tablet users are significant)

## Next Steps After Asset Creation

After creating these assets, you should also consider:

1. **Siri Shortcuts** - Add shortcuts.json for voice commands
2. **Home Screen Widget** - Implement WidgetKit extension
3. **Live Activities** - Add ActivityKit for lock screen widgets
4. **App Clips** - Create lightweight app clip for quick access

See `IOS_ENHANCEMENT_RECOMMENDATIONS.md` for full details on these advanced features.
