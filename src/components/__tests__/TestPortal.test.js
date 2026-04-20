import React from 'react';
import { render, screen } from '@testing-library/react';
import TestPortal from '../TestPortal';

const mockQuestions = [
  {
    id: 'q1',
    question: 'What does a red traffic light mean?',
    options: ['Stop', 'Go', 'Slow down', 'Yield'],
    correctAnswer: 'Stop'
  },
  {
    id: 'q2',
    question: 'What is the speed limit in a school zone?',
    options: ['15 mph', '25 mph', '35 mph', '45 mph'],
    correctAnswer: '25 mph'
  }
];

describe('TestPortal', () => {
  it('renders the primary h1 heading with exact title text', () => {
    render(<TestPortal questions={mockQuestions} onTestComplete={() => {}} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('US-TN Driver Licence Practice Test');
  });

  it('contains only one h1 element', () => {
    const { container } = render(
      <TestPortal questions={mockQuestions} onTestComplete={() => {}} />
    );
    const h1Elements = container.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
  });

  it('displays question progress', () => {
    render(<TestPortal questions={mockQuestions} onTestComplete={() => {}} />);
    expect(screen.getByText(/question 1 of 2/i)).toBeInTheDocument();
  });
});