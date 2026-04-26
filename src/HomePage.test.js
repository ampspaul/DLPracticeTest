import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the heading with the correct text', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: /TN Student Practice Test/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the heading in Dark Blue (#00008B)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: /TN Student Practice Test/i });
    expect(heading).toHaveStyle({ color: '#00008B' });
  });

  it('does NOT render the heading in Dark Red (#8B0000)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: /TN Student Practice Test/i });
    expect(heading).not.toHaveStyle({ color: '#8B0000' });
  });

  it('renders the heading with bold font-weight (700)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: /TN Student Practice Test/i });
    expect(heading).toHaveStyle({ fontWeight: 700 });
  });

  it('renders the heading with italic font-style', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: /TN Student Practice Test/i });
    expect(heading).toHaveStyle({ fontStyle: 'italic' });
  });

  it('renders the heading as an h1 element', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});