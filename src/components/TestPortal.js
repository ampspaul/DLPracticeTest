import React, { useState, useEffect } from 'react';
import './TestPortal.css';
import Question from './Question';
import ResultsScreen from './ResultsScreen';
import { loadTestQuestions } from '../services/questionsService';
import { saveTestAttempt, loadTestAttempts } from '../services/storageService';

function TestPortal({ testId, onTestComplete, onCancel }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [testComplete, setTestComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTest = async () => {
      try {
        const loadedQuestions = await loadTestQuestions(testId);
        setQuestions(loadedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load test:', error);
        setLoading(false);
      }
    };

    loadTest();
  }, [testId]);

  const handleAnswerSelect = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleCompleteTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCompleteTest = () => {
    const results = calculateResults();
    saveTestAttempt(testId, userAnswers, results, questions);
    setTestComplete(true);
    onTestComplete(results);
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    return {
      testId,
      score: correctCount,
      total: questions.length,
      percentage,
      timestamp: new Date().toISOString(),
    };
  };

  if (loading) {
    return (
      <div className="test-portal">
        <div className="loading">
          <p>Loading test...</p>
        </div>
      </div>
    );
  }

  if (testComplete) {
    const results = calculateResults();
    return (
      <ResultsScreen
        questions={questions}
        userAnswers={userAnswers}
        results={results}
        onBack={onCancel}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = {
    current: currentQuestionIndex + 1,
    total: questions.length,
  };

  return (
    <div className="test-portal">
      <div className="test-container">
        <div className="test-header">
          <h1>Practice Test</h1>
          <div className="progress-info">
            <span>Question {progress.current} of {progress.total}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="test-content">
          {currentQuestion && (
            <Question
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={userAnswers[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
            />
          )}
        </div>

        <div className="test-controls">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary"
          >
            Previous
          </button>

          <button onClick={onCancel} className="btn-cancel">
            Cancel Test
          </button>

          <button
            onClick={handleNext}
            className="btn-primary"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestPortal;