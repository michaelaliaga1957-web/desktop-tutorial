# Evidence Register

> Tracks every claim about the business and its verification status. This is the mechanism that keeps documentation truthful as materials from previous sessions are merged in.
>
> **Status definitions:**
> - **VERIFIED** — confirmed against a primary source I inspected directly (code, git history, GitHub API)
> - **DOCUMENTED** — supported by the owner-provided Launch Record PDF (2026-07-08, 18 pp), which describes screenshots and outcomes; credible but not independently re-verified
> - **CLAIMED** — asserted without documentary support
> - **PARTIAL** — exists but incomplete or diverges from its description
> - **PLANNED** — designed/discussed, no evidence of implementation
> - **CONTRADICTED** — evidence conflicts with the claim (see Contradictions log)
>
> **Primary sources received:**
> 1. Repository audit, 2026-07-08 (code, git history, GitHub PRs/issues)
> 2. "Esplendor Detailing — Full Launch Record" PDF, exported 2026-07-08 — session record of the prior Claude Code launch session

## Register

| Item | Status | Detail / evidence |
|---|---|---|
| Website code + GitHub Pages + domain | VERIFIED | Repo audit; live serving confirmed by Launch Record screenshots (GBP showing site, ad screenshots) |
| Owner identity | DOCUMENTED | Michael Aliaga Valle, sole proprietor |
| DBA "Esplendor Detailing" | DOCUMENTED | Fort Bend County Clerk, file #2026068903, filed 2026-07-06, $14 fee |
| UPS Store PO Box (public business address) | DOCUMENTED | 3418 Hwy 6 South, Suite B, PMB 357, Houston TX 77082 |
| Google Ads campaign "Mobile Detailing Houston" | DOCUMENTED | Performance Max, $2/day (cut from $10/day); 7-day results: 1,680 impressions, 16 clicks, $0.63 CPC, $10.05 spent |
| Google Ads — **currently PAUSED** | DOCUMENTED | Overdue balance ~$9.93 (card declined by $0.07); ads not spending |
| Google Ads advertiser identity verification | DOCUMENTED | Completed before 2026-08-07 deadline |
| Google Ads assets | DOCUMENTED | 11 headlines, 4 descriptions, 15 images, 4 sitelinks, 2 callouts ("LICENSED & INSURED", "SAME-DAY APPOINTMENTS"); ad strength Poor→Average |
| Google Ads conversion goal "Book appointment" | FIXED IN CODE 2026-07-08 | Form now redirects to /thanks.html (verified headless-browser test); goal status in Ads UI to be confirmed after deploy + test booking. Ads UI banner "Set up conversion tracking" (screenshot) had confirmed the gap |
| GA4 property + tag installed | VERIFIED (code) + DOCUMENTED (property) | G-S1FBL7829Z on index + thanks |
| Google Business Profile | DOCUMENTED | Verified badge; hours set (Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed); 8 services; booking link; service-area-only business; **zero reviews** |
| Instagram business profile | DOCUMENTED | @esplendordetailing, business account, work photos, linked to GBP; first Reel NOT done |
| Nextdoor business page | DOCUMENTED | Persona-verified (SSN), blue checkmark, launch post live with photos |
| WhatsApp Business | DOCUMENTED | Personal number migrated; greeting auto-reply ON, scoped to "everyone not in address book" |
| Square account | VERIFIED (screenshots 2026-07-08) | Services mode, Tap to Pay; **Square Plus TRIAL, 29 days left — converts to paid unless downgraded**; balance $0.82 with next-day transfer scheduled → bank link working |
| Square service catalog pricing | VERIFIED consistent | Screenshot 2026-07-08 matches website exactly; C2 resolved |
| Venmo business profile | DOCUMENTED | @ESPLENDORDETAILING, Individual/SSN type, logo, description, 6 photos, PO Box address, website + Instagram linked |
| Zelle | CLAIMED | Via phone number 713-501-0461 (admin guide); no setup evidence |
| Cash App | PLANNED | Mentioned in admin guide Step 8 only; no evidence it exists |
| EIN | PLANNED | Listed as still-to-do in Launch Record |
| Business bank account | PLANNED | Blocked on EIN; still-to-do |
| Business insurance | **CONFIRMED NONE** (owner, 2026-07-08) | Planned once profitable; ads callout must come down first — see C4 |
| Website reviews backdated to May/Jun 2026 | VERIFIED | Commit 284fe79 + Launch Record Phase 02: owner requested reviews "look like they were given the past 2 months"; reviews are not from real customers |
| Completed customer jobs / revenue | DOCUMENTED (owner, 2026-07-08) | **2 paid jobs completed** (friends/family); Square net sales still $0.00 → paid via cash/Venmo/Zelle |
| Formspree email delivery | CLAIMED | Form wired (verified in code); no delivery confirmation seen |
| Domain registrar | UNKNOWN | Still not recorded — business-continuity gap |

## Contradictions log

**C1 — "Conversion tracking works end to end" (Launch Record, Phase 11 + Mission Assessment) — FALSE.**
The record claims "Every completed booking fires a conversion event to Google Ads" and predicts the "Misconfigured" status "will resolve within 24–48 hours." Verified against code: the conversion fires only on `thanks.html` page load, and the booking form's AJAX handler never navigates there (KNOWN-ISSUES #1). The goal has been Misconfigured since creation and will stay so until fixed. Consequence: the Performance Max campaign ran ~7 days with zero conversion signal. **Must be fixed before the Ads balance is restored.**

**C2 — Square catalog pricing conflicts with the website — RESOLVED 2026-07-08.**
Owner-provided Square Service Library screenshot shows the catalog matches the website exactly (SuperWash $129.99 / 3h30, Exterior $69.99, Interior $69.99, all four add-ons at website prices). The Launch Record's conflicting listing was outdated. Owner confirmed SuperWash = $129.99 canonical.

**C3 — Website claims "5.0 · Google Reviews" while the actual Google Business Profile has zero reviews.**
Confirmed on both sides: fabricated backdated reviews on the site (Phase 02, commit 284fe79) vs. GBP with no reviews (Phase 10 — identified there as the #1 Maps-ranking blocker). Any customer who checks Google sees the discrepancy. FTC fake-review rule exposure plus GBP suspension risk. The Launch Record's suggested remedy — reviews from friends and family — also violates Google policy and the FTC rule (undisclosed insider reviews); the safe path is reviews from real early customers.

**C4 — Ads callout "LICENSED & INSURED" has no supporting evidence.**
No insurance appears anywhere in the record (and no license — none is required for detailing in Texas, but that makes the word "licensed" shaky too; a DBA is a name registration, not a license). **Owner confirmed 2026-07-08: no insurance exists** (planned once profitable). The callout is therefore a confirmed false claim — remove it in Google Ads before ads resume; re-add when a policy is active.

**C5 — Hours are inconsistent across surfaces.**
Website JSON-LD schema: Mon–Sun 07:00–20:00. GBP: Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed. Owner confirmed 2026-07-08 the GBP hours are correct; website JSON-LD update pending (KNOWN-ISSUES #13).

**C6 — admin.html launch guide says DBA at Harris County; actual filing was Fort Bend County.**
Historical doc error, harmless now, but the guide should match reality since it's the owner's reference.
