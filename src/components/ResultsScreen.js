import React, { useMemo } from 'react';

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
      percentage: percentage
    };
  }, [questions, answers]);

  return (
    <div className="container">
      <h1>Test Complete!</h1>
      <div className="success">
        <h2>Your Results</h2>
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
            ? '◐ Good! Review the areas where you need improvement.'
            : '✗ Keep practicing! Focus on the challenging topics.'}
        </p>
      </div>

      <div className="button-group">
        <button onClick={onReturnHome} aria-label="Return to home page">
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;