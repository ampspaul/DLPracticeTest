import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsScreen from '../components/ResultsScreen';
import { QUESTIONS } from '../data/questionsData';
import { TestResults } from '../components/TestPortal';

describe('ResultsScreen', () => {
  const mockResults: TestResults = {
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 40,
    score: 80,
    responses: {
      q51: 0,
      q52: 1,
      // ... mock responses
    }
  };

  describe('Score Display', () => {
    it('should display passing score (80%)', () => {
      render(
        <ResultsScreen
          results={mockResults}
          questions={QUESTIONS}
          onRetake={() => {}}
        />
      );

      expect(screen.getByText('Test Passed!')).toBeInTheDocument();
      expect(screen.getByText('80%')).toBeInTheDocument();
    });

    it('should display failing message for score below 70%', () => {
      const failingResults: TestResults = {
        ...mockResults,
        correctAnswers: 30,
        score: 60
      };

      render(
        <ResultsScreen
          results={failingResults}
          questions={QUESTIONS}
          onRetake={() => {}}
        />
      );

      expect(screen.getByText('Test Not Passed')).toBeInTheDocument();
      expect(screen.getByText('60%')).toBeInTheDocument();
    });
  });

  describe('Results Details', () => {
    it('should display total questions count (50)', () => {
      render(
        <ResultsScreen
          results={mockResults}
          questions={QUESTIONS}
          onRetake={() => {}}
        />
      );

      expect(screen.getByText(/Total Questions:/)).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('should display correct and incorrect answer counts', () => {
      render(
        <ResultsScreen
          results={mockResults}
          questions={QUESTIONS}
          onRetake={() => {}}
        />
      );

      expect(screen.getByText(/Correct Answers:/)).toBeInTheDocument();
      expect(screen.getByText(/Incorrect Answers:/)).toBeInTheDocument();
    });
  });

  describe('Question Review', () => {
    it('should display all 50 questions for review', () => {
      render(
        <ResultsScreen
          results={mockResults}
          questions={QUESTIONS}
          onRetake={() => {}}
        />
      );

      QUESTIONS.forEach((question, index) => {
        expect(screen.getByText(new RegExp(`Q${index + 1}`))).toBeInTheDocument();
      });
    });

    it('should indicate correct answers in review', () => {
      render(
        <ResultsScreen
          results={mockResults}
          questions={QUESTIONS}
          onRetake={() => {}}
        />
      );

      const correctIndicators = screen.queryAllByText(/\(Correct\)/);
      expect(correctIndicators.length).toBeGreaterThan(0);
    });
  });
});