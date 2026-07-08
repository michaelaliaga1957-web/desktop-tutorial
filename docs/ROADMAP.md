# Roadmap

> Last updated: 2026-07-08 (post Launch Record merge). Ordered by expected ROI, respecting hard dependencies. Re-review at the start of every work session against analytics and KNOWN-ISSUES.md. Completed items move to the bottom with date + commit.

## Phase A — Before spending another advertising dollar

Ads are paused on an overdue ~$10 balance. That pause is a free window: everything in this phase should be done **before** the balance is restored.

1. **Fix conversion tracking** (code) — fire the GA4/Ads conversion on successful form submit (or redirect to thanks.html). Without this, PMax spends blind. *(KNOWN-ISSUES #1, EVIDENCE-REGISTER C1)*
2. **Reconcile pricing across website ↔ Square ↔ admin.html** (owner decision + code) — resolve the $49.99 vs $129.99 SuperWash conflict before the first Square checkout. *(KNOWN-ISSUES #11, C2)*
3. **Make the reviews section truthful** (code) — GBP shows zero reviews; the site's "5.0 Google Reviews" badge is one tap away from being caught. Reframe until real reviews exist; fix the placeholder review link. *(KNOWN-ISSUES #3, C3)*
4. **Verify or remove "LICENSED & INSURED" ad callout** (owner) — and get general liability insurance regardless; it's the bigger risk. *(KNOWN-ISSUES #12, C4)*
5. **Align hours everywhere** (owner decision + code) — site schema vs GBP conflict. *(KNOWN-ISSUES #13, C5)*
6. **Test the funnel end-to-end** — submit a real test booking; confirm Formspree email arrives; confirm the conversion event fires (GA4 DebugView).

## Phase B — First customers & proof (owner-led, this month)

7. **Restore Ads balance and resume** — only after Phase A items 1–4. Consider whether $2/day PMax is worth running at all vs. saving for $10/day; PMax needs conversion volume to learn. Alternative worth pricing: Google Local Services Ads (pay-per-lead) once reviews exist.
8. **Earn the first 5 real Google reviews** — from genuine early customers (launch discounts are fine; friends/family reviews violate policy). This is the #1 Maps-ranking lever per the prior session's own analysis.
9. **First Instagram Reel + before/after cadence** — footage already exists; CapCut workflow was already provided. Post every job.
10. **Real gallery photos on the website** — replace placeholder tiles. *(KNOWN-ISSUES #5)*
11. **EIN → business bank account** — free, 10 minutes at irs.gov, unblocks clean bookkeeping; then update Venmo/Square tax profiles if desired.
12. **Confirm Square bank-account review completed** — otherwise card payments can't deposit.

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
