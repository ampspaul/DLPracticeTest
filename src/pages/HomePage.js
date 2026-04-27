import React from 'react';

const styles = {
  desktop: {
    heading: {
      fontWeight: 700,
      fontStyle: 'italic',
      color: '#0000CD',
      fontSize: '2.5rem',
    },
    container: {
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
  },
  tablet: {
    heading: {
      fontWeight: 700,
      fontStyle: 'italic',
      color: '#0000CD',
      fontSize: '2rem',
    },
    container: {
      padding: '24px',
    },
  },
  mobile: {
    heading: {
      fontWeight: 700,
      fontStyle: 'italic',
      color: '#0000CD',
      fontSize: '1.5rem',
    },
    container: {
      padding: '16px',
    },
  },
};

function getViewport() {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
}

function HomePage() {
  const [viewport, setViewport] = React.useState(getViewport());

  React.useEffect(() => {
    function handleResize() {
      setViewport(getViewport());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentStyles = styles[viewport];

  return (
    <div style={currentStyles.container}>
      <h1 style={currentStyles.heading}>TN Student Practice Test</h1>
    </div>
  );
}

export default HomePage;