import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders the heading with correct text', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TN Student Practice Test');
  });

  test('heading has bold font-weight', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle('font-weight: 700');
  });

  test('heading has italic font-style', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle('font-style: italic');
  });

  test('heading has dark green colour (#006400)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle('color: #006400');
  });

  test('heading does not have dark red colour (#8B0000)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).not.toHaveStyle('color: #8B0000');
  });

  test('heading text is exactly "TN Student Practice Test" with correct capitalisation', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('TN Student Practice Test');
  });
});