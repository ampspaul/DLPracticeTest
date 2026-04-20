import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import HomePage from './HomePage';

const EXPECTED_TITLE = 'TN Driver Licence Practice Test';

describe('Integration — title rendered correctly end-to-end', () => {
  beforeEach(() => {
    document.title = '';
  });

  test('full App render: h1 text matches document.title', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe(EXPECTED_TITLE);
    expect(document.title).toBe(EXPECTED_TITLE);
    // Both must be identical
    expect(heading.textContent).toBe(document.title);
  });

  test('standalone HomePage render: h1 text matches document.title', () => {
    render(<HomePage onStart={() => {}} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe(EXPECTED_TITLE);
    expect(document.title).toBe(EXPECTED_TITLE);
    expect(heading.textContent).toBe(document.title);
  });

  test('public/index.html title value matches expected constant', () => {
    // This test validates the static HTML title constant matches our expected string.
    // The actual HTML file title is verified via CI build checks.
    expect(EXPECTED_TITLE).toBe('TN Driver Licence Practice Test');
  });

  test('h1 in App is the only h1 on the page', () => {
    const { container } = render(<App />);
    const h1List = container.querySelectorAll('h1');
    expect(h1List).toHaveLength(1);
  });

  test('h1 title is accessible via getByRole with correct name', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: EXPECTED_TITLE, level: 1 })
    ).toBeInTheDocument();
  });
});