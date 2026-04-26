import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  heading: {
    color: '#00008B',          /* Dark Blue — changed from #8B0000 (Dark Red) per PBI #301 */
    fontWeight: 700,
    fontStyle: 'italic',
    fontSize: '2rem',
    textAlign: 'center',
    margin: '20px 0',
  },
};

function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>TN Student Practice Test</h1>
    </div>
  );
}

export default HomePage;