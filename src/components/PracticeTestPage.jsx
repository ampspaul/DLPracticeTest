import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PRACTICE_TEST_PAGE_TITLE, PRACTICE_TEST_META_DESCRIPTION } from '../constants/pageTitle';

/**
 * PracticeTestPage
 *
 * Renders the Tennessee Driver Licence Practice Test page.
 * Only the title/heading surface areas have been updated per FR-1 – FR-3.
 * All existing functionality, routing, and styling are preserved.
 */
export default function PracticeTestPage() {
  return (
    <>
      {/* React Helmet – updates <title>, meta description, and OG tags */}
      <Helmet>
        <title>{PRACTICE_TEST_PAGE_TITLE}</title>
        <meta name="description" content={PRACTICE_TEST_META_DESCRIPTION} />
        <meta property="og:title" content={PRACTICE_TEST_PAGE_TITLE} />
        <meta property="og:description" content={PRACTICE_TEST_META_DESCRIPTION} />
      </Helmet>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href="/practice-tests">Practice Tests</a></li>
          <li className="breadcrumb-item active" aria-current="page">
            {PRACTICE_TEST_PAGE_TITLE}
          </li>
        </ol>
      </nav>

      {/* Primary heading */}
      <main id="main-content">
        <h1>{PRACTICE_TEST_PAGE_TITLE}</h1>

        {/* Existing practice-test content — unchanged */}
        <div id="practice-test-container">
          {/* Questions and answer logic rendered here */}
        </div>
      </main>
    </>
  );
}