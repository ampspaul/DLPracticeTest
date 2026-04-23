import React from 'react';
import AppHeading from './AppHeading';

function HomePage({ onStartTest }) {
  return (
    <div className="container">
      <AppHeading />
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1.5rem' }}>
          Prepare for your Tennessee Driver Licence exam with this practice test.
        </p>
        <button
          onClick={onStartTest}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Start Test
        </button>
      </div>
    </div>
  );
}

export default HomePage;