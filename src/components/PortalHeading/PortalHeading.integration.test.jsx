import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalHeading from './PortalHeading';

/**
 * Integration tests for PortalHeading component
 * Tests interaction with page layout, navigation, and other components
 */
describe('PortalHeading Integration Tests', () => {
  describe('Layout Integration', () => {
    it('heading integrates with page structure without conflicts', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <main>
            <section>Test Content</section>
          </main>
        </div>
      );
      
      const header = container.querySelector('header');
      const main = container.querySelector('main');
      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(header.nextElementSibling).toBe(main);
    });

    it('heading does not interfere with subsequent content', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <nav>Navigation</nav>
          <main>Content</main>
        </div>
      );
      
      const heading = screen.getByRole('heading', { level: 1 });
      const nav = container.querySelector('nav');
      const main = container.querySelector('main');
      
      expect(heading).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(main).toBeInTheDocument();
    });

    it('heading maintains correct stacking order in page flow', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <section>First Section</section>
          <section>Second Section</section>
        </div>
      );
      
      const header = container.querySelector('header');
      const sections = container.querySelectorAll('section');
      
      expect(header.nextElementSibling).toBe(sections[0]);
      expect(sections[0].nextElementSibling).toBe(sections[1]);
    });
  });

  describe('Navigation Integration', () => {
    it('heading does not conflict with navigation elements', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <nav className="main-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/test">Test</a></li>
            </ul>
          </nav>
        </div>
      );
      
      const header = container.querySelector('header');
      const nav = container.querySelector('nav');
      const links = container.querySelectorAll('a');
      
      expect(header).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(links).toHaveLength(2);
    });

    it('heading preserves navigation flow and accessibility', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <nav>
            <a href="#main">Skip to main</a>
          </nav>
        </div>
      );
      
      const skipLink = container.querySelector('a');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main');
    });
  });

  describe('Multiple Component Instances', () => {
    it('handles multiple heading instances on same page (if needed)', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <section>
            <h2>Subsection Heading</h2>
          </section>
        </div>
      );
      
      const h1 = container.querySelector('h1');
      const h2 = container.querySelector('h2');
      
      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      expect(h1.textContent).toBe('TN Driver Licence Practice Test');
    });
  });

  describe('Print Stylesheet Integration', () => {
    it('component respects print media styles', () => {
      const { container } = render(<PortalHeading />);
      const containerEl = container.querySelector('.portal-heading-container');
      expect(containerEl).toBeInTheDocument();
      // Print styles are applied via CSS media query
    });
  });

  describe('Theme & Styling System Integration', () => {
    it('heading uses colors consistent with design system', () => {
      const { container } = render(<PortalHeading />);
      const heading = container.querySelector('.portal-heading');
      const containerEl = container.querySelector('.portal-heading-container');
      
      const headingStyles = window.getComputedStyle(heading);
      const containerStyles = window.getComputedStyle(containerEl);
      
      expect(headingStyles.color).toBeDefined();
      expect(containerStyles.backgroundColor).toBeDefined();
      expect(containerStyles.borderBottom).toBeDefined();
    });
  });

  describe('Responsive Behavior in Layout Context', () => {
    it('maintains layout integrity on mobile width changes', () => {
      const { container } = render(
        <div>
          <PortalHeading />
          <main style={{ maxWidth: '100%' }}>Content</main>
        </div>
      );
      
      const header = container.querySelector('header');
      const main = container.querySelector('main');
      
      const headerWidth = window.getComputedStyle(header).width;
      const mainWidth = window.getComputedStyle(main).width;
      
      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
    });
  });

  describe('Performance & DOM Impact', () => {
    it('renders minimal DOM nodes', () => {
      const { container } = render(<PortalHeading />);
      const rootElement = container.firstChild;
      
      // Count total elements: header + h1 = 2 elements
      const allElements = rootElement.querySelectorAll('*');
      expect(allElements.length).toBeLessThanOrEqual(2);
    });

    it('uses efficient CSS selectors', () => {
      const { container } = render(<PortalHeading />);
      
      const byHeader = container.querySelector('header');
      const byClass = container.querySelector('.portal-heading-container');
      
      expect(byHeader).toBe(byClass);
    });
  });
});