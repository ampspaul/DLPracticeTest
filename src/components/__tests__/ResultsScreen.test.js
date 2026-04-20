import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsScreen from '../ResultsScreen';

const mockQuestions = [
  { id: 'q1', question: 'Q1?', options: ['A', 'B'], correctAnswer: 'A' },
  { id: 'q2', question: 'Q2?', options: ['C', 'D'], correctAnswer: 'C' }
];

const mockAnswers = { q1: 'A', q2: 'D' };

describe('ResultsScreen', () => {
  it('renders the primary h1 heading with exact title text', () => {
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={mockAnswers}
        onReturnHome={() => {}}
      />
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('US-TN Driver Licence Practice Test');
  });

  it('contains only one h1 element', () => {
    const { container } = render(
      <ResultsScreen
        questions={mockQuestions}
        answers={mockAnswers}
        onReturnHome={() => {}}
      />
    );
    const h1Elements = container.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
  });

  it('displays test complete heading', () => {
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={mockAnswers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByRole('heading', { name: /test complete/i })).toBeInTheDocument();
  });

  it('displays score correctly', () => {
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={mockAnswers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByText(/1 out of 2/i)).toBeInTheDocument();
  });

  it('renders Return to Home button', () => {
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={mockAnswers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /return to home page/i })).toBeInTheDocument();
  });
});