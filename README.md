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

## Architecture

### Core Components

- **App.js**: Main application component managing test state and routing
- **HomePage.js**: Landing page for test selection and initialization. Displays the main page heading **'TN Student Practice Test'**, styled with bold font weight (`font-weight: 700`), italic font style (`font-style: italic`), and Dark Orange text colour (`#FF8C00`). The heading style is applied consistently across all supported viewports (desktop ≥1024 px, tablet 768–1023 px, and mobile <768 px) to preserve responsive behaviour. No other text, layout, navigation, or functional behaviour is affected by this styling.
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

1. User navigates to the home page and selects a practice test
2. Questions are displayed one at a time in the TestPortal (50+ questions total)
3. User selects an answer from 4+ options and navigates to the next question
4. Progress bar shows current position (e.g., "Question 5 of 50+")
5. Upon completion, results are displayed with scoring summary
6. User can review all answers on the ResultsScreen
7. Test attempts and scores are persisted for future reference

## Storage

The `storageService` module provides the following functionality:

- Save test attempts with responses (handles 50+ questions)
- Retrieve historical test results
- Store user scores and answer summaries
- Support for both localStorage and sessionStorage strategies
- Validate response data structure compatibility with expanded question bank

## Styling

The application uses CSS modules with `styles.css` for consistent theming and responsive design.

### Home Page Heading

The main heading on `HomePage.js` renders the text **'TN Student Practice Test'** with the following styles:

| Property | Value |
|---|---|
| Text | `TN Student Practice Test` |
| `font-weight` | `bold` / `700` |
| `font-style` | `italic` |
| `color` | Dark Orange — `#FF8C00` |
| Responsive | Applied consistently across desktop (≥1024 px), tablet (768–1023 px), and mobile (<768 px) viewports |

The heading colour (`#FF8C00`) is applied in all locations where the heading colour is defined — inline styles, CSS class rules, CSS custom properties/variables, CSS-in-JS/theme tokens, and `@media` blocks — replacing the previous Dark Purple value (`#4B0082`) in its entirety. The heading styles are applied in-place within the existing responsive CSS rules in `styles.css`. No duplicate or conflicting rules are introduced. No other text, layout, navigation, or functional behaviour in `HomePage.js` or any other component is altered.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

### Progress Tracking Updates

Progress tracking has been updated to display the expanded question count. Ensure TestPortal component properly initializes with the new total question count from the question bank.

### Scoring Compatibility

The ResultsScreen component uses the marked correct answers from each question to calculate test scores. All 50+ questions must have exactly one answer marked as correct.

### Storage Persistence

When users complete tests, storageService persists:
- All user responses for the 50+ questions
- Calculated scores based on correct answer matching
- Test metadata (timestamp, test ID, user session)

### Home Page Heading Style

The heading style in `HomePage.js` is intentionally scoped to the `h1` / main heading element only. No other text, layout elements, navigation links, or functional behaviour on the home page are modified. The heading is styled with `font-weight: 700`, `font-style: italic`, and colour `#FF8C00` (Dark Orange). These styles are applied consistently at desktop (≥1024 px), tablet (768 px–1023 px), and mobile (<768 px) breakpoints by updating the existing responsive rules in-place — including all inline styles, CSS class rules, CSS custom properties/variables, CSS-in-JS/theme tokens, and `@media` blocks — so no duplicate or conflicting rules are introduced. The old Dark Purple value (`#4B0082`) has been fully removed and replaced in all relevant style definitions for the heading.
