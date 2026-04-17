import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TestPortal from '../TestPortal';
import * as questionsService from '../../services/questionsService';

jest.mock('../../services/questionsService');

describe('TestPortal Component', () => {
  const mockQuestions = [
    {
      text: 'Q1',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
    },
    {
      text: 'Q2',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'B',
    },
  ];

  beforeEach(() => {
    questionsService.loadTestQuestions.mockResolvedValue(mockQuestions);
  });

  test('renders loading state initially', () => {
    render(
      <TestPortal
        testId="test-1"
        onTestComplete={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByText(/Loading test/)).toBeInTheDocument();
  });

  test('renders first question after loading', async () => {
    render(
      <TestPortal
        testId="test-1"
        onTestComplete={() => {}}
        onCancel={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Q1')).toBeInTheDocument();
    });
  });

  test('shows correct progress indicator', async () => {
    render(
      <TestPortal
        testId="test-1"
        onTestComplete={() => {}}
        onCancel={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Question 1 of 2/)).toBeInTheDocument();
    });
  });

  test('disables Previous button on first question', async () => {
    render(
      <TestPortal
        testId="test-1"
        onTestComplete={() => {}}
        onCancel={() => {}}
      />
    );

    await waitFor(() => {
      const prevButton = screen.getByText('Previous');
      expect(prevButton).toBeDisabled();
    });
  });

  test('navigates to next question', async () => {
    render(
      <TestPortal
        testId="test-1"
        onTestComplete={() => {}}
        onCancel={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Q1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Q2')).toBeInTheDocument();
      expect(screen.getByText(/Question 2 of 2/)).toBeInTheDocument();
    });
  });

  test('calls onCancel when Cancel Test is clicked', async () => {
    const mockOnCancel = jest.fn();
    render(
      <TestPortal
        testId="test-1"
        onTestComplete={() => {}}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Q1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cancel Test'));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});