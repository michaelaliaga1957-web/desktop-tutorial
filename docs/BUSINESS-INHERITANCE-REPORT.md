# Business Inheritance Report — Esplendor Detailing

> Prepared 2026-07-08. Sources: full repository audit (verified) + owner-provided "Full Launch Record" PDF (documented) + GitHub API sweep. Every claim's verification status is tracked in [EVIDENCE-REGISTER.md](EVIDENCE-REGISTER.md). Open unknowns are listed in §10.

## 1. Current State of the Business

Esplendor Detailing is a **pre-revenue (or near-zero-revenue), legally registered, fully-branded mobile detailing startup** in Houston, TX, owned and operated solo by Michael Aliaga Valle as a sole proprietorship. It launched over roughly three weeks (website June 17 → DBA July 6 → launch record July 8, 2026).

The honest one-line assessment: **the storefront is built and the doors are open, but no customers have verifiably walked through yet, and the two systems meant to bring them in (paid ads, Maps ranking) are both stalled** — ads paused on a ~$10 balance, Maps ranking suppressed by zero reviews. Meanwhile the measurement layer that would make advertising rational is broken (conversion tracking never fires), and there are truth-in-advertising exposures (fabricated site reviews, an "insured" claim without evidence of insurance) that should be cleaned up before scale is attempted.

This is a normal and healthy state for week 3 of a bootstrap — provided the next moves are proof (first jobs, first real reviews) rather than more infrastructure.

## 2. Existing Assets

- **Domain & website** — esplendordetailing.com; bilingual EN/ES single-page site, professional luxury design; booking form; confirmation page; owner dashboard
- **Brand** — name, logo, gold/black identity applied consistently across website, Instagram, Nextdoor, Venmo, GBP
- **Legal** — DBA (Fort Bend County #2026068903); UPS PMB business address shielding the home address
- **Accounts** — Google Ads (identity-verified), GA4 property, Google Business Profile (verified), Instagram business, Nextdoor business (identity-verified + live post), WhatsApp Business with auto-reply, Square (Tap to Pay + service catalog), Venmo business (@ESPLENDORDETAILING)
- **Ad creative** — 11 headlines, 4 descriptions, 15 images, 4 sitelinks, 2 callouts (strength: Average)
- **Content raw material** — work photos on Instagram/Venmo; detailing video footage awaiting first Reel
- **Documentation** — this docs/ suite (architecture, issues, roadmap, decisions, evidence register)

## 3. Existing Systems

| System | State |
|---|---|
| Lead capture | Website form → Formspree → email to owner. Works (code-verified wiring; delivery untested by me). WhatsApp/SMS/call as parallel channels with auto-reply on WhatsApp |
| Lead management | Manual: admin.html pipeline dashboard (owner-entered only — it cannot receive website leads by design of localStorage; Formspree email is the real inbox) |
| Scheduling | Manual call/text confirmation within 1 hour; no calendar system in active use |
| Payments | Square Tap to Pay (bank review outcome unconfirmed), Venmo business, Zelle by phone, cash |
| Analytics | GA4 pageviews live; conversion tracking **broken** (defined but never fires) |
| Paid acquisition | PMax campaign built; **paused** on overdue balance; 7-day test: 1,680 impressions, 16 clicks, $0.63 CPC, $10.05 spent, 0 tracked conversions |
| Organic acquisition | GBP verified & optimized (zero reviews), Nextdoor post live, Instagram profile live (no Reels yet) |
| Automation | Exactly one: WhatsApp greeting auto-reply for unknown contacts. Nothing else is automated |

## 4. Current Architecture

Fully documented in [ARCHITECTURE.md](ARCHITECTURE.md). Summary: a zero-backend static site (three hand-written HTML files) on GitHub Pages behind a custom domain; Formspree as the only server-side component (email relay); Google tag for analytics; all business operations run on third-party consumer/SMB platforms (Google, Meta, Nextdoor, Square, Venmo, WhatsApp). There is no database anywhere; the only structured business data store is a localStorage CRM in the owner's browser plus the Formspree email trail.

This architecture is **appropriate for the current stage** — $0/month fixed cost, nothing to maintain, atomic deploys — and should not be rebuilt until real volume exposes its limits (see §14).

## 5. Operational Workflows

1. **Booking:** customer finds site → submits form → Formspree email → owner calls/texts within 1 hour (public promise) → confirms slot. No calendar integration; double-booking prevention is the owner's memory.
2. **Service day:** owner drives to customer with equipment; no route planning, reminders, or job checklist systems.
3. **Payment:** after inspection — Square tap, Venmo, Zelle, or cash. Square catalog prices conflict with the website (Known Issues #11) — must reconcile before first card checkout.
4. **Post-job:** review request is aspirational (scripts exist in admin guide; real GBP review link not yet in hand); no follow-up or repeat-booking loop.
5. **Bookkeeping:** none evidenced — no EIN, no business bank account; money lands in personal accounts. Fine for week 3, unsustainable past the first dozen jobs.

## 6. Marketing Infrastructure

- **Paid:** Google Ads PMax "Mobile Detailing Houston," $2/day, paused. Early data is actually encouraging — $0.63 CPC and a ~1% CTR — but with zero conversion signal PMax cannot optimize, and $2/day is below the volume PMax needs to learn. Decision needed on budget/type at resume (see roadmap Phase B).
- **Local SEO:** GBP verified, well-filled (8 services, booking link, service-area setup). Ranking blocked by zero reviews vs competitors with 84–375. This is the highest-leverage free channel.
- **Social/community:** Nextdoor verified with a well-crafted hyperlocal launch post ($10-off hook); Instagram profile ready but the content flywheel (Reels, before/afters) hasn't started.
- **Website SEO:** solid on-page basics (meta, schema, canonical); no sitemap/robots; schema hours conflict with GBP (Known Issues #13).
- **Conversion surfaces:** strong — WhatsApp/call FABs, SMS deep links, bilingual content. Undermined by placeholder gallery and fabricated reviews.

## 7. Technical Infrastructure

GitHub repo (`michaelaliaga1957-web/desktop-tutorial`) → GitHub Pages → esplendordetailing.com (CNAME; registrar unrecorded — continuity gap). No CI, no build, no tests, no staging: acceptable at this scale, with the discipline that any booking-flow change gets a manual end-to-end test. Dev workflow to date has been Claude Code sessions pushing directly to main.

## 8. Strengths

1. **Cost structure:** ~$0 fixed monthly cost; nothing bleeds while the business finds its feet.
2. **Brand quality far above segment norm** — the site genuinely outclasses typical solo-detailer web presence; consistent identity across seven platforms.
3. **Legal hygiene done early** — DBA, address privacy via PMB, Ads identity verification completed before the Aug 7 deadline.
4. **Full-funnel skeleton exists** — every stage from discovery to payment has *something* standing; V2 is about strengthening stages, not building from nothing.
5. **Bilingual EN/ES** — real differentiation in the Houston market.
6. **Early ad data suggests demand** — 16 clicks at $0.63 in 7 days on $2/day means the search volume and click-through are there.
7. **Owner execution speed** — DBA filed in person, verifications completed, platforms stood up within days.

## 9. Risks

1. **Truth gap (highest):** fabricated "Google Reviews" on the site vs zero real GBP reviews — FTC fake-review rule exposure (per-violation civil penalties), GBP suspension risk, and instant credibility loss with any customer who checks. Compounded by the "LICENSED & INSURED" ad claim with no evidence of insurance.
2. **Uninsured operations:** hand-detailing strangers' vehicles with no evidenced liability coverage; one scratched Tesla erases months of profit.
3. **Blind ad spend:** resuming ads before fixing conversion tracking burns money unmeasurably (PMax without conversions can't learn).
4. **Single-human dependency:** every function — sales, service, follow-up — is the owner; no data backup beyond email trail (localStorage CRM can vanish with browser data).
5. **Revenue leak at checkout:** Square/website pricing conflict ($49.99 vs $129.99 SuperWash).
6. **Account-continuity gaps:** domain registrar unknown; Square bank verification outcome unknown; all platform credentials undocumented.
7. **Personal/business commingling:** no EIN/bank account; SSN used across Nextdoor, Venmo, Ads verification (normal for sole props, but concentrates identity risk).

## 10. Missing Components (and open unknowns)

**Missing:** business insurance · EIN · business bank account · real reviews · real gallery photos · first Reel/content engine · real GBP review link · privacy policy · sitemap/robots/favicon/404 · calendar/scheduling system · post-job follow-up & repeat-booking loop · referral mechanism · bookkeeping.

**Unknown (owner to confirm):** Square bank review outcome · domain registrar · Zelle actually configured? · any completed paid jobs / revenue to date? · Formspree deliverability confirmed? · actual operating hours (site vs GBP conflict) · does insurance exist at all?

## 11. Technical Debt

Manageable and mostly documented in [KNOWN-ISSUES.md](KNOWN-ISSUES.md): broken conversion path (#1), localStorage CRM data island (#2), client-side admin password (#4), pricing triplicated across surfaces (#7), single-file pages (fine for now), no tests/CI (fine for now), hygiene files missing (#8). None of it demands a rewrite; all of it is fixable incrementally.

## 12. Business Debt

The launch optimized for *looking established* ahead of *being established*, and that bill is now due:

1. **Fabricated reviews** must be unwound before they're discovered rather than after (the Launch Record's friends-and-family remedy would deepen, not fix, the violation).
2. **"Licensed & insured"** must become true or come down.
3. **Unreconciled pricing** across website/Square/dashboard means the flagship product has three identities.
4. **Placeholder gallery** on a business whose product *is* visual transformation.
5. **The "1-hour confirmation" promise** is made 24/7 on the site while GBP says closed Sundays and evenings — a promise-capacity mismatch.
6. **No bookkeeping** — every job from here creates tax-season debt.

## 13. Highest ROI Opportunities

1. **Fix conversion tracking while ads are paused** (an hour of work; makes every future ad dollar measurable; the pause is a free maintenance window).
2. **First 5 real reviews from real customers** — the prior session's own analysis identified zero reviews as the #1 Maps blocker; competitors' review counts are the moat. Even 5 honest reviews likely moves Maps ranking materially. Pairs with unwinding the fake ones.
3. **Reconcile pricing before first Square checkout** — 30 minutes; protects an $80/job margin error on the flagship.
4. **Post the first Reel and start the before/after cadence** — footage exists, workflow was already provided; in this industry organic visual proof outperforms paid at this scale, and it's free.
5. **Insurance** — modest cost, removes the single largest tail risk, and makes the ad callout true.
6. **EIN + bank account** — 10 minutes + a branch visit; unblocks clean books permanently.

## 14. Recommended Execution Order

Detailed in [ROADMAP.md](ROADMAP.md). Sequence logic:

- **Phase A — Truth & plumbing (this week, before restoring the ads balance):** fix conversion tracking → reconcile pricing → make the reviews section honest → verify/remove "insured" claim (and buy insurance) → align hours → end-to-end funnel test. Everything here is either free or an hour of code.
- **Phase B — Proof (this month):** resume ads with working measurement (reconsider $2/day PMax vs saving for $10/day or LSAs) → win first customers via Nextdoor/Instagram/GBP → earn first 5 real reviews → real photos → EIN/bank → confirm Square deposits.
- **Phase C — Systematize (after ~10 jobs):** pick the CRM system of record → automate review requests → site hygiene/privacy policy → Formspree plan.
- **Phase D — Scale (when volume demands):** repeat-business engine, calendar integration, referral program, entity upgrade (LLC).

The unifying principle for V2: **this business's bottleneck is not software — it's proof.** Code work in Phase A removes landmines; everything after that should be judged by whether it produces jobs, reviews, and repeatable operations. V2.0 should make the operating system *true, measured, and repeatable* before making it bigger.
