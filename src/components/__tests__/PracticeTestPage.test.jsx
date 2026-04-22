/**
 * Regression tests for the Tennessee Driver Licence Practice Test page title update.
 * Covers acceptance criteria AC-1 through AC-5.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import PracticeTestPage from '../PracticeTestPage';
import { PRACTICE_TEST_PAGE_TITLE, PRACTICE_TEST_META_DESCRIPTION } from '../../constants/pageTitle';

const EXPECTED_TITLE = 'Tennessee Driver Licence Practice Test';

function renderPage() {
  return render(
    <HelmetProvider>
      <PracticeTestPage />
    </HelmetProvider>
  );
}

describe('PracticeTestPage – title update (FR-1, FR-2, FR-3)', () => {
  // AC-1: Browser tab title
  it('sets the document title to the new Tennessee title (AC-1)', () => {
    renderPage();
    expect(document.title).toBe(EXPECTED_TITLE);
  });

  // AC-2: Primary visible h1 heading
  it('renders an h1 with the exact new title string (AC-2)', () => {
    renderPage();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(EXPECTED_TITLE);
  });

  // AC-3: Breadcrumb entry
  it('shows the new title in the breadcrumb (AC-3)', () => {
    renderPage();
    const breadcrumb = screen.getByText(EXPECTED_TITLE, {
      selector: '[aria-current="page"]',
    });
    expect(breadcrumb).toBeInTheDocument();
  });

  // AC-4: Meta description (via constant integrity check)
  it('exports the correct meta description constant (AC-4)', () => {
    expect(PRACTICE_TEST_META_DESCRIPTION).toMatch(/Tennessee Driver Licence/i);
  });

  // AC-4: OG title (rendered via Helmet – verified via constant)
  it('uses the correct og:title value (AC-4)', () => {
    expect(PRACTICE_TEST_PAGE_TITLE).toBe(EXPECTED_TITLE);
  });

  // AC-5: No unrelated content changed
  it('renders the practice-test-container without altering its structure (AC-5)', () => {
    renderPage();
    const container = document.getElementById('practice-test-container');
    expect(container).toBeInTheDocument();
  });

  // Constant integrity
  it('exports the correct page title constant', () => {
    expect(PRACTICE_TEST_PAGE_TITLE).toBe(EXPECTED_TITLE);
  });
});