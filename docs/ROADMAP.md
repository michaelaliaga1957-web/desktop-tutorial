# Roadmap

> Last updated: 2026-07-08 (post Launch Record merge). Ordered by expected ROI, respecting hard dependencies. Re-review at the start of every work session against analytics and KNOWN-ISSUES.md. Completed items move to the bottom with date + commit.

## Phase A — Before spending another advertising dollar

Ads are paused on an overdue ~$10 balance. That pause is a free window: everything in this phase should be done **before** the balance is restored.

1. ~~**Fix conversion tracking**~~ ✅ DONE 2026-07-08 — form redirects to thanks.html; browser-verified. Goes live when merged to main; then submit one test booking and watch the Ads goal leave "Misconfigured."
2. ~~**Reconcile pricing**~~ ✅ RESOLVED 2026-07-08 — Square catalog verified matching the website (screenshot); SuperWash $129.99 canonical.
3. ~~**Make the reviews section truthful**~~ ✅ DONE 2026-07-08 — rebuilt as "The Esplendor Standard" (satisfaction-guarantee commitments, same premium design); fake badge/testimonials/placeholder link removed. Re-introduce a real reviews grid once genuine Google reviews exist.
4. ~~**Remove "LICENSED & INSURED" ad callout**~~ ✅ RESOLVED 2026-07-08 — Ads screenshot shows the callout never existed / is already gone; current callouts ("No Shop Required", "Same-Day Available") are truthful. Standing rule: no insurance claims until a policy exists.
5. ~~**Align hours**~~ ✅ DONE 2026-07-08 — site schema now carries the exact GBP hours (Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed), verified from owner's GBP screenshot.
6. **Test the funnel end-to-end** — submit a real test booking on the live site; expect: owner notification email, customer confirmation email, row in the Bookings sheet, Formspree archive entry, and (24–48 h later) the Ads goal leaving "Misconfigured."

## Phase B — First customers & proof (owner-led, this month)

7. **Restore Ads balance and resume** — Phase A items all clear as of 2026-07-08; only the owner's live test booking (item 6) remains before this. Consider whether $2/day PMax is worth running at all vs. saving for $10/day; PMax needs conversion volume to learn. Alternative worth pricing: Google Local Services Ads (pay-per-lead) once reviews exist.
8. **Earn the first 5 real Google reviews** — from genuine early customers (launch discounts are fine; friends/family reviews violate policy). This is the #1 Maps-ranking lever per the prior session's own analysis.
9. **First Instagram Reel + before/after cadence** — footage already exists; CapCut workflow was already provided. Post every job.
10. ~~**Gallery**~~ ✅ DONE 2026-07-10 — rebuilt as "The Detailing Experience" craft showcase (owner-provided imagery, graded to theme, honest framing); real logo emblem now in hero + favicon/og. Swap in real paint shots when captured.
11. **EIN → business bank account** — free, 10 minutes at irs.gov, unblocks clean bookkeeping; then update Venmo/Square tax profiles if desired.
12. ~~Confirm Square bank review~~ ✅ VERIFIED 2026-07-08 — $0.82 balance with next-day transfer scheduled. **Decide on Square Plus before trial ends 2026-08-06** — $49/month after trial (verified on Pricing & Subscriptions page); switch to Square Free unless Plus-only features are in real use.

## Phase C — Systematize (after first ~10 jobs)

13. ~~**CRM system of record → Google Sheet via Apps Script backend**~~ ✅ LIVE 2026-07-08 — owner deployed the web app; website wired (dual-send: backend + Formspree backup); browser-verified. Owner notifications, customer confirmation emails, and Sheet CRM all active. Optional: add carrier SMS gateway for text alerts (one-line config in the script).
14. **Review-request automation** — post-job SMS/WhatsApp template with the real GBP review link.
15. ~~**Privacy policy + site hygiene**~~ ✅ DONE 2026-07-10 (Esplendor 2.0 workstream 1) — privacy.html, robots.txt, sitemap.xml, 404.html, FAQ schema, favicon/og, hours-copy fix.
16. **Formspree plan check** — upgrade before the ~50/month free cap bites. *(KNOWN-ISSUES #9)*
17. **Correct admin.html guide** (county, review-policy language) on next admin.html edit. *(KNOWN-ISSUES #14)*

## Esplendor 2.0 — active build (started 2026-07-10)

> Foundation complete: site is honest, branded, instrumented; booking backend live.
> 2.0 turns the foundation into revenue systems, highest-ROI first.

- ✅ **Trust & SEO layer** (DONE 2026-07-10) — privacy, robots, sitemap, 404, FAQ schema, favicon/og, hours fix. Lifts organic ranking + ad quality score.
- **Review engine** (NEXT) — automated post-job review request via Apps Script + a live on-site reviews display that fills in as real Google reviews arrive.
- **Owner analytics dashboard** — reads the Bookings Sheet: leads by source, revenue, avg ticket, conversion & repeat rate.
- **Referral system** — trackable $10-off codes tied into booking + Sheet.
- **Lifecycle automation** — appointment reminders + 6-week "time for a refresh" repeat-business nudges.
- **Availability-aware booking** — only when volume justifies.

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
