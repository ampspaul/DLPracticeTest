import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestPortal from '../components/TestPortal';
import { QUESTIONS, TOTAL_QUESTIONS } from '../data/questionsData';

describe('TestPortal Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Question Display', () => {
    it('should display the first question on load', () => {
      render(<TestPortal />);
      expect(screen.getByText(QUESTIONS[0].text)).toBeInTheDocument();
    });

    it('should display all answer options for current question', () => {
      render(<TestPortal />);
      QUESTIONS[0].options.forEach(option => {
        expect(screen.getByText(option)).toBeInTheDocument();
      });
    });

    it('should display correct total question count', () => {
      render(<TestPortal />);
      expect(screen.getByText(new RegExp(`of ${TOTAL_QUESTIONS}`))).toBeInTheDocument();
    });

    it('should navigate through all 50 questions', () => {
      render(<TestPortal />);
      
      for (let i = 0; i < TOTAL_QUESTIONS - 1; i++) {
        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);
      }

      expect(screen.getByText(new RegExp(`Question ${TOTAL_QUESTIONS}`))).toBeInTheDocument();
    });

    it('should display Submit Test button on last question', () => {
      render(<TestPortal />);
      
      for (let i = 0; i < TOTAL_QUESTIONS - 1; i++) {
        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);
      }

      expect(screen.getByText('Submit Test')).toBeInTheDocument();
    });
  });

  describe('Progress Tracking', () => {
    it('should update progress indicator with correct question number', () => {
      render(<TestPortal />);
      
      expect(screen.getByText('Question 1 of 50')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Next'));
      expect(screen.getByText('Question 2 of 50')).toBeInTheDocument();
    });

    it('should track answered questions count', () => {
      render(<TestPortal />);
      
      // Answer first question
      const firstOption = screen.getAllByRole('radio')[0];
      fireEvent.click(firstOption);
      
      expect(screen.getByText(/Answered: 1\/50/)).toBeInTheDocument();
    });

    it('should show correct remaining question count', () => {
      render(<TestPortal />);
      expect(screen.getByText(/Remaining: 50/)).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Next'));
      expect(screen.getByText(/Remaining: 49/)).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should disable Previous button on first question', () => {
      render(<TestPortal />);
      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    it('should enable Previous button after first question', () => {
      render(<TestPortal />);
      fireEvent.click(screen.getByText('Next'));
      const previousButton = screen.getByText('Previous');
      expect(previousButton).not.toBeDisabled();
    });

    it('should navigate backward and forward correctly', () => {
      render(<TestPortal />);
      
      // Move forward
      fireEvent.click(screen.getByText('Next'));
      expect(screen.getByText('Question 2 of 50')).toBeInTheDocument();
      
      // Move backward
      fireEvent.click(screen.getByText('Previous'));
      expect(screen.getByText('Question 1 of 50')).toBeInTheDocument();
    });
  });

  describe('Response Persistence', () => {
    it('should save response when answer is selected', () => {
      render(<TestPortal />);
      
      const firstOption = screen.getAllByRole('radio')[0];
      fireEvent.click(firstOption);
      
      const saved = localStorage.getItem('dltest_responses');
      expect(saved).toBeTruthy();
    });

    it('should retain selected answer when navigating away and back', () => {
      render(<TestPortal />);
      
      const firstOption = screen.getAllByRole('radio')[0];
      fireEvent.click(firstOption);
      
      fireEvent.click(screen.getByText('Next'));
      fireEvent.click(screen.getByText('Previous'));
      
      // First option should still be selected
      expect(firstOption).toBeChecked();
    });
  });
});