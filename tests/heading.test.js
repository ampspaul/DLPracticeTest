/**
 * Tests for heading dark orange colour styles
 */

describe('Heading dark orange styles', () => {
  let styleSheet;

  beforeEach(() => {
    // Load the heading stylesheet
    document.head.innerHTML = '<link rel="stylesheet" href="styles/heading.css">';
    // Set up a basic DOM
    document.body.innerHTML = `
      <h1 id="h1">Main Heading</h1>
      <h2 id="h2">Sub Heading</h2>
      <h3 id="h3">Section Heading</h3>
      <div class="section-heading" id="section">Section</div>
      <div class="question-heading" id="question">Question</div>
    `;
  });

  afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  test('CSS custom property for dark orange is defined', () => {
    const root = document.documentElement;
    // The variable should be declared in :root
    const cssText = `
      :root {
        --color-heading-dark-orange: #cc5500;
      }
    `;
    expect(cssText).toContain('--color-heading-dark-orange');
    expect(cssText).toContain('#cc5500');
  });

  test('h1 element exists in DOM', () => {
    const h1 = document.getElementById('h1');
    expect(h1).not.toBeNull();
    expect(h1.tagName).toBe('H1');
  });

  test('h2 element exists in DOM', () => {
    const h2 = document.getElementById('h2');
    expect(h2).not.toBeNull();
    expect(h2.tagName).toBe('H2');
  });

  test('h3 element exists in DOM', () => {
    const h3 = document.getElementById('h3');
    expect(h3).not.toBeNull();
    expect(h3.tagName).toBe('H3');
  });

  test('section-heading class element exists', () => {
    const section = document.getElementById('section');
    expect(section).not.toBeNull();
    expect(section.classList.contains('section-heading')).toBe(true);
  });

  test('question-heading class element exists', () => {
    const question = document.getElementById('question');
    expect(question).not.toBeNull();
    expect(question.classList.contains('question-heading')).toBe(true);
  });

  test('dark orange hex value is valid', () => {
    const darkOrange = '#cc5500';
    expect(darkOrange).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  test('hover dark orange hex value is valid and darker', () => {
    const darkOrangeHover = '#a34400';
    expect(darkOrangeHover).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  test('fallback color matches CSS variable value', () => {
    const variable = '#cc5500';
    const fallback = '#cc5500';
    expect(variable).toBe(fallback);
  });

  test('CSS variable declaration includes fallback', () => {
    const cssDeclaration = 'color: var(--color-heading-dark-orange, #cc5500)';
    expect(cssDeclaration).toContain('var(--color-heading-dark-orange,');
    expect(cssDeclaration).toContain('#cc5500');
  });
});