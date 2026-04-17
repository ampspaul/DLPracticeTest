import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import TestPortal from './components/TestPortal';
import { getAllQuestions } from './services/storageService';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const loadedQuestions = getAllQuestions();
        if (!loadedQuestions || loadedQuestions.length === 0) {
          throw new Error('No questions available');
        }
        setQuestions(loadedQuestions);
      } catch (err) {
        setError(err.message || 'Failed to load questions');
        console.error('Error loading questions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleStartTest = () => {
    if (questions.length > 0) {
      setCurrentPage('test');
    } else {
      setError('Questions not yet loaded');
    }
  };

  const handleReturnHome = () => {
    setCurrentPage('home');
    setError(null);
  };

  return (
    <div className="App">
      {error && (
        <div className="container">
          <div className="error" role="alert">
            {error}
          </div>
          <button onClick={handleReturnHome}>Return to Home</button>
        </div>
      )}
      {!error && isLoading && (
        <div className="container">
          <div className="loading">Loading questions...</div>
        </div>
      )}
      {!error && !isLoading && currentPage === 'home' && (
        <HomePage onStartTest={handleStartTest} />
      )}
      {!error && !isLoading && currentPage === 'test' && questions.length > 0 && (
        <TestPortal
          questions={questions}
          onTestComplete={handleReturnHome}
        />
      )}
    </div>
  );
}

export default App;