import React from 'react';

function HomePage({ onStartTest }) {
  return (
    <div className="container">
      <h1>US-TN Driver Licence Practice Test</h1>
      <p>
        Welcome to the US-TN Driver Licence Practice Test Portal. This application
        helps you prepare for your driver licence exam by providing practice
        questions covering key topics.
      </p>
      <h2>How to Use:</h2>
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