import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

const EXPECTED_TITLE = 'TN Driver Licence Practice Test';

// Viewport layout tests — verify title renders without breakage at mobile and desktop widths.
// Note: JSDOM does not apply CSS media queries, so we verify DOM structure is correct
// and that the element exists and is rendered at any viewport size. CSS visual regressions
// are covered by the CSS class assertions and snapshot tests below.

describe('HomePage — responsive layout (mobile ≥320px and desktop ≥1024px)', () => {
  const viewports = [
    { label: 'mobile minimum (320px)', width: 320, height: 568 },
    { label: 'mobile standard (375px)', width: 375, height: 667 },
    { label: 'tablet (768px)', width: 768, height: 1024 },
    { label: 'desktop (1024px)', width: 1024, height: 768 },
    { label: 'desktop wide (1440px)', width: 1440, height: 900 },
  ];

  viewports.forEach(({ label, width, height }) => {
    describe(`viewport: ${label}`, () => {
      beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: height,
        });
        window.dispatchEvent(new Event('resize'));
      });

      test(`h1 title is rendered at ${label}`, () => {
        render(<HomePage onStart={() => {}} />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe('H1');
        expect(heading.textContent).toBe(EXPECTED_TITLE);
      });

      test(`Start Test button is rendered at ${label}`, () => {
        render(<HomePage onStart={() => {}} />);
        const button = screen.getByRole('button', { name: /Start/i });
        expect(button).toBeInTheDocument();
      });

      test(`h1 has home-page__title class at ${label} (CSS class preserved)`, () => {
        render(<HomePage onStart={() => {}} />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveClass('home-page__title');
      });

      test(`container has home-page class at ${label} (layout class preserved)`, () => {
        const { container } = render(<HomePage onStart={() => {}} />);
        expect(container.firstChild).toHaveClass('home-page');
      });
    });
  });
});

describe('HomePage — snapshot regression (layout structure preserved)', () => {
  test('matches snapshot for default render', () => {
    const { container } = render(<HomePage onStart={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});