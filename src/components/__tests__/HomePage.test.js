import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders the TN Student Practice Test heading', () => {
    render(<HomePage onStartTest={() => {}} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TN Student Practice Test');
  });

  it('heading has font-weight 700', () => {
    render(<HomePage onStartTest={() => {}} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({ fontWeight: 700 });
  });

  it('heading has green colour', () => {
    render(<HomePage onStartTest={() => {}} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({ color: '#2e7d32' });
  });

  it('calls onStartTest when Start Test button is clicked', () => {
    const mockStart = jest.fn();
    render(<HomePage onStartTest={mockStart} />);
    fireEvent.click(screen.getByRole('button', { name: /start test/i }));
    expect(mockStart).toHaveBeenCalledTimes(1);
  });
});