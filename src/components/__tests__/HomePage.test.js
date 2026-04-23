import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import HomePage from '../HomePage';

// ---------------------------------------------------------------------------
// Helper: render at a given viewport width
// ---------------------------------------------------------------------------
function renderAtWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
  return render(<HomePage />);
}

// ---------------------------------------------------------------------------
// Text content
// ---------------------------------------------------------------------------
describe('HomePage heading text', () => {
  test('renders exactly "TN Student Practice Test"', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TN Student Practice Test');
  });

  test('heading text is an exact match (no extra characters)', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('TN Student Practice Test');
  });
});

// ---------------------------------------------------------------------------
// CSS class & styling
// ---------------------------------------------------------------------------
describe('HomePage heading styling', () => {
  test('heading has the page-heading CSS class', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('page-heading');
  });
});

// ---------------------------------------------------------------------------
// No regressions — page container present
// ---------------------------------------------------------------------------
describe('HomePage structure', () => {
  test('renders the home-page container', () => {
    const { container } = render(<HomePage />);
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.home-page')).toBeInTheDocument();
  });

  test('contains exactly one h1 element', () => {
    const { container } = render(<HomePage />);
    // eslint-disable-next-line testing-library/no-container
    const h1s = container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Viewport rendering (desktop / tablet / mobile)
// ---------------------------------------------------------------------------
describe('HomePage viewport rendering', () => {
  afterEach(() => {
    // Reset to standard desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('renders correctly at desktop width (1280px)', () => {
    renderAtWidth(1280);
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent('TN Student Practice Test');
  });

  test('renders correctly at tablet width (768px)', () => {
    renderAtWidth(768);
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent('TN Student Practice Test');
  });

  test('renders correctly at mobile width (375px)', () => {
    renderAtWidth(375);
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent('TN Student Practice Test');
  });
});

// ---------------------------------------------------------------------------
// Snapshot tests
// ---------------------------------------------------------------------------
describe('HomePage snapshots', () => {
  test('matches desktop snapshot', () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});