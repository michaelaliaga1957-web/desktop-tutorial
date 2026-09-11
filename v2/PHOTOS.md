# Photo slots

Real Esplendor photography only. No stock, no AI, no invented scenes.

## Slot map — where each photo goes

Numbering follows the owner's contact sheet, left→right, top→bottom, 4 per row.

| Slot | Page location | Wanted photo | Status |
|---|---|---|---|
| `hero` | Full-bleed hero | **#11** — F-150 STX, tailgate down, pressure washer + red gas can + hoses in the bed | ⏳ need file |
| `houston` | "Local detailing, real neighbors." band | Houston skyline — approved as licensed free stock, never captioned as Esplendor work | ⏳ need file |
| `svc-exterior` | Exterior Focused card | **#16** — VW Golf GTI under foam in a driveway | ⏳ need file |
| `svc-superwash` | SuperWash card (Best Value) | **#6** — Lexus interior, cream leather + wood trim | ⏳ need file |
| `svc-interior` | Interior Focused card | **#9** — cream leather rear seats | ⏳ need file |
| `work-1…n` | Real Work gallery | **#2, #4, #5, #8, #12, #13, #14, #10, #17** — Land Cruiser in/out, white Lexus, Harley, GTI foam, loaded tailgate | ⏳ need files |
| before / after | Comparison slider | `originals/3.jpg` → `originals/4.jpg` | ✅ in place |
| logo | Nav, footer, Standard watermark | `v2/img/logo.png`, `assets/brand/emblem.webp` | ✅ in place |

The Harley frames (#12, #13) also back the **Moto Detail — $124.99** option in the
booking form, which until now had no photography behind it anywhere on the site.

## Interim state

Slots marked ⏳ currently render one of the seven photos already in the repo, so the
layout is reviewable. Every one of those is a genuine Esplendor job — nothing here is
stock or generated — but they are stand-ins and get replaced the moment the real files
land.

`houston` renders with no photo at all; the band is built to look finished either way.

## Files already in the repo

`assets/gallery/originals/`

| File | Subject |
|---|---|
| `1.jpg`  | Clean floor liners laid out on the driveway |
| `2.jpg`  | Esplendor logo, gold on black |
| `3.jpg`  | Dirty rear footwell — genuine BEFORE |
| `4.jpg`  | Same footwell clean — genuine AFTER |
| `5.jpg`  | F-150 front cabin, finished |
| `6.jpg`  | Drill-brushing a liner on the driveway |
| `7.webp` | Ford Escape foam wash; work truck with equipment at right |

## Do not use

- `assets/gallery/craft-*.webp` — stock (BMW, Mercedes). These are what the live site runs on today.
- `assets/gallery/uploads/*` — Unsplash files and one `ChatGPT Image ….png`.

## Adding the new photos

Drop originals into `assets/gallery/originals/`, continuing the numbering
(`8.jpg`, `9.jpg`, …), then run:

    python3 v2/build-images.py

which crops, grades and writes the web-sized derivatives into `v2/img/`.
