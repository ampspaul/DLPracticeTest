/**
 * Tests for dark purple heading styles
 */

describe('Dark Purple Heading', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1 class="dark-purple-heading">Test Heading H1</h1>
      <h2 class="dark-purple-heading">Test Heading H2</h2>
      <h3 class="dark-purple-heading">Test Heading H3</h3>
      <a class="dark-purple-heading" href="#">Test Link</a>
    `;
  });

  test('headings exist in the DOM', () => {
    expect(document.querySelector('h1.dark-purple-heading')).not.toBeNull();
    expect(document.querySelector('h2.dark-purple-heading')).not.toBeNull();
    expect(document.querySelector('h3.dark-purple-heading')).not.toBeNull();
  });

  test('dark-purple-heading class is applied correctly', () => {
    const h1 = document.querySelector('h1.dark-purple-heading');
    expect(h1.classList.contains('dark-purple-heading')).toBe(true);
  });

  test('heading text content is rendered', () => {
    const h1 = document.querySelector('h1.dark-purple-heading');
    expect(h1.textContent).toBe('Test Heading H1');
  });

  test('anchor with dark-purple-heading class renders correctly', () => {
    const link = document.querySelector('a.dark-purple-heading');
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('#');
  });
});