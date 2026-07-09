# Esplendor Detailing — esplendordetailing.com

Production website and business system for **Esplendor Detailing**, a mobile car detailing company in Houston, TX. Static site hosted on GitHub Pages with a custom domain.

## Files

| File | Purpose |
|---|---|
| `index.html` | Bilingual (EN/ES) marketing site + booking form (Formspree) |
| `thanks.html` | Booking confirmation page (Google Ads conversion event) |
| `admin.html` | Owner dashboard: lead pipeline, revenue, launch guide |
| `CNAME` | Custom-domain binding for GitHub Pages — **do not delete** |
| `docs/` | Living documentation (start here) |

## Documentation

- **[docs/BUSINESS-INHERITANCE-REPORT.md](docs/BUSINESS-INHERITANCE-REPORT.md)** — full-company state report: assets, systems, risks, ROI priorities, execution order
- **[docs/EVIDENCE-REGISTER.md](docs/EVIDENCE-REGISTER.md)** — verification status of every business claim + contradictions log
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — full system map: hosting, integrations, data flows, pricing, dependencies, off-repo business systems
- **[docs/KNOWN-ISSUES.md](docs/KNOWN-ISSUES.md)** — audited defects and risks, by severity
- **[docs/ROADMAP.md](docs/ROADMAP.md)** — prioritized improvement plan
- **[docs/DECISION-LOG.md](docs/DECISION-LOG.md)** — why things are the way they are

## Deploying

Push to `main` → GitHub Pages publishes automatically. There is no build step; every page is self-contained HTML/CSS/JS.

Before merging anything that touches the booking form: submit a test booking on the live site, confirm the Formspree email arrives, and confirm the analytics event fires.
