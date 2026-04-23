import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  return (
    <main>
      <h1>Results Page</h1>
      <p>This is a protected results page.</p>
      <button onClick={handleLogout}>Log out</button>
    </main>
  );
};

export default ResultsPage;