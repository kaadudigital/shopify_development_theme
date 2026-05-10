# Kaadu Design System

> Kaadu is a Swiss fair-trade snack brand selling freeze-dried fruit produced in the Global South. The brand is radically transparent and structurally just — paying farmers 30–40% above market rate and workers 100% higher wages, with a long-term goal of 100% local worker ownership.

---

## Sources

| Source | Notes |
|---|---|
| **Figma: Wireframe.fig** | Primary visual source — 4 pages: `Webdesign` (74 frames), `Sytel-Guide` (25 frames), `Assets` (73 frames), `Page-4` (8 frames) |
| **Brand Brief** | Provided as text — describes mission, tone, personality, positioning |
| **Kaadu Web Style Guide** | Provided as text — defines spacing, type scale, layout rules, button specs |

---

## CONTENT FUNDAMENTALS

### Language & Market
- Primary language: **German** (German-speaking Switzerland)
- Secondary: English slogans and CTAs alongside German body copy

### Tone of Voice
- **Bold and unapologetic.** No hedging, no corporate softness.
- **Playfully radical.** Serious about justice, but not self-righteous. Like a cool, principled older sibling.
- Speaks *directly* to the reader — "du/ihr" energy. No passive voice.
- Calls out industry injustice by name. Brands itself as the rebel, not the charity.

### Casing
- **Display headlines (H1):** ALWAYS ALL CAPS via `text-transform: uppercase`. Enter in normal case in CMS for SEO.
- **Section headlines (H2):** ALL CAPS
- **CTAs/Buttons:** ALL CAPS
- **Body copy:** Sentence case. Normal writing.

### Copy Voice — Specific Examples (from Figma)
- `"SNACK LIKE YOU GIVE A DAMN."` — primary tagline
- `"JUSTICE NEVER TASTED SO SWEET"` — secondary hook
- `"ITS NOT FAIR! ITS NOT FAIR! ITS NOT FAIR!"` — ticker/marquee protest chant
- `"RADIKALER FAIR"` — German "Radically Fair"
- `"100 % Frucht. 0 % Ausbeutung."` — product promise (German body, punchy)
- `"Gefriergetrocknete Früchte – fair produziert, in der Ursprungsgemeinde verarbeitet, radikal transparent."` — product description
- `"FAIRNESS FÜR KLEINBAUERN"` — section headline
- `"STARKE JOBS FÜR LOKALE FRAUEN"` — section headline
- `"THE SNACKS THAT CHANGE LIVES"` — English headline in German-language page

### Emoji & Icons
- **No emoji** in body copy or headings.
- Brand illustrations (mascots, stickers) serve the expressive role emoji might play elsewhere.
- Unicode characters used occasionally (₹ for Rupee prices in impact data).

### Copy Patterns
- Short, declarative punches for headlines
- Specific numbers for impact ("30–40% above market", "100% höhere Löhne", "₹1000")
- German and English mixed deliberately — English slogans for maximum punchiness

---

## VISUAL FOUNDATIONS

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--color-red` | `#AE0000` | Primary brand red — hero text, CTAs, protest ticker |
| `--color-violet` | `#542A76` | Radical Violet — dark section backgrounds, data |
| `--color-pink` | `#FFC5FF` | Light Pink / Rose — hero section background |
| `--color-orange` | `#FF781E` | Zetsy Orange — accent color, product labels |
| `--color-cream` | `#FFFFF5` | Off-White Cream — light bg, text on dark sections |
| `--color-lime` | `#ACFF64` | Lime Green — ticker bar, data highlight, tags |
| `--color-yellow` | `#EDF731` | Electric Yellow — accent |
| `--color-sky` | `#B7D9FF` | Sky Blue — fairness / farmer sections |

**Color vibe of imagery:** High saturation, warm-toned. Raw outdoor photography (fields, fruit). No desaturated or B&W. No studio white backgrounds.

### Typography
Two typefaces — both custom, substituted with Google Fonts in this system (see caveat).

| Role | Font | Weight | Transform |
|---|---|---|---|
| Display / H1 | **Fagies** (→ Rubik) | Regular (400) | `uppercase` |
| Headings / H2 | **Banter Grotesk** (→ DM Sans) | Semibold (700) | `uppercase` |
| Body | **Banter Grotesk** (→ DM Sans) | Regular (400) | none |
| Buttons/CTAs | **Banter Grotesk** (→ DM Sans) | Semibold (700) | `uppercase` |

**⚠️ PARTIAL SUBSTITUTION:** The brand uses **Fagies** and **Banter Grotesk**. `THICKHEA.TTF` (ThickHead) has been supplied and is loaded as the display/H1 font — a strong match for the Fagies role. **Banter Grotesk** is still substituted with DM Sans. Request the Banter Grotesk `.woff2` files from the Kaadu team and add a second `@font-face` block in `colors_and_type.css`.

### Type Scale
- H1: 72px / 80px lh (mobile: 48px / 44px lh) — Fagies Regular, ALL CAPS
- H2: 24px / 32px lh — Banter Grotesk Semibold, ALL CAPS
- Body Large: 18px / 28px lh
- Caption: 14px / 20px lh
- Button: 18px / 24px lh, ALL CAPS

### Spacing
4px base unit. Scale: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Desktop section vertical padding 64px; mobile 32px.

### Backgrounds
- **Sections alternate** between: Pink (`#FFC5FF`), Violet (`#542A76`), Cream (`#FFFFF5`), Sky (`#B7D9FF`)
- No gradients — all solid color blocks
- Full-bleed section backgrounds, edge to edge
- Ticker/marquee bars use Lime Green (`#ACFF64`) with Red text
- **No grain, no glass, no blur** in current design

### Imagery
- Raw, outdoor high-saturation photography (fields, farmers, tropical fruit)
- Product photography: flat lay / still life with bold color backgrounds
- Images sometimes get a slight tilt/rotation transform (e.g. `-9°`) for energy
- **Clipping masks / blob shapes** used on hero images (SVG wave clippers over photos)

### Animation & Motion
- No complex animation observed in Figma source
- Implied marquee/ticker scroll (repeating protest text)
- Hover states: `translateY(-2px)` lift + deeper shadow on buttons
- Press states: `translateY(0)` return

### Buttons
Two button types:
1. **Primary "blob" CTA** — irregular SVG blob shape (image asset), Fagies font, red text on cream blob. Font: Fagies 20px. Used for "JETZT KAUFEN", "JETZT PROBIEREN"
2. **Secondary pill** — `border-radius: 30px` pill, `#FFFFF5` bg, 2px black border, shadow. Banter Grotesk Semibold 18px. Used for "SHOP ÖFFNEN"

### Cards
- 2px solid black border
- `border-radius: 12px`
- Cream background (`#FFFFF5`)
- Drop shadow: `0 4px 4px rgba(0,0,0,0.25)`

### Corner Radii
- Buttons (secondary): 30px (pill)
- Cards: 12px
- Sticker elements: 16px
- Dot indicators: 50% (circle)

### Borders
- 2px solid black on interactive elements (buttons, cards)
- 4px solid violet (`#542A76`) on data chart boxes
- 8px dashed red on data chart elements (trend lines)

### Shadows
- Default: `0px 4px 4px 0px rgba(0,0,0,0.25)` — buttons, cards
- Small: `0px 2px 7.6px 0px rgba(0,0,0,0.25)` — mobile elements
- Glow: `0px 0px 35px 0px rgba(0,0,0,0.10)` — product images

### Layout
- Container max-width: 1200px, centered
- Desktop: 12-column grid, 24px gutter
- Mobile: 6-column grid, 16px gutter
- Section width in Figma source: 1444px (slightly wider than 1200px container — normalize to 1200px)

---

## ICONOGRAPHY

No dedicated icon system. The brand uses:
- **Brand stickers** (PNG) — hand-drawn style illustrations of fruit mascots, protest text, logo shapes. These act as expressive icons/decorations.
- **Kaadu logo mark** — SVG, available in multiple color variants (red, violet, orange, cream)
- **Kaadu wordmark** — text logo in multiple color variants
- **No icon font** or external icon library observed
- All sticker/mascot PNGs are in `assets/stickers/`
- Logo SVGs are in `assets/logo/`

---

## FILE INDEX

```
README.md                         ← This file
colors_and_type.css               ← All CSS vars, type scale, utility classes, buttons
SKILL.md                          ← Agent skill definition

assets/
  logo/
    Kaadu_primary_red.svg         ← Primary full logo (red)
    Kaadu_primary_red_2.svg       ← Logo variant
    Kaadu_favicon_purple.svg      ← Favicon / icon mark (violet)
  stickers/
    radically-fair-sticker.png    ← "Radically Fair" text sticker
    kaadu-logo-sticker.png        ← Logo sticker (round)
    banana-sticker.png            ← Banana fruit mascot sticker
    mango-sticker.png             ← Mango fruit mascot sticker
  photos/
    product-photo.jpg             ← Lifestyle product photo
    product-photo-2.jpg           ← Product photo 2

preview/
  colors-primary.html             ← Primary color palette
  colors-secondary.html           ← Secondary + neutral palette
  colors-semantic.html            ← Semantic color roles
  type-display.html               ← Display / H1 specimens
  type-body.html                  ← Body + caption specimens
  type-scale.html                 ← Full type scale
  spacing.html                    ← Spacing tokens
  buttons.html                    ← Button components
  cards.html                      ← Card components

ui_kits/
  website/
    README.md                     ← Website UI kit notes
    index.html                    ← Interactive website prototype
    Nav.jsx                       ← Navigation component
    Hero.jsx                      ← Hero section
    Ticker.jsx                    ← Protest text ticker
    ImpactSection.jsx             ← Fairness / impact sections
    ProductSection.jsx            ← Product showcase
    Footer.jsx                    ← Footer
```
