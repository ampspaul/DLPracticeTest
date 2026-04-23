import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-load protected pages to keep the bundle lean
const TestPage = React.lazy(() => import('./pages/TestPage'));
const ResultsPage = React.lazy(() => import('./pages/ResultsPage'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div aria-busy="true">Loading…</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes — redirect to /login if unauthenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/test" element={<TestPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;