# image-with-text-custom Section — Test Cases

Preview URL: http://127.0.0.1:9292/pages/contact?view=startseite-2

---

## Design Reference (Figma node 322:203)

### Desktop
- Image on **left** (50% width), text on **right** (50% width)
- Background: set via Shopify color scheme (purple `#542a76` per Figma)
- Heading: Fagies Regular, 72px, uppercase, off-white `#fffff5`
- Body: Banter Grotesk Regular, 18px, off-white
- Buttons: side-by-side, full-width each in their flex column

### Mobile (≤768px)
- Stack order: **Heading → Image → Text → Buttons** (when `mobile_layout_order` enabled)
- All elements full-width, center-aligned
- Heading: 48px, line-height 44px

---

## TC1 — Desktop Layout

**Viewport:** 1280px  
**Path:** `/pages/contact?view=startseite-2`

- [ ] Image occupies left ~50% of container
- [ ] Text content occupies right ~50% of container
- [ ] No horizontal overflow or scroll
- [ ] Container max-width 1200px, centred

---

## TC2 — Mobile Layout Order

**Viewport:** 375px

- [ ] Heading appears **first** (above image)
- [ ] Product image appears **second**
- [ ] Body richtext appears **third**
- [ ] Buttons appear **last**
- [ ] All elements full-width, centre-aligned

---

## TC3 — Heading Typography

**Inspect element:** `h2.custom-display-header`

| Property | Desktop | Mobile |
|---|---|---|
| font-family | fagies | fagies |
| font-size | 72px | 48px |
| line-height | 80px | 44px |
| text-transform | uppercase | uppercase |

- [ ] Desktop: font-size 72px, line-height 80px
- [ ] Mobile: font-size 48px, line-height **44px** (not 52px)
- [ ] Font renders as Fagies (not fallback Helvetica)
- [ ] Text is uppercase regardless of input case

---

## TC4 — Body Text

**Inspect element:** `div.custom-body-large`

| Property | Desktop | Mobile |
|---|---|---|
| font-size | 18px | 16px |
| line-height | 28px | 28px |
| font-family | Banter Grotesk / fallback | same |

- [ ] Desktop: 18px body text
- [ ] Mobile: 16px body text
- [ ] NOT 24px (`custom-body-xlarge`) — verify this class is absent

---

## TC5 — Primary Button (push-btn / shop button)

**Inspect element:** `button.custom-cat.push-btn`

- [ ] Min-height: 48px (accessibility tap target)
- [ ] Font-size: 18px desktop, 16px mobile
- [ ] Text uppercase
- [ ] Border-radius: 8px
- [ ] Shadow: `0 6px 12px rgba(0,0,0,0.15)`
- [ ] Hover: lifts `translateY(-2px)`, shadow increases
- [ ] Full-width on mobile, flex-1 on desktop

---

## TC6 — Secondary Button (shape/image button)

**Inspect element:** `button.custom-shape-button`

- [ ] Background image renders (button2_image from settings)
- [ ] Min-height: 48px
- [ ] Font-size: 18px desktop (`custom-shape-button-text`)
- [ ] Font-size: 16px mobile
- [ ] Text uppercase
- [ ] Shadow: `0 6px 12px rgba(0,0,0,0.15)`
- [ ] Hover: lifts + shadow increases
- [ ] Full-width on mobile, flex-1 on desktop
- [ ] **No deprecated `img_url` filter** — verify background image loads correctly

---

## TC7 — Button Layout

**Desktop (≥769px):**
- [ ] Buttons side-by-side (`flex-direction: row`)
- [ ] Gap: 16px between buttons
- [ ] Both buttons equal width (`flex: 1`)

**Mobile (≤768px):**
- [ ] Buttons stacked vertically (`flex-direction: column`)
- [ ] Gap: 12px between buttons
- [ ] Both buttons full-width

---

## TC8 — Image Styling

**Inspect element:** `.image-with-text-custom-image-wrapper .media`

- [ ] Box-shadow: `0 8px 16px rgba(0,0,0,0.15)`
- [ ] Border-radius: 8px
- [ ] Max-width: 600px (desktop)
- [ ] Aspect ratio preserved (no stretch/squash)
- [ ] `loading="eager"` on first section image, `lazy` otherwise

---

## TC9 — Colour Contrast (WCAG AA)

Verify with browser DevTools or [contrast checker](https://webaim.org/resources/contrastchecker/).

| Text | Background | Required | Result |
|---|---|---|---|
| Off-white `#fffff5` | Purple `#542a76` | 4.5:1 | ✅ ~7.5:1 |
| Black `#000000` | Lime `#acff64` | 4.5:1 | ✅ ~8:1 |
| Off-white `#fffff5` | Red `#ae0000` | 4.5:1 | ✅ ~5.3:1 |

- [ ] No text fails 4.5:1 contrast on its background
- [ ] Heading colour is not red on a pink/light background (would fail)

---

## TC10 — No Inline Styles

Open DevTools → inspect heading, body div, button wrapper.

- [ ] Heading `h2` has **no** `style="..."` attribute
- [ ] Text content wrapper `div` has **no** `style="margin: auto"`
- [ ] `custom-section-headline` class is **absent** from all headings
- [ ] `custom-body-xlarge` class is **absent** from richtext div

---

## TC11 — No Debug Code

Open DevTools → Console tab, click the focus-element buttons.

- [ ] **No `console.log` output** when clicking focus-element buttons
- [ ] Focus jumps correctly to target element

---

## TC12 — Image URL (no deprecated filter)

Open DevTools → Network tab, find the button background image request.

- [ ] Button background image loads (HTTP 200)
- [ ] URL uses `image_url` format (Shopify CDN), not `img_url` / `master`

---

## TC13 — Responsive (no horizontal scroll)

- [ ] @ 320px: no horizontal scroll
- [ ] @ 375px: no horizontal scroll
- [ ] @ 768px: layout transitions correctly
- [ ] @ 1280px: layout is side-by-side, max-width respected

---

## TC14 — Keyboard / Accessibility

- [ ] Tab key reaches both buttons
- [ ] Both buttons have visible `:focus-visible` outline
- [ ] Image has `alt` text (non-decorative) or `alt=""` (if decorative)
- [ ] `h2` is the first heading in the section (no `h1` in non-hero usage)

---

## Validation Checklist Summary

| # | Check | Pass |
|---|---|---|
| TC1 | Desktop side-by-side layout | ☐ |
| TC2 | Mobile heading-first order | ☐ |
| TC3 | Heading: 72px/48px, line-height 80px/44px | ☐ |
| TC4 | Body: 18px/16px, class is `custom-body-large` | ☐ |
| TC5 | Primary button: 48px min-h, correct font | ☐ |
| TC6 | Secondary button: image loads, no deprecated filter | ☐ |
| TC7 | Buttons: row on desktop, column on mobile | ☐ |
| TC8 | Image: shadow, radius, aspect ratio | ☐ |
| TC9 | Colour contrast ≥4.5:1 | ☐ |
| TC10 | No inline styles, no stale classes | ☐ |
| TC11 | No console.log in production | ☐ |
| TC12 | Button image uses `image_url` filter | ☐ |
| TC13 | No horizontal scroll at any viewport | ☐ |
| TC14 | Keyboard accessible | ☐ |
