import React from "react";
import "./HomePage.css";

/**
 * HomePage
 *
 * PBI #294 – heading colour updated from Dark Green to Dark Purple.
 * Colour is applied via the CSS variable --color-dark-purple defined in
 * src/styles/variables.css to ensure design-token consistency.
 */
const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">TN Student Practice Test</h1>
    </div>
  );
};

export default HomePage;