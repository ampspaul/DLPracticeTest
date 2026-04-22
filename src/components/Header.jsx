import React from "react";
import "./Header.css";

const APP_TITLE = "Tennessee Driver Practice Test";

const Header = () => {
  return (
    <header className="app-header" role="banner">
      <div className="header-container">
        <h1 className="header-title">{APP_TITLE}</h1>
      </div>
    </header>
  );
};

export default Header;