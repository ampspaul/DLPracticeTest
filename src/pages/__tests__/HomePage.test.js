import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  const DARK_RED = '#8B0000';
  const FORBIDDEN_COLOURS = ['#4B0082', '#FF8C00', '#006400'];

  beforeEach(() => {
    // Default to desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });
  });

  test('renders heading with exact text "TN Student Practice Test"', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  test('heading has Dark Red colour (#8B0000) on desktop viewport (>=1024px)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.color).toBe(DARK_RED);
  });

  test('heading has Dark Red colour (#8B0000) on tablet viewport (768–1023px)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 900 });
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.color).toBe(DARK_RED);
  });

  test('heading has Dark Red colour (#8B0000) on mobile viewport (<768px)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.color).toBe(DARK_RED);
  });

  test.each(FORBIDDEN_COLOURS)(
    'heading does NOT use forbidden colour %s',
    (forbiddenColor) => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
      expect(heading.style.color).not.toBe(forbiddenColor);
    }
  );

  test('heading has font-weight 700 on all viewports', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.fontWeight).toBe('700');
  });

  test('heading has font-style italic on all viewports', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.fontStyle).toBe('italic');
  });

  test('heading colour updates to Dark Red when viewport resizes to tablet', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.color).toBe(DARK_RED);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 900 });
      window.dispatchEvent(new Event('resize'));
    });

    expect(heading.style.color).toBe(DARK_RED);
  });

  test('heading colour updates to Dark Red when viewport resizes to mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.color).toBe(DARK_RED);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
      window.dispatchEvent(new Event('resize'));
    });

    expect(heading.style.color).toBe(DARK_RED);
  });

  test('matches snapshot', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});