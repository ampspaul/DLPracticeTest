import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TnDlPracticeTestPage from "../pages/TnDlPracticeTestPage";

/**
 * Central route configuration.
 *
 * NOTE: The old /ky-dl-practice-test route is permanently redirected to
 * /tn-dl-practice-test to ensure backward compatibility and eliminate
 * all KY-DL references.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* TN-DL Practice Test — primary route */}
      <Route path="/tn-dl-practice-test" element={<TnDlPracticeTestPage />} />

      {/* Redirect legacy KY-DL route to TN-DL */}
      <Route
        path="/ky-dl-practice-test"
        element={<Navigate to="/tn-dl-practice-test" replace />}
      />

      {/* Catch-all: redirect root to the practice test */}
      <Route path="/" element={<Navigate to="/tn-dl-practice-test" replace />} />
    </Routes>
  );
}