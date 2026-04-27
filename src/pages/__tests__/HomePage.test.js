import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Mock window.innerWidth to simulate a given viewport width.
 * Must be called before rendering the component.
 */
function setWindowWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EXPECTED_TEXT = 'TN Student Practice Test';
const BLUE = '#0000CD';
const BOLD = 700;
const ITALIC = 'italic';

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('HomePage', () => {
  describe('heading text', () => {
    it('renders the exact heading text', () => {
      render(<HomePage />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(EXPECTED_TEXT);
    });

    it('does not alter casing, spacing, or punctuation of the heading text', () => {
      render(<HomePage />);
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(EXPECTED_TEXT);
    });
  });

  describe('desktop viewport (≥1024 px)', () => {
    beforeEach(() => setWindowWidth(1280));

    it('applies Blue heading colour (#0000CD)', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.color).toBe(BLUE);
    });

    it('applies font-weight 700', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(Number(heading.style.fontWeight)).toBe(BOLD);
    });

    it('applies font-style italic', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.fontStyle).toBe(ITALIC);
    });

    it('does NOT apply Dark Orange (#FF8C00) to heading', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.color).not.toBe('#FF8C00');
    });

    it('does NOT apply Dark Purple (#4B0082) to heading', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.color).not.toBe('#4B0082');
    });

    it('does NOT apply Dark Red (#8B0000) to heading', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.color).not.toBe('#8B0000');
    });
  });

  describe('tablet viewport (768–1023 px)', () => {
    beforeEach(() => setWindowWidth(900));

    it('applies Blue heading colour (#0000CD)', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.color).toBe(BLUE);
    });

    it('applies font-weight 700', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(Number(heading.style.fontWeight)).toBe(BOLD);
    });

    it('applies font-style italic', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.fontStyle).toBe(ITALIC);
    });

    it('does NOT apply Dark Orange (#FF8C00) to heading', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.color).not.toBe('#FF8C00');
    });
  });

  describe('mobile viewport (<768 px)', () => {
    beforeEach(() => setWindowWidth(375));

    it('applies Blue heading colour (#0000CD)', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.color).toBe(BLUE);
    });

    it('applies font-weight 700', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(Number(heading.style.fontWeight)).toBe(BOLD);
    });

    it('applies font-style italic', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.fontStyle).toBe(ITALIC);
    });

    it('does NOT apply Dark Orange (#FF8C00) to heading', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.style.color).not.toBe('#FF8C00');
    });
  });

  describe('snapshot', () => {
    it('matches snapshot on desktop', () => {
      setWindowWidth(1280);
      const { asFragment } = render(<HomePage />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot on tablet', () => {
      setWindowWidth(900);
      const { asFragment } = render(<HomePage />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot on mobile', () => {
      setWindowWidth(375);
      const { asFragment } = render(<HomePage />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});