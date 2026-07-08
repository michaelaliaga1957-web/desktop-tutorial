# Known Issues

> Last updated: 2026-07-08 (inheritance audit). Ordered by severity. Each issue lists evidence so the next engineer can verify independently. When an issue is fixed, move it to the "Resolved" section with the fixing commit.

## Critical

### 1. Google Ads conversion tracking never fires for real bookings
**Evidence:** `index.html` intercepts form submit with `e.preventDefault()` and shows an inline success `<div>` — it never navigates to `thanks.html`. The hidden field `_next` has value `thanks` (a relative path, which Formspree also ignores on AJAX/fetch submissions). The conversion event `ads_conversion_Book_appointment_1` exists **only** in `thanks.html` (line 11).

**Impact:** If Google Ads campaigns are running, they are receiving zero conversion signal — Smart Bidding cannot optimize and ROAS cannot be measured. GA4 also records no booking event, so the funnel is invisible in analytics.

**Fix direction:** Fire `gtag('event', ...)` directly in the form's success handler in `index.html`, or redirect to `/thanks.html` after a successful POST (which also gives customers the richer confirmation page that already exists). Either is a small, low-risk change.

### 2. The admin CRM cannot receive website leads (localStorage is per-browser)
**Evidence:** `index.html` saves submitted leads to `localStorage['esplendor-leads']` — in the **customer's** browser. `admin.html` reads the same key — but only from the **owner's** browser. These are different devices; the data never meets.

**Impact:** The pipeline/revenue dashboard only reflects leads the owner types in manually. If the owner believes the dashboard captures website bookings automatically, leads will be silently missed. The Formspree email is the only real delivery channel.

**Fix direction (pick one, don't build all):** (a) accept manual entry and document it as the workflow; (b) back the CRM with a shared datastore (e.g., Google Sheets via Apps Script endpoint, or a lightweight hosted CRM); (c) use Formspree's dashboard/integrations as the system of record. Decide before building — see ROADMAP.

### 3. Website reviews are presented as "Google Reviews" but are not real
**Evidence:** `index.html` reviews section shows a "5.0 · Google Reviews" badge and three named testimonials dated May/June 2026; git history (`284fe79 Update review dates to May/June 2026`) shows dates are editorially maintained, not sourced from Google. The review CTA links to `https://g.page/r/esplendordetailing/review`, which appears to be a placeholder (real g.page review links contain a random token).

**Impact:** Fabricated consumer reviews violate the FTC's Rule on Consumer Reviews and Testimonials (16 CFR Part 465, effective Oct 2024) with civil penalties per violation, and can get the Google Business Profile suspended. This is a legal/business risk, not just a polish issue.

**Fix direction:** Replace with genuinely earned reviews as they come in (the launch guide's Step 5 process), or reframe the section without the "Google Reviews" claim and named attributions until real reviews exist. Also replace the placeholder review link with the real GBP link.

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

### 8. Missing site hygiene files
No `robots.txt`, no `sitemap.xml`, no favicon, no custom 404 page, no privacy policy. Each is small; the privacy policy matters most since the form collects PII and analytics/ads cookies are in use.

### 9. Formspree free-tier submission cap
~50 submissions/month on the free plan. At target volume (2–5 bookings/day per the launch guide) this will be exceeded — upgrade before it silently drops leads.

### 10. README is still GitHub Desktop tutorial boilerplate
Cosmetic, but confusing for anyone inheriting the repo. (Addressed in the inheritance-audit branch.)

## Resolved

*(none yet — move items here with the fixing commit hash)*
