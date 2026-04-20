import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders the primary h1 heading with exact title text', () => {
    render(<HomePage onStartTest={() => {}} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('US-TN Driver Licence Practice Test');
  });

  it('contains only one h1 element', () => {
    const { container } = render(<HomePage onStartTest={() => {}} />);
    const h1Elements = container.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
  });

  it('renders the Start Test button', () => {
    render(<HomePage onStartTest={() => {}} />);
    expect(screen.getByRole('button', { name: /start the test/i })).toBeInTheDocument();
  });
});