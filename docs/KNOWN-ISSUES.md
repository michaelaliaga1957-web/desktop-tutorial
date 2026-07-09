# Known Issues

> Last updated: 2026-07-08 (inheritance audit). Ordered by severity. Each issue lists evidence so the next engineer can verify independently. When an issue is fixed, move it to the "Resolved" section with the fixing commit.

## Critical

### 2. The admin CRM cannot receive website leads (localStorage is per-browser)
**Evidence:** `index.html` saves submitted leads to `localStorage['esplendor-leads']` — in the **customer's** browser. `admin.html` reads the same key — but only from the **owner's** browser. These are different devices; the data never meets.

**Impact:** The pipeline/revenue dashboard only reflects leads the owner types in manually. If the owner believes the dashboard captures website bookings automatically, leads will be silently missed. The Formspree email is the only real delivery channel.

**Fix direction (pick one, don't build all):** (a) accept manual entry and document it as the workflow; (b) back the CRM with a shared datastore (e.g., Google Sheets via Apps Script endpoint, or a lightweight hosted CRM); (c) use Formspree's dashboard/integrations as the system of record. Decide before building — see ROADMAP.

### 3. Website reviews are presented as "Google Reviews" but are not real
**Evidence:** `index.html` reviews section shows a "5.0 · Google Reviews" badge and three named testimonials dated May/June 2026; git history (`284fe79 Update review dates to May/June 2026`) shows dates are editorially maintained, not sourced from Google. The review CTA links to `https://g.page/r/esplendordetailing/review`, which appears to be a placeholder (real g.page review links contain a random token).

**Impact:** Fabricated consumer reviews violate the FTC's Rule on Consumer Reviews and Testimonials (16 CFR Part 465, effective Oct 2024) with civil penalties per violation, and can get the Google Business Profile suspended. This is a legal/business risk, not just a polish issue.

**Fix direction:** Replace with genuinely earned reviews as they come in (the launch guide's Step 5 process), or reframe the section without the "Google Reviews" claim and named attributions until real reviews exist. Also replace the placeholder review link with the real GBP link.

**Update 2026-07-08 (Launch Record):** Confirmed the backdating was deliberate (Phase 02) and that the real Google Business Profile has **zero reviews** — so the website's "5.0 · Google Reviews" badge is checkably false by any customer in one tap. The Launch Record's suggested remedy (reviews from friends/family) would itself violate Google review policy and the FTC rule; earn them from real early customers instead. See EVIDENCE-REGISTER C3.

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

### 12. "LICENSED & INSURED" ad callout has no supporting evidence (added 2026-07-08)
**Evidence:** Launch Record Phase 03 added this callout to the Google Ads campaign. No insurance policy appears anywhere in the record; no license exists (none required for detailing in TX — which also makes "licensed" questionable; a DBA is not a license).

**Impact:** False advertising exposure in paid media; also a Google Ads misrepresentation-policy risk. Additionally, operating a mobile detailing business on customers' vehicles without general liability insurance is itself a major uninsured-loss risk.

**Update 2026-07-08 — owner confirmed: no insurance exists.** The owner plans to buy coverage once the first clients make the business profitable. That makes this issue CONFIRMED, not suspected: the "LICENSED & INSURED" callout is a false claim and **must be removed from the Google Ads campaign before the balance is restored and ads resume** (2-minute edit in Ads > Assets > Callouts). Re-add it the day a general liability policy is active (~$40–60/mo for sole-prop detailing). Until insured, the uninsured-damage risk rides on every job.

### 13. Business hours inconsistent across surfaces (added 2026-07-08)
**Evidence:** Website JSON-LD schema says Mon–Sun 07:00–20:00; GBP (per Launch Record Phase 10) says Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed.

**Impact:** Confuses customers and weakens local-SEO consistency signals (Google cross-checks structured data against GBP).

**Update 2026-07-08:** Owner confirmed the GBP hours are the intended ones (Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed). Remaining work: update the website JSON-LD `openingHours` (currently Mo-Su 07:00-20:00) to match. Small code change, pending approval.

## Low

### 8. Missing site hygiene files
No `robots.txt`, no `sitemap.xml`, no favicon, no custom 404 page, no privacy policy. Each is small; the privacy policy matters most since the form collects PII and analytics/ads cookies are in use.

### 9. Formspree free-tier submission cap
~50 submissions/month on the free plan. At target volume (2–5 bookings/day per the launch guide) this will be exceeded — upgrade before it silently drops leads.

### 10. README is still GitHub Desktop tutorial boilerplate
Cosmetic, but confusing for anyone inheriting the repo. (Addressed in the inheritance-audit branch.)

### 14. admin.html launch guide names the wrong county (added 2026-07-08)
Guide Step 2 says file the DBA at Harris County; the actual filing is Fort Bend County (#2026068903, 2026-07-06). Historical now, but the guide is the owner's reference document — correct it on next edit of admin.html.

## Resolved

### 1. Google Ads conversion tracking never fires for real bookings — RESOLVED 2026-07-08
Was: the booking form's AJAX handler showed an inline success div and never reached `thanks.html`, so the Ads conversion (`ads_conversion_Book_appointment_1`, fired on thanks.html load) and any GA4 booking signal never occurred; the Ads goal showed "Misconfigured."
Fix: form now redirects to `/thanks.html` after submission (and the no-JS `_next` field points to the absolute thanks URL). Verified end-to-end in headless Chromium: success path, Formspree-outage path, and validation path all behave correctly.
Remaining owner step: after the fix is live on main, submit one real test booking and confirm the "Book appointment" goal leaves Misconfigured status in Google Ads (24–48 h) before restoring the ads balance.

### 11. Square catalog pricing conflicts with the website — RESOLVED 2026-07-08 (no longer true)
Owner-provided Square Service Library screenshot (2026-07-08) shows the catalog now matches the website exactly: SuperWash $129.99 (3 h 30), Exterior Detail $69.99, Interior Detail $69.99, Pet Hair $39.99, Stain $49.99, Shampoo $49.99, Ceramic $59.99. The Launch Record's "$49.99 SuperWash Package / $79.99 Interior / separate Full Detail" listing was outdated or corrected after that session. Owner confirmed SuperWash = $129.99 canonical.
