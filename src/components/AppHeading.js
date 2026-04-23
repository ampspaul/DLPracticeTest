import React from 'react';

const headingStyle = {
  color: '#2e7d32',
  fontWeight: 700,
  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
  textAlign: 'center',
  margin: '0 0 1rem 0',
};

function AppHeading() {
  return <h1 style={headingStyle}>TN Student Practice Test</h1>;
}

export default AppHeading;