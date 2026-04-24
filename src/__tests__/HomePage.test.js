import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import HomePage from '../components/HomePage';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const DARK_GREEN = '#1b5e20';
const HEADING_TEXT = 'TN Student Practice Test';

// ---------------------------------------------------------------------------
// Unit Tests
// ---------------------------------------------------------------------------
describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
  });

  it('displays the correct heading text', () => {
    render(<HomePage />);
    expect(screen.getByText(HEADING_TEXT)).toBeInTheDocument();
  });

  it('renders the heading as an h1 element', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(HEADING_TEXT);
  });

  it('applies Dark Green colour (#1b5e20) to the heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    // Inline style is directly on the element
    expect(heading).toHaveStyle({ color: DARK_GREEN });
  });

  it('retains font-weight: 700 on the heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({ fontWeight: 700 });
  });

  it('does NOT apply blue colour to the heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    // Ensure no blue variant is applied
    const computedStyle = window.getComputedStyle(heading);
    const colorValue = heading.style.color;
    expect(colorValue).not.toBe('blue');
    expect(colorValue).not.toBe('#0000ff');
    expect(colorValue).not.toBe('rgb(0, 0, 255)');
  });

  it('renders the Start Test button when onStart prop is provided', () => {
    const mockOnStart = jest.fn();
    render(<HomePage onStart={mockOnStart} />);
    expect(screen.getByRole('button', { name: /start test/i })).toBeInTheDocument();
  });

  it('does NOT render the Start Test button when onStart prop is absent', () => {
    render(<HomePage />);
    expect(screen.queryByRole('button', { name: /start test/i })).not.toBeInTheDocument();
  });

  it('calls onStart when Start Test button is clicked', () => {
    const mockOnStart = jest.fn();
    render(<HomePage onStart={mockOnStart} />);
    screen.getByRole('button', { name: /start test/i }).click();
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Snapshot Tests
// ---------------------------------------------------------------------------
describe('HomePage snapshots', () => {
  it('matches snapshot without onStart prop', () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with onStart prop', () => {
    const tree = renderer.create(<HomePage onStart={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});