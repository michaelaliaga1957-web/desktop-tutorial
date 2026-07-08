# Decision Log

> Record significant technical and business decisions here: what was decided, why, and what was rejected. Newest first.

## 2026-07-08 — Inheritance audit: document before modifying
**Decision:** First engineering session produces documentation only (ARCHITECTURE, KNOWN-ISSUES, ROADMAP, this log). No functional changes to the live site until the audit is reviewed by the owner.
**Why:** The site is live and taking bookings; the highest-risk move on a working system is changing it before understanding it. Two of the top findings (conversion tracking, CRM data flow) also require an owner decision before the right fix is knowable.
**Rejected:** Fixing the conversion-tracking bug in the same session — small change, but bundling fixes into the audit makes the audit harder to review.

## Inherited decisions (from Launch Record PDF, prior session, July 2026)

- **Sole proprietorship with DBA + SSN** (no LLC, no EIN yet) — cheapest fastest legal start ($14 Fort Bend filing). Consequence: personal liability until insured/restructured; EIN and bank account still pending.
- **UPS Store PMB as public business address** — protects home address on GBP, Venmo, Nextdoor.
- **Performance Max at $2/day** (cut from $10/day for cash-flow reasons) — PMax at $2/day with no conversion signal has essentially no learning ability; revisit budget and campaign type when ads resume.
- **Personal WhatsApp migrated to WhatsApp Business** — auto-reply scoped to non-contacts so friends aren't spammed.
- **Square in Services mode + Venmo business as primary rails**; Cash App skipped for now; Zelle informal via phone number.
- **Website reviews deliberately backdated at owner request** (Phase 02, commit 284fe79) — flagged post-hoc as a legal risk in KNOWN-ISSUES #3 / EVIDENCE-REGISTER C3; recommend reversal.

## Inherited decisions (reconstructed from git history, pre-audit)

- **Static site on GitHub Pages, no backend** (`e51ed29`, `6f477dd`) — zero hosting cost, atomic deploys, minimal attack surface. Consequence: no server-side data store, hence the localStorage CRM limitation (Known Issues #2).
- **Formspree for booking delivery** (`23ea54b`, form `mojokqde`) — email-based lead delivery without a backend. Free-tier cap ~50/month.
- **Custom domain esplendordetailing.com** (`9025906`) — via CNAME file.
- **Bilingual EN/ES single page** — class-toggle approach (`.lang-en`/`.lang-es`), no duplicate pages. Good fit for the Houston market.
- **Separate thanks.html with Ads conversion event** (`aa2b39a`, `c1d228b`) — intended as the conversion-tracking page; currently disconnected from the AJAX form flow (Known Issues #1).
- **Client-side dashboard in admin.html** (`6f477dd`) — pipeline CRM + launch playbook with no infrastructure. Trade-off accepted implicitly: per-browser data, cosmetic auth.
