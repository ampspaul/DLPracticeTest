import React from 'react';
import { render, screen } from '@testing-library/react';
import PracticeTest from '../PracticeTest';

// Mock the Quiz component to isolate the page heading test
jest.mock('../../components/Quiz', () => () => <div data-testid="quiz-mock" />);

describe('PracticeTest page', () => {
  it('renders the correct primary heading text', () => {
    render(<PracticeTest />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Tennessee Driver Licence Practice Test');
  });

  it('renders the heading as an h1 element', () => {
    render(<PracticeTest />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.tagName).toBe('H1');
  });

  it('does not display any old/previous header text', () => {
    render(<PracticeTest />);
    // Ensure none of the known old variants appear
    const headings = screen.getAllByRole('heading');
    headings.forEach((h) => {
      expect(h.textContent).not.toMatch(/driver.*(license|licence).*(test|quiz)/i);
      // The only heading-level text that should appear is the new one
    });
    // Confirm the new heading is the only h1
    const h1Elements = document.querySelectorAll('h1');
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0].textContent).toBe('Tennessee Driver Licence Practice Test');
  });

  it('renders the Quiz component on the page', () => {
    render(<PracticeTest />);
    expect(screen.getByTestId('quiz-mock')).toBeInTheDocument();
  });

  it('renders without crashing and produces no unexpected errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<PracticeTest />);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});