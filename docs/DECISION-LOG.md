# Decision Log

> Record significant technical and business decisions here: what was decided, why, and what was rejected. Newest first.

## 2026-07-08 — Inheritance audit: document before modifying
**Decision:** First engineering session produces documentation only (ARCHITECTURE, KNOWN-ISSUES, ROADMAP, this log). No functional changes to the live site until the audit is reviewed by the owner.
**Why:** The site is live and taking bookings; the highest-risk move on a working system is changing it before understanding it. Two of the top findings (conversion tracking, CRM data flow) also require an owner decision before the right fix is knowable.
**Rejected:** Fixing the conversion-tracking bug in the same session — small change, but bundling fixes into the audit makes the audit harder to review.

## Inherited decisions (reconstructed from git history, pre-audit)

- **Static site on GitHub Pages, no backend** (`e51ed29`, `6f477dd`) — zero hosting cost, atomic deploys, minimal attack surface. Consequence: no server-side data store, hence the localStorage CRM limitation (Known Issues #2).
- **Formspree for booking delivery** (`23ea54b`, form `mojokqde`) — email-based lead delivery without a backend. Free-tier cap ~50/month.
- **Custom domain esplendordetailing.com** (`9025906`) — via CNAME file.
- **Bilingual EN/ES single page** — class-toggle approach (`.lang-en`/`.lang-es`), no duplicate pages. Good fit for the Houston market.
- **Separate thanks.html with Ads conversion event** (`aa2b39a`, `c1d228b`) — intended as the conversion-tracking page; currently disconnected from the AJAX form flow (Known Issues #1).
- **Client-side dashboard in admin.html** (`6f477dd`) — pipeline CRM + launch playbook with no infrastructure. Trade-off accepted implicitly: per-browser data, cosmetic auth.
