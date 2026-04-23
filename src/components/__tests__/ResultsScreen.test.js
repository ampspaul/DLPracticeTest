import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultsScreen from '../ResultsScreen';

const mockQuestions = [
  { id: 'q1', text: 'Question 1', correctAnswer: 'A' },
  { id: 'q2', text: 'Question 2', correctAnswer: 'B' },
  { id: 'q3', text: 'Question 3', correctAnswer: 'C' },
  { id: 'q4', text: 'Question 4', correctAnswer: 'A' },
  { id: 'q5', text: 'Question 5', correctAnswer: 'B' }
];

describe('ResultsScreen', () => {
  it('renders the heading', () => {
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={{}}
        onReturnHome={() => {}}
      />
    );
    expect(
      screen.getByText('US-TN Driver Licence Practice Test')
    ).toBeInTheDocument();
  });

  it('renders Test Complete heading', () => {
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={{}}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByText('Test Complete!')).toBeInTheDocument();
  });

  it('calculates score correctly for all correct answers', () => {
    const answers = { q1: 'A', q2: 'B', q3: 'C', q4: 'A', q5: 'B' };
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={answers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByText('5 out of 5')).toBeInTheDocument();
    expect(screen.getByTestId('results-percentage')).toHaveTextContent('100%');
  });

  it('calculates score correctly for partial correct answers', () => {
    const answers = { q1: 'A', q2: 'X', q3: 'C', q4: 'X', q5: 'B' };
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={answers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByText('3 out of 5')).toBeInTheDocument();
    expect(screen.getByTestId('results-percentage')).toHaveTextContent('60%');
  });

  it('calculates score correctly for zero correct answers', () => {
    const answers = { q1: 'X', q2: 'X', q3: 'X', q4: 'X', q5: 'X' };
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={answers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByText('0 out of 5')).toBeInTheDocument();
    expect(screen.getByTestId('results-percentage')).toHaveTextContent('0%');
  });

  it('shows excellent message for score >= 80%', () => {
    const answers = { q1: 'A', q2: 'B', q3: 'C', q4: 'A', q5: 'B' };
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={answers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByTestId('performance-message')).toHaveTextContent(
      'Excellent! You are well-prepared for the exam.'
    );
  });

  it('shows good message for score >= 60% and < 80%', () => {
    const answers = { q1: 'A', q2: 'X', q3: 'C', q4: 'X', q5: 'B' };
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={answers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByTestId('performance-message')).toHaveTextContent(
      'Good! Review the areas where you made mistakes'
    );
  });

  it('shows poor message for score < 60%', () => {
    const answers = { q1: 'A', q2: 'X', q3: 'X', q4: 'X', q5: 'X' };
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={answers}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByTestId('performance-message')).toHaveTextContent(
      'Keep practising'
    );
  });

  it('handles empty questions array gracefully', () => {
    render(
      <ResultsScreen questions={[]} answers={{}} onReturnHome={() => {}} />
    );
    expect(screen.getByTestId('results-percentage')).toHaveTextContent('0%');
  });

  it('handles null answers gracefully', () => {
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={null}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByTestId('results-percentage')).toHaveTextContent('0%');
  });

  it('calls onReturnHome when Return Home button is clicked', () => {
    const mockOnReturnHome = jest.fn();
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={{}}
        onReturnHome={mockOnReturnHome}
      />
    );
    fireEvent.click(screen.getByTestId('return-home-button'));
    expect(mockOnReturnHome).toHaveBeenCalledTimes(1);
  });

  it('renders results region with aria-label', () => {
    render(
      <ResultsScreen
        questions={mockQuestions}
        answers={{}}
        onReturnHome={() => {}}
      />
    );
    expect(screen.getByRole('region', { name: 'Test results' })).toBeInTheDocument();
  });
});