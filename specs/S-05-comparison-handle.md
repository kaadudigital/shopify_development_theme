# S-05 · Kaadu comparison slider — settable handle shape and arrow
Status: approved · Owner: – · Files: `sections/kaadu-comparison.liquid`, `assets/base.bundle.css` (COMPARISON)

## Goal
The round handle and the ↔ arrow (a text character today) can be swapped from the editor.

## Behaviour
- **Handle shape:** select «Circle (default) / Cloud / Custom image». Custom image = `image_picker` (SVG or PNG from Files), drawn
  at the handle size, colour as uploaded. Cloud uses `#kd-cloud` in the handle colour.
- **Arrow:** select «Default ↔ / Custom image / None». Custom image = `image_picker`; default becomes an inline SVG
  (cleaner than the text glyph) coloured by «Handle arrow».
- **Handle size:** range 40–96px, default today's size, separate mobile.
- Rocking, drag, keyboard and focus ring unchanged; focus ring follows the shape's box.

## Acceptance criteria
- [ ] AC1 Each shape × arrow combination renders centred on the edge at 390 / 1440.
- [ ] AC2 With a custom image the handle keeps a ≥ 48px tap target.
- [ ] AC3 Defaults look identical to today.

## Decisions (2026-10-17)
- Built-in **Cloud** handle as an option, next to Circle and **Custom image**.
- Custom image is shown as uploaded (proposed; an SVG keeps its own colours).
