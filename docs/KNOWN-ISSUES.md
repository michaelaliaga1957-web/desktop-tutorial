# Known Issues

> Last updated: 2026-07-08 (inheritance audit). Ordered by severity. Each issue lists evidence so the next engineer can verify independently. When an issue is fixed, move it to the "Resolved" section with the fixing commit.

## Critical

## High

### 4. Admin password is hardcoded in publicly served source
**Evidence:** `admin.html` line 821: `const PASS = 'esplendor2025';`. The page is served publicly at `esplendordetailing.com/admin.html`; anyone can view source.

**Impact:** Limited direct data exposure (lead data lives only in the owner's browser), but the internal playbook and pricing logic are public, and the password may be reused elsewhere by habit. Client-side auth on a static host is inherently cosmetic — treat it as such.

**Fix direction:** Do not reuse this password anywhere. Either accept `admin.html` as an obscured personal tool (documented), move it out of the public site, or move the CRM to a service with real auth (ties into issue #2 decision).

## Medium

### 5. Gallery ships placeholder tiles in production
**Evidence:** `index.html` gallery section — six tiles with emoji placeholders ("Before Photo — Coming Soon").

**Impact:** Weakens trust on the highest-intent page section for a visual business. Before/after photos are the strongest conversion asset a detailing company has.

**Fix:** Replace with real job photos (compressed WebP, lazy-loaded) as soon as the first jobs are photographed.

### 6. No booking event in GA4 even as a custom event
Subset of issue #1 but worth tracking separately: even after ads tracking is fixed, define one canonical `generate_lead` / booking event and mark it as a key event in GA4 so organic and paid funnels are both measurable.

### 7. Pricing duplicated in three places
`index.html` services section, `index.html` form option values, and `admin.html getPrice()` must be updated together. A missed spot silently corrupts revenue reporting. Documented in ARCHITECTURE.md §5; consider a single JS pricing constant per file at minimum.

## Low

### 9. Formspree free-tier submission cap
~50 submissions/month on the free plan. At target volume (2–5 bookings/day per the launch guide) this will be exceeded — upgrade before it silently drops leads.

### 10. README is still GitHub Desktop tutorial boilerplate
Cosmetic, but confusing for anyone inheriting the repo. (Addressed in the inheritance-audit branch.)

## Resolved

### 8. Site hygiene files — RESOLVED 2026-07-10 (Esplendor 2.0)
Added robots.txt, sitemap.xml, a branded bilingual-labelled privacy policy (privacy.html, linked in footer), a branded custom 404.html, and FAQPage JSON-LD schema on the homepage. Favicon/og:image were added earlier with the logo. Also fixed the contact-section hours copy (was "Mon–Sun 7AM–8PM", now matches GBP).

### 2. CRM couldn't receive website leads — RESOLVED 2026-07-08
Was: leads saved to the customer's localStorage; the owner's admin.html dashboard could never see them; Formspree email was the only channel and its notification wasn't arriving.
Fix: Google Apps Script booking backend deployed (owner's account, Sheet "Esplendor Bookings"). Every submission now: (1) appends to the Bookings sheet — the CRM system of record, (2) emails the owner instantly, (3) sends the customer a branded bilingual confirmation email. Formspree remains as backup/archive; the localStorage save remains as a tertiary local copy. Wiring browser-verified end-to-end. admin.html's pipeline views remain as an optional manual tool; the Sheet is authoritative.

### 14. admin.html launch guide named the wrong county — RESOLVED 2026-07-08
Guide Step 2 updated to the real filing (Fort Bend County Clerk, #2026068903, July 6 2026, marked done). Guide Step 5 also updated with the real GBP review link, replacing the placeholder.

### 12. "LICENSED & INSURED" ad callout — RESOLVED 2026-07-08 (callout does not exist)
Owner's Google Ads Assets screenshot shows the account's only callouts are "No Shop Required" and "Same-Day Available" — both truthful. The Launch Record's mention of a "LICENSED & INSURED" callout was outdated or inaccurate; nothing needed removal. Standing rule: no insurance/licensing claims anywhere (ads or website) until a general liability policy exists. Insurance purchase itself remains a Phase B owner item.

### 13. Business hours inconsistent across surfaces (added 2026-07-08)
**Evidence:** Website JSON-LD schema says Mon–Sun 07:00–20:00; GBP (per Launch Record Phase 10) says Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed.

**Impact:** Confuses customers and weakens local-SEO consistency signals (Google cross-checks structured data against GBP).

**RESOLVED 2026-07-08:** Owner updated GBP hours again today (current values live on Google). Since the site's JSON-LD hours were stale-wrong and unfetchable from this environment, `openingHours` was **removed** from the schema — Google Business Profile is now the single source of truth for hours, with nothing to drift out of sync. Final update same day: owner provided a GBP screenshot with authoritative hours (Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed); `openingHours` re-added to the schema matching GBP exactly.

### 3. Fabricated "Google Reviews" on the website — RESOLVED 2026-07-08
Owner approved removal. The reviews section was rebuilt as "The Esplendor Standard" — same premium card design, but the content is now three truthful commitments (treated like our own / inspect before you pay / founding client advantage) under a "100% Satisfaction Guarantee" badge. The fake 5.0 Google Reviews badge, invented testimonials, and placeholder review link are gone; the CTA now links to the business's Google search results. Re-introduce a real reviews grid once genuine Google reviews exist (Phase B).

### 1. Google Ads conversion tracking never fires for real bookings — RESOLVED 2026-07-08
Was: the booking form's AJAX handler showed an inline success div and never reached `thanks.html`, so the Ads conversion (`ads_conversion_Book_appointment_1`, fired on thanks.html load) and any GA4 booking signal never occurred; the Ads goal showed "Misconfigured."
Fix: form now redirects to `/thanks.html` after submission (and the no-JS `_next` field points to the absolute thanks URL). Verified end-to-end in headless Chromium: success path, Formspree-outage path, and validation path all behave correctly.
Remaining owner step: after the fix is live on main, submit one real test booking and confirm the "Book appointment" goal leaves Misconfigured status in Google Ads (24–48 h) before restoring the ads balance.

### 11. Square catalog pricing conflicts with the website — RESOLVED 2026-07-08 (no longer true)
Owner-provided Square Service Library screenshot (2026-07-08) shows the catalog now matches the website exactly: SuperWash $129.99 (3 h 30), Exterior Detail $69.99, Interior Detail $69.99, Pet Hair $39.99, Stain $49.99, Shampoo $49.99, Ceramic $59.99. The Launch Record's "$49.99 SuperWash Package / $79.99 Interior / separate Full Detail" listing was outdated or corrected after that session. Owner confirmed SuperWash = $129.99 canonical.
