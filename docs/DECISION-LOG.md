# Decision Log

> Record significant technical and business decisions here: what was decided, why, and what was rejected. Newest first.

## 2026-08-27 — Reprice to Thumbtack-validated rates (margin correction)
**Decision:** Raised all pricing to match what the business is actually charging and profitably closing on Thumbtack. Exterior Focused **$79.99 → $89.99** (trucks/large SUV **$109.99**); Interior Focused **$79.99 → $99.99** (trucks/large SUV **$119.99**); SuperWash — Car **$189.99 reg / $164.99 first wash** (was $164.99/$139.99); SuperWash — Truck/Large SUV **$214.99 reg / $189.99 first wash** (was $189.99/$164.99). Moto unchanged ($124.99). Add-ons unchanged. $25-off first-SuperWash founding offer retained.
**Why:** The prior site prices were well below the rates customers were paying on Thumbtack (full details closing at $150–190+), so the website was under-quoting and eroding margin — especially the SuperWash, where the true first-wash cost of service warranted $164.99, not $139.99. Thumbtack's live booking data (dozens of closes in one week) validated the higher tier before it was applied to the site.
**Updated in-repo:** index.html (package cards incl. truck/SUV tiers, booking dropdown, hero "starting at", meta description), admin.html (getPrice tiers), outreach templates (classified-ads, facebook-groups-guide, google-business-optimization, outreach-playbook, flyer.html, FIRST_20_CUSTOMERS), ARCHITECTURE pricing table.
**Owner action (off-repo):** Google Business Profile services + description updated to new prices (done). Still to do: **Square catalog**. Google Ads is paused (no price change needed while off). Google's cached search snippet will refresh on re-crawl.
**Note:** Truck/Large SUV tier lines re-introduced on the Focused cards (removed 2026-08-18) — justified by real cost + Thumbtack-proven willingness to pay.

## 2026-08-14 — Premium reprice: Focused $79.99, SuperWash Car $164.99/$139.99, Truck $189.99/$164.99
**Decision:** Raised all pricing to a premium tier. Exterior & Interior Focused **$69.99 → $79.99** (trucks/large SUVs **$89.99**). SuperWash — Car **$149.99 → $164.99 regular**, first-wash **$139.99** ($25 off first). Added an explicit **SuperWash — Truck/Large SUV** tier at **$189.99 regular / $164.99 first wash**. Ceramic add-on unchanged ($59.99). Card/A-frame unaffected (no dollar figures — only "$25 off").
**Why:** Owner decision — a SuperWash is 2.5–4 hrs of labor; the old $124.99 netted ~$35/hr before water/power/product/gas and attracted price-shoppers. Premium pricing pays fairly and filters for better clients. First-wash prices kept under psychological lines ($129.99 range was considered but owner chose $139.99; trucks kept under $200).
**Rejected:** A gentler tier (Car $154.99/$129.99, Truck $179.99/$154.99) and a bolder one (Car $189.99/$164.99) — owner picked the middle.
**Updated in-repo:** index.html (package cards incl. per-package truck rates, booking dropdown, hero + meta), admin.html (getPrice + lead form + outreach scripts), outreach templates (classified-ads, facebook-groups-guide, google-business-optimization, outreach-playbook, flyer.html, FIRST_20_CUSTOMERS), ARCHITECTURE pricing table. Google Ads price assets updated in-platform.
**Owner action (off-repo):** update **Square catalog** and **Google Business Profile** services to the new prices. **Open question:** Moto Detail still $124.99 (index.html + admin.html) — unpriced in this round.

## 2026-08-01 — SuperWash reprice: $149.99 regular / $124.99 founding
**Decision:** Raised SuperWash from a flat $129.99 "Grand Opening Special" to **$149.99 regular**, with the Founding Client $25-off bringing first-timers to **$124.99**. Removed the "Grand Opening Special" framing; the card now shows ~~$149.99~~ → $124.99 anchored on the $25 founding discount. Also added a **Deep Steam Refresh add-on ($39.99)** and a soft **distance/travel fee** for the outer service area.
**Why:** At $129.99 the full detail netted ~$105 before gas + products — not sustainable, especially on distant jobs. $149.99 restores margin on repeat customers while keeping a comparable intro price for founding clients.
**Updated in-repo:** index.html (package card + booking option), admin.html (getPrice + lead form + scripts), outreach templates (classified-ads, facebook-groups-guide, google-business-optimization, flyer.html, FIRST_20_CUSTOMERS), Code.gs test data, ARCHITECTURE pricing table.
**Owner action (off-repo):** update **Square catalog**, **Google Business Profile** services, and any **live marketplace listings** to $149.99; add Google Ads price assets at new prices; reprint flyers. (Reopens the Square⇄website price-sync that was resolved 2026-07-08.)

## 2026-07-08 — Inheritance audit: document before modifying
**Decision:** First engineering session produces documentation only (ARCHITECTURE, KNOWN-ISSUES, ROADMAP, this log). No functional changes to the live site until the audit is reviewed by the owner.
**Why:** The site is live and taking bookings; the highest-risk move on a working system is changing it before understanding it. Two of the top findings (conversion tracking, CRM data flow) also require an owner decision before the right fix is knowable.
**Rejected:** Fixing the conversion-tracking bug in the same session — small change, but bundling fixes into the audit makes the audit harder to review.

## 2026-07-08 — Booking notifications + customer confirmation: Google Apps Script backend (Option B)
**Problem:** Owner received no notification for a live form submission (found it silently sitting in the Formspree dashboard), and customers get no automated confirmation of their booking. Both are consequences of the no-backend architecture: Formspree free tier is the only active delivery channel and its notification email wasn't reaching the owner.
**Decision (recommended, pending owner setup):** Add a Google Apps Script web app bound to a Google Sheet as the booking backend, running alongside Formspree (which becomes backup/archive). One free component provides: instant owner email (+ optional carrier-gateway SMS), branded bilingual customer confirmation email, and a shared Sheet as the CRM system of record — which also resolves the long-standing CRM decision (KNOWN-ISSUES #2, roadmap #13, Option B).
**Rejected:** Formspree paid plan (~$10/mo) — provides auto-responses and higher caps with zero setup, but recurring cost at pre-revenue stage and doesn't give a queryable datastore. Documented as fallback if the Apps Script path proves unreliable. SMS-to-customer via Twilio rejected for now: cost + A2P registration overhead; the owner personally texts within 1 hour anyway.
**Implementation:** `tools/booking-backend/Code.gs` + `SETUP.md` committed; website wiring happens once the owner deploys and provides the /exec URL.

## 2026-07-10 — Co-founder mode: build-first. Shipped Founding Client Offer
**Mandate change:** Owner redefined role from consultant to technical co-founder — execute, don't recommend; ship continuously; assume approval for anything legal/ethical/financially-responsible/measurable.
**Bottleneck targeted:** Trust gap — a 0-review business gives strangers no reason to be first. **Metric:** booking rate + close rate.
**Built & shipped:** "Founding Client Offer — $25 off your first SuperWash (full detail), first 25 Houston clients, in exchange for an honest review." Hero badge + booking-section callout, bilingual. Reframes newness as ground-floor exclusivity and bakes in the review ask (feeds the review engine). Numbers ($25 / 25 clients) are trivially editable in index.html.
**Why this first:** Fully in-house (no third-party setup), deployable immediately, lifts a named metric for every visitor, and manufactures the first jobs that generate the reviews everything else depends on.
**Next loop:** Review engine (Apps Script upgrade — owner redeploys once) to systematize the review generation this offer promises.

## 2026-07-10 — Local presence: DLR-style footer, not separate city pages
**Context:** Studied competitor DLR Detail (dlrdetail.com). Their edge is per-city landing pages + a footer with a Google map and locations list.
**First attempt (reverted):** Built 8 city landing pages (/katy/, /houston/, ...). Owner clarified he only wanted a single DLR-style footer section, not separate pages.
**Decision:** Removed the city pages; built one footer with a Service Areas list (8 cities as text), Site Links, Company links, an embedded Google Map that opens the GBP listing, a service-area blurb, and a large faded "Esplendor" watermark. Sitemap reset to home + privacy.
**Why it's fine:** No harm done (nothing was merged live before the correction); the city-page approach remains valid for later if organic SEO becomes a priority — it lives in git history (commit 42ee0e7).
**Lesson recorded:** Confirm scope on "build like X" requests before mass-generating; owner wanted the visual element, not the architecture.

## 2026-07-08 — Conversion tracking fix: redirect to thanks.html (not inline event)
**Decision:** On successful booking submit, redirect to `/thanks.html` instead of showing the inline success div. The no-JS fallback `_next` now points to the absolute thanks URL.
**Why:** The Google Ads goal is already configured to read the GA4 event fired on thanks.html page load — redirecting makes the existing configuration work with zero Ads-side changes, and customers get the richer confirmation page (next steps + WhatsApp follow-up) that already existed. Verified in headless Chromium: success, Formspree-outage, and validation paths.
**Rejected:** Firing gtag events inline on index.html — would require reconfiguring the Ads goal and GA4 key event; more moving parts for the same outcome.
**Known trade-offs (documented, accepted):** thanks.html is English-only (Spanish-language users get an English confirmation — future improvement); the conversion also fires on direct/refresh visits to thanks.html (inherent to page-load-based goals; page is noindex, low risk).

## 2026-07-08 — Owner decisions recorded
- **SuperWash canonical price: $129.99** (website is source of truth; Square verified matching). *(Superseded 2026-08-01 → $149.99 regular / $124.99 founding — see top entry.)*
- **GBP hours are the intended hours** (Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed); site schema to be aligned.
- **Insurance deferred until first profitable clients** (owner's call). Engineering position on record: the "LICENSED & INSURED" ad callout must come down until then, and liability exposure rides on every uninsured job — revisit as soon as cash flow allows.
- **2 paid jobs completed to date** (friends/family), paid outside Square.

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
