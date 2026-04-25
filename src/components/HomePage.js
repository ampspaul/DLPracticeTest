import React from 'react';
import './HomePage.css';

const HomePage = ({ onStart }) => {
  return (
    <div className="home-page">
      <h1 className="home-heading">TN Student Practice Test</h1>
      <p className="home-subheading">Select a subject and begin your practice session.</p>
      <button className="start-button" onClick={onStart}>
        Start Test
      </button>
    </div>
  );
};

export default HomePage;