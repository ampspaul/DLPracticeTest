import React from 'react';
import './App.css';
import PortalHeading from './components/PortalHeading/PortalHeading';
import HomePage from './pages/HomePage';
import TestPortal from './pages/TestPortal';

/**
 * Main App Component
 * Includes the portal heading and main application routes/content
 */
function App() {
  return (
    <div className="App">
      <PortalHeading />
      <main className="app-main-content">
        {/* Application routes/pages would be rendered here */}
        {/* Example structure - adjust based on your routing setup */}
      </main>
    </div>
  );
}

export default App;