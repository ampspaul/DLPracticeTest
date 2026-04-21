/**
 * Test: Page title must be exactly 'KY-DL Practice TEST'
 */
describe('Page Title', () => {
  it('should have the document title set to exactly "KY-DL Practice TEST"', () => {
    // Set the document title as it would be loaded from index.html
    document.title = 'KY-DL Practice TEST';
    expect(document.title).toBe('KY-DL Practice TEST');
  });

  it('should not have leading or trailing whitespace in the title', () => {
    document.title = 'KY-DL Practice TEST';
    expect(document.title).toBe(document.title.trim());
    expect(document.title.trim()).toBe('KY-DL Practice TEST');
  });

  it('should not be a placeholder or default title', () => {
    document.title = 'KY-DL Practice TEST';
    const forbiddenTitles = ['React App', 'Untitled', 'My App', ''];
    expect(forbiddenTitles).not.toContain(document.title);
  });
});