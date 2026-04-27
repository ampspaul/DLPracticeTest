import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage — primary heading', () => {
  test('renders exact heading text "TN Student Practice Test"', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading).toBeInTheDocument();
  });

  test('heading has color #FF8C00 (Dark Orange) via inline style', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    // Inline style is the authoritative source of truth for colour
    expect(heading.style.color).toBe('rgb(255, 140, 0)'); // #FF8C00 in rgb
  });

  test('heading has font-weight 700 (bold) via inline style', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.fontWeight).toBe('700');
  });

  test('heading has font-style italic via inline style', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.fontStyle).toBe('italic');
  });

  test('heading does NOT use Dark Purple (#4B0082)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.color).not.toBe('rgb(75, 0, 130)'); // #4B0082
  });

  test('heading does NOT use Dark Red (#8B0000)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.style.color).not.toBe('rgb(139, 0, 0)'); // #8B0000
  });

  test('heading has class home-page__heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading).toHaveClass('home-page__heading');
  });

  test('heading is an h1 element', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1, name: 'TN Student Practice Test' });
    expect(heading).toBeInTheDocument();
  });
});