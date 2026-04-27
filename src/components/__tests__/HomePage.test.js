import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage heading', () => {
  it('renders the heading text unchanged', () => {
    render(<HomePage />);
    expect(screen.getByText('TN Student Practice Test')).toBeInTheDocument();
  });

  it('applies dark purple colour (#4B0082) to the heading', () => {
    render(<HomePage />);
    const heading = screen.getByText('TN Student Practice Test');
    expect(heading).toHaveStyle({ color: '#4B0082' });
  });

  it('does NOT apply dark red colour (#8B0000) to the heading', () => {
    render(<HomePage />);
    const heading = screen.getByText('TN Student Practice Test');
    expect(heading).not.toHaveStyle({ color: '#8B0000' });
  });

  it('preserves font-weight: 700 (bold) on the heading', () => {
    render(<HomePage />);
    const heading = screen.getByText('TN Student Practice Test');
    expect(heading).toHaveStyle({ fontWeight: 700 });
  });

  it('preserves font-style: italic on the heading', () => {
    render(<HomePage />);
    const heading = screen.getByText('TN Student Practice Test');
    expect(heading).toHaveStyle({ fontStyle: 'italic' });
  });

  it('renders the heading as an h1 element', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1, name: 'TN Student Practice Test' });
    expect(heading).toBeInTheDocument();
  });
});