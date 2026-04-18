import React from 'react';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  questionsRemaining: number;
  answeredCount: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions,
  questionsRemaining,
  answeredCount
}) => {
  const progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100;

  return (
    <div className="progress-indicator">
      <div className="progress-header">
        <h2>Driver License Practice Test</h2>
        <span className="progress-text">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="progress-stats">
        <div className="stat">
          <span className="stat-label">Answered:</span>
          <span className="stat-value">{answeredCount}/{totalQuestions}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Remaining:</span>
          <span className="stat-value">{questionsRemaining}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;