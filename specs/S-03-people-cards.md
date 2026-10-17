# S-03 · Kaadu people cards — wider cards, no details, CTA card always last
Status: done · Owner: – · Files: `sections/kaadu-people-cards.liquid`, `assets/base.bundle.css` (PEOPLE CARDS), `assets/kaadu.js` (flip)

## Goal
Cards look squished. Use the mockup's **desktop** card proportion everywhere, remove the details flip,
and always end the carousel with the action card from the mockup.

## Today
Desktop 400 × 600 (2 : 3). Mobile 310 × 560, or 310 × 420 with the cloud frame (homepage). Mockup desktop card: **480 × 600 (4 : 5)**.
«Details ↻» flips to back text. A `cta_card` block exists (pill, heading, button) but the homepage has none.

## Behaviour
- **Size:** 4 : 5 on every screen. Desktop 480 × 600; mobile width `min(340px, 85vw)`, height = width × 1.25 (≈ 340 × 425).
  Tablet as desktop. The mobile height setting goes (marked unused, kept in schema).
- **Details:** «Details ↻» button, back side (back text / fact / note) and the flip JS are removed. Block settings
  `back_*`, `details_label`, `back_label` stay in the schema marked «not used» (still in index.json).
  A card with a link keeps «Mehr dazu».
- **Action card, always last** (mockup play mode): red card, same frame and size as the others,
  - lime pill «06 / 6 · Und du» — the number is automatic (last position / total),
  - heading «Du veränderst eine ganze Gemeinschaft Biss für Biss»,
  - text «Kein gutes Gewissen zum Draufkleben. Ein Snack, bei dem die Rechnung stimmt.»,
  - `kd-button` «Probierpaket holen» → link setting (default `/#probieren`),
  - note «1 Beutel gratis mit Code [CODE] · nur CHF 3 Versand».
  Rendered from section settings («Action card» group), so it is there even without a block. An existing `cta_card`
  block is still honoured but always moved to the end. Setting «Show action card» (default on).
- Counter on person cards becomes `0n / total` including the action card (mockup: «/ 6»).

## Acceptance criteria
- [ ] AC1 Card ratio 4 : 5 (±1 %) at 390, 768, 1200, 1440, 1920, 2560; cloud frame not distorted.
- [ ] AC2 No «Details» button and no back side anywhere; no flip JS errors in the console.
- [ ] AC3 The action card is the last item at every width, with the five parts above and a working button.
- [ ] AC4 Snap, arrows, autoplay and keyboard still work; no horizontal page scroll.
- [ ] AC5 Colours of the action card are settings (mockup defaults) behind «Use the colours below».

## Decisions (2026-10-17)
- Mobile card width `min(340px, 85vw)`, 4 : 5.
- Action card link is a **setting** (`url`, default `/#probieren`); its label, pill, heading, text and note are settings too.
- Back-of-card texts can disappear.

## Verification (2026-10-17, preview)
- AC1 every card 4 : 5 (0.800) at 390 / 768 / 1200 / 1440 / 1920 / 2560; mobile 332px wide (85vw), 480 × 600 from 768. ✓
- AC2 no Details button / back side (0 found); flip JS removed. The only page errors are the video band's
  «play() interrupted by pause()» while scrolling — older, not from this section. ✓
- AC3 last card is the action card at every width: «05 / 5 · Und du», heading, text, «Probierpaket holen» → /#probieren, note. ✓
- AC4 no horizontal page scroll; snap / autoplay untouched. ✓
- AC5 action card colours are the existing CTA colour settings (mockup defaults). This section has no
  «Use the colours below» switch yet (older section) — open follow-up, not part of S-03.
- Fixes during the build: text lifted clear of the scalloped bottom edge; mobile action card uses DS Strong LG / Body SM so all parts fit.
