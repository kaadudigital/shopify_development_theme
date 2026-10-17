# S-04 · Bild mit Highlights — cap the tiles' empty space on large screens
Status: done · Owner: – · Files: `sections/custom-image-with-highlights.liquid`, `assets/base.bundle.css` (STATS AROUND AN IMAGE)

## Goal
From 1441px the tile columns scale with the screen (320px × up to 1.4 = 448px), but the stat text doesn't, so
the tiles get ever more empty space around the text (seen at 2560: 448-wide tiles with small text in the middle).

## Behaviour
- Tile columns stop growing at a maximum: proposed **360px**, setting «Highlight width – max» (280–480px).
- Inner padding stays the DS 16 / 12px; text stays centred.
- The leftover width goes to the outer margin (row stays centred), image size unchanged.

## Acceptance criteria
- [ ] AC1 Tile width ≤ the max at 1440, 1920, 2560; identical at 1920 and 2560.
- [ ] AC2 Below 1441 nothing changes (screenshots 390 / 768 / 1200 / 1440 before = after).
- [ ] AC3 Gap tile ↔ image stays 24px.

## Decisions (2026-10-17)
- The problem is the empty space **inside the tiles**, left and right of the text → cap the tile width (setting, default 360px).

## Verification (2026-10-17, preview)
- AC1 tile width: 1200 / 1440 **320px** (unchanged), 1920 / 2560 **360px** (= max, identical). ✓
- AC2 below 1441 unchanged (390 / 768 mobile grid, 1200 / 1440 320px). ✓
- AC3 tile ↔ image gap untouched (`--space-6`). ✓
