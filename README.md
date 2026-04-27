# DLPracticeTest

A practice test application for TN students.

## Architecture

### HomePage (`src/pages/HomePage.js`)

The primary page heading displays the text **'TN Student Practice Test'** with the following styles applied consistently across all supported viewports:

| Property      | Value                        |
|---------------|------------------------------|
| `color`       | **Blue** (`#0000CD`)         |
| `font-weight` | `700` (bold)                 |
| `font-style`  | `italic`                     |

> **QA Fix #347**: Heading colour updated from Dark Orange (`#FF8C00`) to Blue (`#0000CD`) per QA mandate. No references to `#FF8C00`, `#4B0082` (Dark Purple), or `#8B0000` (Dark Red) remain in any style source.

### Responsive Breakpoints

The heading colour (`#0000CD`) and font properties are applied consistently across all three viewport breakpoints:

- **Desktop**: `width >= 1024px` — `font-size: 2.5rem`
- **Tablet**: `768px <= width < 1024px` — `font-size: 2rem`
- **Mobile**: `width < 768px` — `font-size: 1.5rem`

### Style Sources

- **Inline styles**: `src/pages/HomePage.js` (primary, viewport-aware)
- **CSS class rules**: `src/styles/HomePage.css` (all breakpoints via `@media`)
- **Design tokens**: `src/styles/variables.css` (`--heading-color: #0000CD`)

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm start
```

Run tests:

```bash
npm test
```