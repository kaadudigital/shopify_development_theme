# S-08 · Vertikale Video-Einbettungen — hint on top, side-by-side layout
Status: done · Owner: – · Files: `sections/vertical-video-embeds.liquid`, `assets/base.bundle.css`

## Goal
1. The hint («← Wischen für den nächsten Clip · 3 Clips →») moves from below the phone to above the phone frame.
2. From tablet up, the section gets more compact: title, intro and button beside the phone instead of all stacked.

## Behaviour
- Hint (with its ← → buttons and the clip count) sits directly above the phone, on every screen size.
- **≥768:** two columns — text column (title, intro, button) left, phone (with hint above) right. Text left-aligned,
  vertically centred to the phone. Setting «Phone side: right / left» (default right).
- **Mobile:** stays stacked: title → intro → hint → phone → button.
- The existing «phone position» slider (centred layout only) applies only when the layout setting is «Stacked»;
  new setting «Layout from tablet: Side by side (default) / Stacked (as today)».

## Acceptance criteria
- [ ] AC1 Hint above the phone frame at 390 / 768 / 1440.
- [ ] AC2 ≥768: text and phone side by side, section height clearly lower than today (measured before/after at 1440).
- [ ] AC3 Swipe, arrows and clip count still work; arrows keyboard operable.
- [ ] AC4 «Stacked» reproduces today's layout except the hint position.

## Decisions (2026-10-17)
- The bead strap stays as it is.
- Phone side is a setting: **Left / Right** (default right).

## Verification (2026-10-17, preview)
- AC1 hint above the phone (12px gap) at 390 / 768 / 1200 / 1440 / 1920 / 2560. ✓
- AC2 side by side from 768, text column left of the phone everywhere; section height at 1440: **1147 → 884px**. ✓
  Tablets 768–991: phone at most 40 % of the screen, the heading hyphenates («Unge-schnitten») instead of running under the phone.
- AC3 swipe / arrows / clip count unchanged (same elements and JS hooks, only moved). ✓
- AC4 «Centred» keeps the stacked layout (hint now above the phone). ✓

## Follow-ups (2026-10-18, user)
- Large screens: side-by-side layout gets ~120px side margins from 1200 to 1911px (21" / 24"), like the 124px on 27"
  (1920); from 1912 the 1800px cap gives it. Measured: 1200–1900 → 120px text / 120–144px phone, 1920 → 124px, 2560 → 444px. ✓
- Settings simplified (33 → 29): removed arrow background + 77-shape picker, desktop phone position (centred layout only),
  gradient background and «backward» auto-advance (values removed from index.json). Groups: Text · Phone · Layout and motion · Colour.
  Re-checked live: hint above phone, ← → change clips, no page errors, no horizontal scroll at 390–2560. ✓
