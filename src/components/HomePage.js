import React from 'react';
import './HomePage.css';

const headingStyle = {
  color: '#1b5e20',       /* Dark Green — ADO #287 / #288 */
  fontWeight: 700,
  /* All other heading properties (font-family, font-size, line-height, etc.)
     are inherited from HomePage.css / global styles — no changes made here */
};

function HomePage({ onStart }) {
  return (
    <div className="home-container">
      <h1 className="home-heading" style={headingStyle}>
        TN Student Practice Test
      </h1>
      {onStart && (
        <button className="start-button" onClick={onStart}>
          Start Test
        </button>
      )}
    </div>
  );
}

export default HomePage;