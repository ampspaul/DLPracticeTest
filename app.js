/**
 * Tennessee Practice Test - Main Application Script
 */

'use strict';

(function () {
  /**
   * Initialize the application once the DOM is ready.
   */
  function init() {
    setupNavigation();
    highlightActiveLink();
  }

  /**
   * Set up mobile navigation toggle if needed.
   */
  function setupNavigation() {
    const nav = document.querySelector('.header-nav');
    if (!nav) return;

    // Add keyboard accessibility for nav items
    const links = nav.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          link.click();
        }
      });
    });
  }

  /**
   * Highlight the active navigation link based on current path.
   */
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.header-nav a');

    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === currentPath) {
        link.setAttribute('aria-current', 'page');
        link.style.color = 'var(--tn-gold)';
      }
    });
  }

  // Run init after DOM content is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();