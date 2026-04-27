import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    // Reset window width to desktop default
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });
  });

  it('renders the heading with correct text', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('page-heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('TN Student Practice Test');
  });

  it('renders heading with dark red color on desktop', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('page-heading');
    expect(heading.style.color).toBe('rgb(139, 0, 0)');
  });

  it('renders heading with desktop font size at wide viewport', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('page-heading');
    expect(heading.style.fontSize).toBe('2.5rem');
  });

  it('renders heading with tablet font size at 768px viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 900,
    });
    render(<HomePage />);
    const heading = screen.getByTestId('page-heading');
    expect(heading.style.fontSize).toBe('2rem');
  });

  it('renders heading with mobile font size at narrow viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480,
    });
    render(<HomePage />);
    const heading = screen.getByTestId('page-heading');
    expect(heading.style.fontSize).toBe('1.5rem');
  });

  it('updates viewport on window resize', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('page-heading');
    expect(heading.style.fontSize).toBe('2.5rem');

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 480,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(heading.style.fontSize).toBe('1.5rem');
  });

  it('heading is bold and italic', () => {
    render(<HomePage />);
    const heading = screen.getByTestId('page-heading');
    expect(heading.style.fontWeight).toBe('700');
    expect(heading.style.fontStyle).toBe('italic');
  });
});