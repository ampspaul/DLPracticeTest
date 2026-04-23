import React, { useState, useEffect } from 'react';
import Question from './Question';
import ResultsScreen from './ResultsScreen';
import AppHeading from './AppHeading';
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
        [questionId]: selectedAnswer,
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
      if (onTestComplete) {
        onTestComplete(answers);
      }
    } catch (err) {
      setError('Failed to save test results');
      console.error('Error completing test:', err);
    }
  };

  if (error) {
    return (
      <div className="container">
        <AppHeading />
        <div className="error" role="alert">
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

  return (
    <div className="container">
      <AppHeading />
      <div style={{ marginBottom: '1rem', color: '#555', textAlign: 'right', fontSize: '0.95rem' }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      <Question
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswerSelect={handleAnswerSelect}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          style={{
            padding: '0.6rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: currentQuestionIndex === 0 ? '#ccc' : '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 700,
          }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: '0.6rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
}

export default TestPortal;