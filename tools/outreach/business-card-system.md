# Esplendor Detailing — Business Card Marketing System

Not a "nice card." A physical conversion asset with **one job**:
**Conversation → Scan → Booking.** Everything below serves that.

## 🔄 CURRENT VERSION (bilingual coupon)
The card is now **two full faces — English on one side, Spanish on the other** — and doubles as a
**$10-off coupon** (a coupon is what makes someone *keep* a card instead of tossing it). Each side has:
logo · tagline · `★★★★★ 5-Star` · **`$10 OFF your first detail`** (hero) · its own tracked QR · phone · site
· a cross-reference (`Español al reverso` / `English on reverse`).
- **English QR →** `/card?utm_content=en` · **Spanish QR →** `/card?lang=es&utm_content=es`
  (so we also learn which language pulls more, and Spanish scanners land in Spanish).
- **Redemption:** "scan or show this card when we confirm — one per customer." Michael applies the $10
  at confirmation; the booking is already tagged `source=business_card` for tracking.
- **Note on offer coherence:** card coupon = **$10**; A-frame Version A = **$25**. Different amounts per
  channel is fine (card is a broad giveaway, the sign is a bigger hook) — just decide if you want them aligned.

The strategy sections below still apply; the only changes are the two-language layout and the printed $10 coupon.

---

## 1. The single objective
Get the person to **scan and book** (or text). The card is not a brochure — it is a
doorway to the website, where the real selling (photos, reviews, pricing, booking) happens.

## 2. Front vs. back — and why
**Double-sided** (industry + 2026 best practice: front = identity, back = action).

**FRONT — identity + trust (earn the flip):**
- Emblem + `ESPLENDOR DETAILING` wordmark
- `PREMIUM MOBILE DETAILING · WE COME TO YOU`
- `★★★★★ 5-Star Rated · Greater Houston` ← social proof (we've earned it now)
- `713-501-0461` (big) · `esplendordetailing.com`
- `English · Español`

**BACK — the conversion engine:**
- Headline: **"Book in 60 seconds."** (removes friction fear)
- Sub: *"Scan, pick your service, done. We bring our own water & power — you just hand us the keys."*
- 3 trust checks: come to you · hand-detailed, never rushed · 5-star rated
- **Offer teaser** (gold box): *"★ New client? Scan to unlock your first-visit perk."*
- **QR (gold-framed) + `SCAN TO BOOK`** + `esplendordetailing.com`
- Fallback: *"Prefer to talk? Text or call 713-501-0461"*

## 3. What we deliberately LEFT OFF (and why)
- **Price list** — prices change (car vs. truck), anchor sticker-shock, and go stale. The
  site shows them. The card's job is to get them *to* the site, not to quote on paper.
- **Service menu / long copy** — clutter kills scans. One action beats ten options.
- **Personal email / social handles** — dilute the single CTA.
- **A second QR** — two codes = decision paralysis = zero scans. **One QR only.**

## 4. The CTA
**Primary: "Scan to Book."** Chosen over call/quote/reviews because:
- The customer journey needs the site (photos + reviews + booking) to close — the QR delivers all three in one tap.
- Booking is the money action; the site's booking form already fires a GA4/Ads conversion.
- Reviews are **not** a card CTA — you ask *existing* customers for reviews by text (see
  `referral-and-followup.md`), not cold prospects.
**Secondary fallback:** text/call the number (for the phone-first crowd).

## 5. QR strategy — one smart, repointable code
- The QR encodes **`https://esplendordetailing.com/card`** (NOT the homepage directly).
- `card.html` instantly forwards to the booking section **with UTM attached**, and keeps
  Spanish if the scanner chose it.
- **Why the middle page:** you can change *where the card sends people* later (e.g. a
  seasonal offer) by editing one line in `card.html` — **without reprinting a single card.**
  Free "dynamic QR."
- Kept **pure black-on-white, error-correction Q** for first-scan reliability in driveway
  light. Branding comes from the gold frame + `SCAN TO BOOK` label, not by tinting the code
  (tinting/logos reduce scan success).
- Size on card: ~0.72 in (above the 0.6 in minimum).

## 6. Tracking strategy (scans → visits → leads → revenue)
Already wired into the repo:
1. **QR → `/card`** stamps `utm_source=business_card&utm_medium=print&utm_campaign=card_2026`.
2. **GA4 (`G-S1FBL7829Z`)** attributes the session; the booking form → `thanks.html` fires
   your existing conversion event → **scans and card-driven bookings show in GA4.**
3. **Lead-source stamping:** the site now captures `utm_source` on load and attaches a
   `source` field ("business_card / card_2026") to **every booking lead** — so it lands in
   your owner email + Formspree + Sheet. You'll literally see which bookings came from cards.
4. **To read results:** GA4 → Traffic acquisition → filter `business_card`; and your
   Bookings sheet → `source` column → tie to revenue.

## 7. Offer strategy (urgency without cheapening)
- The card prints only a **teaser** ("first-visit perk"), never a printed discount/expiry.
- The **actual offer lives on the `/card` landing** → swappable anytime, no reprint, and it
  **forces the scan** (the action we want) to reveal it → everything is tracked.
- **Recommended launch offer (premium-safe, margin-safe):** a complimentary **value-add on
  the first detail** (e.g. free tire shine + interior scent, or a free trim/leather
  conditioning) — feels like a gift, ~$0 cost, doesn't discount the brand. Aggressive
  alternative if you want volume: **$20 off the first detail.**

## 8. Print specifications
- **Final size:** 3.5 × 2 in (US standard). **File:** 3.75 × 2.25 in with **0.125 in bleed**,
  all critical text inside a 0.125 in safety margin. 300 DPI. Colors build in **CMYK**
  (screen gold ≈ CMYK 0/15/70/25; true metallic needs foil — see finish).
- **Orientation:** landscape, double-sided.

## 9. Paper stock
- **Recommended:** 16 pt premium card, **soft-touch (suede) matte laminate** — the velvety
  feel is what makes people *keep* a card and reads "established," not "side hustle."
- Budget: 16 pt matte (no soft-touch). Premium max: 18–32 pt with painted gold edges.

## 10. Finish
- **Soft-touch matte** base. Optional **spot-UV gloss** on the emblem + QR frame for a
  premium tactile pop. Ultimate flex: **gold foil** on the wordmark (pricier, gorgeous).

## 11. Recommended quantity
- **500** — best price-per-card and you'll hand out more than you expect. (250 only if
  you want to test a design first.)

## 12. Cost target
- 500 · 16 pt matte, double-sided: **~$25–40** (GotPrint).
- 500 · **soft-touch + spot UV**: **~$60–100**. ← recommended for the positioning.
- Gold-foil upgrade: ~$120–180 (optional).

## 13. Where to print
- **GotPrint** — best value + genuine soft-touch/spot-UV. ← recommended.
- **Moo (Luxe / soft-touch)** — most premium feel, ~$100+ for 500.
- **Vistaprint** — easiest uploader + frequent 40% promos.
Upload the print file below (front + back); solid-black bleed makes edge alignment foolproof.

## 14. How to hand them out
- Always give **two** — "one for you, one to pass to a friend."
- Hand with a **verbal hook**: *"Scan that — you'll see real results and grab a first-visit perk."*
- Keep a **stack + holder on the truck** and one **on the seat of every car you deliver.**
- **Neighborhood leave-behinds:** while detailing, drop a few in nearby driveways/doors —
  "we're on your street today."
- **Partner stacks:** ask to leave a small holder at barbers, gyms, coffee shops, auto-parts
  stores, apartment leasing offices, used-car lots, real-estate offices, valet stands.

## 15. When to hand them out
- **Right after a great detail** (peak happiness = referral gold).
- During any conversation where the truck/work comes up.
- At every drop-off, every partner visit, every neighborhood job.

## 16. Who should receive them
- **Every paying customer** (for themselves + referrals).
- **Neighbors** of active jobs.
- **Local businesses & gatekeepers** who see lots of cars (see partner list above).
- **Anyone who compliments the truck or a result.**

---

## Self-critique → improvements made (reviewed as a first-time customer)
- *"The back felt busy and some gold text was hard to read."* → removed the redundant top
  kicker, brightened sub-text/fallback, gave the headline room.
- *"Which do I do — scan or call?"* → made **Scan to Book** visually dominant; phone is a
  clear secondary fallback.
- *"Is this a real business?"* → 5-star proof line, real domain, premium serif + foil-ready
  gold, soft-touch stock → reads established, not a teen side hustle.
- *"A printed discount feels cheap / an expiry means reprinting."* → moved the offer to the
  repointable `/card` landing; the card only teases it.

## ⚠️ Related fix worth doing
Your live **site still says "We're new to Houston… first 25 clients get $25 off"** in the
booking section. That contradicts the card's "5-Star Rated / established" positioning. Update
that block to an established-business message (and move any offer to `/card`). Easy change —
just say the word.
