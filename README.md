# DLPracticeTest

A ReactJS-based web portal for driver license practice tests, enabling users to take timed practice exams with multiple-choice questions, track progress, and review results.

## Features

- **Portal Heading**: Prominent application header displaying 'TN Driver Licence Practice Test' with responsive design and accessibility support
- **Multiple-Choice Questions**: Practice tests with various question types and answer options
- **Progress Tracking**: Real-time display of current question number and total question count
- **Response Management**: Track and store user responses for each question during the test
- **Test Completion**: Comprehensive results summary with scoring information
- **Answer Review**: Review all answers after test completion
- **Persistent Storage**: Local storage support for test attempts and scores using `storageService`
- **Responsive UI**: Clean, user-friendly interface built with React components
- **Accessibility**: Semantic HTML and WCAG-compliant design across all components

## Architecture

### Core Components

- **App.js**: Main application component managing test state and routing
- **PortalHeading.jsx**: Application header component displaying the main portal heading 'TN Driver Licence Practice Test' with responsive styling and semantic HTML heading tags for accessibility
- **HomePage.js**: Landing page for test selection and initialization
- **TestPortal.js**: Main testing interface displaying questions and capturing responses
- **Question.js**: Individual question component with answer options
- **ResultsScreen.js**: Results summary and answer review screen

### Services

- **storageService.js**: Handles persistent storage of test attempts, user responses, and scores

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

1. User navigates to the application and views the prominent portal heading 'TN Driver Licence Practice Test'
2. User navigates to the home page and selects a practice test
3. Questions are displayed one at a time in the TestPortal
4. User selects an answer and navigates to the next question
5. Progress bar shows current position (e.g., "Question 5 of 50")
6. Upon completion, results are displayed with scoring summary
7. User can review all answers on the ResultsScreen
8. Test attempts and scores are persisted for future reference

## Storage

The `storageService` module provides the following functionality:

- Save test attempts with responses
- Retrieve historical test results
- Store user scores and answer summaries
- Support for both localStorage and sessionStorage strategies

## Styling

The application uses CSS modules with `App.css` for consistent theming and responsive design. Component-specific styles are defined in respective CSS files (e.g., `PortalHeading.css`).

## Accessibility

The application is designed with accessibility as a priority:

- **Semantic HTML**: All heading components use proper heading hierarchy (`<h1>`, `<h2>`, etc.)
- **Screen Reader Support**: Components include appropriate ARIA labels and semantic markup
- **Responsive Design**: All components are responsive and readable across mobile, tablet, and desktop devices
- **WCAG Compliance**: Components meet WCAG 2.1 Level AA standards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
