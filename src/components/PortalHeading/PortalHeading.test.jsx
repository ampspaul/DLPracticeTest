import React from 'react';
import { render, screen } from '@testing-library/react';
import PortalHeading from './PortalHeading';

describe('PortalHeading Component', () => {
  it('renders the portal heading with correct text', () => {
    render(<PortalHeading />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TN Driver Licence Practice Test');
  });

  it('uses semantic h1 tag for proper heading hierarchy', () => {
    render(<PortalHeading />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.tagName).toBe('H1');
  });

  it('has proper heading class for styling', () => {
    render(<PortalHeading />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('portal-heading');
  });

  it('heading is visible and accessible to screen readers', () => {
    const { container } = render(<PortalHeading />);
    const heading = container.querySelector('.portal-heading');
    expect(heading).toBeVisible();
  });

  it('container has proper header element semantics', () => {
    const { container } = render(<PortalHeading />);
    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('portal-heading-container');
  });

  it('does not have aria-hidden attribute that would hide from screen readers', () => {
    render(<PortalHeading />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('renders without console errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<PortalHeading />);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});