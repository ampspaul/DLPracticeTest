/**
 * DL Practice Test — main script
 */

'use strict';

(function () {
  // Utility: select element
  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  // Utility: select all elements
  function $$(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
  }

  /**
   * Initialise the practice test UI.
   */
  function init() {
    var startBtn = $('.btn-primary[href="test.html"]');
    if (startBtn) {
      startBtn.addEventListener('click', function (e) {
        // Allow default navigation; could add analytics here
      });
    }

    applyDarkOrangeHeadings();
  }

  /**
   * Ensure all headings carry the dark-orange colour class
   * (progressive enhancement — CSS custom properties handle the primary styling).
   */
  function applyDarkOrangeHeadings() {
    var headings = $$('h1, h2, h3, h4, h5, h6');
    headings.forEach(function (heading) {
      if (!heading.classList.contains('text-dark-orange')) {
        heading.classList.add('text-dark-orange');
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();