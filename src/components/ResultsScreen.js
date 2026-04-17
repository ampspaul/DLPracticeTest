import React from 'react';
import './ResultsScreen.css';

function ResultsScreen({ questions, userAnswers, results, onBack }) {
  const getAnswerStatus = (index) => {
    const userAnswer = userAnswers[index];
    const correctAnswer = questions[index].correctAnswer;
    return userAnswer === correctAnswer ? 'correct' : 'incorrect';
  };

  const isPassing = results.percentage >= 70;

  return (
    <div className="results-screen">
      <div className="results-wrapper">
        <div className="results-header">
          <h1>Test Complete!</h1>
          <div className={`results-badge ${isPassing ? 'pass' : 'fail'}`}>
            {isPassing ? '✓ Passed' : '✗ Failed'}
          </div>
        </div>

        <div className="results-summary">
          <div className="score-box">
            <div className="score-number">{results.score}</div>
            <div className="score-label">Correct Answers</div>
            <div className="score-total">out of {results.total}</div>
          </div>

          <div className="percentage-box">
            <div className="percentage-number">{results.percentage}%</div>
            <div className="percentage-label">Score</div>
          </div>
        </div>

        <div className="review-section">
          <h2>Answer Review</h2>
          <div className="answers-list">
            {questions.map((question, index) => {
              const status = getAnswerStatus(index);
              const userAnswer = userAnswers[index];

              return (
                <div key={index} className={`answer-review ${status}`}>
                  <div className="answer-review-header">
                    <span className="question-number">Q{index + 1}</span>
                    <span className={`status-badge ${status}`}>
                      {status === 'correct' ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  <p className="review-question">{question.text}</p>

                  <div className="review-answers">
                    <div className="your-answer">
                      <strong>Your answer:</strong> {userAnswer || 'Not answered'}
                    </div>
                    {status === 'incorrect' && (
                      <div className="correct-answer">
                        <strong>Correct answer:</strong> {question.correctAnswer}
                      </div>
                    )}
                    {question.explanation && (
                      <div className="explanation">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={onBack} className="btn-return-home">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;