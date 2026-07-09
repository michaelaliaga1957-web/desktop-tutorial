# Esplendor Detailing — System Architecture

> Last updated: 2026-07-08 · Maintained as living documentation. Update this file whenever the system changes.

## 1. What this business is

Esplendor Detailing is a mobile car detailing company serving Houston, TX. Customers book online, by phone/SMS (713-501-0461), or via WhatsApp; the team travels to the customer (driveway, office, apartment) and payment is collected after service (card via Square, Zelle, Venmo, Cash App, or cash).

**Digital presence:**
- Website: https://esplendordetailing.com
- Instagram: @esplendordetailing
- WhatsApp: wa.me/17135010461

## 2. High-level architecture

The website is a **static site (GitHub Pages)** with one serverless component: a **Google Apps Script booking backend** running under the owner's Google account. No servers to maintain, no build step, no framework.

```
Customer browser
   │
   ├── index.html  (marketing site + booking form, bilingual EN/ES)
   │      ├── POST → Apps Script backend (owner's account)
   │      │            ├── appends row → "Esplendor Bookings" Google Sheet (CRM system of record)
   │      │            ├── emails owner instantly (optional carrier-gateway SMS)
   │      │            └── emails customer a branded bilingual confirmation
   │      ├── POST → Formspree (form ID: mojokqde) — backup/archive channel
   │      ├── gtag.js → Google Analytics 4 (G-S1FBL7829Z)
   │      └── saves lead copy → customer's browser localStorage (tertiary local copy)
   │      then redirects → thanks.html
   │
   ├── thanks.html (booking confirmation page — fires the Google Ads conversion event)
   │
   └── admin.html  (owner dashboard: optional manual pipeline views + launch guide;
                    the Google Sheet is the authoritative lead store)
```

Backend source lives in `tools/booking-backend/` (Code.gs + SETUP.md); deployed 2026-07-08.

## 3. Repository & hosting

| Item | Value |
|---|---|
| Repository | `michaelaliaga1957-web/desktop-tutorial` (GitHub) |
| Hosting | GitHub Pages, deployed from `main` |
| Custom domain | `esplendordetailing.com` via `CNAME` file |
| Deploy process | Push to `main` → GitHub Pages publishes automatically (no CI, no build) |
| TLS | Provided by GitHub Pages (verify "Enforce HTTPS" is enabled in repo Settings → Pages) |

There are no environment variables, secrets, or third-party build dependencies. External runtime dependencies are Google Fonts, gtag.js, and Formspree — all loaded from their CDNs.

## 4. File map

### `index.html` (~78 KB, single file: content + CSS + JS)
Bilingual (English/Spanish) single-page marketing site. Language toggle persists in `localStorage['esplendor-lang']`; `.lang-en`/`.lang-es` classes on `<html>` show/hide `<span class="en">`/`<span class="es">` pairs.

Sections in order: nav · floating WhatsApp/call buttons · hero (`#home`) · how it works (`#how`) · services (`#services`) · add-ons (`#addons`) · booking form (`#booking`) · gallery (`#gallery`, placeholders until real job photos) · The Esplendor Standard (`#reviews` — satisfaction-guarantee commitments; becomes a real reviews grid once genuine Google reviews exist) · why us (`#why`) · payment (`#payment`) · FAQ (`#faq`) · contact (`#contact`) · footer.

SEO: meta description/keywords, canonical URL, Open Graph tags, JSON-LD `AutoWash` LocalBusiness schema.

### `thanks.html`
Booking-confirmation page. `noindex`. Fires GA4 config **plus the Google Ads conversion event `ads_conversion_Book_appointment_1`**. Includes "what happens next" steps and a WhatsApp follow-up button. The booking form redirects here after every submission (fixed 2026-07-08).

### `admin.html` (~48 KB)
Client-side business dashboard, `noindex,nofollow`. Password gate (`esplendor2025`, hardcoded in source — see Known Issues #3) with `sessionStorage` auth flag. Four views:
1. **Pipeline** — kanban board: New → Confirmed → In Progress → Completed → Paid
2. **Clients** — filterable table with add/edit/delete lead modal
3. **Revenue** — revenue stats derived from lead package/add-on pricing (`getPrice()`)
4. **Launch Guide** — 11-step operational playbook (Formspree setup, business registration, Instagram, WhatsApp Business, reviews, Nextdoor/Facebook, flyers, payments, Google Calendar, response scripts, daily goals)

Data store: `localStorage['esplendor-leads']` (JSON array). CSV export available.

### `CNAME`
Contains `esplendordetailing.com` — required by GitHub Pages for the custom domain. **Do not delete.**

### `README.md`
Project overview and pointers to this documentation.

## 5. Pricing model (source of truth: index.html + admin.html `getPrice()`)

| Offering | Price |
|---|---|
| Exterior Focused | $69.99 |
| Interior Focused | $69.99 |
| SuperWash (inside & out) | $129.99 |
| Add-on: Pet Hair Removal | +$39.99 |
| Add-on: Stain Removal | +$49.99 |
| Add-on: Shampoo Carpets & Seats | +$49.99 |
| Add-on: 1-Year Ceramic Protection | +$59.99 |

⚠ Pricing is duplicated in three places: the services section, the booking form `<option>` values, and `admin.html getPrice()`. Any price change must update all three.

## 6. Booking / lead flow (as implemented today)

1. Customer fills the form on `index.html#booking` (name, phone, email, vehicle, package, add-ons, date, time window, address, notes). Honeypot field `_gotcha` deters spam bots.
2. JS validates required fields, saves a local lead copy, then POSTs to the **Apps Script backend** (urlencoded, `no-cors`, `keepalive`) and to **Formspree** (backup/archive).
3. Backend: row appended to the "Esplendor Bookings" Sheet → owner notification email (optional SMS) → customer confirmation email (if email provided). Errors are emailed to the owner — never silent.
4. Browser redirects to `thanks.html`, which fires the GA4/Google Ads conversion event.
5. Owner confirms by call/text within 1 hour (the promise made on the site).

**Lead delivery (since 2026-07-08):** primary channel is the Google Apps Script booking backend (owner's account; see `tools/booking-backend/`) — it appends every booking to the "Esplendor Bookings" Google Sheet (CRM system of record), emails the owner instantly, and sends the customer a branded bilingual confirmation email. Formspree remains connected as backup/archive. The admin.html dashboard is an optional manual tool; the Sheet is authoritative.

Formspree free tier allows ~50 submissions/month — monitor volume and upgrade before it becomes a silent lead-loss point.

## 7. Analytics & advertising

- **GA4** property `G-S1FBL7829Z` on `index.html` and `thanks.html`.
- **Google Ads conversion** `ads_conversion_Book_appointment_1` fires on every `thanks.html` load, which every booking now reaches (fixed 2026-07-08). The Ads goal "Book appointment" reads this GA4 event.

## 8. Security & privacy posture

- Minimal attack surface: static site + one Apps Script web app (unguessable URL, honeypot-filtered, accepts only booking-shaped fields; worst case spam adds sheet rows). Customer data lives in the owner's Google Sheet, Formspree's archive, and Gmail.
- `admin.html` is publicly served (any visitor can load it) and its password is visible in page source. The real exposure is limited because lead data lives only in the owner's browser, but the password and the internal playbook are public. Treat `admin.html` as *obscured*, not *secured*.
- Customer PII (name, phone, address) transits Formspree and Google (analytics). No privacy policy page exists yet.

## 9. Business systems outside the repository

> Source: owner-provided Launch Record PDF (2026-07-08) cross-checked against the repo. Statuses per EVIDENCE-REGISTER.md. Owner: **Michael Aliaga Valle**, sole proprietor.

### Legal & identity
| Item | Status | Detail |
|---|---|---|
| DBA "Esplendor Detailing" | ✅ Filed | Fort Bend County Clerk, file #2026068903, 2026-07-06 |
| Public business address | ✅ Active | UPS Store PMB: 3418 Hwy 6 South, Suite B, PMB 357, Houston TX 77082 (protects home address; used on GBP, Venmo, Nextdoor) |
| EIN | ❌ Not yet | Free at irs.gov; prerequisite for business bank account |
| Business bank account | ❌ Not yet | Blocked on EIN |
| Business insurance | ❌ None (owner-confirmed 2026-07-08) | Planned once profitable; no insurance claims allowed in ads/site until then |

### Marketing & acquisition
| Item | Status | Detail |
|---|---|---|
| Google Ads "Mobile Detailing Houston" | ⏸ **Paused** (overdue balance ~$10) | Performance Max, $2/day (cut from $10); 7-day run: 1,680 impr, 16 clicks, $0.63 CPC, $10.05 spent, **0 tracked conversions** (tracking broken — KNOWN-ISSUES #1); advertiser identity verified; 11 headlines / 4 descriptions / 15 images / 4 sitelinks / 2 callouts; strength Average |
| Google Ads conversion goal | ❌ Misconfigured | Tracks /thanks.html page load, never reached — fix before resuming spend |
| Google Business Profile | ✅ Verified & optimized | Service-area business (no address shown); 8 services; booking link; hours Mon–Wed & Fri–Sat 9–8, Thu 9–5, Sun closed; **zero reviews** = weak Maps ranking (competitors: DD Auto Spa 375 reviews, Diamond Auto Spa 84) |
| GA4 | ✅ Live | Property for esplendordetailing.com, tag G-S1FBL7829Z on all pages |
| Instagram | ✅ Business profile | @esplendordetailing, photos up, linked to GBP; first Reel not yet posted |
| Nextdoor | ✅ Verified + post live | Persona identity verification (blue check); hyperlocal launch post with $10-off first-timer offer |
| WhatsApp Business | ✅ Active | 713-501-0461 (migrated personal number); greeting auto-reply for non-contacts only |

### Payments
| Item | Status | Detail |
|---|---|---|
| Square | ✅ Set up / ⚠ bank review outcome unknown | Services mode, Tap to Pay on phone; catalog: SuperWash $49.99, Exterior $69.99, Interior $79.99, Full Detail $129.99, add-ons — **conflicts with website pricing, KNOWN-ISSUES #11** |
| Venmo | ✅ Live | @ESPLENDORDETAILING business profile (Individual/SSN), logo, description, 6 photos, website + Instagram linked |
| Zelle | Claimed | Via phone number; unverified |
| Cash App | ❌ Not set up | Mentioned only in admin guide |

### Infrastructure
| Service | Purpose | Identifier |
|---|---|---|
| GitHub Pages | Hosting | repo `michaelaliaga1957-web/desktop-tutorial` |
| Domain registrar | esplendordetailing.com DNS | **still not recorded — ask owner; continuity risk** |
| Formspree | Booking form → email | form `mojokqde`, free tier |

### Customer journey as it stands
Discovery (Google search/ad/Maps, Nextdoor, Instagram, referral) → esplendordetailing.com → booking form → Formspree email to owner → owner confirms by call/text within 1 hour → mobile service at customer location → payment (Square Tap to Pay / Venmo / Zelle / cash) → review request (manual; real review link still needed). Repeat/referral loops: not yet built.

## 10. Related documents

- [KNOWN-ISSUES.md](KNOWN-ISSUES.md) — audited defects and risks, with evidence
- [ROADMAP.md](ROADMAP.md) — prioritized improvement plan
- [DECISION-LOG.md](DECISION-LOG.md) — record of significant decisions and their reasoning
