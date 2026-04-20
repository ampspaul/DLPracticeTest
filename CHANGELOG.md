# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Page Title & H1 Heading** (`HomePage.js` / `index.html`): The landing page now displays `TN Driver Licence Practice Test` as a prominent `<h1>` page-level heading and sets the browser document `<title>` to the same value so it appears in the browser tab and bookmarks
  - Title text is exact — no casing, spelling, or punctuation variations permitted
  - Heading is implemented within the existing ReactJS component structure (primarily `HomePage.js` and/or `index.html` / `App.js`)
  - Responsive across all supported viewport widths (mobile ≥ 320 px through desktop ≥ 1 024 px)
  - Satisfies WCAG 2.1 SC 1.3.1 and SC 2.4.6 accessibility requirements via a semantically correct HTML heading element
  - Improves SEO relevance through matching `<title>` and `<h1>` values
  - No regression to existing features: question flow, progress tracking, scoring, answer review, or local storage persistence
- **Expanded Question Bank**: Added 50+ multiple-choice questions covering comprehensive driver license examination topics
  - Road signs and traffic signals (8-10 questions)
  - Right-of-way rules (8-10 questions)
  - Speed and safe driving (8-10 questions)
  - Vehicle control and safety (8-10 questions)
  - Parking regulations (3-5 questions)
  - Driving laws and regulations (3-5 questions)
  - Defensive driving and special situations (3-5 questions)
- **Question Bank Structure**: Standardized question format with unique IDs, question text, and 4+ answer options per question
- **Updated Progress Tracking**: Progress tracking now reflects expanded total question count (50+) and displays current position dynamically
- **Enhanced Answer Review**: ResultsScreen now handles scoring and review of all 50+ questions with correct/incorrect indicators
- **StorageService Compatibility**: Ensured storageService can persist responses for all 50+ questions and validate response data structure
- **Improved Documentation**: Added comprehensive QUESTION_BANK.md and expanded COMPONENTS.md to document new question bank structure
- Driver License Practice Test Portal - ReactJS web application for practice tests
- HomePage component for test selection and initialization
- TestPortal component displaying one question at a time with answer tracking
- Question component for rendering individual questions with multiple-choice options
- ResultsScreen component for test completion summary and answer review
- storageService module for persistent storage of test attempts, responses, and scores
- Progress tracking functionality displaying current question number and total questions
- Answer review capability allowing users to review responses after test completion
- Responsive CSS styling with App.css for consistent UI/UX
- Support for localStorage persistence of test data and user scores
- Public/index.html entry point for React application
- Comprehensive project documentation in README.md
