import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestPortal from '../TestPortal';
import { saveProgress } from '../../services/storageService';

jest.mock('../../services/storageService', () => ({
  saveProgress: jest.fn()
}));

jest.mock('../Question', () => {
  return function MockQuestion({ question, selectedAnswer, onAnswerSelect }) {
    return (
      <div data-testid="mock-question">
        <span>{question.text}</span>
        <button
          onClick={() => onAnswerSelect(question.id, 'A')}
          data-testid="select-answer"
        >
          Select A
        </button>
        {selectedAnswer && (
          <span data-testid="selected-answer">{selectedAnswer}</span>
        )}
      </div>
    );
  };
});

jest.mock('../ResultsScreen', () => {
  return function MockResultsScreen({ questions, answers, onReturnHome }) {
    return (
      <div data-testid="mock-results-screen">
        <button onClick={onReturnHome} data-testid="return-home">
          Return Home
        </button>
      </div>
    );
  };
});

const mockQuestions = [
  {
    id: 'q1',
    text: 'What does a red light mean?',
    correctAnswer: 'A',
    options: ['A', 'B', 'C']
  },
  {
    id: 'q2',
    text: 'What is the speed limit in a school zone?',
    correctAnswer: 'B',
    options: ['A', 'B', 'C']
  },
  {
    id: 'q3',
    text: 'When must you use headlights?',
    correctAnswer: 'C',
    options: ['A', 'B', 'C']
  }
];

describe('TestPortal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the heading', () => {
    render(<TestPortal questions={mockQuestions} />);
    expect(
      screen.getByText('US-TN Driver Licence Practice Test')
    ).toBeInTheDocument();
  });

  it('shows question progress', () => {
    render(<TestPortal questions={mockQuestions} />);
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
  });

  it('renders first question', () => {
    render(<TestPortal questions={mockQuestions} />);
    expect(screen.getByText('What does a red light mean?')).toBeInTheDocument();
  });

  it('shows error when questions array is empty', () => {
    render(<TestPortal questions={[]} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('No questions available')).toBeInTheDocument();
  });

  it('shows error when questions is not an array', () => {
    render(<TestPortal questions={null} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('previous button is disabled on first question', () => {
    render(<TestPortal questions={mockQuestions} />);
    expect(screen.getByTestId('prev-button')).toBeDisabled();
  });

  it('next button is disabled when no answer selected', () => {
    render(<TestPortal questions={mockQuestions} />);
    expect(screen.getByTestId('next-button')).toBeDisabled();
  });

  it('next button is enabled after answer is selected', () => {
    render(<TestPortal questions={mockQuestions} />);
    fireEvent.click(screen.getByTestId('select-answer'));
    expect(screen.getByTestId('next-button')).not.toBeDisabled();
  });

  it('navigates to next question after selecting answer and clicking Next', () => {
    render(<TestPortal questions={mockQuestions} />);
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByText('Question 2 of 3')).toBeInTheDocument();
  });

  it('navigates back to previous question', () => {
    render(<TestPortal questions={mockQuestions} />);
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByText('Question 2 of 3')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('prev-button'));
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
  });

  it('shows Submit button on last question', () => {
    render(<TestPortal questions={mockQuestions} />);
    // Navigate to last question
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('completes test and shows ResultsScreen after Submit', () => {
    render(<TestPortal questions={mockQuestions} />);
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByTestId('mock-results-screen')).toBeInTheDocument();
  });

  it('calls saveProgress with answers on test completion', () => {
    render(<TestPortal questions={mockQuestions} />);
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    expect(saveProgress).toHaveBeenCalledTimes(1);
    expect(saveProgress).toHaveBeenCalledWith(
      expect.objectContaining({ q1: 'A', q2: 'A', q3: 'A' })
    );
  });

  it('calls onTestComplete callback with answers when test is completed', () => {
    const mockOnTestComplete = jest.fn();
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    expect(mockOnTestComplete).toHaveBeenCalledTimes(1);
    expect(mockOnTestComplete).toHaveBeenCalledWith(
      expect.objectContaining({ q1: 'A', q2: 'A', q3: 'A' })
    );
  });

  it('does not throw when onTestComplete is not provided', () => {
    expect(() => {
      render(<TestPortal questions={mockQuestions} />);
      fireEvent.click(screen.getByTestId('select-answer'));
      fireEvent.click(screen.getByTestId('next-button'));
      fireEvent.click(screen.getByTestId('select-answer'));
      fireEvent.click(screen.getByTestId('next-button'));
      fireEvent.click(screen.getByTestId('select-answer'));
      fireEvent.click(screen.getByTestId('next-button'));
    }).not.toThrow();
  });

  it('shows error when saveProgress throws', () => {
    saveProgress.mockImplementation(() => {
      throw new Error('Storage error');
    });
    render(<TestPortal questions={mockQuestions} />);
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('select-answer'));
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Failed to save test results')).toBeInTheDocument();
  });
});