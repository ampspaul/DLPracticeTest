import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestPortal from '../TestPortal';

// Mock storageService
jest.mock('../../services/storageService', () => ({
  saveProgress: jest.fn(),
}));

const mockQuestions = [
  {
    id: 'q1',
    text: 'What does a red traffic light mean?',
    options: ['Stop', 'Go', 'Slow down', 'Yield'],
    correctAnswer: 'Stop',
  },
  {
    id: 'q2',
    text: 'What is the speed limit in a school zone?',
    options: ['15 mph', '25 mph', '35 mph', '45 mph'],
    correctAnswer: '25 mph',
  },
];

const mockOnTestComplete = jest.fn();

describe('TestPortal heading', () => {
  it('renders an h1 with the exact text "TN Driver Licence Practice Test"', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    const heading = screen.getByRole('heading', { level: 1, name: 'TN Driver Licence Practice Test' });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
    expect(heading.textContent).toBe('TN Driver Licence Practice Test');
  });

  it('heading text matches exactly including casing and spacing', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('TN Driver Licence Practice Test');
  });

  it('heading persists after navigating to the next question', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    // Confirm heading present on first question
    expect(
      screen.getByRole('heading', { level: 1, name: 'TN Driver Licence Practice Test' })
    ).toBeInTheDocument();

    // Navigate to next question
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));

    // Heading should still be present
    expect(
      screen.getByRole('heading', { level: 1, name: 'TN Driver Licence Practice Test' })
    ).toBeInTheDocument();
  });

  it('heading persists after navigating back to the previous question', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    // Navigate forward then back
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous question/i }));

    expect(
      screen.getByRole('heading', { level: 1, name: 'TN Driver Licence Practice Test' })
    ).toBeInTheDocument();
  });
});

describe('TestPortal existing functionality', () => {
  beforeEach(() => {
    mockOnTestComplete.mockClear();
    const { saveProgress } = require('../../services/storageService');
    saveProgress.mockClear();
  });

  it('renders the first question on load', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    expect(screen.getByText('What does a red traffic light mean?')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('shows an error when no questions are provided', () => {
    render(
      <TestPortal questions={[]} onTestComplete={mockOnTestComplete} />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('No questions available');
  });

  it('shows an error when questions prop is not an array', () => {
    render(
      <TestPortal questions={null} onTestComplete={mockOnTestComplete} />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('No questions available');
  });

  it('navigates to the next question when Next is clicked', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    expect(screen.getByText('What is the speed limit in a school zone?')).toBeInTheDocument();
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
  });

  it('navigates back to the previous question when Previous is clicked', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous question/i }));
    expect(screen.getByText('What does a red traffic light mean?')).toBeInTheDocument();
  });

  it('disables the Previous button on the first question', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    expect(screen.getByRole('button', { name: /previous question/i })).toBeDisabled();
  });

  it('shows Submit button on the last question', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    expect(screen.getByRole('button', { name: /submit test/i })).toBeInTheDocument();
  });

  it('captures answer selection', () => {
    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    const stopOption = screen.getByLabelText('Answer option: Stop');
    fireEvent.click(stopOption);
    expect(stopOption).toBeChecked();
  });

  it('calls saveProgress and shows ResultsScreen on test completion', () => {
    const { saveProgress } = require('../../services/storageService');

    render(
      <TestPortal questions={mockQuestions} onTestComplete={mockOnTestComplete} />
    );

    // Navigate to last question and submit
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit test/i }));

    expect(saveProgress).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Test Complete!')).toBeInTheDocument();
  });
});