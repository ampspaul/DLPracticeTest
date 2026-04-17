# DLPracticeTest

A ReactJS-based web portal for driver license practice tests, enabling users to take timed practice exams with multiple-choice questions, track progress, and review results.

## Features

- **Multiple-Choice Questions**: Practice tests with various question types and answer options
- **Progress Tracking**: Real-time display of current question number and total question count
- **Response Management**: Track and store user responses for each question during the test
- **Test Completion**: Comprehensive results summary with scoring information
- **Answer Review**: Review all answers after test completion
- **Persistent Storage**: Local storage support for test attempts and scores using `storageService`
- **Responsive UI**: Clean, user-friendly interface built with React components

## Architecture

### Core Components

- **App.js**: Main application component managing test state and routing
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

1. User navigates to the home page and selects a practice test
2. Questions are displayed one at a time in the TestPortal
3. User selects an answer and navigates to the next question
4. Progress bar shows current position (e.g., "Question 5 of 50")
5. Upon completion, results are displayed with scoring summary
6. User can review all answers on the ResultsScreen
7. Test attempts and scores are persisted for future reference

## Storage

The `storageService` module provides the following functionality:

- Save test attempts with responses
- Retrieve historical test results
- Store user scores and answer summaries
- Support for both localStorage and sessionStorage strategies

## Styling

The application uses CSS modules with `App.css` for consistent theming and responsive design.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
