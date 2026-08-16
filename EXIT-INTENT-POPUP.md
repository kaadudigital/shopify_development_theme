# Exit Intent Popup — How It Behaves

A newsletter sign-up popup that appears automatically when a visitor looks like they're about to leave the site, offering 20% off their first order in exchange for an email address.

## When it appears

**On desktop:** the popup opens the moment a visitor moves their mouse up and off the top of the browser window — the motion someone makes when reaching for the tab bar, the URL bar, or the back button. Moving the mouse off the left, right, or bottom of the page doesn't count; only an upward exit toward the browser chrome counts as "leaving."

**On mobile and tablets:** there's no cursor to track, so true exit intent isn't possible. Instead, the popup opens automatically after the visitor has been on the page for a set amount of time (25 seconds by default, adjustable in the section settings). If the visitor switches to another app or tab before the timer runs out, the clock pauses and only resumes once they come back.

Either way, the popup can only appear **once per visit** — it won't reappear if the visitor triggers the same condition twice.

## How often a visitor sees it

Once a visitor closes the popup — by clicking the ✕, clicking "No thanks," clicking outside the popup, or pressing Escape — it won't show again for that visitor for **7 days** (also adjustable in settings). The same 7-day cooldown applies after someone successfully submits their email, so people who've already signed up aren't asked again on their next visit.

## What happens after sign-up

Submitting the form reloads the page and reopens the popup automatically, showing either a confirmation message ("thanks for signing up") or an error message (e.g. invalid email), so the visitor sees the result of their submission rather than just landing back on a blank page. After that, the 7-day cooldown kicks in immediately.

## In the Shopify theme editor

While a merchant is customizing the theme, the popup is always shown open — it doesn't wait for exit intent or a timer. This is so it can be styled and edited normally, without needing to trigger the actual behavior first.

## What's customizable from the section settings

- Turn the popup on/off entirely
- Eyebrow text, heading, body copy, email placeholder, button text, and the "no thanks" dismiss text
- An optional image shown next to the offer
- The delay before the popup appears on mobile/touch devices
- How many days a visitor is left alone after dismissing or submitting
- Background color, chosen from the brand's approved palette
