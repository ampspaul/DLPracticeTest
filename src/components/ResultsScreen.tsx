import React from 'react';
import { Question } from '../data/questionsData';
import { TestResults } from './TestPortal';

interface ResultsScreenProps {
  results: TestResults;
  questions: Question[];
  onRetake: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  results,
  questions,
  onRetake
}) => {
  const passScore = 70;
  const isPassed = results.score >= passScore;

  // Calculate score details
  const scoreDetails = {
    totalQuestions: results.totalQuestions,
    correctAnswers: results.correctAnswers,
    incorrectAnswers: results.totalQuestions - results.correctAnswers,
    score: results.score,
    passed: isPassed
  };

  return (
    <div className="results-screen">
      <div className={`results-container ${isPassed ? 'passed' : 'failed'}`}>
        <div className="results-header">
          <h1>{isPassed ? 'Test Passed!' : 'Test Not Passed'}</h1>
          <p className="results-message">
            {isPassed
              ? 'Congratulations! You have successfully passed the practice test.'
              : 'Keep practicing to improve your score.'}
          </p>
        </div>

        <div className="results-score">
          <div className="score-circle">
            <span className="score-percentage">{scoreDetails.score}%</span>
          </div>
        </div>

        <div className="results-details">
          <div className="detail-row">
            <span className="detail-label">Total Questions:</span>
            <span className="detail-value">{scoreDetails.totalQuestions}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Correct Answers:</span>
            <span className="detail-value correct">{scoreDetails.correctAnswers}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Incorrect Answers:</span>
            <span className="detail-value incorrect">{scoreDetails.incorrectAnswers}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Passing Score:</span>
            <span className="detail-value">{passScore}%</span>
          </div>
        </div>

        <div className="results-breakdown">
          <h2>Question Review</h2>
          <div className="question-review">
            {questions.map((question, index) => {
              const userAnswer = results.responses[question.id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="review-header">
                    <span className="question-number">Q{index + 1}</span>
                    <span className={`answer-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <p className="review-question">{question.text}</p>
                  <div className="review-options">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`review-option ${
                          optionIndex === question.correctAnswer ? 'correct-answer' : ''
                        } ${
                          optionIndex === userAnswer && !isCorrect ? 'user-answer' : ''
                        }`}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + optionIndex)}.</span>
                        <span className="option-text">{option}</span>
                        {optionIndex === question.correctAnswer && (
                          <span className="correct-indicator">(Correct)</span>
                        )}
                        {optionIndex === userAnswer && !isCorrect && (
                          <span className="user-indicator">(Your answer)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="results-actions">
          <button onClick={onRetake} className="btn-retake">
            Retake Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;