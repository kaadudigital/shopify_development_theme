# S-09 · Produktseite — product template to the mockup
Status: in progress · Owner: session c70d7809 (product page) · Files: `templates/product.json`,
`sections/custom-packaging-selector.liquid`, `sections/comparison-table.liquid`, `sections/testimonials.liquid`,
`sections/scrolling-text.liquid`, `assets/base.bundle.css`

## Goal
`templates/product.json` follows the mockup board «Produktseite» (`project/Product.dc.html`, desktop only), reusing
existing sections wherever possible.

## Decisions (2026-10-20, Marshal)
- Buy box = the homepage pack selector (`custom-packaging-selector`), extended for the product page. `main-product`
  stays in product.json, disabled.
- «Produktvergleich» and «Bewertungen» = the unused stock `comparison-table` and `testimonials`, restyled.
- «Bild mit Highlights» and «Related products» removed from product.json.

## Sections (mockup order)
1. Buy box — pack selector on the product template: page's product when «Product» is empty, title as `<h1>`,
   Product JSON-LD, photo / details 50/50 from 768 (DS product page: space-5 gap, space-9 from 1200), sticky photo.
   New on every page (off by default): long description (product description or custom text), badge blocks
   (starburst, text, colours), fourth tab «Lagerung und Haltbarkeit», coloured ✶ before the tab titles.
   Packs linked to the product's 3er / 6er / 12er variants (prices come from the variants).
2. Ticker — `scrolling-text` (new: colour switch; mockup: red band, paper text, lime ✶).
3. Produktvergleich — `comparison-table` (kicker, intro, footnote, ✓/✕ table, highlighted Kaadu column).
4. Bewertungen — `testimonials` (kicker, h2, cloud button, review cards grid; carousel kept as a layout option).
5. «Wir sind einfach besser» — `kaadu-comparison` (peer's section, new instance, paper ground).
6. Vision — `image-with-text-custom` (copy of the homepage instance on purple; «Wer profitiert?» links to the
   people cards on the homepage).
7. Videos — `vertical-video-embeds` (copy of the homepage instance).
8. Join — `email-input` (peer's section, copy of the homepage instance).

## Acceptance criteria
- [ ] AC1 Order and content as above at 1440; colours as the mockup.
- [ ] AC2 Mobile (390): buy box stacked, table fits without horizontal page scroll, review cards stacked.
- [ ] AC3 Add to cart puts the chosen pack's variant in the cart.
- [ ] AC4 Each new switch off → colours follow the colour scheme.
- [ ] AC5 Homepage pack selector unchanged.
- [ ] AC6 No horizontal scroll at 390–2560; one `<h1>`.
