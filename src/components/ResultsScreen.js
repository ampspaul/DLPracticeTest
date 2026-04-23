import React, { useMemo } from 'react';
import AppHeading from './AppHeading';

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
      total: total,
      percentage: percentage,
    };
  }, [questions, answers]);

  return (
    <div className="container">
      <AppHeading />
      <h2>Test Complete!</h2>
      <div className="success">
        <h3>Your Results</h3>
        <p style={{ fontSize: '1.1rem', color: '#333' }}>
          Score: <strong>{results.score} out of {results.total}</strong>
        </p>
        <p style={{ fontSize: '1.3rem', color: '#667eea', fontWeight: 'bold' }}>
          {results.percentage}%
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Performance Summary</h3>
        <p>
          {results.percentage >= 80
            ? '✓ Excellent! You are well-prepared for the exam.'
            : results.percentage >= 60
            ? '◐ Good! Review the areas where you struggled before the real exam.'
            : '✗ More practice needed. Review the material and try again.'}
        </p>
      </div>

      {onReturnHome && (
        <button
          onClick={onReturnHome}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Return Home
        </button>
      )}
    </div>
  );
}

export default ResultsScreen;