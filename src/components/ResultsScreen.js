import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const PASS_THRESHOLD_EXCELLENT = 80;
const PASS_THRESHOLD_GOOD = 60;

function ResultsScreen({ questions, answers, onReturnHome }) {
  const results = useMemo(() => {
    if (!Array.isArray(questions) || typeof answers !== 'object' || !answers) {
      return { score: 0, total: 0, percentage: 0 };
    }

    let correctCount = 0;
    questions.forEach(question => {
      if (question && question.id && question.correctAnswer) {
        if (answers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      }
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      score: correctCount,
      total,
      percentage
    };
  }, [questions, answers]);

  const getPerformanceMessage = (percentage) => {
    if (percentage >= PASS_THRESHOLD_EXCELLENT) {
      return '✓ Excellent! You are well-prepared for the exam.';
    }
    if (percentage >= PASS_THRESHOLD_GOOD) {
      return '◐ Good! Review the areas where you made mistakes before taking the real test.';
    }
    return '✗ Keep practising. Study the handbook and try again.';
  };

  const getPerformanceClassName = (percentage) => {
    if (percentage >= PASS_THRESHOLD_EXCELLENT) return 'performance-excellent';
    if (percentage >= PASS_THRESHOLD_GOOD) return 'performance-good';
    return 'performance-poor';
  };

  return (
    <div className="container" data-testid="results-screen">
      <h1>US-TN Driver Licence Practice Test</h1>
      <h2>Test Complete!</h2>
      <div
        className="success"
        role="region"
        aria-label="Test results"
        data-testid="results-summary"
      >
        <h3>Your Results</h3>
        <p className="results-score">
          Score: <strong>{results.score} out of {results.total}</strong>
        </p>
        <p className="results-percentage" data-testid="results-percentage">
          {results.percentage}%
        </p>
      </div>

      <div className="performance-summary" data-testid="performance-summary">
        <h3>Performance Summary</h3>
        <p
          className={getPerformanceClassName(results.percentage)}
          data-testid="performance-message"
        >
          {getPerformanceMessage(results.percentage)}
        </p>
      </div>

      <button
        onClick={onReturnHome}
        className="btn btn-primary"
        aria-label="Return to home screen"
        data-testid="return-home-button"
      >
        Return Home
      </button>
    </div>
  );
}

ResultsScreen.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      correctAnswer: PropTypes.string
    })
  ).isRequired,
  answers: PropTypes.objectOf(PropTypes.string).isRequired,
  onReturnHome: PropTypes.func
};

ResultsScreen.defaultProps = {
  onReturnHome: null
};

export default ResultsScreen;