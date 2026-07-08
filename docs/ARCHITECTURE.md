# Esplendor Detailing — System Architecture

> Last updated: 2026-07-08 · Maintained as living documentation. Update this file whenever the system changes.

## 1. What this business is

Esplendor Detailing is a mobile car detailing company serving Houston, TX. Customers book online, by phone/SMS (713-501-0461), or via WhatsApp; the team travels to the customer (driveway, office, apartment) and payment is collected after service (card via Square, Zelle, Venmo, Cash App, or cash).

**Digital presence:**
- Website: https://esplendordetailing.com
- Instagram: @esplendordetailing
- WhatsApp: wa.me/17135010461

## 2. High-level architecture

The entire system is a **static website with zero backend**. There is no server, no database, no build step, and no framework. Everything is hand-written HTML/CSS/JS in three files.

```
Customer browser
   │
   ├── index.html  (marketing site + booking form, bilingual EN/ES)
   │      ├── POST → Formspree (form ID: mojokqde) → email notification to owner
   │      ├── gtag.js → Google Analytics 4 (G-S1FBL7829Z)
   │      └── saves lead copy → customer's OWN browser localStorage (see Known Issues #2)
   │
   ├── thanks.html (booking confirmation page + Google Ads conversion event)
   │      └── ⚠ currently unreachable from the form flow (see Known Issues #1)
   │
   └── admin.html  (owner-only dashboard: pipeline CRM, revenue, launch guide)
          └── reads/writes localStorage on the OWNER's browser only
```

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

Sections in order: nav · floating WhatsApp/call buttons · hero (`#home`) · how it works (`#how`) · services (`#services`) · add-ons (`#addons`) · booking form (`#booking`) · gallery (`#gallery`, currently placeholders) · reviews (`#reviews`, hardcoded) · why us (`#why`) · payment (`#payment`) · FAQ (`#faq`) · contact (`#contact`) · footer.

SEO: meta description/keywords, canonical URL, Open Graph tags, JSON-LD `AutoWash` LocalBusiness schema.

### `thanks.html`
Standalone booking-confirmation page. `noindex`. Fires GA4 config **plus the Google Ads conversion event `ads_conversion_Book_appointment_1`**. Includes "what happens next" steps and a WhatsApp follow-up button. **Note:** the booking form currently never navigates here — see Known Issues #1.

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
2. JS intercepts submit (`e.preventDefault()`), validates required fields, saves a lead object into the **customer's** localStorage, then POSTs to `https://formspree.io/f/mojokqde` via fetch.
3. Formspree emails the owner (subject: "🚗 New Booking Request — Esplendor Detailing").
4. The page shows an inline success message. (It does **not** redirect to `thanks.html` — the `_next` hidden field is ignored on AJAX submissions.)
5. Owner confirms by call/text within 1 hour (the promise made on the site) and manually enters the lead into `admin.html`.

**The Formspree email is the only reliable lead-delivery channel.** The admin dashboard only contains leads the owner enters by hand (plus any test submissions made from the owner's own browser).

Formspree free tier allows ~50 submissions/month — monitor volume and upgrade before it becomes a silent lead-loss point.

## 7. Analytics & advertising

- **GA4** property `G-S1FBL7829Z` on `index.html` and `thanks.html` (pageviews only; no custom events fire on the actual booking path today).
- **Google Ads conversion** `ads_conversion_Book_appointment_1` defined only on `thanks.html`, which is currently unreachable → conversion data is not being collected. See Known Issues #1 — this is the single highest-priority fix if any paid ads are running.

## 8. Security & privacy posture

- No backend → minimal attack surface. No customer data is stored server-side by us; Formspree holds submissions per its retention policy.
- `admin.html` is publicly served (any visitor can load it) and its password is visible in page source. The real exposure is limited because lead data lives only in the owner's browser, but the password and the internal playbook are public. Treat `admin.html` as *obscured*, not *secured*.
- Customer PII (name, phone, address) transits Formspree and Google (analytics). No privacy policy page exists yet.

## 9. Operational dependencies (external accounts)

| Service | Purpose | Identifier |
|---|---|---|
| GitHub Pages | Hosting | repo `michaelaliaga1957-web/desktop-tutorial` |
| Domain registrar | esplendordetailing.com DNS | (registrar not recorded — document it) |
| Formspree | Booking form → email | form `mojokqde` |
| Google Analytics 4 | Traffic analytics | `G-S1FBL7829Z` |
| Google Ads | Paid acquisition (implied by conversion event) | account ID not recorded |
| Google Business Profile | Local SEO / reviews | status unverified (guide Step 2) |
| Instagram | Organic marketing | @esplendordetailing |
| WhatsApp Business | Customer comms | 713-501-0461 |

Items marked "not recorded" should be filled in by the owner — losing access to any of these is a business-continuity risk.

## 10. Related documents

- [KNOWN-ISSUES.md](KNOWN-ISSUES.md) — audited defects and risks, with evidence
- [ROADMAP.md](ROADMAP.md) — prioritized improvement plan
- [DECISION-LOG.md](DECISION-LOG.md) — record of significant decisions and their reasoning
