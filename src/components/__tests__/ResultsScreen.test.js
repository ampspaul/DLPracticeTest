import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsScreen from '../ResultsScreen';

const mockQuestions = [
  { id: '1', text: 'Q1', correctAnswer: 'A' },
  { id: '2', text: 'Q2', correctAnswer: 'B' },
];

const mockAnswers = { '1': 'A', '2': 'B' };

describe('ResultsScreen', () => {
  it('renders the TN Student Practice Test heading', () => {
    render(<ResultsScreen questions={mockQuestions} answers={mockAnswers} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TN Student Practice Test');
  });

  it('heading has font-weight 700', () => {
    render(<ResultsScreen questions={mockQuestions} answers={mockAnswers} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({ fontWeight: 700 });
  });

  it('heading has green colour', () => {
    render(<ResultsScreen questions={mockQuestions} answers={mockAnswers} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({ color: '#2e7d32' });
  });

  it('displays score correctly', () => {
    render(<ResultsScreen questions={mockQuestions} answers={mockAnswers} />);
    expect(screen.getByText(/2 out of 2/i)).toBeInTheDocument();
  });

  it('displays 100% for all correct answers', () => {
    render(<ResultsScreen questions={mockQuestions} answers={mockAnswers} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('handles empty questions gracefully', () => {
    render(<ResultsScreen questions={[]} answers={{}} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TN Student Practice Test');
  });
});