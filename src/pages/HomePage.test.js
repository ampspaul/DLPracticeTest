import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
  });

  it('renders the correct heading text', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TN Student Practice Test');
  });

  it('renders an h1 element for the heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TN Student Practice Test');
  });

  it('renders the container element', () => {
    render(<HomePage />);
    const container = screen.getByTestId('home-container');
    expect(container).toBeInTheDocument();
  });

  it('applies the home-heading CSS class (which carries Dark Orange colour token)', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading).toHaveClass('home-heading');
  });

  it('applies the home-container CSS class', () => {
    render(<HomePage />);
    const container = screen.getByTestId('home-container');
    expect(container).toHaveClass('home-container');
  });

  it('does NOT use the legacy dark-green inline colour (#006400)', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    // Inline style should not carry the wrong legacy colour
    expect(heading.style.color).not.toBe('rgb(0, 100, 0)'); // #006400
    expect(heading.style.color).not.toBe('#006400');
  });
});