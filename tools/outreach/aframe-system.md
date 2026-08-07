# Esplendor Detailing — A-Frame Sign Marketing System

An **out-of-home customer-acquisition device**, not a branding poster.
Job: **Notice → Understand → Trust → Scan/Call → Book** — in 2–5 seconds.

Two print-ready versions ship for A/B testing:
- **Version A — Offer-driven** (`$25 OFF` + `SCAN FOR $25 OFF`)
- **Version B — Trust-driven** (`5-STAR RATED` + `SCAN TO SEE & BOOK`)

---

## 1–3. Sign design, wording, hierarchy (the 2-second read)
Shared, top → bottom (fixed reading order):
1. **Brand** — emblem + `ESPLENDOR DETAILING` (identity, gold serif)
2. **What** — `MOBILE CAR DETAILING` (gold kicker)
3. **Why (HERO)** — **`WE COME TO YOU`** — huge, **bold white** (max legibility)
4. **Proof / Offer** — A: `$25 OFF · YOUR FIRST DETAIL` · B: `★★★★★ 5-STAR RATED · SEE OUR REAL RESULTS`
5. **Action** — `SCAN FOR $25 OFF` / `SCAN TO SEE & BOOK` + **big QR** + `esplendordetailing.com` + `713-501-0461`

**Why white, not gold, for the headline:** gold-on-black loses contrast at 30+ ft in daylight.
Research + legibility rules say **white-on-black is the most readable** — so the message is white
and gold is used only for brand/accents. Headline is **bold sans**, not the thin serif (serifs
disappear at distance); the serif is kept only for the premium brand wordmark.

## 4. The CTA
- **A:** `SCAN FOR $25 OFF` — offer as the reason to act (strongest scan driver).
- **B:** `SCAN TO SEE & BOOK` — curiosity + proof ("see real work").
Both create a **measurable** action. Phone is the **driver fallback** (you can't scan while driving).

## 5. QR strategy
- Two codes, one per version, each encoding a **tracked landing URL** (not the homepage):
  `esplendordetailing.com/truck?utm_source=aframe&utm_medium=sign&utm_campaign=aframe_2026&utm_content=offer|trust`
- Pure **black-on-white, ~11 in** on a 36 in sign (scannable from ~6–15 ft; above every minimum).
- High error-correction so a little dirt/rain won't break the scan.

## 6. Landing page (message match = higher conversion)
- `/truck` is a **dedicated mobile page** that **continues the sign's message** ("Mobile detailing,
  we come to you") instead of dumping people on the busy homepage.
- It reads `utm_content` and shows the **matching** block (the $25 offer, or the 5-star proof),
  then one button: **"Book in 60 seconds →"** which carries the UTM into the booking form.
- Fires **GA4** (`G-S1FBL7829Z`) on load, so the scan itself is measured.
- **Repointable:** change the offer/message by editing `truck.html` — no reprint.

## 7. Tracking (Impressions → Scans → Sessions → Leads → Bookings → Revenue)
- **Scans/Sessions:** GA4 → Acquisition, filter `utm_source=aframe`; compare `utm_content=offer` vs `trust`.
- **Leads:** the site stamps every booking with its `source` — A-frame leads show as
  `aframe / aframe_2026` in your **owner email + Sheet**.
- **Bookings/Revenue:** booking → `thanks.html` conversion event (GA4/Ads) + your Sheet's revenue column.
- **Impressions** (denominator) = your manual estimate of daily foot/drive-by traffic at each spot.

## 8. Offer strategy
- Version A prints **$25 off first detail** (concrete number pulls more scans — that's the test).
- If you change the amount later, you reprint **only** the A insert (~$25) — cheap.
- Version B intentionally carries **no printed discount** (protects premium) — its landing offer
  can evolve freely.

## 9. Viewing-distance analysis
- Rule: **1 in of letter height per 10 ft** of read distance.
- `WE COME TO YOU` caps ≈ **6.5 in** → readable to **~65 ft** (a slow-rolling car or anyone parked/walking).
- Kicker ≈ 1.6 in → ~16 ft. QR ~11 in → reliable walk-up scan to ~15 ft.
- **Design target met:** the hero + logo register from across a lot; details reward the closer look.

## 10. Print specifications
- **Size:** 24 × 36 in (industry standard A-frame insert), portrait, **single-sided per version**
  (print both A and B; run one at a time, or one on each side of the frame).
- File: 300 DPI, CMYK, 0.125 in bleed (art already full-bleed black — edge-safe).

## 11. Material recommendations
- **Insert:** 4 mm **coroplast** (corrugated plastic) — cheap, light, weatherproof — for daily use;
  or **3–4 mm aluminum composite (Dibond)** for a premium, rigid, long-life panel.
- **Frame:** plastic/steel **Signicade Deluxe** A-frame (water-fillable base for wind).

## 12. Weather resistance
- **UV-laminate** the print (stops fading) and choose an **outdoor/UV ink**.
- Coroplast + laminate handles Houston sun & rain; wipe clean. Fill the frame base with water/sand
  so gulf-coast wind doesn't flip it.

## 13. Recommended sign size
**24 × 36 in.** Big enough to read across a driveway/lot, small enough to be legal & portable.

## 14. Recommended QR size
**~10–11 in** on the sign (we used 11). Never below ~8 in on a 24×36 outdoor panel.

## 15. Testing plan (the experiment)
- **Don't assume offer beats trust.** Run **one version per week**, same spots/hours, ~2 weeks each,
  then the winner ongoing. (Or run A and B on opposite faces and rotate which faces the traffic daily.)
- Compare per version: **scans (GA4), landing→book rate, bookings, revenue, and $ per booking.**
- **Winner = most bookings per day at the lowest cost-per-booking**, not most scans.

## 16. KPI targets (starting benchmarks — adjust to your traffic)
- **Scan rate:** ≥ 1–2% of estimated daily passers who get close enough.
- **Landing → booking:** ≥ 15–25% (message match should push this up).
- **Bookings:** track **A-frame bookings/week**; goal ≥ 1–3/week per active placement.
- **Cost-per-booking:** sign+frame is a one-time ~$90–160, so after ~2–3 bookings it's pure ROI.

---

## Deployment: where / direction / distance / day vs. night

**⚠️ LEGAL FLAG (read first):** Houston **Sign Code (Ch. 46)** regulates signs visible from the
public right-of-way, and it is **unlawful to place/obstruct a public sidewalk, median, or roadway
without a permit** — such signs get removed/fined, and A-frames often must be down after business
hours. **So:**
- ✅ Place it on **private property** — the driveway/lot where you're actively detailing (with the
  owner's OK), your own property, or a **partner business's lot with written permission.**
- ❌ **Never** on a public sidewalk, median, esplanade, or road shoulder / right-of-way.
- Verify the specific spot; when in doubt, it sits **right by your truck on the client's driveway.**

**Where:** next to your truck while you work (you're already parked on private property, and the
active detail *is* your best ad). Also: partner lots (barber/gym/coffee/apartment office) with permission.

**Direction it should face:** toward the **strongest sightline of slow-moving eyes** — the street
approach or lot entrance where cars roll in slowly and pedestrians pass. Angle it ~10–15° off
head-on so both walkers and the nearest lane catch it.

**Distance from the truck:** **8–15 ft** — close enough to read as "that truck + this sign = one
premium business," far enough not to block your work or the QR sightline. Keep the QR unobstructed.

**What should be visible first:** the **logo + `WE COME TO YOU`** — that's the whole message if they
see nothing else. Everything below is the reward for a second glance.

**If it gets cluttered, remove in this order:** (1) the phone line, (2) `English & Spanish`,
(3) the proof/offer sub-line — **never** remove the hero, the QR, or the `SCAN` label.

**Day vs. evening:**
- **Day:** the white-on-black + big QR does the work; face it into the sun-lit approach, not backlit.
- **Evening/low light:** QR scanning drops — add a small **clip-on LED / solar spotlight** on the
  sign, or lean on the **phone number** after dusk. Bring it in at night (theft + city rules).

## Go-live checklist
1. Scan **both** QRs (offer + trust) once `esplendordetailing.com/truck` is live — confirm each lands
   on the matching message and the **Book** button reaches the booking form.
2. Print **A and B** on coroplast + UV laminate; get a Signicade frame.
3. Run the A/B plan; check GA4 `aframe` + your Sheet `source` weekly.
