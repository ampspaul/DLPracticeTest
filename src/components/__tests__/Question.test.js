import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Question from '../Question';

describe('Question Component', () => {
  const mockQuestion = {
    text: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    hint: 'Count your fingers',
    explanation: 'Two plus two equals four',
  };

  test('renders question text', () => {
    render(
      <Question
        question={mockQuestion}
        questionNumber={1}
        selectedAnswer={null}
        onAnswerSelect={() => {}}
      />
    );

    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  test('renders all answer options', () => {
    render(
      <Question
        question={mockQuestion}
        questionNumber={1}
        selectedAnswer={null}
        onAnswerSelect={() => {}}
      />
    );

    mockQuestion.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('displays hint when provided', () => {
    render(
      <Question
        question={mockQuestion}
        questionNumber={1}
        selectedAnswer={null}
        onAnswerSelect={() => {}}
      />
    );

    expect(screen.getByText(/Count your fingers/)).toBeInTheDocument();
  });

  test('calls onAnswerSelect when option is selected', () => {
    const mockOnAnswerSelect = jest.fn();
    render(
      <Question
        question={mockQuestion}
        questionNumber={1}
        selectedAnswer={null}
        onAnswerSelect={mockOnAnswerSelect}
      />
    );

    const radio = screen.getAllByRole('radio')[1];
    fireEvent.click(radio);

    expect(mockOnAnswerSelect).toHaveBeenCalledWith('4');
  });

  test('marks selected answer as selected', () => {
    render(
      <Question
        question={mockQuestion}
        questionNumber={1}
        selectedAnswer="4"
        onAnswerSelect={() => {}}
      />
    );

    const labels = screen.getAllByRole('radio');
    expect(labels[1]).toBeChecked();
  });
});