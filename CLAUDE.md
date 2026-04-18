# Kaadu — Shopify Theme Development Guide

## Project Overview

E-commerce site for **Kaadu**, a Swiss fair-trade freeze-dried fruit brand. Primary market language is German; secondary is English. Built on the **Shapes theme by Archetype Themes**, extended with custom sections.

- **Figma file:** `iVsw9LOw9Tqvq6hkvZMnpf` — start node `322:203`
- **Figma URL:** `https://www.figma.com/design/iVsw9LOw9Tqvq6hkvZMnpf/Wireframe?node-id=322-203`
- **Stack:** Shopify Liquid + CSS + vanilla JS. No React, no build step, no npm.
- **Base theme:** Shapes by Archetype Themes
- **Style guide authority:** `Kaadu Web Style Guide (Fixed System).docx` overrides the brand PDF on any conflict.

---

## Brand Identity

### Mission & Vision

- **Mission:** Fair trade isn't a trend — it's a revolution. Amplifying producers' voices and redirecting profits back into the communities that fuel what we do.
- **Vision:** A world where disadvantaged farmers and workers in the Global South benefit fully from the fruits of their labour.
- **Purpose:** Create real change by empowering farmers and workers of the Global South. Break the cycle of exploitation. Ensure they receive the full value of their labour.

### Brand Values

| Value | Description |
|---|---|
| **Fairness above profit** | Fair pay, workers' right to voice, fairness in all operations |
| **Transparency and integrity** | Open, honest communication; share wins and challenges equally |
| **Empowerment** | Higher wages, community investment, a seat at the table for all stakeholders |

### Brand Personality

The brand is simultaneously three archetypes:

- **The Transparent Leader** — open book, nothing hidden, leads by showing the way
- **The Empowerer** — lifts everyone it touches: farmers, workers, consumers
- **The Rebel with a Cause** — challenges the status quo, disrupts norms, takes risks for what's right

### Brand Tone

| Tone | In practice |
|---|---|
| **Radical yet approachable** | Bold and challenging, but friendly — never talks down to the audience |
| **Daring and uncompromising** | Not afraid to call out injustice in the snack industry |
| **Confident but inviting** | About empowerment and welcoming people in, not exclusion |
| **Transparent and straightforward** | Clear, direct, honest — no confusion about where the brand stands |
| **Playfully bold** | Uses humour and quirky statements; approachable for younger audiences without losing impact |

### Brand Messaging

Use these exact phrases in UI copy, hero headlines, section taglines, and CTAs. Do not invent alternatives without good reason.

**Primary (homepage hero, ad campaigns):**
- *Snack Like You Give a Damn.*
- *Justice Never Tasted So Sweet.*

**Secondary (section headlines, supporting statements):**
- *Radically Fair*
- *Taste Oriented — People Focused*
- *Shamelessly Transparent*

**Everyday marketing copy (social captions, product descriptions, emails):**
- *Get your crunch on with a snack that's changing lives.*
- *Enjoy a snack that packs a punch — with every crunch you're supporting a fairer, more just world.*

---

## Design Character

Bold, colourful, and playful — like the product. Each section carries its own vivid background colour. Mascot stickers, quirky hand-drawn illustrations, and loud typography define the brand. Nothing should feel corporate or generic. The energy is unapologetically radical, but always approachable.

---

## Existing Custom Work — Audit First

Some custom sections, CSS classes, and settings were created before this style guide was formalised. **They may not be accurate.** Before building on top of any existing custom file, verify it aligns with the standards in this guide. Fix misalignments in the same task — do not leave known inconsistencies.

### Known misalignments to resolve

| Location | Issue |
|---|---|
| `base.bundle.css` — `.custom-display-header` mobile | 52px set; style guide requires 48px |
| `base.bundle.css` — `.custom-button-text` | 20px set; style guide requires 18px desktop / 16px mobile |
| `base.bundle.css` — `.custom-body-default` mobile | 15px set; verify intended use |
| `sections/custom-image-section.liquid` | Absolute positioning with % coordinates — brittle on small screens; refactor to CSS Grid/Flexbox |
| `sections/custom-text-around-image.liquid` | Font size and colour set via inline `style=""` — move to CSS classes |
| `sections/custom-footer.liquid` | Styles in a section-scoped `<style>` block; move shared styles to `base.bundle.css` |

---

## Brand Colours

Define once in `base.bundle.css` as CSS custom properties on `:root`. Reference everywhere via `var(--color-*)`. Never hardcode hex values in Liquid or section CSS.

```css
:root {
  /* Primary */
  --color-brand-red:    #ae0000;  /* The Fiery Red */
  --color-brand-purple: #542a76;  /* Radical Violet */
  --color-brand-orange: #ff781e;  /* Zetsy Orange */
  /* Secondary / Accent */
  --color-brand-pink:   #ffc5ff;  /* Lilac Dream */
  --color-brand-lime:   #acff64;  /* Lime Green */
  --color-brand-yellow: #edf731;  /* Bright Yellow */
  --color-brand-blue:   #b7d9ff;  /* Electric Cloud */
  /* Neutrals */
  --color-offwhite:     #fffff5;  /* Off White */
  --color-ink:          #201920;  /* Primary text (near-black, per style guide) */
  --color-black:        #000000;  /* Charcoal / hard black */
  --color-gray:         #d9d9d9;  /* Dividers, disabled states */
}
```

| Token | Brand name | Hex | Role |
|---|---|---|---|
| `--color-brand-red` | The Fiery Red | `#ae0000` | Primary; CTA buttons, dominant brand accent |
| `--color-brand-purple` | Radical Violet | `#542a76` | Primary; section bg, headings |
| `--color-brand-orange` | Zetsy Orange | `#ff781e` | Primary; section bg, accent |
| `--color-brand-pink` | Lilac Dream | `#ffc5ff` | Secondary; soft accent |
| `--color-brand-lime` | Lime Green | `#acff64` | Secondary; section bg, highlights |
| `--color-brand-yellow` | Bright Yellow | `#edf731` | Secondary; section bg, accent |
| `--color-brand-blue` | Electric Cloud | `#b7d9ff` | Secondary; soft accent, tag bg |
| `--color-offwhite` | Off White | `#fffff5` | Text on dark bg, near-white fills |
| `--color-ink` | — | `#201920` | Primary body text (style guide authority) |
| `--color-black` | Charcoal | `#000000` | Hard black; used sparingly |
| `--color-gray` | — | `#d9d9d9` | Dividers, disabled |

Contrast rule: all text ≥ 4.5:1 against its background.

### Colour Pairing Rules

These rules govern which text colour to use against each background. Apply without exception.

| Background | Text colour | Notes |
|---|---|---|
| `--color-brand-purple` | `--color-offwhite` | Primary on primary |
| `--color-brand-red` | `--color-offwhite` | Primary on primary |
| `--color-brand-orange` | `--color-black` | Bright bg → black text for contrast |
| `--color-brand-lime` | `--color-black` | Neon/bright bg → black text |
| `--color-brand-yellow` | `--color-black` | Neon/bright bg → black text |
| `--color-brand-blue` | `--color-black` | Soft bg → black text |
| `--color-brand-pink` | `--color-black` | Soft bg → black text |
| `--color-offwhite` | `--color-ink` | Standard light bg |

**Rule: never pair pastel or neon backgrounds with off-white text** — it fails contrast and looks washed out.

**Rule: black text (`--color-black`) is for body copy and small text only** — do not use it for display headlines. Headlines use the scheme's foreground colour (off-white or ink) as set by the section colour scheme.

**Rule: do not pair dark colours with each other** (e.g. purple bg + near-black text — unreadable).

### Section colour scheme → text colour

The CSS classes in `base.bundle.css` must encode the correct text colour automatically:

```css
.kaadu-section--purple { background-color: var(--color-brand-purple); color: var(--color-offwhite); }
.kaadu-section--red    { background-color: var(--color-brand-red);    color: var(--color-offwhite); }
.kaadu-section--orange { background-color: var(--color-brand-orange); color: var(--color-black); }
.kaadu-section--lime   { background-color: var(--color-brand-lime);   color: var(--color-black); }
.kaadu-section--yellow { background-color: var(--color-brand-yellow); color: var(--color-black); }
.kaadu-section--blue   { background-color: var(--color-brand-blue);   color: var(--color-black); }
.kaadu-section--pink   { background-color: var(--color-brand-pink);   color: var(--color-black); }
.kaadu-section--white  { background-color: var(--color-offwhite);     color: var(--color-ink); }
```

---

## Logo

### Variants

| Variant | When to use |
|---|---|
| **Primary logo** (mascot + full wordmark) | Where full brand weight and recognition are needed — hero, OG images, email headers |
| **Secondary logo** (condensed) | Space-constrained contexts — nav bar, app icon |
| **Wordmark** (text only) | Standalone brand identifier where mascot doesn't fit |
| **Favicon** | Browser tab, bookmarks, mobile home screen — purple bg + farmer mascot |

### Clear space

Always surround the logo with clear space equal to the height of the **K** in the logo. No other text, graphics, or images may enter this zone.

### Logo misuse — never do the following

- Outline the logo
- Change the logo colours
- Distort or stretch the logo
- Place the logo at an angle
- Add drop shadows, glows, or other effects
- Reduce the logo opacity

---

## Typography

### Typefaces

| Face | Weight | CSS variable | Role |
|---|---|---|---|
| Fagies | Regular | `--font-display` | Display headlines (H1) |
| Banter Grotesk | Semibold | `--font-heading` | Subheadings, buttons, labels |
| Banter Grotesk | Regular | `--font-body` | Body text, descriptions |
| Thickhead | Regular | `--font-accent` | Accent/promo only — see rules below |

Fallbacks for Banter Grotesk and Fagies: `Helvetica, Arial, sans-serif`

**SEO rule:** Always store text in normal case in content/settings. Apply `text-transform: uppercase` via CSS class only — never write uppercase strings into Metafields or section schema settings.

### Special font — Thickhead

Thickhead is a 90s-style display font used **only for promotional and decorative contexts**: stickers, social media overlays, limited promo banners. It has limited glyphs and **does not support German characters or special symbols** — never use it for German body or heading text. It may be outlined for extra visual impact. Use sparingly so its character remains striking.

Do not use Thickhead for: navigation, product titles, body copy, form labels, or any German-language text.

### Canonical Type Classes

All typography is applied through shared classes in `base.bundle.css`. **Do not create one-off font sizes.** If a new size is genuinely needed, add it here and name it semantically.

| Class | Desktop | Mobile | Line-height (desktop/mobile) | Font | Use |
|---|---|---|---|---|---|
| `.t-display` | 72px | 48px | 80px / 44px | Fagies Regular | Hero H1 titles |
| `.t-section-headline` | 24px | 24px | 32px / 32px | Banter Grotesk Semibold | Section H2 titles |
| `.t-body-large` | 18px | 16px | 28px / 28px | Banter Grotesk Regular | Lead copy, product descriptions |
| `.t-body` | 16px | 16px | 24px / 24px | Banter Grotesk Regular | Standard body text |
| `.t-caption` | 14px | 14px | 20px / 20px | Banter Grotesk Regular | Captions, disclaimers |
| `.t-button` | 18px | 16px | 24px / 24px | Banter Grotesk Semibold | Buttons, CTAs |

`.t-display` and `.t-section-headline` always carry `text-transform: uppercase`.
`.t-button` always carries `text-transform: uppercase`.
Minimum rendered text size: **14px**.

### Mapping existing classes → canonical names

| Existing class | Canonical equivalent | Action |
|---|---|---|
| `.custom-display-header` | `.t-display` | Keep; fix mobile to 48px |
| `.custom-section-headline` | `.t-section-headline` | Keep; already correct |
| `.custom-body-xlarge` | `.t-section-headline` or `.t-body-large` depending on context | Review usages case by case |
| `.custom-body-large` | `.t-body-large` | Keep; already correct |
| `.custom-body-default` | `.t-body` | Keep |
| `.custom-button-text` | `.t-button` | Fix to 18px / 16px |

When writing new sections, use `.t-*` names. Do not add new `.custom-*` type classes.

---

## Spacing Scale

All spacing in multiples of **4px**. Use CSS custom properties — do not hardcode px values inline.

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
}
```

| Context | Desktop | Mobile |
|---|---|---|
| Tight gaps inside components | 4–12px | 4–12px |
| Card / button inner padding | 16–32px | 16–32px |
| Between sections | 48–128px | 24–64px |
| Section top/bottom padding | 64px | 32px |

Mobile vertical spacing = exactly 50% of desktop value.

---

## Layout

- **Container:** `max-width: 1200px; margin-inline: auto;`
- **Desktop grid:** 12 columns, 24px gutter
- **Mobile grid:** 6 columns, 16px gutter
- **Breakpoint:** `768px` — use `@media (max-width: 768px)` for mobile overrides

### Responsive approach

Shopify does not support separate mobile/desktop section files. Every section must be responsive within a single file using CSS media queries. Never use JS to swap layouts for screen size. Write mobile layout as the default, override at `min-width: 769px`.

```css
/* Mobile-first pattern */
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

Use CSS Grid and Flexbox for all layouts. Avoid absolute/percentage positioning for content — it breaks at unexpected viewport widths.

---

## Buttons

Use the shared `.kaadu-btn` class. Never recreate button styles inline.

```css
.kaadu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 16px 24px;
  border-radius: 12px;
  font-family: var(--font-heading);
  font-size: 18px;
  line-height: 24px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
}

.kaadu-btn--primary {
  background-color: var(--color-brand-red);
  color: var(--color-offwhite);
}

.kaadu-btn--secondary {
  background-color: transparent;
  border: 2px solid currentColor;
}

@media (max-width: 768px) {
  .kaadu-btn {
    padding: 12px 20px;
    font-size: 16px;
  }
}
```

---

## Illustrations, Mascot & Patterns

### Illustrations

Kaadu has a set of brand illustrations (farmer's hands, fruit characters, quirky scene compositions). They should feel whimsical and unconventional — not polished stock art. Use them:
- As standalone visuals in section backgrounds or beside text
- Combined into pattern compositions for banners or packaging-style sections
- Always within the brand colour palette — do not recolour them arbitrarily

### Mascot

The farmer mascot works standalone or alongside the full logo. Use it:
- As a favicon (purple bg, mascot centred)
- As a social media overlay or filter element
- Alongside brand messaging to reinforce personality without repeating the full logo
- The mascot can appear at any scale, but must always be recognisable and undistorted

Never outline, recolour, or stretch the mascot.

### Supporting graphics

Kaadu uses fun quirky shapes (blobs, starbursts, wavy lines) as supporting graphic elements in layouts. They appear behind or alongside text blocks and images. Always source these from approved brand assets — do not create ad hoc shapes that diverge from the brand set.

### Brand patterns

Four repeating tile patterns are available as brand backgrounds:

| Pattern | Use |
|---|---|
| Primary pattern | Default brand repeat background; social media, packaging |
| Pineapple pattern | Product/fruit-themed sections |
| Mango pattern | Product/fruit-themed sections |
| Banana pattern | Product/fruit-themed sections |

Patterns may be used as section backgrounds at low opacity, as borders, or as decorative accents. Always ensure overlaid text meets contrast requirements.

---

## Photography & Imagery

### Aesthetic

All photography must feel bold, high-contrast, and vibrant. Apply a filter that elevates saturation slightly so colours are richer and more dynamic. Bright tones should pop. The energy is "real, unfiltered, and full of life" — not studio-pristine.

### Setting

**Always shoot outdoors** in natural environments: fields, grasslands, open skies, lush green grass. These ground the brand in its agricultural story and create a sense of freedom and optimism.

**Never use studio photography** — controlled studio lighting, seamless backdrops, and staged styling contradict the brand's authentic, radical identity.

### Product photography

- Fun, quirky, approachable expressions
- Products shown in context (outdoor, hands holding, lifestyle)
- Consistent with the high-contrast, elevated-saturation filter

### Models / people

- Outfits: bold, playful, youthful — funky rings, oversized jackets, statement accessories, vibrant patterns
- Accessories: transparent tote bags, headphones — effortless and individual
- Feel: casual yet expressive, not formal or polished

### What to avoid

- Studio settings with artificial lighting
- Highly staged or stylised aesthetics
- Overly polished, corporate-feeling images
- White-seamless-backdrop product shots

---

## Images & Media (Technical)

### Formats

Use **WebP** as the primary format for all raster images. Provide a JPG/PNG fallback via `<picture>`. Never serve uncompressed PNGs or TIFFs.

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

Always set explicit `width` and `height` to prevent Cumulative Layout Shift (CLS).

Use `loading="eager"` only on the first visible image per page (hero). All others use `loading="lazy"`.

### Size targets

| Type | Desktop | Mobile |
|---|---|---|
| Section banners | 1200px wide, 480px tall | full width, 280px tall |
| Content images | max 720px wide | full width |
| Thumbnails / stickers / mascots | 64–256px | 64–256px |

Minimum sticker/mascot size: **48px**. Always `object-fit: contain`. Never distort aspect ratio.

---

## Shopify / Liquid Coding Standards

### File organisation

- **Sections** (`sections/`) — one file per section. Prefix new custom sections with `kaadu-` (e.g. `kaadu-hero.liquid`). Legacy files keep their `custom-` prefix.
- **Snippets** (`snippets/`) — reusable partials rendered via `{%- render -%}`. Use for any markup repeated across sections.
- **CSS** (`assets/base.bundle.css`) — all shared styles live here. Append custom styles at the bottom. Do not create separate per-section CSS files unless the section has significant standalone styles.
- **JS** — vanilla only. Use `document.addEventListener('DOMContentLoaded', ...)`. No jQuery, no frameworks.

### CSS rules

- Define all colours and spacing as CSS custom properties on `:root`. Reference via `var(--*)`.
- Use BEM-style naming for new components: `.block__element--modifier`.
- Avoid `!important` except when overriding Shapes theme defaults (comment why).
- Never set font sizes, colours, or spacing via inline `style=""`. The only exception: a dynamic value from a section setting that cannot be a class — expose it as a CSS custom property on the section element.

```liquid
{%- style -%}
  #{{ section.id }} { --section-accent: {{ section.settings.accent_color }}; }
{%- endstyle -%}
```

### Liquid rules

- Use `{%- -%}` (dash tags) to strip whitespace.
- Use `t:` translation keys for all user-facing strings in schema labels.
- Always `| escape` when outputting user-supplied text in HTML attributes.
- Use `section.index == 1` to enable `loading="eager"` and `fetchpriority="high"` on the hero image.
- Prefer `{%- render -%}` over `{%- include -%}` (include is deprecated).

### Schema settings

- Always provide sensible defaults.
- Group related settings with `header` blocks.
- Use `t:` keys for labels and info text.
- Add a `color_scheme` select to every section (see Colour Scheme Pattern above).

---

## SEO Standards

- Exactly **one `<h1>`** per page (always the hero section).
- Section titles are `<h2>`. Sub-items within a section are `<h3>`. Never skip levels.
- Text entered in settings must be in normal case — `text-transform: uppercase` is CSS-only.
- Every `<img>` must have a meaningful `alt` attribute. Decorative images use `alt=""`.
- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<time>`.
- Product pages include `application/ld+json` structured data for `Product` schema.
- Page title pattern: `{Page Name} — Kaadu`.
- Meta descriptions: 140–160 characters.

---

## Performance Standards

- Hero image: `loading="eager"`, `fetchpriority="high"`, served at correct intrinsic size.
- All below-fold images: `loading="lazy"`.
- No render-blocking JS in `<head>` — use `defer` or `async`.
- Section-specific CSS goes in a `{%- style -%}` block in the section file, not in a separately loaded file.
- Avoid `@import` inside CSS files — it blocks rendering.
- SVG icons: inline via snippets — no extra HTTP request.

---

## Accessibility Standards

- Contrast ≥ 4.5:1 for body text; ≥ 3:1 for large text (18px+ regular or 14px+ bold).
- Minimum text size: **14px**.
- All interactive elements must have a visible `:focus-visible` style.
- Tap targets ≥ **48px** height and width.
- `<a>` tags used as buttons: add `role="button"` and handle `keydown` Enter/Space.
- Use `aria-label` on icon-only buttons.
- Carousels/sliders need keyboard navigation and `aria-live` regions.

---

## UX Standards

- Use `.kaadu-btn--primary` (red) for the single most important CTA per section. Never two primary buttons in the same visual area.
- Forms must show clear error and success states.
- No horizontal scroll at any viewport ≥ 320px.
- Hover/focus transitions: max 200ms, `ease-out`. Do not animate layout properties.
- Mobile menus and drawers must trap focus and close on Escape.

---

## Page Structure (Figma — node 322:203)

Homepage sections in order:

1. **Header / Nav** — Kaadu wordmark, menu, cart
2. **Hero** — H1, tagline ("Justice Never Tasted So Sweet"), primary CTA
3. **Mission / Promise** — Brand statement, "Snack Like You Give a Damn"
4. **Founders** — "The Founders" — photo + text (orange bg)
5. **Metrics / Impact** — "Unsere Metriken" — stats and principles (lime bg)
6. **3 Principles** — Radikal Fair / Menschen Zentriert / Schamlos Transparent (purple bg)
7. **Origin Story** — "Wie Alles Begann" — long-form text + image (off-white bg)
8. **Radically Fair** — Farmer/worker pay transparency (yellow bg)
9. **Transparent Pricing** — Impact per CHF breakdown (off-white bg)
10. **Schamlos Transparent** — Accountability statement + CTA (lime bg)
11. **Product Hero** — "The Snack That Changes Lives" — product imagery
12. **Newsletter** — Email capture, "20% off first order" (purple bg)
13. **Footer**

---

## Development Workflow

1. **Check Figma first** — fetch the relevant node before writing any code.
2. **Audit before you extend** — if touching an existing custom file, verify it meets this guide. Fix misalignments in the same task.
3. **Reuse before creating** — find the closest Shapes section and customise it. Only create a new file when nothing close exists.
4. **CSS classes, not inline styles** — if you find yourself writing `style="font-size: 24px"`, stop and use or create a class instead.
5. **Test responsively** — check at 375px, 768px, and 1280px before marking done.
6. **Verify against standards** — colour contrast, font sizes, spacing, heading hierarchy, and colour pairing rules must all pass.
