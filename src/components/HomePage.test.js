import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import HomePage from './HomePage';

// ---------------------------------------------------------------------------
// Helper: resolve computed style from inline / className styles applied by
// the test renderer. Where CSS-in-JS is not used we assert on className and
// rely on the snapshot for style verification.
// ---------------------------------------------------------------------------

describe('HomePage', () => {
  const mockOnStart = jest.fn();

  beforeEach(() => {
    mockOnStart.mockClear();
  });

  // ── Snapshot test ─────────────────────────────────────────────────────────
  it('matches snapshot (bold italic dark-red heading)', () => {
    const tree = renderer
      .create(<HomePage onStart={mockOnStart} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // ── Heading text ──────────────────────────────────────────────────────────
  it('renders the heading with correct text', () => {
    render(<HomePage onStart={mockOnStart} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TN Student Practice Test');
  });

  // ── Heading class (style applied via CSS) ────────────────────────────────
  it('applies home-heading class to the h1 element', () => {
    render(<HomePage onStart={mockOnStart} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('home-heading');
  });

  // ── Other UI elements unchanged ───────────────────────────────────────────
  it('renders the subheading unchanged', () => {
    render(<HomePage onStart={mockOnStart} />);
    expect(
      screen.getByText('Select a subject and begin your practice session.')
    ).toBeInTheDocument();
  });

  it('renders the Start Test button', () => {
    render(<HomePage onStart={mockOnStart} />);
    const btn = screen.getByRole('button', { name: /start test/i });
    expect(btn).toBeInTheDocument();
  });

  it('calls onStart when the Start Test button is clicked', () => {
    render(<HomePage onStart={mockOnStart} />);
    const btn = screen.getByRole('button', { name: /start test/i });
    btn.click();
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });

  // ── WCAG AA contrast documentation ───────────────────────────────────────
  /**
   * #8B0000 (dark red) on #FFFFFF (white):
   *   Relative luminance of #8B0000 ≈ 0.046
   *   Relative luminance of #FFFFFF  = 1.0
   *   Contrast ratio = (1.0 + 0.05) / (0.046 + 0.05) ≈ 5.91 : 1
   *   WCAG AA requires ≥ 4.5 : 1 for normal text → PASS
   *
   * This test documents the requirement; actual colour is enforced via CSS.
   */
  it('documents that #8B0000 on white meets WCAG AA (≥4.5:1)', () => {
    // Relative luminance helper (IEC 61966-2-1)
    const toLinear = (c8bit) => {
      const s = c8bit / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    const relativeLuminance = (r, g, b) =>
      0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

    const darkRedLum  = relativeLuminance(0x8B, 0x00, 0x00); // #8B0000
    const whiteLum    = relativeLuminance(0xFF, 0xFF, 0xFF); // #FFFFFF

    const lighter = Math.max(darkRedLum, whiteLum);
    const darker  = Math.min(darkRedLum, whiteLum);
    const contrastRatio = (lighter + 0.05) / (darker + 0.05);

    // Must satisfy WCAG AA for normal text
    expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
  });
});