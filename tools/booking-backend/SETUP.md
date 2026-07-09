# Booking Backend Setup — 10 minutes, free forever

This gives you three things Formspree's free plan can't:
1. **Instant owner notification** — email the second a booking lands (optional: a real text message too)
2. **Customer confirmation email** — branded, bilingual, with their booking details
3. **A real database** — every booking lands in a Google Sheet you can open from any device (this becomes the CRM system of record)

Formspree stays connected as a backup archive. Nothing about the website's current behavior breaks.

## Steps (owner)

1. Go to **sheets.google.com** (logged in as michaelaliaga1957@gmail.com) → Blank spreadsheet → name it **Esplendor Bookings**.
2. In the sheet: **Extensions → Apps Script**. Delete the sample code in the editor.
3. Copy ALL of `Code.gs` (this folder) and paste it in. *(Optional: fill in `SMS_GATEWAY_EMAIL` with your number at your carrier's gateway — examples are in the file — to also get a text message per booking.)*
4. Click the **save** icon.
5. In the function dropdown (top bar), pick **testSystem** → click **▶ Run**. Google will ask for permission: **Review permissions → choose your account → Advanced → Go to Untitled project (unsafe) → Allow**. (This warning is normal — it's your own script, not a published app.) You should get 2 emails (owner notification + customer confirmation) and see a "Bookings" tab appear in the sheet with a TEST row.
6. Click **Deploy → New deployment** → gear icon → **Web app** →
   - Description: `booking backend`
   - Execute as: **Me**
   - Who has access: **Anyone**
   → **Deploy** → copy the **Web app URL** (ends in `/exec`).
7. **Send that URL to Claude** — the website gets wired to it (one small edit), and the system goes live.

## Notes

- The URL is long and unguessable; the form's honeypot field filters bots. Worst case, spam creates a sheet row.
- Gmail sending quota is 100 emails/day — more than enough for years of current volume.
- If the script ever errors, it emails you the error instead of failing silently — no more silent leads.
- To change the confirmation email wording later: edit `sendCustomerConfirmation` in the Apps Script editor and click save (no redeploy needed for code edits under the same deployment... if behavior doesn't update, use Deploy → Manage deployments → edit → New version).
