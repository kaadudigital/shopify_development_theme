# S-11 · Smooth scrolling + refined scroll motion
Status: approved (2026-10-20, Marshal: touch native, snappy lerp 0.12; S-10 session handed its files over) · Owner: this session (marshalsebastine-a2) · Files: `assets/lenis.min.js` (new, 1.3.26), `assets/kaadu-scroll.js` (new), `assets/kaadu-motion.js`,
`assets/kaadu.js` (scrollTo calls), `layout/theme.liquid`, `config/settings_schema.json`, `assets/base.bundle.css`
(«SCROLL MOTION»), DS README (Motion rule)

## Goal
Scrolling feels smooth and snappy like cobfoods.com (wheel/trackpad input is eased, the page glides to a stop instead of
jumping in wheel steps) and the S-10 reveal animations feel smoother and more refined: softer eases, more overlap,
less bounce, parallax that moves with the eased scroll instead of in steps.

## Decision this spec changes
S-10 said «No smooth-scroll hijacking: native scrolling stays» (Marshal, 2026-10-20). Marshal asked for smooth and
snappy scroll behaviour on 2026-10-20 (later); this spec reverses that line. cobfoods.com runs Locomotive Scroll
(`data-scroll-container`, `data-scroll-speed`), which is exactly this kind of eased scrolling.

## Proposal
### Smooth scrolling (Lenis 1.3, ~4 KB gz, self-hosted in assets like GSAP)
- Lenis eases the *native* scroll position (no transform wrapper): `position: fixed`, anchors, the sticky header,
  scroll-snap carousels and ScrollTrigger keep working. Keyboard (space, arrows, PageDown) and the scrollbar stay
  native.
- Touch stays native (`syncTouch: false`): phones feel like phones; the easing applies to wheel and trackpad only.
  (Marshal, 2026-10-20)
- Snappy preset: `lerp: 0.12`, `wheelMultiplier: 1`, `smoothWheel: true`. The page settles in ≈ 0.4 s after the last
  wheel tick. cobfoods is floatier (≈ 0.8 s). (Marshal, 2026-10-20: snappy)
- Driven from GSAP's ticker (`gsap.ticker.add(t => lenis.raf(t * 1000))`, `lagSmoothing(0)`), and
  `lenis.on('scroll', ScrollTrigger.update)` so parallax and reveals follow the eased position.
- Inner scrollers keep their own wheel: `data-lenis-prevent` on the people-card track, the phone screens, the
  comparison table wrapper, the menu panel and the cart drawer.
- Menu overlay and cart drawer: `lenis.stop()` while open, `lenis.start()` on close (hooked to the existing open/close
  code, no behaviour change for them otherwise).
- Programmatic scrolls in `assets/kaadu.js` (`scrollIntoView` to the pack selector / cart, 3 places) go through
  `lenis.scrollTo(target, { offset })` when Lenis runs, else stay as they are.
- Off: new theme setting «Smooth scrolling» (`kd_smooth_scroll`, default on, next to «Scroll animations»), theme
  editor, `prefers-reduced-motion`, no JS. Lenis is only loaded when the setting is on.

### Refined reveals (`assets/kaadu-motion.js`, same registry, numbers only)
- Ease `power3.out` instead of `power2.out`: faster start, longer settle (reads as «snappy, then soft»).
- words: 0.9 s, stagger 0.05 s (was 0.7 / 0.06); the heading starts the moment the section crosses the trigger.
- rise: y 20 → 0, 0.8 s, stagger 0.07 s, starts at 0.15 s (was 24 / 0.6 / 0.08 / 0.25) — more overlap with the heading.
- cards: y 32 → 0, 0.8 s, stagger 0.07 s from 0.2 s (was 40 / 0.6 / 0.08 / 0.3).
- media: y 40 → 0 plus scale 1.04 → 1, 1.0 s (was y 48, 0.8 s, no scale off-screen); first-section media unchanged
  (never hidden, scale only).
- pop: scale 0.72 → 1, rotation −8° → 0, `back.out(1.4)`, 0.6 s (was 0.6 / −12° / `back.out(1.7)` / 0.55): less
  cartoon bounce, still a pop.
- parallax: unchanged ±4 %, `scrub: true`; with Lenis the scrubbed value is already eased. Without Lenis (setting off,
  touch) `scrub: 0.6` so the image glides instead of stepping.
- Trigger stays `top 85%`, once. The per-section «Scroll animations» switch (S-10) and all fallbacks stay.

### DS
- Motion rule in the DS README: add «Smooth scrolling (wheel/trackpad eased, touch native)» and the new reveal
  numbers; keep «everything stops under prefers-reduced-motion».

## Decisions on the open questions (2026-10-20)
1. Touch native. 2. Snappy (lerp 0.12). 3. The S-10 session (gsap-scroll-animations-pilot) handed over kaadu-motion.js,
   the S-10 lines of theme.liquid, the «SCROLL MOTION» CSS block and `kd_scroll_motion`; it won't edit them until S-11
   is done. Its notes: parallax from the element's own yPercent; `.kd-motion-done` + cleared inline styles; line masks
   clip vertically only; trial pieces and table rows opacity only; first sections never hide their image; the
   people carousel, vertical-video tracks and the product page sticky photo column scroll on their own.

## Acceptance criteria
- [ ] AC1 Wheel/trackpad scrolling is eased at 1440 and 390 (desktop browser): no step jumps, settles ≈ 0.4 s; touch
      on a phone-sized viewport scrolls natively.
- [ ] AC2 Reveals and parallax follow the eased position (no reveal lagging behind or firing early), no element stays
      hidden after scrolling both pages (S-10 AC2 still holds).
- [ ] AC3 Menu overlay and cart drawer open/close as before; the page behind does not scroll while they are open;
      their own content scrolls.
- [ ] AC4 People track, phone screens and comparison table scroll with the wheel inside; the page does not move.
- [ ] AC5 Anchor/`scrollTo` jumps from kaadu.js land on the target (pack selector, cart) smoothly.
- [ ] AC6 Setting off, theme editor, reduced motion, Lenis blocked: native scrolling, nothing broken, nothing hidden.
- [ ] AC7 No horizontal scroll, no page errors, hero LCP not worse than S-10 (≈ 600–1100 ms, preview, 1440).
- [ ] AC8 Keyboard scrolling and the scrollbar work natively; focus-driven scrolls (Tab into off-screen inputs) land.
