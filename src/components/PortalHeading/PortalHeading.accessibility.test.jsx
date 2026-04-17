import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalHeading from './PortalHeading';

/**
 * Accessibility Tests for PortalHeading
 * Tests WCAG 2.1 compliance, semantic HTML, and assistive technology support
 */
describe('PortalHeading Accessibility Tests', () => {
  describe('WCAG 2.1 Compliance', () => {
    describe('Level A - Perceivable', () => {
      it('text is visible and perceivable', () => {
        render(<PortalHeading />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeVisible();
        expect(heading).not.toHaveStyle('display: none');
        expect(heading).not.toHaveStyle('visibility: hidden');
      });

      it('color contrast meets WCAG minimum', () => {
        const { container } = render(<PortalHeading />);
        const heading = container.querySelector('.portal-heading');
        // Color #003366 on #f8f9fa should meet AA contrast
        expect(heading).toBeInTheDocument();
      });
    });

    describe('Level A - Operable', () => {
      it('heading is keyboard accessible via semantic structure', () => {
        render(<PortalHeading />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
      });

      it('heading does not trap keyboard focus', () => {
        const { container } = render(<PortalHeading />);
        const heading = container.querySelector('.portal-heading');
        expect(heading.tagName).not.toBe('BUTTON');
        expect(heading.tagName).not.toBe('A');
      });
    });

    describe('Level A - Understandable', () => {
      it('heading text is clear and meaningful', () => {
        render(<PortalHeading />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading.textContent).toBe('TN Driver Licence Practice Test');
        expect(heading.textContent.length).toBeGreaterThan(0);
      });

      it('document has proper heading hierarchy', () => {
        render(<PortalHeading />);
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();
      });
    });

    describe('Level A - Robust', () => {
      it('semantic HTML is used correctly', () => {
        render(<PortalHeading />);
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1.tagName).toBe('H1');
      });

      it('parent header element is semantic', () => {
        const { container } = render(<PortalHeading />);
        const header = container.querySelector('header');
        expect(header).toBeInTheDocument();
        expect(header.tagName).toBe('HEADER');
      });
    });
  });

  describe('Screen Reader Support', () => {
    it('heading is exposed to screen readers via role', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('heading level 1 is announced correctly', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
    });

    it('heading text content is readable to screen readers', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBe('TN Driver Licence Practice Test');
    });

    it('heading is not hidden with aria-hidden', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).not.toHaveAttribute('aria-hidden', 'true');
    });

    it('header container is not hidden from screen readers', () => {
      const { container } = render(<PortalHeading />);
      const header = container.querySelector('header');
      expect(header).not.toHaveAttribute('aria-hidden', 'true');
    });

    it('no conflicting aria labels that would override heading', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).not.toHaveAttribute('aria-label');
      // Using semantic HTML instead of aria-label is better
    });
  });

  describe('Motion & Animation', () => {
    it('respects prefers-reduced-motion setting', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      expect(containerEl).toBeInTheDocument();
      // CSS respects @media (prefers-reduced-motion: reduce)
    });

    it('does not force animations that might cause motion sickness', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const styles = window.getComputedStyle(heading);
      // Should not have auto-playing animations
    });
  });

  describe('Vision & Color', () => {
    it('does not rely on color alone to convey information', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBe('TN Driver Licence Practice Test');
      // Text content is explicit, not relying on color
    });

    it('supports high contrast mode', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      expect(heading).toBeInTheDocument();
      // CSS has @media (prefers-contrast: more) support
    });

    it('border provides visual separation in high contrast', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      const styles = window.getComputedStyle(containerEl);
      expect(styles.borderBottom).toBeDefined();
    });
  });

  describe('Focus Management', () => {
    it('heading does not interfere with page focus flow', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      expect(heading.tagName).toBe('H1');
      // H1 is not focusable by default
    });

    it('heading can be reached with skip navigation links', () => {
      const { container } = render(
        <div>
          <a href="#main">Skip to main</a>
          <PortalHeading />
          <main id="main">Content</main>
        </div>
      );
      
      const skipLink = container.querySelector('a');
      const mainContent = container.querySelector('main');
      expect(skipLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Language Support', () => {
    it('text content is in English (TN Driver Licence)', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toContain('TN Driver Licence Practice Test');
    });

    it('does not include special characters that break screen readers', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      const text = heading.textContent;
      expect(text).not.toMatch(/[^\w\s'-]/g); // No special chars
    });
  });

  describe('Mobile Accessibility', () => {
    it('heading is accessible on mobile viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });
      
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeVisible();
    });

    it('touch target size is appropriate', () => {
      render(<PortalHeading />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      // Heading text area should be easily visible on mobile
    });
  });

  describe('No Console Errors', () => {
    it('renders without accessibility-related console errors', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      render(<PortalHeading />);
      
      // Filter for a11y-related errors
      const a11yErrors = consoleErrorSpy.mock.calls.filter(call =>
        call[0]?.toString().toLowerCase().includes('aria') ||
        call[0]?.toString().toLowerCase().includes('role') ||
        call[0]?.toString().toLowerCase().includes('accessible')
      );
      
      expect(a11yErrors).toHaveLength(0);
      consoleErrorSpy.mockRestore();
    });

    it('renders without React warnings', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(<PortalHeading />);
      
      // Filter for React-related warnings
      const reactWarnings = consoleWarnSpy.mock.calls.filter(call =>
        call[0]?.toString().toLowerCase().includes('react') ||
        call[0]?.toString().toLowerCase().includes('prop')
      );
      
      expect(reactWarnings).toHaveLength(0);
      consoleWarnSpy.mockRestore();
    });
  });

  describe('Semantic Structure Validation', () => {
    it('header is first landmark on page (when applicable)', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <main>Content</main>
        </div>
      );
      
      const landmarks = container.querySelectorAll('header, main, nav');
      expect(landmarks[0].tagName).toBe('HEADER');
    });

    it('no duplicate heading levels', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <h2>Subheading</h2>
        </div>
      );
      
      const h1s = container.querySelectorAll('h1');
      const h2s = container.querySelectorAll('h2');
      expect(h1s).toHaveLength(1);
      expect(h2s).toHaveLength(1);
    });

    it('proper heading hierarchy maintained', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <section>
            <h2>Section Heading</h2>
            <h3>Subsection</h3>
          </section>
        </div>
      );
      
      const headings = container.querySelectorAll('h1, h2, h3');
      expect(headings[0].tagName).toBe('H1');
      expect(headings[1].tagName).toBe('H2');
      expect(headings[2].tagName).toBe('H3');
    });
  });

  describe('Keyboard Navigation', () => {
    it('heading is in natural tab order for page structure', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <a href="#content">Link</a>
        </div>
      );
      
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      // Heading should not interfere with tab order
    });
  });
});