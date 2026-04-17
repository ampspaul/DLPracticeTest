import React from 'react';
import './HomePage.css';

function HomePage({ onStartTest }) {
  const tests = [
    { id: 'permit-knowledge', title: 'Permit Knowledge Test', questions: 50 },
    { id: 'road-signs', title: 'Road Signs & Signals', questions: 30 },
    { id: 'traffic-laws', title: 'Traffic Laws & Rules', questions: 40 },
  ];

  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Driver License Practice Tests</h1>
        <p className="subtitle">Master the road with our comprehensive practice tests</p>

        <div className="tests-grid">
          {tests.map((test) => (
            <div key={test.id} className="test-card">
              <h2>{test.title}</h2>
              <p className="question-count">{test.questions} Questions</p>
              <button
                onClick={() => onStartTest(test.id)}
                className="btn-start-test"
              >
                Start Test
              </button>
            </div>
          ))}
        </div>

        <div className="info-section">
          <h3>How It Works</h3>
          <ol>
            <li>Select a practice test from the options above</li>
            <li>Answer each question one at a time</li>
            <li>Review your answers after completion</li>
            <li>Your score and progress are saved automatically</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HomePage;