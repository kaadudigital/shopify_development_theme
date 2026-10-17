# S-07 · Custom footer — SVG social icons
Status: approved · Owner: – · Files: `sections/custom-footer.liquid` (footer group)

## Goal
Show icons instead of the words «Instagram» / «TikTok». The icon files are picked in the editor.

## Today
`show_social_icons` + `instagram_url`, `tiktok_url`; links render the names as text.

## Behaviour
- Setting «Social links as» : Text / Icons (default Text, so nothing changes until switched).
- Per network: a «Social link» block with name, URL and icon (`image_picker`).
- Icon size setting 24–48px, default 32. Each link keeps `aria-label="Instagram"` etc.; 48px tap target.
- Icon colour setting (blank = footer text colour); the SVG is used as a CSS mask.

## Acceptance criteria
- [ ] AC1 Icons mode shows the picked icons at 390 and 1440, with working links and aria-labels.
- [ ] AC2 Text mode unchanged.
- [ ] AC3 A network with URL but no icon falls back to its name.

## Decisions (2026-10-17)
- Networks are **blocks** («Social link»: name, URL, icon) — add any number. Existing Instagram / TikTok URLs are moved into blocks;
  the old settings stay in the schema marked «not used».
- Icons come from the shared Drive folder https://drive.google.com/drive/folders/1jphG8rz5bhG8fYO4LF2l6XrA1SMHqXd1 (uploaded to Shopify Files, picked per block).
- Icon colour is a **setting**, default = the footer text colour. So icons are drawn as a single-colour mask of the SVG
  (multi-colour logos come out in one colour).
