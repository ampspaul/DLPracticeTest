import React from 'react';
import { render, screen } from '@testing-library/react';
import AppHeading from '../AppHeading';

describe('AppHeading', () => {
  it('renders the correct heading text', () => {
    render(<AppHeading />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TN Student Practice Test');
  });

  it('applies font-weight 700 to the heading', () => {
    render(<AppHeading />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({ fontWeight: 700 });
  });

  it('applies green colour to the heading', () => {
    render(<AppHeading />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({ color: '#2e7d32' });
  });

  it('is responsive via clamp font-size', () => {
    render(<AppHeading />);
    const heading = screen.getByRole('heading', { level: 1 });
    // clamp is set as the fontSize value
    expect(heading.style.fontSize).toMatch(/clamp/);
  });
});