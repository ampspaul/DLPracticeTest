import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    // Reset innerWidth to desktop default before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });
  });

  it('renders the heading with correct text', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TN Student Practice Test');
  });

  it('renders an h1 element', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('applies CSS variable --heading-color to the heading (not a hardcoded hex)', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    // Colour must be set via the CSS custom property, not a hardcoded value
    expect(heading.style.color).toBe('var(--heading-color)');
  });

  it('does not use the legacy Dark Green colour #006400', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading.style.color).not.toBe('rgb(0, 100, 0)');
    expect(heading.style.color).not.toBe('#006400');
  });

  it('uses desktop font size at viewport >= 1024px', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading.style.fontSize).toBe('2.5rem');
  });

  it('uses tablet font size at viewport width 768–1023px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading.style.fontSize).toBe('2rem');
  });

  it('uses mobile font size at viewport width < 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading.style.fontSize).toBe('1.5rem');
  });

  it('updates viewport styles on window resize', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading.style.fontSize).toBe('2.5rem');

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(heading.style.fontSize).toBe('1.5rem');
  });

  it('heading is bold and italic', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('home-heading');
    expect(heading.style.fontWeight).toBe('700');
    expect(heading.style.fontStyle).toBe('italic');
  });
});