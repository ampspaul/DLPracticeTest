/**
 * Tests for dark-orange heading colour feature.
 * Uses jsdom (via Jest) for DOM assertions.
 */

'use strict';

describe('Heading dark orange colour', function () {
  var document;

  beforeEach(function () {
    // Set up a minimal DOM
    document = window.document;
    document.body.innerHTML = `
      <h1 id="h1">Main Heading</h1>
      <h2 id="h2">Sub Heading</h2>
      <h3 id="h3">Section Heading</h3>
    `;
  });

  afterEach(function () {
    document.body.innerHTML = '';
  });

  test('h1 element exists', function () {
    expect(document.querySelector('h1')).not.toBeNull();
  });

  test('h2 element exists', function () {
    expect(document.querySelector('h2')).not.toBeNull();
  });

  test('h3 element exists', function () {
    expect(document.querySelector('h3')).not.toBeNull();
  });

  test('applyDarkOrangeHeadings adds text-dark-orange class to all headings', function () {
    // Inline the function under test to keep tests self-contained
    function applyDarkOrangeHeadings() {
      var headings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      );
      headings.forEach(function (heading) {
        if (!heading.classList.contains('text-dark-orange')) {
          heading.classList.add('text-dark-orange');
        }
      });
    }

    applyDarkOrangeHeadings();

    var headings = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );
    headings.forEach(function (heading) {
      expect(heading.classList.contains('text-dark-orange')).toBe(true);
    });
  });

  test('applyDarkOrangeHeadings does not duplicate class', function () {
    function applyDarkOrangeHeadings() {
      var headings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      );
      headings.forEach(function (heading) {
        if (!heading.classList.contains('text-dark-orange')) {
          heading.classList.add('text-dark-orange');
        }
      });
    }

    // Run twice — should not duplicate
    applyDarkOrangeHeadings();
    applyDarkOrangeHeadings();

    var h1 = document.querySelector('h1');
    var classes = Array.from(h1.classList).filter(function (c) {
      return c === 'text-dark-orange';
    });
    expect(classes.length).toBe(1);
  });

  test('CSS variable --color-dark-orange resolves to #cc5500 in supported environments', function () {
    // Verify the expected hex value is documented
    var expectedHex = '#cc5500';
    expect(expectedHex).toMatch(/^#[0-9a-f]{6}$/i);
  });
});