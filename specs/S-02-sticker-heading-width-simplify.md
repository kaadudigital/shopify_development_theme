# S-02 · Custom Sticker Heading — mobile image width + simpler settings
Status: approved · Owner: – · Files: `sections/custom-image-section.liquid`, `assets/base.bundle.css` (IMAGE SECTION)
Used by: homepage `custom_image_section_anwQpJ` («Unsere Crunchys verändern alles», free canvas on all sizes),
homepage `custom_image_section_Mafcmn` (quote — **peer session's section**), `page.who-we-are` `custom_image_section_4KAdPE` (legacy free-form).

## Goal
1. The mobile image width setting must work over its whole range.
2. The settings panel must become understandable.

## Bug — cause found
Image width is `min(var(--kd-is-w), 100%)` (free canvas) / `max-width: var(--kd-is-w)` inside a full-width column (row).
100% = the content box inside the gutters, ≈ 350px on a 390 phone. The homepage is set to **570px**, so everything
above ~350px is silently cut to 350px. Same cap exists on every size, it just bites first on mobile.

## Behaviour — width
- **Chosen — A:** mobile width becomes **% of the screen width** (40–130 %), image may run past the gutter / off-screen
  (section clips it, no horizontal scroll). Tablet → 27" stay in px but may also exceed the column.

## Behaviour — simplify (178 settings today)
Proposed:
- Remove from the panel everything the two `kd_row` instances don't use **only if** `who-we-are` moves to the new layout too;
  otherwise keep legacy settings but move them into one «Legacy free-form (old pages)» group at the very bottom.
- Drop the unused `canvas_image_w_*` sliders (already labelled «not used»; kept in JSON values only).
- One group per screen size with only: canvas on/off, height, image x / y / width / rotation, text x / y, button position.
- Stickers (heading, sub-heading, sub-heading 2) → keep, but each as one group (image, width desktop / mobile, rotation, show on mobile, x / y).
- Exact before/after list goes in this spec for approval before building.

## Acceptance criteria
- [ ] AC1 At 390 the image width visibly follows the setting across its full range (screenshot at min / default / max).
- [ ] AC2 No horizontal page scroll at any width ≥ 320.
- [ ] AC3 The three existing instances look unchanged after the migration (before/after screenshots at all 6 widths).
- [ ] AC4 No setting still used in `templates/*.json` is deleted (CLAUDE.md); settings count and group list documented here.

## Decisions (2026-10-17)
- Mobile width = **% of the screen width** (option A); the image may run past the gutter, the section clips it.
- `page.who-we-are` (`custom_image_section_4KAdPE`) **moves to the design-system layout**; afterwards the legacy free-form settings
  are hidden from the panel (values kept in the schema as «not used» while any template still holds them).
- Changing the shared section file is fine with the peer's quote instance (no visual change to it; peer gets told).
- Build step 1: before/after settings list added to this spec and shown before code is merged.

## Must keep (from peer session, 2026-10-17)
- `use_custom_colors` stays right under `color_scheme`, default off (everything follows the scheme); kd-is vars + fallbacks in base.bundle.css.
- `.kd-is` content keeps `position: relative; z-index: 1` (otherwise the background pattern paints over it).
- Mafcmn (quote): `image_width_tablet` 320 (not squeezed at 768), pattern block size 56, `image_shadow` false — must survive the migration.
- Send the peer before/after screenshots of Mafcmn.
