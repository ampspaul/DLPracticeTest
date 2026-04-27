import React from 'react';
import '../styles/variables.css';
import '../styles/homepage.css';

/**
 * HomePage
 *
 * Heading colour is Dark Orange (#FF8C00) per QA spec #337.
 * Responsive sizing is handled entirely via CSS media queries in
 * homepage.css, which consumes tokens from variables.css.
 */
function HomePage() {
  return (
    <div className="home-container" data-testid="home-container">
      <h1 className="home-heading" data-testid="home-heading">
        TN Student Practice Test
      </h1>
    </div>
  );
}

export default HomePage;