import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <h1
        className="home-heading"
        style={{
          color: '#FF8C00',
          fontWeight: 700,
          fontStyle: 'italic',
        }}
      >
        TN Student Practice Test
      </h1>
    </div>
  );
}

export default HomePage;