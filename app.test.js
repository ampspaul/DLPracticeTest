'use strict';

const studentHeading = require('./app');

describe('studentHeading', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<div id="test-container"></div>';
    container = document.getElementById('test-container');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('formatName', () => {
    test('capitalizes first letter of each word', () => {
      expect(studentHeading.formatName('john doe')).toBe('John Doe');
    });

    test('handles already capitalized names', () => {
      expect(studentHeading.formatName('JOHN DOE')).toBe('John Doe');
    });

    test('handles single word name', () => {
      expect(studentHeading.formatName('john')).toBe('John');
    });

    test('returns empty string for empty input', () => {
      expect(studentHeading.formatName('')).toBe('');
    });

    test('handles extra spaces gracefully', () => {
      const result = studentHeading.formatName('john  doe');
      expect(result).toContain('John');
      expect(result).toContain('Doe');
    });
  });

  describe('render', () => {
    test('appends a heading element to the container', () => {
      studentHeading.render(container, 'John Doe');
      const heading = container.querySelector('.student-name-heading');
      expect(heading).not.toBeNull();
      expect(heading.tagName).toBe('H2');
    });

    test('sets the correct text content', () => {
      studentHeading.render(container, 'John Doe');
      const heading = container.querySelector('.student-name-heading');
      expect(heading.textContent).toBe('John Doe');
    });
  });

  describe('init', () => {
    test('renders heading when valid name and container provided', () => {
      studentHeading.init('jane smith', 'test-container');
      const heading = container.querySelector('.student-name-heading');
      expect(heading).not.toBeNull();
      expect(heading.textContent).toBe('Jane Smith');
    });

    test('does not render when name is empty', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      studentHeading.init('', 'test-container');
      const heading = container.querySelector('.student-name-heading');
      expect(heading).toBeNull();
      consoleSpy.mockRestore();
    });

    test('does not render when name is not a string', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      studentHeading.init(null, 'test-container');
      const heading = container.querySelector('.student-name-heading');
      expect(heading).toBeNull();
      consoleSpy.mockRestore();
    });

    test('does not render when container id is invalid', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      studentHeading.init('John Doe', 'nonexistent-container');
      expect(consoleSpy).toHaveBeenCalledWith(
        'Container element not found: nonexistent-container'
      );
      consoleSpy.mockRestore();
    });
  });

  describe('clear', () => {
    test('removes the student heading from the container', () => {
      studentHeading.render(container, 'John Doe');
      studentHeading.clear('test-container');
      const heading = container.querySelector('.student-name-heading');
      expect(heading).toBeNull();
    });

    test('does nothing when container does not exist', () => {
      expect(() => studentHeading.clear('nonexistent')).not.toThrow();
    });

    test('does nothing when heading does not exist in container', () => {
      expect(() => studentHeading.clear('test-container')).not.toThrow();
    });
  });
});