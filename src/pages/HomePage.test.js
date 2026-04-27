import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the heading text', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TN Student Practice Test');
  });

  it('applies dark red color via CSS variable to the heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.style.color).toBe('var(--heading-color)');
  });

  it('applies italic font style to the heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.style.fontStyle).toBe('italic');
  });

  it('applies bold font weight to the heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.style.fontWeight).toBe('700');
  });

  it('renders container with desktop padding by default', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
    render(<HomePage />);
    const container = screen.getByRole('heading', { level: 1 }).parentElement;
    expect(container.style.padding).toBe('40px');
  });

  it('updates viewport on resize', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
    render(<HomePage />);
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
      window.dispatchEvent(new Event('resize'));
    });
    const container = screen.getByRole('heading', { level: 1 }).parentElement;
    expect(container.style.padding).toBe('16px');
  });
});