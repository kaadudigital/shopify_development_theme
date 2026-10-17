# S-06 · Email Signup — image width settings
Status: approved · Owner: this session (handed over from the peer) · Files: `sections/email-input.liquid`, `assets/base.bundle.css`

## Goal
The optional image's width is settable: one value for mobile, one for tablet and up.

## Today
`image_url: width: 400` + CSS size; no setting.

## Behaviour
- «Image width – mobile» 80–390px, default = today's rendered width.
- «Image width – tablet and up» 120–800px, default = today's rendered width.
- Image never wider than the content column; srcset covers 2× of the chosen width.
- «Hide image on mobile» keeps working.

## Acceptance criteria
- [ ] AC1 Rendered width = setting at 390 and at 768 / 1440 / 2560.
- [ ] AC2 Defaults look identical to today.
- [ ] AC3 Sharp on 2× screens (srcset).

## Decisions (2026-10-17)
- **I take it over** from the peer session (peer gets told before I touch the file).

## Must keep (from peer session, 2026-10-17)
- `use_custom_colors` right under `color_scheme`, default off; kd-join vars + fallbacks in base.bundle.css (JOIN block).
- Mobile `.kd-join--art .kd-form` is `flex-direction: row`, input `flex: 1 1 auto; min-width: 0`, so the art button stays in the row;
  `.kd-form .kd-btn.kd-btn--art` keeps its set width.
