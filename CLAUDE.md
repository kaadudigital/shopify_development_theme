# Kaadu — Shopify Theme Development Guide

## Project Overview

E-commerce site for **Kaadu**, a Swiss fair-trade freeze-dried fruit brand. Primary market language is **German**; secondary is **English** (used for slogans and CTAs alongside German body copy). Built on the **Shapes theme (v3.0.4) by Switch Themes**, extended with custom sections. A redesign to the new Kaadu Design System is in progress on branch `redesign` (tag `pre-redesign` marks the state before it).

- **Design system:** https://claude.ai/artifact/CnMT95HubMKA5CeChwNxBm (source of truth)
- **Page mockups (rough draft):** https://claude.ai/artifact/DeWG7XTMTAJmdxb9iXNZ82
- **Old Figma wireframe (pre-redesign):** `iVsw9LOw9Tqvq6hkvZMnpf`, node `322:203`
- **Stack:** Shopify Liquid + CSS + vanilla JS. No React, no build step, no npm.
- **Base theme:** Shapes by Switch Themes.

---

## Source of Truth

**The Kaadu Design System is the authoritative spec:** https://claude.ai/artifact/CnMT95HubMKA5CeChwNxBm. Read its `project/README.md` (brand book + "Large screens"), `project/tokens.json` and `project/components/bundle.css` + `components/<Name>/README.md` before styling anything. Read it with the Artifact tool, not WebFetch.

| Source | Authority |
|---|---|
| Kaadu Design System (link above) | Every token, size, colour, font, spacing, radius, shadow and component rule. Wins over everything below. |
| Page mockups — https://claude.ai/artifact/DeWG7XTMTAJmdxb9iXNZ82 | A **rough draft**: which sections a page has, their order and content. Never take sizes or colours from it. |
| [assets/base.bundle.css](assets/base.bundle.css) — "KAADU DESIGN SYSTEM" + "KAADU COMPONENTS" blocks | The theme's implementation of the DS. Mirror DS changes here. |
| [kaadu-design-system/](kaadu-design-system/), brand PDF, `Kaadu Web Style Guide.docx` | **Superseded** pre-redesign references. Use only for logo/sticker asset files. |

Where the DS is silent or contradicts itself, ask; if you must proceed, propose a value, mark it "proposed" in a comment, and say so.

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
- **CTAs / buttons:** ALL CAPS via CSS. Bold Banter (labels, kickers, prices, card titles) is ALL CAPS too; regular-weight body copy never is.
- **Body copy:** sentence case. Normal writing.
- **No emoji** in UI copy — brand stickers and mascots serve that role. The only symbols are ✶ ✓ ✕ ← → ★ − +.
- **Swiss High German:** ss, never ß ("Grösse"); address the reader as **du**; gender with the asterisk (Arbeiter*innen).
- **Formats:** "CHF 4.45" (space, two decimals); "20 %" (space); «guillemets» for quotes; · as metadata separator. Unknown facts go in square brackets ("[Zahl]"), never invented.
- Use specific numbers in impact copy (*"30–40% über Marktpreis"*, *"100% höhere Löhne"*).
- German and English are mixed deliberately — English slogans for maximum punch.

---

## Visual Foundations

All foundations are CSS custom properties on `:root` in the "KAADU DESIGN SYSTEM" block of [assets/base.bundle.css](assets/base.bundle.css), mirroring the DS `tokens.json`. **Never hardcode hex, font, or spacing values in Liquid or section CSS — always reference via `var(--*)`.** Token names are the DS's own (`--pink`, `--space-8`, …), unprefixed.

### Colour

| Token | Hex | Role |
|---|---|---|
| `--pink` | `#FFC6FF` | Default page ground: body, hero, comparison, quote. Ink: `--purple` (body), `--red` (headlines) |
| `--purple` | `#542A76` | Brand ink on pink/lime; ground for header, footer, drawer head; primary cloud fill. Ink on it: `--paper` or `--lime` |
| `--red` | `#AC0300` | Fagies headlines, kickers, errors, focus ring, announcement ground, secondary cloud. **Never body text** |
| `--lime` | `#AEFF64` | Accent: ticker, notices, stickers, join section. Ink on it: `--red` (headlines) / `--purple` (body) |
| `--paper` | `#FFFFF5` | Warm white: product/crunchys grounds, cards, inputs, drawer body; text on purple/red |
| `--sky` | `#B7D9FF` | People section ground. Ink: `--red` headlines, `--ink` body |
| `--ink` / `--black` | `#000000` | Body text on paper, sky, lime notices |
| `--lilac`, `--orange` | `#E9A2E6`, `#FF781E` | Product option tiles only. Orange is never text and never a section ground |
| `--logo-red` | `#AE0000` | The logo's own red — not a UI colour |

**Proposed** (named by the DS but missing from its tokens.json; values from the mockups): `--ink-muted #6B6B6B` (12px+ only), `--paper-warm #FFF9EE`, `--grey #9A9A94`, `--charcoal #3A3A3A`, `--sage #6E7A6C` (video overlay only), `--tint-cocoa/plum/ochre/umber/forest` (people-card photo tints), `--overlay-card`, `--overlay-scrim`.

**Grounds alternate by section:** pink → paper → sky → lime → purple. A page runs through at least four; **never two pink sections in a row**. Red is not a section ground (announcement bar and the CTA card only). Use `.kd-ground-{pink|paper|sky|lime|purple}` or the matching colour scheme. Never pair two light grounds (lime on paper, pink on paper), two dark inks (red on purple), or body text in red, lime or orange.

**Colour schemes** (Theme settings) are mapped to the DS grounds, so sections keep using `color_scheme` settings: `scheme1` Pink · `scheme2` Red (announcement/CTA only) · `scheme3` Purple · `scheme4`/`scheme6` Paper · `scheme5` Lime · `scheme-f3c7…` Pink hero (black kicker/lead) · `scheme-389c…` Sky. Scheme `accent_1` / `accent_1_contrast` drive the default cloud-button colours.

Legacy `--color-*` tokens and `.bg-*` / `.text-*` utilities still exist as aliases pointing at DS values. Don't use them in new code; remove them as sections migrate.

### Typography

Two faces, self-hosted in `assets/`: **Fagies** (`--font-display`, one weight, ALWAYS uppercase, never bold or synthesised) and **Banter Grotesk** (`--font-sans`; 400 for running text, bold for labels). Bold Banter (600+) is ALWAYS uppercase; regular-weight Banter never is. Fagies lives only in headlines, cloud buttons, the ticker and panel titles — **never on pills, tags, badges or stickers** (those are Banter bold).

> Banter Bold (700) / Black (900) files don't exist in the brand assets — the "600 900" face is the Semibold file, so every bold weight renders as Semibold until real files are added.

### Type classes

DS styles are implemented as `kd-`-prefixed classes (the prefix avoids collisions with Shapes classes like `.price`). **Use only these; never invent font sizes.** Display sizes step at 768 / 1200 / 1441 (see "Layout & Large Screens").

| Class | Spec (≥1200) | Use |
|---|---|---|
| `.kd-display-hero` | Fagies 76 / 0.98 | Hero h1, once per page |
| `.kd-display-crunchys` | Fagies 84 / 0.92 | The one oversized claim per page |
| `.kd-display-h2` | Fagies 64 / 0.95 | Section h2 |
| `.kd-display-h2-tight` | Fagies 56 / 0.95 | Product title, comparison headline |
| `.kd-display-quote` | Fagies 40 / 1.05 | The one pull quote |
| `.kd-display-ticker` / `-drawer` | Fagies 34 / 26 | Ticker band / panel titles |
| `.kd-lead` / `.kd-body-lg` | Banter 24/32 · 20/28, max 560px | Hero lead / section intro (mobile 18/25 · 17/24 — proposed) |
| `.kd-body` / `.kd-body-sm` | Banter 16/1.45 · 13/1.4 | Running text / notices, cart |
| `.kd-strong-lg/-/md/sm` | Banter 700, 24 · 20 · 18 · 16 | Card titles, claims, checklist rows, notice titles |
| `.kd-label` / `-lg` / `-sm` | Banter 900, 13 · 16 · 12, tracked | Kickers above every h2 (in red), group labels, pills |
| `.kd-price` / `.kd-announcement` | Banter 900 22 · 700 14 | Prices / announcement bar |

Legacy `.h1`, `.h2`, `.mega-heading` now follow the DS display steps. `.h3`, `.h4-subsection-heading`, `.body`, `.body-large`, `.caption`, `.btn-label` keep their old sizes until their sections migrate — don't use them in new code.

### Spacing

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 20px;  --space-6: 24px;  --space-7: 28px;  --space-8: 40px;
--space-9: 48px;  --space-10: 56px; --space-11: 64px; --space-12: 80px;
--space-13: 96px;
--measure: 560px; --card-w: 400px; --page-max: 1440px; --content-max: 1800px;
--gutter-sm: 20px; --gutter-md: 32px; --gutter-lg: 64px; --gutter (stepped);
```

Inside components 4–28px (`space-1`…`space-7`); between blocks 40–64px. Sections: 72–96px vertical padding (`space-12`, `space-13`); paper sections run tighter at 40px (`space-8`).

> `--space-8` and `--space-12` changed value in the redesign (32→40, 48→80). Pre-redesign uses were renamed to `--legacy-space-8` / `--legacy-space-12`; replace them as sections migrate.

### Layout & Large Screens

> **Redesign source of truth:** the Kaadu Design System (https://claude.ai/artifact/CnMT95HubMKA5CeChwNxBm) wins over the page mockups (https://claude.ai/artifact/DeWG7XTMTAJmdxb9iXNZ82), which are a rough draft — take page structure and content from the mockups, every size, colour, font and component rule from the design system.
>
> **Redesign (branch `redesign`):** layout follows the new Kaadu Design System, section "Large screens" (https://claude.ai/artifact/CnMT95HubMKA5CeChwNxBm), modelled on cobfoods.com. These rules replace the old 1200px container and 12-column grid.

- **Fluid and full width — no fixed page container.** Colour bands always run edge to edge. Only the gutter, the headline steps and a few caps change with the window.
- **Breakpoints (mobile-first, `min-width`):** `768px` (tablet; below is mobile), `992px`, `1200px` (desktop spec applies), `1441px` (above the 1440 artboard), `1800px` (very large screens). Write mobile as the default and step up with `@media (min-width: …)`.
- **Gutter (section `padding-inline`):** 20px below 768 → 32px from 768 → 64px from 1200. It never grows past 64px.
- **Headlines step at breakpoints, never fluid** (no `clamp()` / `vw` on type):

| Style | < 768 | ≥ 768 | ≥ 1200 (spec) | ≥ 1441 |
|---|---|---|---|---|
| Hero (`display-hero`) | 46 | 60 | 76 | 92 |
| Crunchys claim | 48 | 64 | 84 | 100 |
| Section H2 (`display-h2`) | 34 | 48 | 64 | 76 |
| H2 tight (product, comparison) | 28 | 40 | 56 | 64 |
| Pull quote | 28 | 32 | 40 | 48 |

  Body, label and button sizes stay at spec above 768px.
- **Images, background shapes and stickers scale with the window from 1200px up:** size them as a share of the 1440 artboard with a px cap, e.g. `width: min(calc(110 * var(--kd-px)), 140px)` where `--kd-px: calc(100vw / 1440)`. Below 1200px use fixed px. Never scale text this way. (This is the only allowed viewport-relative sizing — content layout itself stays Grid/Flexbox.)
- **Text-beside-media rows** (hero, product, image-with-text) cap at 1800px, centred inside their full-bleed band (`.kd-wide`). Carousels, tickers and colour bands are never capped.
- **Two-column layouts** stack below 768 and go side by side from 768. Product page: gallery and details 50/50, gap 20px → 48px from 1200.
- Use CSS Grid and Flexbox. **Never use absolute/percentage positioning for content** — it breaks at unexpected viewport widths. Decorative shapes/stickers are the exception (see above).
- Shopify does not support separate mobile/desktop section files. Every section must be responsive in a single file using media queries. Never swap layouts via JS.

```css
.my-section { padding-inline: 20px; }
@media (min-width: 768px)  { .my-section { padding-inline: 32px; } }
@media (min-width: 1200px) { .my-section { padding-inline: 64px; } }

.my-row { display: grid; grid-template-columns: 1fr; gap: var(--space-5); }
@media (min-width: 768px)  { .my-row { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1800px) { .my-row { max-width: 1800px; margin-inline: auto; } }
```

### Shape, radii & shadows

- **Surfaces are square** (`--radius-0`): cards, notices, option buttons, images, the drawer. Rounded only: the 300×534 product tiles (`--radius-tile` 36px) and pill-shaped things (`--radius-pill`): inputs, tags, badges, steppers, the round close button.
- **No borders** except the 1px `--purple` outline on inputs and the 2px ring of the radio dot. Depth comes from one shadow, `--shadow-card`, on every raised thing. Also `--shadow-drawer`, `--shadow-tile-active`, `--shadow-product`.
- **Brand shapes:** the **cloud** (behind every CTA) and the **scallop edge** (40px strip of 72px half-circles where paper meets a coloured section; purple header/footer edges stay straight).
- **Focus:** 4px solid `--red` outline, 3px offset, on every button, link and input (set globally).
- **Motion:** two loops only — the ticker (22s) and the spinning sticker badge (20s) — both stop under `prefers-reduced-motion`. No scroll animations; no hover transitions beyond a 1px press on cloud buttons.

---

## Components

DS component classes live in the "KAADU DESIGN SYSTEM" / "KAADU COMPONENTS" blocks of [base.bundle.css](assets/base.bundle.css). Each DS component README says what the markup must provide.

### Buttons — the cloud

Every CTA is a **cloud button**: a scalloped SVG cloud behind a Fagies label. **Buttons are never pills.** Render with the snippet — never hand-build one:

```liquid
{%- render 'kd-button', label: section.settings.button_label, url: section.settings.button_link, variant: 'red', size: 'md' -%}
```

- Variants: `primary` (purple / lime label), `red` (red / paper), `lime` (lime / red), `paper` (paper / red), `outline` (40px, Banter 12px, for "Details ↻" on photo cards). No variant = follows the section colour scheme's accent 1.
- Sizes: default 60px/20px · `lg` 64/22 · `md` 56/18 · `sm` 52/16. `full: true` stretches it.
- The cloud shape is `#kd-cloud` (`snippets/kd-cloud-defs.liquid`, rendered once in `layout/theme.liquid`).
- One cloud button per block; verb first, two to three words. Never two same-colour clouds side by side, never a lime cloud on a lime ground.
- Legacy `.btn-primary` / `.btn-secondary` render as masked clouds without shadow (`assets/kd-cloud.svg`) until their sections switch to the snippet.

### Text links

Every linked text starts with **✶** and is underlined on hover only: `.kd-link`. Buttons never get the star.

### Cards

Square, `--paper`, `--shadow-card`, no border (`.card`, DS `.kd-card` for the 400×600 people cards).

### Ticker

Lime band, red Fagies 34px, ✶ separators, `translateX(0 → -50%)` over 22s, `aria-hidden`, stops under reduced motion (DS Ticker).

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

> **Redesign decision (2026-10-10):** the theme's existing sticker and background-shape systems are **kept** through the redesign — `snippets/block-sticker.liquid`, `snippets/block-background-shape.liquid`, `snippets/block-background-pattern.liquid`, `snippets/collection-shape-defs.liquid` and the `website_shape_*` shape options in section schemas. Restyle around them; do not remove or replace them with the new design system's `kd-tag--sticker`. On large screens they scale per "Layout & Large Screens".

### Iconography

There is **no icon set** — don't add one. Glyphs are typed in the running font: ✶ (links, ticker), ✓ / ✕ (checklists), ← → (hints), ★ (ratings), − / + (steppers). The only drawn graphics are the brand's own illustrations, stickers and shapes.

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

- Contrast ≥ **4.5:1** for body text; ≥ **3:1** for large text (24px+) and focus rings/icons. Use only the DS ground/ink pairs (see Colour) — they all pass.
- Minimum text size: **12px** (DS `label-sm`); the 10px option-button badge is the only exception. `--ink-muted` text is 12px+ only.
- All interactive elements must have a visible `:focus-visible` style.
- Tap targets ≥ **48px** in both dimensions.
- `<a>` tags used as buttons: add `role="button"` and handle `keydown` Enter/Space.
- `aria-label` on icon-only buttons.
- Carousels / sliders need keyboard navigation and `aria-live` regions.

---

## UX Standards

- One cloud button per block. Never two same-colour clouds in the same visual area.
- Forms must show clear error and success states.
- No horizontal scroll at any viewport ≥ 320px.
- No hover transitions beyond the 1px press on cloud buttons; no scroll animations. Do not animate layout properties.
- Mobile menus and drawers must trap focus and close on Escape.

---

## Page Structure (redesign)

Page structure and content come from the mockups (rough draft — sizes/colours from the DS): landing page (desktop + mobile), product page, cart drawer, Our Promise, Shamelessly Transparent, People Centred, Radically Fair, Manifesto, News (Shopify blog). Landing page order: announcement → header → hero → ticker → video problem → crunchys → Wer profitiert (people cards) → product → videos → "besser" stats → vision → comparison slider → cost split → quote → final CTA → join → footer.

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

These pre-redesign classes are themselves legacy now — see "Type classes" for the `kd-` replacements.

---

## Development Workflow

1. **Read the design system first** — its README and the component README for what you're building (Artifact tool `read_file` on the DS link). Check the mockup only for the section's structure and content.
2. **Work on `redesign`** — never commit redesign work to `main` (it's the GitHub-connected live theme).
3. **Reuse before creating** — find the closest Shapes section and customise it. Only create a new file when nothing close exists.
4. **Tokens & canonical classes only** — if you find yourself writing `style="font-size: 24px"` or `#ae0000`, stop and use the right class or `var(--*)` instead.
5. **Test responsively** — check at 390, 768, 1200, 1440, 1920 and 2560px before marking done.
6. **Verify against standards** — DS ground/ink pairs, type classes, spacing tokens, heading hierarchy, cloud buttons (no pills) and the ✶ link rule must all pass.
