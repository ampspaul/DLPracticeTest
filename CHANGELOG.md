# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **HomePage heading colour** (`HomePage.js`, `style.css`): Updated main page heading text colour from blue to **Dark Green** (exact hex value / design token pending stakeholder confirmation). `font-weight: 700` is unchanged.
- **Responsive heading consistency** (`style.css`, `index.html`): Dark Green heading colour is applied uniformly across all supported viewports — desktop (≥1024 px), tablet (768–1023 px), and mobile (<768 px) — preserving existing responsive behaviour. No layout, navigation, question bank logic, scoring, storage, or functional behaviour was altered.
- **HomePage heading text**: Updated the main page heading in `HomePage.js` to display `'TN Student Practice Test'`
- **HomePage heading weight**: `font-weight: bold` (`700`) retained on the main heading in `HomePage.js`; no change to font weight required or made

### Added
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
- Responsive CSS styling with `style.css` for consistent UI/UX
- Support for localStorage persistence of test data and user scores
- `index.html` entry point for the application
- Comprehensive project documentation in README.md
