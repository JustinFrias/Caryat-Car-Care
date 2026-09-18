# Caryat Car Care - Project Guidelines & Rules

## Tech Stack & Architecture
- **Static 3-Page Website**:
  - `index.html` (Home)
  - `services.html` (Services)
  - `contact.html` (Contact)
  - Shared CSS: `css/styles.css`
  - Shared JS: `js/script.js`
  - Assets: `assets/logo.png`
- **Zero Frameworks / Zero Bundlers**:
  - Plain semantic HTML5 (no JSX, no Vue/React/Svelte, no template engines).
  - Vanilla CSS3 using CSS custom properties (variables) for theme tokens.
  - Plain Vanilla JavaScript (ES6+) — no npm runtime packages, no jQuery, no build step.
  - Do NOT introduce React, frontend frameworks, or build tooling unless explicitly asked.

## Design & Style Conventions
- **Brand Colors**:
  - Primary Blue: `#0A56AF`
  - Accent Red: `#E8151B`
  - Dark Ink: `#16171A`
- **Typography**:
  - Headings: `Oswald`, 'Arial Narrow', sans-serif (Google Fonts)
  - Body: `Inter`, system-ui, sans-serif (Google Fonts)
- **Responsive Design**:
  - Mobile-first approach using media queries.
  - No CSS utility frameworks (no Tailwind, Bootstrap, etc.).
  - All shared styling belongs in `css/styles.css`.
  - All shared client logic belongs in `js/script.js`.

## Git & Workflow Conventions
- **NEVER AUTO-PUSH**: Never run `git push`. The user handles pushing to GitHub manually. Only commit or edit locally; never push unless explicitly commanded.
