# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **HomePage heading colour** (`styles.css`, `index.html`): Updated main page heading text colour from **Dark Red** (`#8B0000`) to **Dark Purple** (`#4B0082`). The old `#8B0000` value has been fully removed and replaced in all relevant style definitions for the heading. Existing responsive colour rules updated in-place across all supported breakpoints — desktop (≥1024 px), tablet (768–1023 px), and mobile (<768 px). No duplicate or conflicting rules introduced. Heading text (`'TN Student Practice Test'`), `font-weight: 700` (bold), and `font-style: italic` are unchanged. No other text, layout, navigation, or functional behaviour in `HomePage.js` or any other component is affected.

---

<!-- Previous unreleased entries preserved below -->

### Changed (prior)
- **HomePage heading colour** (`HomePage.js`, `styles.css`): Updated main page heading text colour from **Dark Green** to **Dark Red** (`#8B0000`). Existing responsive colour rules updated in-place across all supported breakpoints — desktop (≥1024 px), tablet (768–1023 px), and mobile (<768 px). No duplicate or conflicting rules introduced.
- **HomePage heading font style** (`HomePage.js`, `styles.css`): Added `font-style: italic` to the main page heading **'TN Student Practice Test'**. Applied consistently at all responsive breakpoints by updating existing rules in-place. `font-weight: 700` is unchanged and preserved.
- **Responsive heading consistency** (`styles.css`, `index.html`): Bold (`font-weight: 700`) + italic (`font-style: italic`) + Dark Red (`#8B0000`) heading styles applied uniformly across all supported viewports — desktop (≥1024 px), tablet (768–1023 px), and mobile (<768 px) — preserving existing responsive behaviour. No layout, navigation, question bank logic, scoring, storage, or functional behaviour was altered.
- **HomePage heading text**: Main page heading in `HomePage.js` continues to display `'TN Student Practice Test'` — no change to text value.
- **HomePage heading weight**: `font-weight: bold` (`700`) retained on the main heading in `HomePage.js`; no change to font weight required or made.

### Added
- **Expanded Question Bank**: Added 50+ multiple-choice questions covering comprehensive driver license examination topics
  - Road signs and traffic signals (8-10 questions)
  - Right-of-way rules (8-10 questions)
  - Speed limits and safe driving (8-10 questions)
  - Vehicle control and safety (8-10 questions)
  - Parking regulations (5-7 questions)
  - Driving under influence laws (5-7 questions)
  - Defensive driving techniques (5-7 questions)
- **Progress Tracking**: Updated progress display to show current question number out of 50+ total questions
- **storageService**: Added support for persisting all 50+ question responses, scores, and test metadata
- **ResultsScreen**: Enhanced results display compatible with 50+ question test structure
