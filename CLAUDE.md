# Kaadu — Shopify Theme Development Guide

## Project

E-commerce site for **Kaadu**, a Swiss fair-trade freeze-dried pineapple brand. German first (Swiss High German), English for slogans. Built on the **Shapes theme (v3.0.4) by Switch Themes**, heavily customised.

- **Stack:** Shopify Liquid + CSS + vanilla JS. No React, no build step, no npm. No Shopify CLI installed locally — preview by pushing the branch to its GitHub-connected Shopify theme.
- **Branches:** `main` is GitHub-connected to the store and receives "Update from Shopify" commits from the theme editor. The redesign happens on **`redesign`** (tag `pre-redesign` = state before it). Never commit redesign work to `main`.

---

## Source of truth

| Source | Authority |
|---|---|
| **Kaadu Design System** — https://claude.ai/artifact/CnMT95HubMKA5CeChwNxBm | Every token, size, colour, font, spacing, radius, shadow, component, voice and imagery rule. Wins over everything else. |
| **Page mockups** — https://claude.ai/artifact/DeWG7XTMTAJmdxb9iXNZ82 | A **rough draft**: which sections a page has, their order and content. Never take sizes, colours or fonts from it. |
| [assets/base.bundle.css](assets/base.bundle.css) — "KAADU DESIGN SYSTEM" + "KAADU COMPONENTS" blocks | The theme's implementation of the DS. When the DS changes, mirror it here. |
| Old `kaadu-design-system/` folder, brand PDF, Typography & Spacing Docs, `Kaadu Web Style Guide.docx` | **Removed** (superseded). Recover original logo/sticker files from git: `git show pre-redesign:kaadu-design-system/project/assets/...` or `git checkout pre-redesign -- kaadu-design-system`. |

Read the DS with the Artifact tool (`read_file` on `project/README.md`, `project/tokens.json`, `project/components/bundle.css`, `project/components/<Name>/README.md`), not WebFetch. Its README covers voice, colour pairs, typography, layout/large screens, shapes, motion and imagery — this file does not repeat them.

Where the DS is silent or contradicts itself, ask. If you must proceed, propose a value, mark it "proposed" in a code comment, and say so.

---

## Decisions (redesign, 2026-10)

- **Redesign in place**, not a fresh Shapes copy — ~90 stock files carry custom work.
- **Large screens follow cobfoods.com** (written into the DS "Large screens" section): fluid full width, no page container.
- **Existing stickers and background shapes are kept**: `snippets/block-sticker.liquid`, `block-background-shape.liquid`, `block-background-pattern.liquid`, `block-shape-divider.liquid`, `collection-shape-defs.liquid`, `shape-defs.liquid`, `static-sticker*.liquid` and the `website_shape_*` options in section schemas. Restyle around them; don't replace them with the DS `kd-tag--sticker`.
- **Banter Grotesk: Regular 400 and Semibold 600 only.** Every "bold" is 600; never set 700/900 (the browser would synthesise it).
- **The MENU overlay** in `hero-logo-with-menu` stays as it is for now (polish later).
- **Frontend first:** subscriptions (selling plans / app) and shipping rules are **not set up in Shopify yet**. Build the configurator, Abo upsell and free-shipping UI against settings/placeholder data; wire the backend after.

---

## Approved copy

Voice and copy rules (du, ss not ß, CHF 4.45, «guillemets», ✶ links, no emoji, [placeholders] for unknown facts) are in the DS README. Approved brand lines — use verbatim, don't invent alternatives:

- Taglines: *Snack Like You Give a Damn.* · *Justice Never Tasted So Sweet.*
- Pillars: *Radically Fair* / *Radikal Fair* · *People Centred* · *Shamelessly Transparent* / *Schamlos Transparent* · *Taste Oriented — People Focused*
- Supporting: *Fairness für Kleinbauern* · *Starke Jobs für lokale Frauen* · *100 % Frucht. 0 % Ausbeutung.* · *Get your crunch on with a snack that's changing lives.*
- Ticker: *It's not fair!*

---

## How the DS is implemented in this theme

**Tokens** — DS names, unprefixed, on `:root` in `base.bundle.css` (`--pink`, `--red`, `--space-8`, `--gutter`, `--shadow-card`, …). **Never hardcode hex, font or spacing values** in Liquid or section CSS. Colours the DS used but never defined were added as **proposed** tokens (`--ink-muted`, `--paper-warm`, `--grey`, `--charcoal`, `--sage`, `--logo-red`, `--tint-*`, `--overlay-*`), in both the theme and the DS.

**Spacing gotcha** — the DS `--space-8` is 40px and `--space-12` is 80px; the pre-redesign values (32/48px) were renamed to `--legacy-space-8` / `--legacy-space-12`. Replace those as sections migrate.

**Type classes** — DS text styles are `kd-`-prefixed classes (the prefix avoids Shapes collisions like `.price`, `.label`): `.kd-display-hero`, `.kd-display-h2`, `.kd-display-h2-tight`, `.kd-display-crunchys`, `.kd-display-quote`, `.kd-lead`, `.kd-body`, `.kd-strong*`, `.kd-label*`, `.kd-price`, … Display sizes already step at 768 / 1200 / 1441. **Never invent font sizes.** `.kd-lead`/`.kd-body-lg` mobile sizes (18/25, 17/24) are proposed — the DS gives none.

**Colour schemes** (Theme settings) are mapped to DS grounds, so sections keep their `color_scheme` setting: `scheme1` Pink · `scheme2` Red (announcement / CTA card only) · `scheme3` Purple · `scheme4`, `scheme6` Paper · `scheme5` Lime · `scheme-f3c7…` Pink hero (black kicker/lead) · `scheme-389c…` Sky. `accent_1` / `accent_1_contrast` are the default cloud-button colours. Plain DS grounds are also available as `.kd-ground-{pink|paper|sky|lime|purple}`.

**Layout helpers** — `.kd-section` (full-bleed band with the stepped gutter 20/32/64), `.kd-wide` (caps text-beside-media rows at 1800px), `--kd-px` (1px of the 1440 artboard, for scaling decorations only — never type).

**Cloud button** — every CTA. Never hand-build one, never a pill:

```liquid
{%- render 'kd-button', label: section.settings.button_label, url: section.settings.button_link, variant: 'red', size: 'md' -%}
```

Variants `primary` · `red` · `lime` · `paper` · `outline`; sizes default (60px) · `lg` · `md` · `sm`; `full: true`. No variant = follows the colour scheme. The shape is `#kd-cloud` from `snippets/kd-cloud-defs.liquid` (rendered once in `layout/theme.liquid`).

**Text links** — `.kd-link` adds the ✶ and hover-only underline. Buttons never get the star.

**Legacy (don't use in new code; remove as sections migrate)** — `--color-*` tokens and `.bg-*` / `.text-*` utilities alias DS values; `.h1`, `.h2`, `.mega-heading` follow the DS display steps; `.h3`, `.h4-subsection-heading`, `.body`, `.body-large`, `.caption`, `.btn-label` keep pre-redesign sizes; `.btn-primary` / `.btn-secondary` render as masked clouds without shadow (`assets/kd-cloud.svg`).

**Logo** — never recolour, distort, rotate, outline or shadow it; keep clear space ≥ the height of the "K". The header uses the full-colour wordmark on purple (`Kaadu_wordmark_red_RGB.svg` in Shopify Files).

---

## Shopify / Liquid coding standards

### Files
- **Sections** ([sections/](sections/)) — one file per section. New custom sections are prefixed `kaadu-`; legacy `custom-` files keep their prefix. Prefer restyling the closest existing section over creating a new one.
- **Snippets** ([snippets/](snippets/)) — reusable partials via `{%- render -%}` (never `include`). DS building blocks are prefixed `kd-`.
- **CSS** — shared styles in [assets/base.bundle.css](assets/base.bundle.css) (DS foundations, then components appended at the bottom). Section-specific CSS goes in the section's `{%- style -%}` block, scoped with `#{{ section.id }}`. No separate per-section CSS files; no `@import`.
- **JS** — vanilla only, scoped per section instance (no page-wide singletons). No jQuery, no frameworks, nothing render-blocking in `<head>`.

### CSS
- Mobile-first: default styles for mobile, then `@media (min-width: 768px | 992px | 1200px | 1441px | 1800px)`.
- Colours, spacing, radii, shadows and fonts only via `var(--*)`.
- BEM-style names for new components: `.block__element--modifier`.
- `!important` only to override Shapes defaults, with a comment saying why.
- **No inline `style=""`** for sizes, colours or spacing. A dynamic value from a setting becomes a custom property on the section:

```liquid
{%- style -%}
  #{{ section.id }} { --section-accent: {{ section.settings.accent_color }}; }
{%- endstyle -%}
```

### Liquid & schema
- Dash tags `{%- -%}`; `| escape` user text in attributes.
- Setting text is entered in normal case — uppercase is CSS-only.
- Every setting has a sensible default; group with `header` settings; every section gets a `color_scheme` setting.
- Changing a setting's `type` is fine if old values stay valid (e.g. `text` → `inline_richtext`); **never delete a setting that `templates/*.json` or `config/settings_data.json` still uses** — mark it unused in its `info` instead.
- `config/settings_data.json`, `templates/*.json` and `sections/*-group.json` are also written by the theme editor: edit them surgically and check `git diff` shows only your change. Most round-trip byte-identically through `json.dumps(indent=2, ensure_ascii=False)` after the comment header; `page.impressum.json`, `product.preorder.json` and `list-collections.json` don't, so edit those as text.

### Images
- `image_url` + `image_tag` (or `<picture>` with a WebP source), explicit `width`/`height`, meaningful `alt` (decorative: `alt=""`).
- First visible image (`section.index == 1`): `loading="eager"` + `fetchpriority="high"`; all others `loading="lazy"`.

---

## SEO, accessibility, UX

- Exactly **one `<h1>`** per page (the hero); section titles `<h2>`, sub-items `<h3>`, never skip levels. Semantic elements (`<section>`, `<nav>`, `<footer>`, `<time>`…). Product pages carry `Product` JSON-LD. Page titles `{Page} — Kaadu`; meta descriptions 140–160 characters.
- Contrast: use only the DS ground/ink pairs (all ≥ 4.5:1). Minimum text 12px (the 10px option badge is the only exception); `--ink-muted` only at 12px+.
- Visible focus everywhere (global 4px red ring), tap targets ≥ 48px, `aria-label` on icon-only controls, real `<button>`/`<a href>` elements.
- Carousels and sliders: keyboard operable, `aria-live` where content changes. Menus and drawers trap focus and close on Escape.
- No horizontal scroll at any width ≥ 320px. Motion only as the DS allows; everything stops under `prefers-reduced-motion`.

---

## Workflow

1. **Read the DS** README and the component README for what you're building; check the mockup only for the section's structure and copy.
2. **Restyle before creating** — find the closest existing section.
3. **Tokens, `kd-` classes and `kd-button` only** — if you're typing a hex value, a px font size or a pill radius on a button, stop.
4. **Keep the stickers/shapes blocks working** on every section you touch.
5. **Validate** — schema JSON parses, braces balance, no stray `700`/`900` weights, no inline styles.
6. **Test** at 390, 768, 1200, 1440, 1920 and 2560px in the branch preview before calling it done.
7. **Commit to `redesign`** in small, reviewable batches.
