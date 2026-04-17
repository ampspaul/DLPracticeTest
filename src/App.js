import React, { useState, useEffect } from 'react';
import './App.css';
import TestPortal from './components/TestPortal';
import HomePage from './components/HomePage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [testSession, setTestSession] = useState(null);

  const handleStartTest = (testId) => {
    setTestSession({ testId, startTime: Date.now() });
    setCurrentView('test');
  };

  const handleTestComplete = (results) => {
    setCurrentView('results');
    setTestSession((prev) => ({ ...prev, results }));
  };

  const handleReturnHome = () => {
    setCurrentView('home');
    setTestSession(null);
  };

  return (
    <div className="app">
      {currentView === 'home' && <HomePage onStartTest={handleStartTest} />}
      {currentView === 'test' && testSession && (
        <TestPortal
          testId={testSession.testId}
          onTestComplete={handleTestComplete}
          onCancel={handleReturnHome}
        />
      )}
      {currentView === 'results' && testSession?.results && (
        <div className="results-container">
          <div className="results-content">
            <h1>Test Complete!</h1>
            <div className="results-summary">
              <p className="score">
                Score: <span>{testSession.results.score}</span> / {testSession.results.total}
              </p>
              <p className="percentage">
                Percentage: <span>{testSession.results.percentage}%</span>
              </p>
            </div>
            <button onClick={handleReturnHome} className="btn-primary">
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;