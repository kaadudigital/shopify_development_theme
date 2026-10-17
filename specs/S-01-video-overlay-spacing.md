# S-01 · Custom Video Text Overlay — more space between title and button
Status: approved · Owner: – · Files: `sections/custom-video-with-text-overlay.liquid`, `assets/base.bundle.css` (VIDEO BAND)

## Goal
The button sits too close to the title. Give it more air on every screen size.

## Today
`.kd-video__content` stacks kicker / title / text / button with `gap: var(--space-4)` (16px) and the button wrapper adds
`margin-top: var(--space-2)` (8px) → **24px** title → button at every width.

## Behaviour
- New setting **«Space above the button»** (select, DS steps), separate for mobile and ≥768:
  options 24 / 40 / 56 / 80px (`--space-6`, `--space-8`, `--space-10`, `--space-12`).
- Proposed defaults: mobile **40px**, ≥768 **56px**.
- Only the space above the button changes; kicker → title → text spacing stays 16px.
- Works the same with button artwork.

## Acceptance criteria
- [ ] AC1 Title bottom → button top equals the chosen value at 390, 768, 1200, 1440, 1920, 2560 (measured in the browser).
- [ ] AC2 With the intro text present, the space is between text and button (not added twice).
- [ ] AC3 Tokens only, no inline styles; the homepage instance keeps its current look apart from the spacing.

## Out of scope
Title size, colours, video behaviour.

## Decisions (2026-10-17)
- Space above the button is a **setting** (mobile and ≥768), defaults 40 / 56px.
