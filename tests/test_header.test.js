/**
 * Tests for PBI #117 — Tennessee Driver Licence Practice Test header
 *
 * Covers tasks: #118, #119, #122, #123, #124
 *
 * Dependencies (devDependencies):
 *   jest, jest-environment-jsdom, @testing-library/jest-dom
 *
 * Run: npx jest tests/test_header.test.js
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Load the HTML file into jsdom
// ---------------------------------------------------------------------------
let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  // Use jsdom via jest's testEnvironment (jsdom)
  document = new DOMParser().parseFromString(html, 'text/html');
});

// ---------------------------------------------------------------------------
// #118 — Header text is exactly 'Tennessee Driver Licence Practice Test'
// ---------------------------------------------------------------------------
describe('Page header text (#118)', () => {
  test('h1 element contains the exact required text', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent.trim()).toBe('Tennessee Driver Licence Practice Test');
  });
});

// ---------------------------------------------------------------------------
// #119 — Header uses semantic <h1> tag
// ---------------------------------------------------------------------------
describe('Semantic heading structure (#119)', () => {
  test('There is exactly one <h1> on the page', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  test('<h1> is a direct or nested child of <header role="banner">', () => {
    const banner = document.querySelector('header[role="banner"]');
    expect(banner).not.toBeNull();
    const h1 = banner.querySelector('h1');
    expect(h1).not.toBeNull();
  });

  test('<h1> has the correct aria-label', () => {
    const h1 = document.querySelector('h1');
    expect(h1.getAttribute('aria-label')).toBe('Tennessee Driver Licence Practice Test');
  });
});

// ---------------------------------------------------------------------------
// #122 — No legacy header text remains in the HTML
// ---------------------------------------------------------------------------
describe('Legacy text removal (#122)', () => {
  const legacyPhrases = [
    'KY-DL Practice TEST',
    'KY-DL',
    'KY DL',
    'Kentucky Driver',
  ];

  legacyPhrases.forEach((phrase) => {
    test(`Page HTML does not contain legacy text: "${phrase}"`, () => {
      const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
      expect(html.toLowerCase()).not.toContain(phrase.toLowerCase());
    });
  });
});

// ---------------------------------------------------------------------------
// #123 — <title> tag and Open Graph / Twitter Card metadata
// ---------------------------------------------------------------------------
describe('Page title and metadata (#123)', () => {
  test('<title> tag contains "Tennessee Driver Licence Practice Test"', () => {
    const title = document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe('Tennessee Driver Licence Practice Test');
  });

  test('og:title meta content is correct', () => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle.getAttribute('content')).toBe('Tennessee Driver Licence Practice Test');
  });

  test('twitter:title meta content is correct', () => {
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle).not.toBeNull();
    expect(twitterTitle.getAttribute('content')).toBe('Tennessee Driver Licence Practice Test');
  });
});

// ---------------------------------------------------------------------------
// #124 — Accessibility: heading is announced correctly by screen readers
// ---------------------------------------------------------------------------
describe('Accessibility / screen reader (#124)', () => {
  test('<h1> is not hidden from assistive technology (no aria-hidden)', () => {
    const h1 = document.querySelector('h1');
    expect(h1.getAttribute('aria-hidden')).not.toBe('true');
  });

  test('<header> has role="banner" landmark', () => {
    const banner = document.querySelector('header[role="banner"]');
    expect(banner).not.toBeNull();
  });

  test('Page has a <main> element with id="main-content"', () => {
    const main = document.querySelector('main#main-content');
    expect(main).not.toBeNull();
  });
});