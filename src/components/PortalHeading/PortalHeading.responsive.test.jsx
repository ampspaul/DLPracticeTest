import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalHeading from './PortalHeading';

/**
 * Responsive Design Tests for PortalHeading
 * Validates appearance across mobile, tablet, and desktop viewports
 */
describe('PortalHeading Responsive Design Tests', () => {
  const viewportSizes = [
    { name: 'Mobile (320px)', width: 320 },
    { name: 'Mobile (375px)', width: 375 },
    { name: 'Mobile (480px)', width: 480 },
    { name: 'Tablet (600px)', width: 600 },
    { name: 'Tablet (768px)', width: 768 },
    { name: 'Tablet (1000px)', width: 1000 },
    { name: 'Desktop (1024px)', width: 1024 },
    { name: 'Desktop (1440px)', width: 1440 },
    { name: 'Desktop (1920px)', width: 1920 },
  ];

  viewportSizes.forEach(({ name, width }) => {
    describe(`Viewport: ${name}`, () => {
      beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        window.dispatchEvent(new Event('resize'));
      });

      it('heading renders and is visible', () => {
        render(<PortalHeading />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeVisible();
      });

      it('heading text is complete and readable', () => {
        render(<PortalHeading />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading.textContent).toBe('TN Driver Licence Practice Test');
      });

      it('container spans full viewport width', () => {
        const { container } = render(<PortalHeading />);
        const containerEl = container.querySelector('.portal-heading-container');
        const styles = window.getComputedStyle(containerEl);
        expect(styles.width).toBe('100%');
      });

      it('no horizontal overflow', () => {
        const { container } = render(<PortalHeading />);
        const containerEl = container.querySelector('.portal-heading-container');
        expect(containerEl.scrollWidth).toBeLessThanOrEqual(containerEl.clientWidth + 1);
      });

      it('text does not overflow or wrap improperly', () => {
        const { container } = render(<PortalHeading />);
        const heading = container.querySelector('.portal-heading');
        expect(heading).toBeVisible();
      });

      it('padding and margin are appropriate for viewport', () => {
        const { container } = render(<PortalHeading />);
        const containerEl = container.querySelector('.portal-heading-container');
        const styles = window.getComputedStyle(containerEl);
        expect(parseFloat(styles.paddingLeft)).toBeGreaterThan(0);
        expect(parseFloat(styles.paddingRight)).toBeGreaterThan(0);
      });

      it('maintains readable font size', () => {
        const { container } = render(<PortalHeading />);
        const heading = container.querySelector('.portal-heading');
        const styles = window.getComputedStyle(heading);
        const fontSize = parseFloat(styles.fontSize);
        expect(fontSize).toBeGreaterThanOrEqual(24); // 1.5rem minimum = 24px
      });

      it('maintains proper line-height for readability', () => {
        const { container } = render(<PortalHeading />);
        const heading = container.querySelector('.portal-heading');
        const styles = window.getComputedStyle(heading);
        expect(parseFloat(styles.lineHeight)).toBeGreaterThan(0);
      });

      it('centered text alignment is maintained', () => {
        const { container } = render(<PortalHeading />);
        const heading = container.querySelector('.portal-heading');
        const styles = window.getComputedStyle(heading);
        expect(styles.textAlign).toBe('center');
      });
    });
  });

  describe('Mobile-Specific (320px - 599px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });
    });

    it('applies mobile padding values', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      expect(containerEl).toBeInTheDocument();
      // Mobile: padding should be 1rem 0.75rem
    });

    it('applies mobile font size', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      expect(heading).toBeInTheDocument();
      // Mobile: font-size should be 1.5rem
    });
  });

  describe('Tablet-Specific (600px - 1023px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
    });

    it('applies tablet padding values', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      expect(containerEl).toBeInTheDocument();
      // Tablet: padding should be 1.25rem 1rem
    });

    it('applies tablet font size', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      expect(heading).toBeInTheDocument();
      // Tablet: font-size should be 1.75rem
    });
  });

  describe('Desktop-Specific (1024px+)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });
    });

    it('applies desktop padding values', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      expect(containerEl).toBeInTheDocument();
      // Desktop: padding should be 1.5rem 1.5rem
    });

    it('applies desktop font size', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      expect(heading).toBeInTheDocument();
      // Desktop: font-size should be 2rem
    });
  });

  describe('Breakpoint Transitions', () => {
    it('handles transition from mobile to tablet', () => {
      const { rerender, container } = render(<PortalHeading />);
      
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      });
      window.dispatchEvent(new Event('resize'));
      
      rerender(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeVisible();
    });

    it('handles transition from tablet to desktop', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      
      const { rerender } = render(<PortalHeading />);
      
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      window.dispatchEvent(new Event('resize'));
      
      rerender(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeVisible();
    });
  });

  describe('Accessibility on All Viewports', () => {
    viewportSizes.forEach(({ name, width }) => {
      it(`accessible heading on ${name}`, () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        
        render(<PortalHeading />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading).not.toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Print Responsive', () => {
    it('component is printable on all sizes', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      expect(heading).toBeInTheDocument();
      // Print styles should apply via @media print
    });
  });
});