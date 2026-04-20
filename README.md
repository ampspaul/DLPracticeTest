# DLPracticeTest

A ReactJS-based web portal for driver license practice tests, enabling users to take timed practice exams with multiple-choice questions, track progress, and review results.

## Features

- **Multiple-Choice Questions**: Practice tests with 50+ question options covering various driver license exam topics
- **Progress Tracking**: Real-time display of current question number and total question count (50+ questions per test)
- **Response Management**: Track and store user responses for each question during the test
- **Test Completion**: Comprehensive results summary with scoring information
- **Answer Review**: Review all answers after test completion
- **Persistent Storage**: Local storage support for test attempts and scores using `storageService`
- **Responsive UI**: Clean, user-friendly interface built with React components
- **Accurate Scoring**: Automated scoring system compatible with question bank structure
- **Page Identity**: Prominent page-level heading and browser tab title — `TN Driver Licence Practice Test` — displayed on the landing page for clarity, accessibility, and SEO

## Architecture

### Core Components

- **App.js**: Main application component managing test state and routing
- **HomePage.js**: Landing page for test selection and initialization. Renders an `<h1>` heading with the exact text `TN Driver Licence Practice Test` and sets the browser document `<title>` to the same value so the title appears correctly in the browser tab and in search engine results
- **TestPortal.js**: Main testing interface displaying questions and capturing responses, manages 50+ question sequence
- **Question.js**: Individual question component with answer options (supports 4+ choices)
- **ResultsScreen.js**: Results summary and answer review screen with score calculation

### Services

- **storageService.js**: Handles persistent storage of test attempts, user responses, and scores. Compatible with expanded question bank of 50+ questions

## Question Bank

The DLPracticeTest includes a comprehensive question bank with **50+ multiple-choice questions**.

### Question Structure

Each question contains:
- **Question Text**: Clear, specific question about driver license requirements
- **Answer Options**: Minimum 4 multiple-choice options per question
- **Correct Answer**: Single marked correct answer per question
- **Question ID**: Unique identifier for tracking and scoring

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

1. User navigates to the home page — the browser tab shows **TN Driver Licence Practice Test** and the page displays a prominent `<h1>` heading with the same text
2. User selects a practice test from the HomePage
3. Questions are displayed one at a time in the TestPortal (50+ questions total)
4. User selects an answer from 4+ options and navigates to the next question
5. Progress bar shows current position (e.g., "Question 5 of 50+")
6. Upon completion, results are displayed with scoring summary
7. User can review all answers on the ResultsScreen
8. Test attempts and scores are persisted for future reference

## Storage

The `storageService` module provides the following functionality:

- Save test attempts with responses (handles 50+ questions)
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

### Page Title & Heading (HomePage.js / index.html)

The landing page (`HomePage.js`) must display the exact text **`TN Driver Licence Practice Test`** in two places:

| Location | Implementation | Requirement |
|---|---|---|
| Browser tab / bookmark | `<title>` tag in `index.html` or `document.title` set in `HomePage.js` | Exact string, no casing/punctuation variation |
| Page-level heading | `<h1>` (or semantic equivalent) rendered by `HomePage.js` | Exact string, WCAG-compliant, SEO-friendly |

**Responsiveness**: The `<h1>` heading must render correctly across all supported viewport widths — mobile (≥ 320 px) through desktop (≥ 1 024 px). Use fluid typography or CSS media queries as appropriate.

**Accessibility**: A visible, correctly-ordered `<h1>` is required by WCAG 2.1 Success Criterion 1.3.1 (Info and Relationships) and SC 2.4.6 (Headings and Labels). Screen readers rely on this landmark to announce the page context.

**SEO**: The matching `<title>` and `<h1>` values improve search-engine relevance signals for the page.

**Regression guard**: Adding the heading and title must not alter component props, state shape, routing logic, question flow, progress tracking, scoring, answer review, or `storageService` behaviour.

### Progress Tracking Updates

Progress tracking has been updated to display the expanded question count. Ensure TestPortal component properly initializes with the new total question count from the question bank.

### Scoring Compatibility

The ResultsScreen component uses the marked correct answers from each question to calculate test scores. All 50+ questions must have exactly one answer marked as correct.

### Storage Persistence

When users complete tests, storageService persists:
- All user responses for the 50+ questions
- Calculated scores based on correct answer matching
- Test metadata (timestamp, test ID, user session)
