/**
 * app.js — Tennessee Driver Licence Practice Test
 *
 * Entry point for client-side application logic.
 * Header text is rendered directly in index.html (static).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Defensive guard: ensure no legacy header text is present at runtime (#122)
  const h1 = document.querySelector('h1.site-header__title');
  if (h1) {
    const legacyPatterns = [/KY-DL/i, /Kentucky\s+Driver/i];
    legacyPatterns.forEach((pattern) => {
      if (pattern.test(h1.textContent)) {
        console.warn('[app] Legacy header text detected — replacing with correct value.');
        h1.textContent = 'Tennessee Driver Licence Practice Test';
      }
    });
  }
});