# DLPracticeTest

A ReactJS-based web portal for driver license practice tests, enabling users to take timed practice exams with multiple-choice questions, track progress, and review results.

## Features

- **Multiple-Choice Questions**: Practice tests with 100+ question options covering various driver license exam topics
- **Progress Tracking**: Real-time display of current question number and total question count
- **Response Management**: Track and store user responses for each question during the test
- **Test Completion**: Comprehensive results summary with scoring information
- **Answer Review**: Review all answers after test completion
- **Persistent Storage**: Local storage support for test attempts and scores using `storageService`
- **Responsive UI**: Clean, user-friendly interface built with React components
- **Accurate Scoring**: Automated scoring system compatible with question bank structure

## Architecture

### Core Components

- **App.js**: Main application component managing test state and routing
- **HomePage.js**: Landing page for test selection and initialization
- **TestPortal.js**: Main testing interface displaying questions and capturing responses
- **Question.js**: Individual question component with answer options (supports 4+ choices)
- **ResultsScreen.js**: Results summary and answer review screen with score calculation

### Services

- **storageService.js**: Handles persistent storage of test attempts, user responses, and scores. Compatible with expanded question bank.

## Question Bank

The DLPracticeTest includes a comprehensive question bank with **100+ multiple-choice questions** (50 original + 50 newly added via RAG pipeline, ADO Work Item #3).

### Question Structure

Each question contains:
- **Question Text**: Clear, specific question about driver license requirements
- **Answer Options**: Minimum 4 multiple-choice options per question
- **Correct Answer**: Single marked correct answer per question
- **Question ID**: Unique identifier for tracking and scoring (sequential, zero-padded, validated for no collisions)

### Question Coverage

Questions cover the following topics:
- Road signs and traffic signals
- Right-of-way rules
- Speed limits and safe driving
- Vehicle control and safety
- Parking regulations
- Driving under influence laws
- Defensive driving techniques
- And more...

### RAG-Sourced Questions

The 50 questions added in this release were generated using a **Retrieval-Augmented Generation (RAG)** pipeline grounded in authoritative DMV handbooks and federal traffic standards. See [`docs/rag-sources.md`](docs/rag-sources.md) for the full list of reference materials, topic coverage map, and validation criteria.

## Usage

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`.

## Test Workflow

1. User navigates to the home page and selects a practice test
2. Questions are displayed one at a time in the TestPortal
3. User selects an answer from 4+ options and navigates to the next question
4. Progress bar shows current position (e.g., "Question 5 of 100+")
5. Upon completion, results are displayed with scoring summary
6. User can review all answers on the ResultsScreen
7. Test attempts and scores are persisted for future reference

## Storage

The `storageService` module provides the following functionality:

- Save test attempts with responses
- Retrieve historical test results
- Store user scores and answer summaries
- Support for both localStorage and sessionStorage strategies
- Validate response data structure compatibility with expanded question bank

## Styling

The application uses CSS modules with `App.css` for consistent theming and responsive design.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

### Question Bank Expansion

The question bank has been expanded from ~50 to 100+ questions. New questions were generated via a RAG pipeline (see [`docs/rag-sources.md`](docs/rag-sources.md)) and validated for schema conformance and ID uniqueness in `src/data/__tests__/questionsBank.test.js`. No changes to `App.js`, `TestPortal.js`, `Question.js`, `ResultsScreen.js`, or `storageService.js` are required.

### Scoring Compatibility

The ResultsScreen component uses the marked correct answers from each question to calculate test scores. All questions must have exactly one answer marked as correct — this is enforced by the test suite.

### Storage Persistence

When users complete tests, storageService persists:
- All user responses
- Calculated scores based on correct answer matching
- Test metadata (timestamp, test ID, user session)
