When
Do this AFTER you deploy these changes to the live theme, not before. Here's why timing matters:

Google Search Console's "Request Indexing" actually fetches the URL right then. If the changes aren't live yet, Google will fetch the old state (the broken/missing pages or the leftover Shapes content) and cache that.
If you deploy and then submit, Google fetches the correctly-configured waitlist page with proper meta tags, no redirect, and gets a clean indexing signal.
Concrete sequence:

Push these theme changes to the live theme on kaadu.ch (via shopify theme push or the Shopify admin theme editor — whatever your normal deploy flow is).
Test in incognito: visit kaadu.ch/, kaadu.ch/products/..., etc. — they should all redirect to /pages/waitlist. Visit kaadu.ch/pages/waitlist directly — it should load normally with no redirect.
Then do the GSC steps below.
You can also wait a day or two after deploying so Google's edge caches settle, but same-day is fine.

How
Step 1 — Set up Google Search Console (if not already done)
Go to https://search.google.com/search-console
Sign in with the Google account that should own this. Tip: use a long-lived account that won't be deleted (e.g., a seo@kaadu.ch or your founder account) — not a personal one you might lose access to.
Click Add property.
Choose Domain (recommended — covers www.kaadu.ch, kaadu.ch, https, http all at once). The alternative is URL prefix which only covers one specific URL pattern.
Enter kaadu.ch.
Step 2 — Verify ownership
For Domain property, Google asks you to add a TXT record to your DNS:

GSC will show you a TXT record like: google-site-verification=abc123...xyz
Where to add it: depends on where kaadu.ch's DNS is managed:
If DNS is on Shopify (Settings → Domains → kaadu.ch → DNS settings) → add the TXT record there.
If DNS is on your registrar (Cloudflare, GoDaddy, etc.) → add it in that registrar's DNS panel.
Save. Wait 5–30 minutes for DNS to propagate.
Back in GSC, click Verify.
(If you used URL prefix mode instead, Shopify has built-in Google verification: Online Store → Preferences → Google Search Console — paste the verification meta tag there. Faster, but only covers one URL prefix.)

Step 3 — Submit each allowed URL
Once the property is verified:

In GSC, at the very top of the page, find the URL Inspection search bar (it spans the full width of the header).
Paste the full URL: https://www.kaadu.ch/pages/waitlist
Press Enter. GSC fetches Google's current knowledge of that URL (usually says "URL is not on Google" for new sites — that's expected).
Click Request indexing. This adds the URL to Google's priority crawl queue. Takes 1–2 minutes.
Repeat for the other three URLs:
https://www.kaadu.ch/pages/waitlist-success
https://www.kaadu.ch/policies/contact-information
https://www.kaadu.ch/policies/privacy-policy
You can submit up to ~10–12 URLs per day via Request Indexing before GSC rate-limits you. For our 4 URLs, no issue.

Step 4 — (Optional but recommended) Submit a manual sitemap
Shopify auto-generates /sitemap.xml containing every URL, which is the opposite of what we want right now. So instead:

Create a tiny file sitemap-waitlist.xml somewhere you can host it. The simplest place: paste it as the body of a Shopify page (e.g., /pages/sitemap-waitlist) or host it externally.

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.kaadu.ch/pages/waitlist</loc></url>
  <url><loc>https://www.kaadu.ch/pages/waitlist-success</loc></url>
  <url><loc>https://www.kaadu.ch/policies/contact-information</loc></url>
  <url><loc>https://www.kaadu.ch/policies/privacy-policy</loc></url>
</urlset>
In GSC → left sidebar → Sitemaps → paste the sitemap URL → Submit.
Honestly, for just 4 URLs, you can skip Step 4. Request Indexing in Step 3 is enough.

Then what?
Within 1–7 days, the 4 URLs should appear when you search Google for site:kaadu.ch.
Check back in GSC weekly for the first month: look at Indexing → Pages to confirm only the 4 URLs are indexed and there are no errors.
If you see Google trying to crawl blocked URLs, that's normal — GSC will show them under "Blocked by robots.txt" which is exactly what we want.
When you eventually launch the full site:

Revert the three files per the under-construction-state memory.
Back in GSC → Sitemaps → submit the standard Shopify sitemap: https://www.kaadu.ch/sitemap.xml.
Google will discover everything else within a few days.