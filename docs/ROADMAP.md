# Roadmap

> Last updated: 2026-07-08. Ordered by expected ROI. Re-review at the start of every work session against analytics and KNOWN-ISSUES.md. Completed items move to the bottom with date + commit.

## Now (highest ROI, small effort)

1. **Fix booking conversion tracking** — fire a GA4 key event + Google Ads conversion on successful form submit (or redirect to the existing `thanks.html`). Unblocks all paid-ads measurement. *(Known Issues #1, #6)*
2. **Make the reviews section truthful** — remove the "Google Reviews" framing until real reviews exist; fix the placeholder review link with the real Google Business Profile link. Legal risk reduction. *(Known Issues #3)*
3. **Decide the CRM system of record** — owner decision needed:
   - **Option A (recommended to start):** Formspree email + manual entry into `admin.html`; document the workflow; zero new infrastructure.
   - **Option B:** Google Sheets backend via Apps Script (free, shared across devices, keeps the existing dashboard UI as the front-end).
   - **Option C:** adopt a lightweight hosted CRM and retire the pipeline views in `admin.html`.
   Record the choice in DECISION-LOG.md before building anything. *(Known Issues #2)*

## Next (after first jobs / first real data)

4. **Real before/after gallery photos** — compressed WebP, lazy-loaded. Strongest conversion asset for a detailing business. *(Known Issues #5)*
5. **Google Business Profile verification** — the local-SEO flywheel (Maps ranking, real reviews, free leads) depends on it. Follow launch guide Step 2.
6. **Privacy policy page + site hygiene** — privacy policy (form PII + GA/Ads cookies), favicon, robots.txt, sitemap.xml, custom 404. *(Known Issues #8)*
7. **Formspree plan check** — upgrade before submission volume hits the free-tier cap. *(Known Issues #9)*

## Later (scale-dependent — do not build ahead of need)

8. **Review-request automation** — post-job SMS/WhatsApp template with the real review link (launch guide Step 5 formalized).
9. **Booking calendar integration** — availability-aware booking (e.g., Google Calendar–backed) once double-booking or scheduling load becomes a real problem.
10. **Repeat-business engine** — recurring maintenance reminders (e.g., 6-week wash cadence), simple membership offer. Only valuable once there's a customer base.
11. **Split CSS/JS out of the single-file pages** — only if the pages start changing frequently enough that the single-file format causes real friction. The current structure is simple and deploys atomically; don't refactor for aesthetics.

## Principles

- The site works and is live: improve, don't rewrite.
- No new infrastructure before the decision is recorded in DECISION-LOG.md.
- Every change that touches the booking flow must be manually tested end-to-end (submit a test booking, confirm the Formspree email arrives, confirm the analytics event fires).

## Completed

*(none yet)*
