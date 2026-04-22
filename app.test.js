/**
 * Tests for Tennessee Practice Test header functionality
 */

'use strict';

// Simple DOM environment setup for testing
const { JSDOM } = require('jsdom');

describe('Tennessee Header', function () {
  let dom;
  let document;
  let window;

  beforeEach(function () {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <head><title>Test</title></head>
      <body>
        <header class="site-header">
          <div class="header-container">
            <nav class="header-nav" aria-label="Main navigation">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/practice">Practice Test</a></li>
              </ul>
            </nav>
            <div class="header-title">
              <h1>Tennessee Driver's License Practice Test</h1>
              <p class="header-subtitle">Prepare for your Tennessee DMV exam</p>
            </div>
          </div>
        </header>
        <main id="main-content"></main>
      </body>
      </html>
    `, {
      url: 'http://localhost/',
      runScripts: 'dangerously',
      resources: 'usable'
    });

    document = dom.window.document;
    window = dom.window;
  });

  afterEach(function () {
    dom.window.close();
  });

  test('header element exists', function () {
    const header = document.querySelector('.site-header');
    expect(header).not.toBeNull();
  });

  test('header contains nav element with aria-label', function () {
    const nav = document.querySelector('.header-nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });

  test('header title contains Tennessee text', function () {
    const h1 = document.querySelector('.header-title h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('Tennessee');
  });

  test('nav links are present', function () {
    const links = document.querySelectorAll('.header-nav a');
    expect(links.length).toBeGreaterThan(0);
  });

  test('main content area exists', function () {
    const main = document.querySelector('#main-content');
    expect(main).not.toBeNull();
  });

  test('html lang attribute is set correctly', function () {
    const html = document.querySelector('html');
    expect(html.getAttribute('lang')).toBe('en');
  });

  test('header subtitle mentions DMV exam', function () {
    const subtitle = document.querySelector('.header-subtitle');
    expect(subtitle).not.toBeNull();
    expect(subtitle.textContent).toContain('DMV');
  });
});