# Roadmap

> Last updated: 2026-07-08 (post Launch Record merge). Ordered by expected ROI, respecting hard dependencies. Re-review at the start of every work session against analytics and KNOWN-ISSUES.md. Completed items move to the bottom with date + commit.

## Phase A — Before spending another advertising dollar

Ads are paused on an overdue ~$10 balance. That pause is a free window: everything in this phase should be done **before** the balance is restored.

1. ~~**Fix conversion tracking**~~ ✅ DONE 2026-07-08 — form redirects to thanks.html; browser-verified. Goes live when merged to main; then submit one test booking and watch the Ads goal leave "Misconfigured."
2. ~~**Reconcile pricing**~~ ✅ RESOLVED 2026-07-08 — Square catalog verified matching the website (screenshot); SuperWash $129.99 canonical.
3. **Make the reviews section truthful** (code) — GBP shows zero reviews; the site's "5.0 Google Reviews" badge is one tap away from being caught. Reframe until real reviews exist; fix the placeholder review link. *(KNOWN-ISSUES #3, C3)*
4. **Remove "LICENSED & INSURED" ad callout** (owner, 2 min in Ads > Assets > Callouts) — owner confirmed no insurance exists yet; the claim must come down before ads resume. Re-add when insured. *(KNOWN-ISSUES #12, C4)*
5. **Align hours** (code, pending approval) — GBP hours confirmed correct by owner; update site JSON-LD to match. *(KNOWN-ISSUES #13, C5)*
6. **Test the funnel end-to-end** — submit a real test booking; confirm Formspree email arrives; confirm the conversion event fires (GA4 DebugView).

## Phase B — First customers & proof (owner-led, this month)

7. **Restore Ads balance and resume** — only after Phase A items 1–4. Consider whether $2/day PMax is worth running at all vs. saving for $10/day; PMax needs conversion volume to learn. Alternative worth pricing: Google Local Services Ads (pay-per-lead) once reviews exist.
8. **Earn the first 5 real Google reviews** — from genuine early customers (launch discounts are fine; friends/family reviews violate policy). This is the #1 Maps-ranking lever per the prior session's own analysis.
9. **First Instagram Reel + before/after cadence** — footage already exists; CapCut workflow was already provided. Post every job.
10. **Real gallery photos on the website** — replace placeholder tiles. *(KNOWN-ISSUES #5)*
11. **EIN → business bank account** — free, 10 minutes at irs.gov, unblocks clean bookkeeping; then update Venmo/Square tax profiles if desired.
12. ~~Confirm Square bank review~~ ✅ VERIFIED 2026-07-08 — $0.82 balance with next-day transfer scheduled. **New item: decide on Square Plus before trial ends (~29 days from 2026-07-08)** — it converts to a paid subscription; downgrade to Square Free unless Plus features are actually used.

## Phase C — Systematize (after first ~10 jobs)

13. **Decide the CRM system of record** — Formspree email + manual admin.html entry (Option A), Google-Sheets-backed store (Option B), or hosted CRM (Option C). Record in DECISION-LOG before building. *(KNOWN-ISSUES #2)*
14. **Review-request automation** — post-job SMS/WhatsApp template with the real GBP review link.
15. **Privacy policy + site hygiene** — privacy page (form PII + GA/Ads), favicon, robots.txt, sitemap.xml, 404. *(KNOWN-ISSUES #8)*
16. **Formspree plan check** — upgrade before the ~50/month free cap bites. *(KNOWN-ISSUES #9)*
17. **Correct admin.html guide** (county, review-policy language) on next admin.html edit. *(KNOWN-ISSUES #14)*

## Phase D — Scale (only when volume justifies)

18. Repeat-business engine — maintenance reminders, simple membership.
19. Booking calendar integration (availability-aware).
20. Referral program formalization ($10-off structure already floated on Nextdoor).
21. Consider LLC + separating liability once revenue is real.

## Principles

- The site works and is live: improve, don't rewrite.
- No new infrastructure before the decision is recorded in DECISION-LOG.md.
- Every change touching the booking flow gets an end-to-end manual test (submit → email → analytics event).
- Marketing claims must be true: no fabricated reviews, no unverifiable badges, no fake urgency.

## Completed

*(none yet)*
