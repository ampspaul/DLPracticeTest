import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import ResultsScreen from './ResultsScreen';
import { saveProgress } from '../services/storageService';

function TestPortal({ questions, onTestComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testComplete, setTestComplete] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!Array.isArray(questions) || questions.length === 0) {
      setError('No questions available');
    }
  }, [questions]);

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    try {
      setAnswers(prev => ({
        ...prev,
        [questionId]: selectedAnswer
      }));
    } catch (err) {
      setError('Failed to save answer');
      console.error('Error saving answer:', err);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeTest = () => {
    try {
      saveProgress(answers);
      setTestComplete(true);
      if (typeof onTestComplete === 'function') {
        onTestComplete(answers);
      }
    } catch (err) {
      setError('Failed to save test results');
      console.error('Error completing test:', err);
    }
  };

  if (error) {
    return (
      <div
        className="container"
        role="alert"
        aria-live="assertive"
        data-testid="error-container"
      >
        <h1>US-TN Driver Licence Practice Test</h1>
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (testComplete) {
    return (
      <ResultsScreen
        questions={questions}
        answers={answers}
        onReturnHome={onTestComplete}
      />
    );
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="container" data-testid="test-portal">
      <h1>US-TN Driver Licence Practice Test</h1>

      <div className="progress-info" aria-live="polite">
        <span>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
      </div>

      <Question
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onAnswerSelect={handleAnswerSelect}
      />

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          className="btn btn-secondary"
          aria-label="Go to previous question"
          data-testid="prev-button"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!currentAnswer}
          className="btn btn-primary"
          aria-label={isLastQuestion ? 'Submit test' : 'Go to next question'}
          data-testid="next-button"
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

TestPortal.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string,
      correctAnswer: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  onTestComplete: PropTypes.func
};

TestPortal.defaultProps = {
  onTestComplete: null
};

export default TestPortal;