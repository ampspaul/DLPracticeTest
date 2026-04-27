import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders the heading with correct text', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading).toBeInTheDocument();
  });

  it('renders the heading with Dark Orange colour (#FF8C00)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    // Inline style should be Dark Orange
    expect(heading).toHaveStyle({ color: '#FF8C00' });
  });

  it('renders the heading with font-weight 700 (bold)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading).toHaveStyle({ fontWeight: 700 });
  });

  it('renders the heading with font-style italic', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading).toHaveStyle({ fontStyle: 'italic' });
  });

  it('heading text content is exactly "TN Student Practice Test"', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading.textContent).toBe('TN Student Practice Test');
  });

  it('does NOT use the old Dark Purple colour (#4B0082)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'TN Student Practice Test' });
    expect(heading).not.toHaveStyle({ color: '#4B0082' });
  });

  it('matches snapshot', () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});