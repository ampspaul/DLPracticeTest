import React from 'react';

function HomePage({ onStartTest }) {
  return (
    <div className="container">
      <h1>Driver License Practice Test</h1>
      <p>
        Welcome to the Driver License Practice Test Portal. This application
        helps you prepare for your driver license exam by providing practice
        questions covering key topics.
      </p>
      <h3>How to Use:</h3>
      <ol style={{ paddingLeft: '20px', color: '#666', lineHeight: '1.8' }}>
        <li>Click the button below to start the test</li>
        <li>Read each question carefully and select your answer</li>
        <li>Your progress is automatically saved</li>
        <li>Review your results and score at the end</li>
      </ol>
      <div className="button-group">
        <button onClick={onStartTest} aria-label="Start the test">
          Start Test
        </button>
      </div>
    </div>
  );
}

export default HomePage;