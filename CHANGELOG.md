# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **50 new multiple-choice questions** in `src/data/questionsBank.js`, expanding the bank from ~50 to 100+ questions (ADO Work Item #3)
  - Questions generated via a RAG pipeline grounded in official DMV/driver handbooks and FHWA MUTCD
  - Topics covered: road signs & traffic signals (8–10 q), right-of-way (8–10 q), speed limits & safe driving (8–10 q), vehicle control & safety (6–8 q), parking regulations (4–6 q), DUI laws (4–6 q), defensive driving & special situations (4–6 q)
  - All new questions conform to existing schema: unique Question ID, non-empty Question Text, ≥ 4 answer options, exactly 1 correct answer
  - Sequential, zero-padded Question ID scheme applied; ID uniqueness validated in `src/data/__tests__/questionsBank.test.js`
- **`docs/rag-sources.md`** — new document listing all authoritative RAG grounding sources, topic coverage map, ID scheme description, and validation criteria
- **Updated automated tests** in `src/data/__tests__/questionsBank.test.js` to assert ID uniqueness, schema conformance, and correct-answer presence for all questions in the expanded bank

### Changed
- **README.md** — updated Question Bank section to reference 100+ questions and link to `docs/rag-sources.md`

### Notes
- No changes required to `App.js`, `TestPortal.js`, `Question.js`, `ResultsScreen.js`, or `storageService.js` — the expanded question bank is fully backward-compatible with all existing consumers
- Automated scoring logic requires no modification; all 50 new questions are correctly evaluated by the existing system

---

## [0.1.0] — Initial Release

### Added
- **Question Bank Structure**: Standardized question format with unique IDs, question text, and 4+ answer options per question
- **Expanded Question Bank**: 50+ multiple-choice questions covering comprehensive driver license examination topics
  - Road signs and traffic signals
  - Right-of-way rules
  - Speed and safe driving
  - Vehicle control and safety
  - Parking regulations
  - Driving laws and regulations
  - Defensive driving and special situations
- Driver License Practice Test Portal — ReactJS web application for practice tests
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
