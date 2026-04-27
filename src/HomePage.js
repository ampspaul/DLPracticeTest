import React from 'react';
import './HomePage.css';

const headingStyle = {
  color: '#FF8C00',
  fontWeight: 700,
  fontStyle: 'italic',
};

function HomePage() {
  return (
    <div className="home-page">
      <h1 className="home-page__heading" style={headingStyle}>
        TN Student Practice Test
      </h1>
      <div className="home-page__content">
        {/* Main page content remains unchanged */}
      </div>
    </div>
  );
}

export default HomePage;