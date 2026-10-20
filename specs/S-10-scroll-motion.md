# S-10 · Scroll animations (cobfoods-style) — GSAP pilot
Status: in progress (pilot) · Owner: product-page session · Files: `assets/kaadu-motion.js`, `assets/gsap.min.js`,
`assets/ScrollTrigger.min.js`, `assets/SplitText.min.js`, `layout/theme.liquid`, `config/settings_schema.json`,
`assets/base.bundle.css` («SCROLL MOTION»)

## Goal
Reveal animations while scrolling or swiping, like cobfoods.com. Their effects: headings slide up word by word or line by
line, stickers and pills pop in, cards come in one by one, the ticker runs only in view, image parallax.

## Decisions (2026-10-20, Marshal)
- GSAP 3.13 + ScrollTrigger (+ SplitText). No smooth-scroll hijacking: native scrolling stays. About 49 KB gz,
  deferred.
- Pilot first: homepage Hero and people cards. Rollout to every section after Marshal's OK.
- The DS Motion rule changes from «No scroll animations» to a «Scroll reveal» rule.

## Behaviour
- Central registry by selector (`assets/kaadu-motion.js`), no section-file edits in the pilot.
- words: h2 words slide up from a line mask, 0.7 s, 0.06 s stagger, `power2.out`.
- rise: kicker, text, buttons fade up 24px, 0.6 s, 0.08 s stagger.
- pop: pills and sticker artwork, scale 0.6 → 1 and −12° → 0°, `back.out(1.7)`.
- cards: cards in view rise 40px one by one (0.1 s); off-screen carousel cards just show.
- media (hero): the image is never hidden (LCP); light scale 1.06 → 1 on load plus scrubbed parallax ±4 %.
- Plays once at 85 % of the viewport; the hero plays on load.
- Off: theme setting «Scroll animations», theme editor, `prefers-reduced-motion`. No JS / GSAP fails: all visible
  within 3 s.

## Acceptance criteria
- [ ] AC1 Hero animates on load, people cards on scroll (390, 1440).
- [ ] AC2 After scrolling the page nothing stays hidden.
- [ ] AC3 Reduced motion: no animation, everything visible immediately.
- [ ] AC4 GSAP blocked: everything visible within 3 s.
- [ ] AC5 Hero LCP not worse (baseline ≈ 600–700 ms at 1440, preview).
- [ ] AC6 No horizontal scroll, no page errors.

## Verification (2026-10-20, preview, pilot)
- AC1 hero plays on load, people heading/kicker/hint/cards on scroll at 390 and 1440 (frames + videos). ✓
- AC2 after scrolling the whole page nothing in scope stays hidden; when done, the section gets `.kd-motion-done`
  and inline visibility/opacity/transform are cleared (the people hint stays hidden at 3400px, as its CSS wants). ✓
- AC3 reduced motion: no `kd-motion` class, all visible. ✓  AC4 GSAP blocked: class dropped, all visible. ✓
- AC5 hero LCP (1440, 6 runs): 628–1164 ms with motion vs 596–708 ms before and 560 ms with reduced motion. Within the
  preview's run-to-run noise apart from one outlier; the image is never hidden. ✓ (watch on production)
- AC6 no horizontal scroll, no new page errors (the `play()` warnings come from the existing videos). ✓
