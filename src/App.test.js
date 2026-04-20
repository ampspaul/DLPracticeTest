import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const EXPECTED_TITLE = 'TN Driver Licence Practice Test';

describe('App — document.title', () => {
  beforeEach(() => {
    document.title = '';
  });

  test('sets document.title to "TN Driver Licence Practice Test" on mount', () => {
    render(<App />);
    expect(document.title).toBe(EXPECTED_TITLE);
  });

  test('document.title is exactly correct', () => {
    render(<App />);
    expect(document.title).toBe(EXPECTED_TITLE);
    expect(document.title).not.toBe('TN Driver License Practice Test'); // wrong spelling
  });
});

describe('App — renders HomePage with h1 title', () => {
  test('renders h1 with exact title text inside App', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
    expect(heading.textContent).toBe(EXPECTED_TITLE);
  });

  test('h1 title is visible (not hidden) in App', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeVisible();
  });

  test('App root contains exactly one h1', () => {
    const { container } = render(<App />);
    const h1s = container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe(EXPECTED_TITLE);
  });

  test('App wraps content in a div with class "App"', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass('App');
  });

  test('renders Start Test button inside App', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Start the TN Driver Licence Practice Test/i });
    expect(button).toBeInTheDocument();
  });
});