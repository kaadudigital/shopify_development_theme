# Kaadu — Shopify Theme Development Guide

## Project Overview

E-commerce site for **Kaadu**, a Swiss fair-trade freeze-dried fruit brand. Primary market language is **German**; secondary is **English** (used for slogans and CTAs alongside German body copy). Built on the **Shapes theme by Archetype Themes**, extended with custom sections.

- **Figma file:** `iVsw9LOw9Tqvq6hkvZMnpf` — start node `322:203`
- **Figma URL:** `https://www.figma.com/design/iVsw9LOw9Tqvq6hkvZMnpf/Wireframe?node-id=322-203`
- **Stack:** Shopify Liquid + CSS + vanilla JS. No React, no build step, no npm.
- **Base theme:** Shapes by Archetype Themes.

---

## Source of Truth

The design system lives in [kaadu-design-system/](kaadu-design-system/). Treat it as the authoritative spec.

| File | Authority |
|---|---|
| [kaadu-design-system/project/colors_and_type.css](kaadu-design-system/project/colors_and_type.css) | All tokens, type scale, button + card components |
| [kaadu-design-system/project/README.md](kaadu-design-system/project/README.md) | Tone, copy patterns, imagery direction, casing rules |
| [kaadu-design-system/project/preview/](kaadu-design-system/project/preview/) | Static specimens for colours, type, spacing, buttons, cards |
| [kaadu-design-system/project/ui_kits/website/](kaadu-design-system/project/ui_kits/website/) | High-fidelity JSX prototypes — match these visually, not structurally |
| [kaadu-design-system/project/assets/](kaadu-design-system/project/assets/) | Logos (SVG), stickers (PNG), photos, blob button PNGs |

The brand PDF and `Kaadu Web Style Guide.docx` are historical references — when they conflict with the design system files above, the design system wins.

---

## Brand Identity

### Mission
Fair trade isn't a trend — it's a revolution. Amplifying producers' voices and redirecting profits back into the communities that fuel what we do.

### Vision
A world where disadvantaged farmers and workers in the Global South benefit fully from the fruits of their labour.

### Values

| Value | In practice |
|---|---|
| **Fairness above profit** | Fair pay, workers' right to voice, fairness in all operations |
| **Transparency and integrity** | Open, honest communication; share wins and challenges equally |
| **Empowerment** | Higher wages, community investment, a seat at the table for all stakeholders |

### Personality
Three archetypes simultaneously:
- **The Transparent Leader** — open book, leads by showing the way
- **The Empowerer** — lifts everyone it touches: farmers, workers, consumers
- **The Rebel with a Cause** — challenges the status quo, disrupts norms, takes risks for what's right

### Tone of Voice
- **Bold and unapologetic.** No hedging, no corporate softness.
- **Playfully radical.** Serious about justice, never self-righteous.
- **Speaks directly** to the reader — "du/ihr" energy in German, no passive voice.
- **Calls out injustice by name.** Brands itself as the rebel, not the charity.
- **Radically transparent, daringly approachable.** Confidently inviting, never exclusive.

### Approved Copy Phrases
Use these verbatim in UI copy, headlines, and CTAs. Do not invent alternatives without a reason.

**Primary taglines (hero, ad campaigns):**
- *Snack Like You Give a Damn.*
- *Justice Never Tasted So Sweet.*

**Section headlines / supporting:**
- *Radically Fair* — German: *Radikal Fair*
- *Taste Oriented — People Focused*
- *Shamelessly Transparent* — German: *Schamlos Transparent*
- *Fairness für Kleinbauern*
- *Starke Jobs für lokale Frauen*

**Protest ticker (marquee):**
- *ITS NOT FAIR! ITS NOT FAIR! ITS NOT FAIR!*

**Product / lifestyle:**
- *100 % Frucht. 0 % Ausbeutung.*
- *Gefriergetrocknete Früchte — fair produziert, in der Ursprungsgemeinde verarbeitet, radikal transparent.*
- *Get your crunch on with a snack that's changing lives.*

### Casing & Copy Rules
- **Display headlines (H1):** ALL CAPS via `text-transform: uppercase`. Enter in normal case in CMS for SEO.
- **Section headlines (H2):** ALL CAPS via CSS.
- **CTAs / buttons:** ALL CAPS via CSS.
- **Body copy:** sentence case. Normal writing.
- **No emoji** in body copy or headings — brand stickers and mascots serve that role.
- Use specific numbers in impact copy (*"30–40% über Marktpreis"*, *"100% höhere Löhne"*).
- German and English are mixed deliberately — English slogans for maximum punch.

---

## Visual Foundations

All foundations are defined as CSS custom properties on `:root` in [assets/base.bundle.css](assets/base.bundle.css), mirroring [kaadu-design-system/project/colors_and_type.css](kaadu-design-system/project/colors_and_type.css). **Never hardcode hex, font, or spacing values in Liquid or section CSS — always reference via `var(--*)`.**

### Colour Tokens

| Token | Hex | Role |
|---|---|---|
| `--color-red` | `#AE0000` | Primary brand red — hero text, CTAs, protest ticker |
| `--color-violet` | `#542A76` | Radical Violet — dark section backgrounds, headings |
| `--color-pink` | `#FFC5FF` | Light Pink — hero section background, soft accents |
| `--color-orange` | `#FF781E` | Zetsy Orange — accent, product labels |
| `--color-cream` | `#FFFFF5` | Off-White Cream — light section bg, text on dark sections |
| `--color-lime` | `#ACFF64` | Lime Green — ticker bar bg, data highlights, tags |
| `--color-yellow` | `#EDF731` | Electric Yellow — accent, highlights |
| `--color-sky` | `#B7D9FF` | Sky Blue — fairness / farmer section backgrounds |
| `--color-black` | `#000000` | Hard black — borders, body text |
| `--color-near-black` | `#221F1F` | Primary body text on light backgrounds |
| `--color-dark-brown` | `#422A24` | Deep accent tone |
| `--color-mid-grey` | `#8C8C8C` | Disabled states, muted text |
| `--color-light-grey` | `#E6E6E6` | Dividers, hover surfaces |

### Section Background Utilities

Sections alternate between **Pink, Violet, Cream, Sky** (with Lime, Red, Yellow, Orange used for accent strips/tickers). Apply via utility classes on the section root:

```css
.bg-pink   /* #FFC5FF + black text     */
.bg-violet /* #542A76 + cream text     */
.bg-cream  /* #FFFFF5 + near-black text */
.bg-sky    /* #B7D9FF + black text     */
.bg-lime   /* #ACFF64 + black text     */
.bg-red    /* #AE0000 + cream text     */
.bg-yellow /* #EDF731 + black text     */
.bg-orange /* #FF781E + black text     */
```

Each utility sets both `background-color` and a contrast-safe `color`. Don't pair pastel/neon backgrounds with cream text — it fails contrast.

### Typography

| Role | Font | Weight | Transform |
|---|---|---|---|
| Display / H1 | Fagies | Regular (400) | uppercase |
| Headings / H2 | Banter Grotesk | Semibold (700) | uppercase |
| Body | Banter Grotesk | Regular (400) | none |
| Buttons / CTAs | Banter Grotesk | Semibold (700) | uppercase |

Fonts live in [assets/](assets/) (`Fagies.ttf`, `BanterGrotesk-Regular.woff2`, `THICKHEA.TTF` as a Fagies fallback) and are loaded via `@font-face` in [base.bundle.css](assets/base.bundle.css). System fallback: `Helvetica, Arial, sans-serif`.

### Canonical Type Classes

Apply typography through these classes only. **Do not invent one-off font sizes.** If a new size is genuinely needed, add it in [base.bundle.css](assets/base.bundle.css) and name it semantically.

| Class | Desktop | Mobile | Line-height (D/M) | Font | Use |
|---|---|---|---|---|---|
| `.h1` | 72px | 48px | 80px / 44px | Fagies Regular | Hero / page H1 |
| `.h2` | 24px | 24px | 32px / 32px | Banter Grotesk Semibold | Section H2 |
| `.body-large` | 18px | 16px | 28px / 24px | Banter Grotesk Regular | Lead copy, product descriptions |
| `.body` | 18px | 16px | 28px / 24px | Banter Grotesk Regular | Standard body text |
| `.caption` | 14px | 14px | 20px / 20px | Banter Grotesk Regular | Captions, disclaimers, labels |
| `.btn-label` | 18px | 16px | 24px / 24px | Banter Grotesk Semibold | Inline button/label typography |

`.h1`, `.h2`, and `.btn-label` carry `text-transform: uppercase` automatically. These are class selectors only — they do not auto-apply to raw `<h1>`/`<h2>` elements, so always opt in explicitly: `<div class="h1">…</div>` or `<h1 class="h1">…</h1>`.

Minimum rendered text size: **14px**.

### Spacing Tokens

All spacing in multiples of **4px**. Reference tokens — do not hardcode px values inline.

```css
--space-0:  0px;   --space-1:  4px;   --space-2:  8px;
--space-3:  12px;  --space-4:  16px;  --space-6:  24px;
--space-8:  32px;  --space-12: 48px;  --space-16: 64px;
--space-24: 96px;  --space-32: 128px;
```

| Context | Desktop | Mobile |
|---|---|---|
| Tight gaps inside components | 4–12px | 4–12px |
| Card / button inner padding | 16–32px | 16–32px |
| Between sections | 48–128px | 24–64px |
| Section top/bottom padding | `var(--section-padding-v)` = 64px | 32px |

Mobile vertical spacing ≈ 50% of desktop.

### Layout

- **Container:** `max-width: var(--container-max)` (1200px); `margin-inline: auto`.
- **Desktop grid:** 12 columns, 24px gutter.
- **Mobile grid:** 6 columns, 16px gutter.
- **Breakpoint:** `768px`. Mobile-first — write the mobile layout as default, override with `@media (min-width: 769px)`.
- Use CSS Grid and Flexbox. **Never use absolute/percentage positioning for content** — it breaks at unexpected viewport widths.
- Shopify does not support separate mobile/desktop section files. Every section must be responsive in a single file using media queries. Never swap layouts via JS.

```css
.my-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 769px) {
  .my-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-6);
  }
}
```

### Radii & Shadows

```css
--radius-btn:     30px;   /* pill buttons */
--radius-card:    12px;   /* cards */
--radius-sticker: 16px;   /* sticker/badge elements */

--shadow-sm:   0px 2px 7.6px 0px rgba(0,0,0,0.25);
--shadow-md:   0px 4px 4px 0px rgba(0,0,0,0.25);
--shadow-glow: 0px 0px 35px 0px rgba(0,0,0,0.10);
```

Dot indicators use `border-radius: 50%`. Data chart accents use `4px solid var(--color-violet)` borders or `8px dashed var(--color-red)` trend lines.

---

## Components

### Buttons

Two button types. Use the shared classes — never recreate button styles inline.

**Primary "blob" CTA** — `.btn-primary`. Fagies font, cream background, red text, 2px black border, pill radius, drop shadow. Used for "JETZT KAUFEN", "JETZT PROBIEREN", primary single-action CTAs.

**Secondary pill** — `.btn-secondary`. Banter Grotesk Semibold, cream background, 2px black border, pill radius, drop shadow. Black text. Used for "SHOP ÖFFNEN" and secondary actions.

**Inverse secondary** — add `.btn-secondary-inverse` modifier on dark section backgrounds: transparent fill, cream border + cream text.

Hover: `translateY(-2px)` + deeper shadow. Press: returns to `translateY(0)`. Transitions ≤ 200ms `ease-out`.

The DS also ships SVG blob PNGs at [kaadu-design-system/project/assets/buttons/](kaadu-design-system/project/assets/buttons/) (`btn-blob-1.png` … `btn-blob-4.png`) for when a truly irregular blob shape is needed; prefer `.btn-primary` (CSS-only) unless the design specifically calls for the PNG.

One primary CTA per visual area — never two primary buttons side by side.

### Cards

`.card` — cream background, 2px solid black border, `--radius-card`, `--shadow-md`, `--space-8` padding.

### Tickers / Marquees

A defining brand element: scrolling protest text along a Lime Green strip with red Fagies type, top/bottom 2px black borders, ~56px tall. See [kaadu-design-system/project/ui_kits/website/Ticker.jsx](kaadu-design-system/project/ui_kits/website/Ticker.jsx) for the implementation pattern (CSS `@keyframes` translateX, no JS).

### Logos

In [kaadu-design-system/project/assets/logo/](kaadu-design-system/project/assets/logo/):

| File | When to use |
|---|---|
| `Kaadu_primary_red.svg` | Primary full logo (mascot + wordmark) — hero, OG images, email headers |
| `Kaadu_primary_red_2.svg` | Variant of primary, alternate composition |
| `Kaadu_wordmark_red.svg` | Wordmark only — space-constrained contexts |
| `Kaadu_favicon_purple.svg` | Favicon / icon mark — browser tab, bookmarks, mobile home screen |

**Clear space:** always surround the logo with space ≥ the height of the "K" in the logo. No other text, graphics, or images may enter this zone.

**Never:** outline, recolour, distort, rotate, drop-shadow, or reduce-opacity the logo.

### Stickers & Mascots

In [kaadu-design-system/project/assets/stickers/](kaadu-design-system/project/assets/stickers/):

| File | Role |
|---|---|
| `radically-fair-sticker.png` | "Radically Fair" hand-drawn text sticker |
| `kaadu-logo-sticker.png` | Round logo sticker variant |
| `banana-sticker.png` | Banana fruit mascot |
| `mango-sticker.png` | Mango fruit mascot |

Stickers are the brand's expressive accent — apply slight rotation transforms (`-8°` to `-15°`) for energy. Minimum size: 48px. Always `object-fit: contain`. Never distort the aspect ratio. Never outline, recolour, or stretch the mascot.

### Iconography

There is no dedicated icon font or icon library. The brand uses stickers, the mascot, and inline SVG snippets for any UI iconography.

---

## Imagery & Photography

### Aesthetic
- High-saturation, warm-toned, outdoor.
- Slightly elevated saturation filter — colours should pop.
- Fields, grasslands, open skies, lush green grass — ground the brand in its agricultural story.

### Never
- Studio settings, artificial lighting, seamless backdrops.
- Polished corporate aesthetics, white-cyc product shots.
- Desaturated or B&W treatments.

### Product photography
- Fun, quirky, approachable expressions.
- Products in context — outdoor, in hands, lifestyle.
- Slight tilt rotations (e.g. `-9°`) for energy.
- SVG clipping masks / blob shapes over hero product images are an established brand technique — see [Hero.jsx](kaadu-design-system/project/ui_kits/website/Hero.jsx).

### Models
- Bold, playful, youthful outfits — funky rings, oversized jackets, statement accessories, vibrant patterns.
- Casual yet expressive, never formal or polished.

### Technical
- **Format:** WebP primary, JPG/PNG fallback via `<picture>`. Never serve uncompressed PNGs or TIFFs.
- Always set explicit `width` and `height` to prevent CLS.
- `loading="eager"` only on the first visible image per page (hero, `section.index == 1`). All others `loading="lazy"`.
- Use `fetchpriority="high"` on the hero image.

```liquid
<picture>
  <source srcset="{{ image | image_url: width: 1200, format: 'webp' }}" type="image/webp">
  <img
    src="{{ image | image_url: width: 1200 }}"
    alt="{{ image.alt | escape }}"
    width="{{ image.width }}"
    height="{{ image.height }}"
    loading="lazy"
  >
</picture>
```

### Size targets

| Type | Desktop | Mobile |
|---|---|---|
| Section banners | 1200px × 480px | full width × 280px |
| Content images | max 720px wide | full width |
| Thumbnails / stickers / mascots | 64–256px | 64–256px |

---

## Shopify / Liquid Coding Standards

### File organisation
- **Sections** ([sections/](sections/)) — one file per section. Prefix new custom sections with `kaadu-` (e.g. `kaadu-hero.liquid`). Legacy `custom-` files keep their prefix.
- **Snippets** ([snippets/](snippets/)) — reusable partials rendered via `{%- render -%}`. Use for any markup repeated across sections.
- **CSS** ([assets/base.bundle.css](assets/base.bundle.css)) — all shared styles live here. Append new custom styles at the bottom. Do not create separate per-section CSS files unless the section has significant standalone styles.
- **JS** — vanilla only. Use `document.addEventListener('DOMContentLoaded', …)`. No jQuery, no frameworks.

### CSS rules
- All colours, spacing, radii, shadows, and font families come from CSS custom properties on `:root` (defined in [base.bundle.css](assets/base.bundle.css)). Reference via `var(--*)`.
- Use BEM-style naming for new components: `.block__element--modifier`.
- Avoid `!important` except when overriding Shapes theme defaults — leave a comment explaining why.
- **Never set font sizes, colours, or spacing via inline `style=""`.** The only exception: a dynamic value from a section setting that can't be a class — expose it as a CSS custom property on the section element.

```liquid
{%- style -%}
  #{{ section.id }} { --section-accent: {{ section.settings.accent_color }}; }
{%- endstyle -%}
```

### Liquid rules
- Use `{%- -%}` (dash tags) to strip whitespace.
- Use `t:` translation keys for all user-facing strings in schema labels.
- Always `| escape` user-supplied text in HTML attributes.
- Use `section.index == 1` to enable `loading="eager"` and `fetchpriority="high"` on the hero image.
- Prefer `{%- render -%}` over `{%- include -%}` (include is deprecated).

### Schema settings
- Always provide sensible defaults.
- Group related settings with `header` blocks.
- Use `t:` keys for labels and info text.
- Add a `color_scheme` select to every section.

---

## SEO Standards

- Exactly **one `<h1>`** per page — always the hero section.
- Section titles are `<h2>`, sub-items `<h3>`. Never skip levels.
- Text entered in settings/Metafields is **normal case** — `text-transform: uppercase` is CSS-only.
- Every `<img>` has a meaningful `alt`. Decorative images use `alt=""`.
- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<time>`.
- Product pages include `application/ld+json` structured data (`Product` schema).
- Page title pattern: `{Page Name} — Kaadu`.
- Meta descriptions: 140–160 characters.

---

## Performance Standards

- Hero image: `loading="eager"`, `fetchpriority="high"`, served at the correct intrinsic size.
- All below-fold images: `loading="lazy"`.
- No render-blocking JS in `<head>` — use `defer` or `async`.
- Section-specific CSS lives in a `{%- style -%}` block in the section file, not in a separately loaded file.
- Avoid `@import` inside CSS files — it blocks rendering.
- SVG icons: inline via snippets — no extra HTTP request.

---

## Accessibility Standards

- Contrast ≥ **4.5:1** for body text; ≥ **3:1** for large text (18px+ regular, 14px+ bold). The `.bg-*` utilities already pair safe text colours.
- Minimum text size: **14px**.
- All interactive elements must have a visible `:focus-visible` style.
- Tap targets ≥ **48px** in both dimensions.
- `<a>` tags used as buttons: add `role="button"` and handle `keydown` Enter/Space.
- `aria-label` on icon-only buttons.
- Carousels / sliders need keyboard navigation and `aria-live` regions.

---

## UX Standards

- One `.btn-primary` per section. Never two primaries in the same visual area.
- Forms must show clear error and success states.
- No horizontal scroll at any viewport ≥ 320px.
- Hover/focus transitions ≤ 200ms `ease-out`. Do not animate layout properties.
- Mobile menus and drawers must trap focus and close on Escape.

---

## Homepage Section Order (Figma — node 322:203)

1. **Header / Nav** — Kaadu wordmark, menu, cart
2. **Hero** — H1 "Snack Like You Give a Damn." / "Justice Never Tasted So Sweet", primary CTA (pink bg)
3. **Protest Ticker** — "ITS NOT FAIR!" marquee (lime bg, red text)
4. **Mission / Promise** — brand statement
5. **Founders** — "The Founders" (orange bg)
6. **Metrics / Impact** — "Unsere Metriken" (lime bg)
7. **3 Principles** — Radikal Fair / Menschen Zentriert / Schamlos Transparent (violet bg)
8. **Origin Story** — "Wie Alles Begann" (cream bg)
9. **Fairness für Kleinbauern** — farmer pay transparency (sky bg)
10. **Transparent Pricing** — impact per CHF breakdown (cream bg)
11. **Starke Jobs für lokale Frauen** — women's employment (violet bg)
12. **Product Hero** — "The Snack That Changes Lives"
13. **Newsletter** — email capture, "20% off first order" (violet bg)
14. **Footer**

---

## Migration Notes — Legacy `.custom-*` classes

Legacy classes have been removed from [base.bundle.css](assets/base.bundle.css) and all `.liquid` / `.json` references migrated. If you are reading old commits or branches, the mapping is:

| Old class | New class | Visual difference |
|---|---|---|
| `custom-display-header` | `h1` | — (sizes match) |
| `custom-section-headline` | `h2` | Desktop dropped 32px → 24px (per DS spec) |
| `custom-body-xlarge` | `h2` | Folded into h2 (24px) |
| `custom-body-large` | `body-large` | — (sizes match) |
| `custom-body-default` | `body` | Desktop bumped 16px → 18px (per DS spec) |
| `custom-button-text` | `btn-label` | — |
| `custom-image-button-text` | `btn-label` | Use `btn-primary` if you also need the blob surface |
| `custom-btn__surface` | `btn-secondary` | — |

When editing a section that still feels off after migration, verify the layout against the matching prototype in [kaadu-design-system/project/ui_kits/website/](kaadu-design-system/project/ui_kits/website/).

---

## Development Workflow

1. **Check Figma first** — fetch the relevant node before writing any code.
2. **Read the design system** — for new components, open the matching specimen in [kaadu-design-system/project/preview/](kaadu-design-system/project/preview/) and the prototype in [kaadu-design-system/project/ui_kits/website/](kaadu-design-system/project/ui_kits/website/) before coding.
3. **Reuse before creating** — find the closest Shapes section and customise it. Only create a new file when nothing close exists.
4. **Tokens & canonical classes only** — if you find yourself writing `style="font-size: 24px"` or `#ae0000`, stop and use the right class or `var(--*)` instead.
5. **Test responsively** — check at 375px, 768px, and 1280px before marking done.
6. **Verify against standards** — colour contrast, font sizes, spacing, heading hierarchy, and `.bg-*` text pairing must all pass.
