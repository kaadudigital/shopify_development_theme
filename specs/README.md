# Specs — Kaadu redesign

Spec-driven workflow: rough note → spec draft (with open questions) → **approved** by Marshal → build on `redesign`
(commits start with the spec ID) → every acceptance criterion checked on the preview at 390 / 768 / 1200 / 1440 /
1920 / 2560 → **done**. A later change edits the spec first, then the code. Global rules: `CLAUDE.md`.

Status: `draft` → `approved` → `in progress` → `done`. Owner: the Claude session that builds it.

| ID | Section | File | Status | Owner |
|---|---|---|---|---|
| [S-01](S-01-video-overlay-spacing.md) | Custom Video Text Overlay — title ↔ button spacing | custom-video-with-text-overlay.liquid | done | this session |
| [S-02](S-02-sticker-heading-width-simplify.md) | Custom Sticker Heading — mobile width bug, simpler settings | custom-image-section.liquid | approved | – |
| [S-03](S-03-people-cards.md) | Kaadu people cards — wider cards, no details, CTA card last | kaadu-people-cards.liquid | approved | – |
| [S-04](S-04-highlights-max-space.md) | Bild mit Highlights — cap tile space on large screens | custom-image-with-highlights.liquid | done | this session |
| [S-05](S-05-comparison-handle.md) | Kaadu comparison slider — settable handle shape and arrow | kaadu-comparison.liquid | done (custom image untested) | this session |
| [S-06](S-06-signup-image-width.md) | Email Signup — image width settings | email-input.liquid | in progress | this session (from peer) |
| [S-07](S-07-footer-social-icons.md) | Custom footer — SVG social icons | custom-footer.liquid | approved | – |
| [S-08](S-08-vertical-videos-layout.md) | Vertikale Video-Einbettungen — hint on top, side layout | vertical-video-embeds.liquid | approved | – |
