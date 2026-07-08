# Evidence Register

> Tracks every claim about the business and its verification status. This is the mechanism that keeps documentation truthful as materials from previous sessions are merged in.
>
> **Status definitions:**
> - **VERIFIED** — confirmed against a primary source I inspected directly (code, live system, account screenshot, export)
> - **CLAIMED** — asserted by owner or prior-session material, not yet independently confirmed
> - **PARTIAL** — exists but incomplete or diverges from its description
> - **PLANNED** — discussed/designed in a prior session but no evidence of implementation
> - **CONTRADICTED** — evidence conflicts with the claim (link to details)

## Verified baseline (2026-07-08 audit)

| Item | Status | Evidence |
|---|---|---|
| Website code (index/thanks/admin.html) | VERIFIED | Repo audit — see ARCHITECTURE.md |
| GitHub Pages + CNAME esplendordetailing.com | VERIFIED (repo side) | `CNAME` file, repo settings imply Pages; live-site serving NOT yet verified (sandbox network policy blocks outbound fetch) |
| Formspree form `mojokqde` wired into booking form | VERIFIED (code side) | `index.html` form action; email delivery + plan tier unverified |
| GA4 tag `G-S1FBL7829Z` installed | VERIFIED (code side) | index.html + thanks.html; property access/data unverified |
| Google Ads conversion event defined | VERIFIED (code side) | thanks.html — **and verified broken**: never fires (KNOWN-ISSUES #1) |
| Repo history begins 2026-06-17 | VERIFIED | PR #1 merged 2026-06-17; 9 commits total through 2026-07-08; zero GitHub issues; no other branches |
| Original packaging: "Standard Detail" + "Clay Towel Treatment" add-on, later renamed SuperWash / ceramic | VERIFIED | PR #1 body vs current index.html |

## Claimed, awaiting evidence

| Item | Status | Source | Needed to verify |
|---|---|---|---|
| Business registrations (DBA, EIN, bank account) | CLAIMED | Owner (2026-07-08) | Filing confirmations / screenshots |
| Google Business Profile | CLAIMED | Owner | GBP dashboard screenshot, profile URL |
| Google Ads campaigns (existence, spend, status) | CLAIMED | Owner; conversion event in code implies setup | Ads dashboard screenshot: campaigns, spend, conversion action config |
| Marketing infrastructure (branding, flyers, social, advertising) | CLAIMED | Owner | Asset files, account screenshots |
| Payments setup (Square, Zelle, Venmo, Cash App) | CLAIMED | Owner | Account handles / screenshots |
| Automations built in prior sessions | CLAIMED | Owner | Exports/config of whatever runs them |
| Prior-session documentation corpus | CLAIMED | Owner | Exported conversations/files |
| Domain registrar + DNS config | CLAIMED (domain works per owner) | Owner | Registrar name, DNS records screenshot |
| Real customer jobs / revenue to date | UNKNOWN | — | Booking emails, payment records |

## Contradictions log

*(record any conflict between materials and verified reality here, with links)*

- None yet beyond KNOWN-ISSUES #1–#3, which contradict the *implied* claims that conversion tracking works, the dashboard captures website leads, and the site's reviews are real.
