import React, { useState, useEffect } from 'react';
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
    } catch (err) {
      setError('Failed to save test results');
      console.error('Error completing test:', err);
    }
  };

  if (error) {
    return (
      <div className="container">
        <div className="error" role="alert">{error}</div>
        <button onClick={onTestComplete}>Return to Home</button>
      </div>
    );
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="container">
        <div className="error" role="alert">No questions available</div>
        <button onClick={onTestComplete}>Return to Home</button>
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

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container">
      <h1>TN Driver Licence Practice Test</h1>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#667eea',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      <Question
        question={currentQuestion}
        selected={answers[currentQuestion.id] || null}
        onSelectAnswer={(answer) => handleAnswerSelect(currentQuestion.id, answer)}
      />

      <div className="button-group">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          aria-label="Previous question"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          aria-label={currentQuestionIndex === questions.length - 1 ? 'Submit test' : 'Next question'}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default TestPortal;