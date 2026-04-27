/**
 * src/theme.js
 * Centralised theme tokens.
 *
 * QA Fix #337 — Removed legacy heading colour tokens:
 *   headingDarkPurple: '#4B0082'  (deleted)
 *   headingDarkRed:    '#8B0000'  (deleted)
 * Updated headingColor to Dark Orange per QA specification.
 */

const theme = {
  colors: {
    // Heading — QA spec: Dark Orange
    headingColor: '#FF8C00',

    // Legacy aliases removed to prevent accidental re-use:
    // headingDarkPurple: '#4B0082',  -- REMOVED
    // headingDarkRed:    '#8B0000',  -- REMOVED

    // General palette (unchanged)
    primary: '#FF8C00',
    background: '#ffffff',
    text: '#333333',
  },
  typography: {
    heading: {
      color: '#FF8C00',
      fontWeight: 700,
      fontStyle: 'italic',
    },
  },
};

export default theme;