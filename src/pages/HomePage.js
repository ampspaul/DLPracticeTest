import React from 'react';

const HEADING_COLOR = '#8B0000';

const baseHeading = {
  fontWeight: 700,
  fontStyle: 'italic',
  color: HEADING_COLOR,
};

const styles = {
  desktop: {
    heading: {
      ...baseHeading,
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
      ...baseHeading,
      fontSize: '2rem',
    },
    container: {
      padding: '24px',
    },
  },
  mobile: {
    heading: {
      ...baseHeading,
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
      <h1 data-testid="page-heading" style={currentStyles.heading}>
        TN Student Practice Test
      </h1>
    </div>
  );
}

export default HomePage;