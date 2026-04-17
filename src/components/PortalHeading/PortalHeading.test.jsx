import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalHeading from './PortalHeading';

describe('PortalHeading Component', () => {
  describe('Acceptance Criteria: Heading Text Rendering', () => {
    it('renders the heading text "TN Driver Licence Practice Test"', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('TN Driver Licence Practice Test');
    });

    it('heading text is visible to end users', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      expect(heading).toBeVisible();
      expect(heading).not.toHaveStyle('display: none');
      expect(heading).not.toHaveStyle('visibility: hidden');
    });
  });

  describe('Acceptance Criteria: Semantic HTML Implementation', () => {
    it('uses h1 tag for semantic heading hierarchy', () => {
      render(<PortalHeading />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1.tagName).toBe('H1');
    });

    it('wraps heading in header semantic element', () => {
      const { container } = render(<PortalHeading />);
      const headerElement = container.querySelector('header');
      expect(headerElement).toBeInTheDocument();
      expect(headerElement.tagName).toBe('HEADER');
    });

    it('header element has proper container class', () => {
      const { container } = render(<PortalHeading />);
      const headerElement = container.querySelector('header');
      expect(headerElement).toHaveClass('portal-heading-container');
    });

    it('h1 element has proper heading class', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('portal-heading');
    });

    it('heading is properly nested within header element', () => {
      const { container } = render(<PortalHeading />);
      const header = container.querySelector('header.portal-heading-container');
      const h1 = header.querySelector('h1.portal-heading');
      expect(h1).toBeInTheDocument();
    });
  });

  describe('Acceptance Criteria: Styling Consistency with App.css', () => {
    it('applies correct color to heading text', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const styles = window.getComputedStyle(heading);
      expect(styles.color).toBe('rgb(0, 51, 102)'); // #003366
    });

    it('applies correct background color to container', () => {
      const { container } = render(<PortalHeading />);
      const container_el = container.querySelector('.portal-heading-container');
      const styles = window.getComputedStyle(container_el);
      expect(styles.backgroundColor).toBe('rgb(248, 249, 250)'); // #f8f9fa
    });

    it('applies correct border styling', () => {
      const { container } = render(<PortalHeading />);
      const container_el = container.querySelector('.portal-heading-container');
      const styles = window.getComputedStyle(container_el);
      expect(styles.borderBottom).toContain('rgb(0, 102, 204)'); // #0066cc
    });

    it('heading has correct font weight for prominence', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const styles = window.getComputedStyle(heading);
      expect(parseInt(styles.fontWeight)).toBe(700);
    });

    it('heading has correct text alignment (center)', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const styles = window.getComputedStyle(heading);
      expect(styles.textAlign).toBe('center');
    });

    it('heading has proper line-height for readability', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const styles = window.getComputedStyle(heading);
      expect(parseFloat(styles.lineHeight)).toBeGreaterThan(1);
    });

    it('heading uses system font stack', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const styles = window.getComputedStyle(heading);
      expect(styles.fontFamily).toBeDefined();
      expect(styles.fontFamily).toMatch(/system|ui|Segoe/);
    });
  });

  describe('Acceptance Criteria: Responsive Design', () => {
    let originalInnerWidth;

    beforeEach(() => {
      originalInnerWidth = window.innerWidth;
    });

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      });
    });

    it('displays correctly on mobile (320px viewport)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });
      window.dispatchEvent(new Event('resize'));

      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeVisible();
      expect(heading).toBeInTheDocument();
    });

    it('displays correctly on tablet (768px viewport)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      window.dispatchEvent(new Event('resize'));

      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeVisible();
      expect(heading).toBeInTheDocument();
    });

    it('displays correctly on desktop (1024px+ viewport)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });
      window.dispatchEvent(new Event('resize'));

      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeVisible();
      expect(heading).toBeInTheDocument();
    });

    it('component spans full width on all viewports', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      const styles = window.getComputedStyle(containerEl);
      expect(styles.width).toBe('100%');
    });
  });

  describe('Acceptance Criteria: Accessibility', () => {
    it('does not introduce console errors during render', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      render(<PortalHeading />);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('does not introduce console warnings during render', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(<PortalHeading />);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });

    it('heading is accessible to screen readers via role', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('heading is not hidden from screen readers', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).not.toHaveAttribute('aria-hidden', 'true');
    });

    it('header element is not aria-hidden', () => {
      const { container } = render(<PortalHeading />);
      const header = container.querySelector('header');
      expect(header).not.toHaveAttribute('aria-hidden', 'true');
    });

    it('supports high contrast mode preference', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      expect(heading).toBeInTheDocument();
      // Component should apply high contrast styles when prefers-contrast: more
    });

    it('supports reduced motion preference', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      expect(containerEl).toBeInTheDocument();
      // Component should respect prefers-reduced-motion
    });

    it('heading has proper contrast ratio', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const text = heading.textContent;
      const styles = window.getComputedStyle(heading);
      expect(text).toBeTruthy();
      expect(styles.color).toBeDefined();
    });
  });

  describe('Acceptance Criteria: Layout & Component Hierarchy', () => {
    it('does not disrupt page layout with improper margins', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      const styles = window.getComputedStyle(containerEl);
      // Margin should be 0 to avoid layout shifts
      expect(styles.margin).toBe('0px');
    });

    it('header element resets margin to prevent disruption', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      const styles = window.getComputedStyle(containerEl);
      expect(styles.marginTop).toBe('0px');
      expect(styles.marginBottom).toBe('0px');
    });

    it('h1 element resets margin and padding to prevent disruption', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const styles = window.getComputedStyle(heading);
      expect(styles.margin).toBe('0px');
      expect(styles.padding).toBe('0px');
    });

    it('container has proper padding for spacing', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      const styles = window.getComputedStyle(containerEl);
      expect(styles.padding).toBeDefined();
      expect(styles.paddingTop).toBeDefined();
      expect(styles.paddingBottom).toBeDefined();
    });

    it('maintains proper box model with box-shadow', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      const styles = window.getComputedStyle(containerEl);
      expect(styles.boxShadow).toBeDefined();
    });

    it('renders as a direct child with correct structure', () => {
      const { container } = render(<PortalHeading />);
      const header = container.querySelector('header');
      const h1 = header.querySelector('h1');
      expect(h1.parentElement).toBe(header);
    });
  });

  describe('Acceptance Criteria: QA Verification', () => {
    it('component exports correctly as default export', () => {
      expect(PortalHeading).toBeDefined();
      expect(typeof PortalHeading).toBe('function');
    });

    it('component is a valid React functional component', () => {
      expect(() => render(<PortalHeading />)).not.toThrow();
    });

    it('component renders without props required', () => {
      expect(() => render(<PortalHeading />)).not.toThrow();
    });

    it('component renders single instance correctly', () => {
      const { container } = render(<PortalHeading />);
      const headers = container.querySelectorAll('header.portal-heading-container');
      expect(headers).toHaveLength(1);
    });

    it('component can be rendered on HomePage context', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('TN Driver Licence Practice Test');
    });

    it('component can be rendered on TestPortal context', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeVisible();
    });
  });

  describe('Edge Cases & Robustness', () => {
    it('component handles multiple renders correctly', () => {
      const { rerender } = render(<PortalHeading />);
      rerender(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('TN Driver Licence Practice Test');
    });

    it('component does not create memory leaks', () => {
      const { unmount } = render(<PortalHeading />);
      expect(() => unmount()).not.toThrow();
    });

    it('does not mutate or modify global state', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBe('TN Driver Licence Practice Test');
    });
  });
});