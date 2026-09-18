# Caryat Car Care

A simple, static website for **Caryat Car Care**, an auto repair shop — built as a 3-page site (Home, Services, Contact) with a red & blue theme matching the shop's logo.

No frameworks, no build step, no payment integration — plain HTML, CSS, and JS.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero intro, quick service highlights, why-choose-us section |
| Services | `services.html` | Full list of services offered with indicative pricing |
| Contact | `contact.html` | Shop info, hours, and an inquiry form |

## Project structure

```
caryat-car-care/
├── index.html        Home page
├── services.html      Services page
├── contact.html       Contact page
├── css/
│   └── styles.css     Shared stylesheet
├── js/
│   └── script.js       Mobile nav toggle + contact form handling
├── assets/
│   └── logo.png        Caryat Car Care logo
└── README.md
```

## Running locally

No build step required — just open `index.html` in a browser, or serve the
folder so relative paths resolve cleanly:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Tech

- Plain HTML/CSS/JS
- Google Fonts: [Oswald](https://fonts.google.com/specimen/Oswald) (headings) + [Inter](https://fonts.google.com/specimen/Inter) (body)
- Fully responsive (mobile nav, stacked layouts on small screens)

## To do / customize

- [ ] Replace placeholder contact info (address, phone, WhatsApp, email, hours) in `contact.html`, `services.html` and the footer — currently using placeholder UAE numbers (`+971 50 000 0000`) and a `[Your workshop address here]` placeholder
- [ ] Swap the placeholder WhatsApp link (`https://wa.me/971500000000`) for the real business number
- [ ] Update homepage stats (years in business, cars serviced, ratings)
- [ ] Wire up the contact form in `js/script.js` to a real backend or form service (currently shows a confirmation message only — no backend or payment integration yet)

## Services & pricing

`services.html` follows the official pricing brief: only **Car Maintenance & Servicing** has a published starting price (**AED 250**, varies by vehicle). Every other category (diagnostics, mechanical repairs, AC, tyres & batteries, denting & painting, tinting, detailing, PPF, registration renewal, recovery & towing, doorstep care) is marked **"Inquire for pricing"** — no prices should be added for these without explicit confirmation.

## License

Private project for Caryat Car Care. All rights reserved.
