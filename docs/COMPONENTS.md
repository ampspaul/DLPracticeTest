# Components Documentation

## TestPortal Component

The TestPortal component is the main testing interface where users take practice tests.

### Props

```javascript
<TestPortal
  questions={Array}        // Array of 50+ question objects from question bank
  onTestComplete={Function} // Callback when all questions answered
  testId={String}           // Unique identifier for test attempt
/>
```

### Features

- Displays one question at a time from the question bank (50+ total)
- Tracks current question index and total question count
- Captures user responses and stores them via storageService
- Displays progress indicator (e.g., "Question 5 of 50+")
- Handles navigation between questions
- Validates responses before moving to next question
- Calls onTestComplete callback when final question is answered

### State Management

```javascript
state = {
  currentQuestionIndex: 0,    // Current question index (0-49+)
  totalQuestions: 50,          // Total question count from bank
  responses: {},               // Map of question IDs to selected option IDs
  isLoading: false,            // Loading state during question load
}
```

### Key Methods

- `loadQuestions()`: Loads 50+ questions from question bank
- `handleAnswerSelection(optionId)`: Captures user's selected answer
- `moveToNextQuestion()`: Advances to next question, validates response storage
- `moveToPreviousQuestion()`: Returns to previous question
- `saveResponse(questionId, selectedOptionId)`: Persists response via storageService
- `calculateProgress()`: Returns formatted string (e.g., "5 of 50+")

### Integration with Question Bank

- Loads all 50+ questions on component mount
- Validates question bank structure (minimum 4 options, exactly 1 correct per question)
- Displays questions sequentially
- Maps user selections to question IDs for later scoring

## Question Component

The Question component renders a single multiple-choice question.

### Props

```javascript
<Question
  question={Object}          // Question object from question bank
  onAnswerSelect={Function}  // Callback when answer selected
  selectedOption={String}    // ID of currently selected option (if any)
/>
```

### Features

- Renders question text
- Displays 4+ answer options from question object
- Highlights selected option
- Handles click events for option selection
- Validates option structure

### Question Object Structure

Expects question object with:
```javascript
{
  id: "Q001",
  question: "What does a red octagon sign mean?",
  options: [
    { id: "opt_a", text: "Option A", isCorrect: true },
    { id: "opt_b", text: "Option B", isCorrect: false },
    { id: "opt_c", text: "Option C", isCorrect: false },
    { id: "opt_d", text: "Option D", isCorrect: false }
  ]
}
```

## ResultsScreen Component

The ResultsScreen displays test completion results and answer review.

### Props

```javascript
<ResultsScreen
  responses={Object}         // Map of question IDs to selected option IDs
  questions={Array}          // All 50+ question objects from question bank
  testId={String}            // Test attempt identifier
  onRetakeTest={Function}    // Callback to restart test
/>
```

### Features

- Displays overall test score
- Shows score as percentage: (Correct / 50+) × 100
- Lists all questions with user answers and correct answers
- Highlights correct/incorrect answers
- Allows answer review for all 50+ questions
- Retrieves stored responses from storageService
- Compares user responses against marked correct answers

### Scoring Logic

```javascript
function calculateScore(responses, questions) {
  let correctCount = 0;
  questions.forEach(q => {
    const userOptionId = responses[q.id];
    const correctOption = q.options.find(opt => opt.isCorrect);
    if (userOptionId === correctOption.id) {
      correctCount++;
    }
  });
  return (correctCount / questions.length) * 100;
}
```

### Answer Review Display

For each question displays:
- Original question text
- User's selected answer with correct/incorrect indicator
- Correct answer if user was incorrect
- Score tally (e.g., "45 of 50 correct")

## HomePage Component

The HomePage component provides test selection and initialization.

### Features

- Displays available practice tests
- Initiates new test with 50+ questions
- Allows users to review previous test results
- Shows available question count information

## StorageService

The storageService module handles persistent storage of test attempts and responses.

### Key Methods

#### `saveTestAttempt(testId, responses, score)`

Saves a completed test attempt with all user responses.

```javascript
storageService.saveTestAttempt(testId, responses, score);
```

Parameters:
- `testId`: Unique test identifier (string)
- `responses`: Object mapping question IDs to selected option IDs
  ```javascript
  {
    "Q001": "opt_b",
    "Q002": "opt_a",
    // ... for all 50+ questions
  }
  ```
- `score`: Calculated test score (number, 0-100)

#### `getTestAttempt(testId)`

Retrieves a previously saved test attempt.

```javascript
const attempt = storageService.getTestAttempt(testId);
```

Returns:
```javascript
{
  testId: "test_001",
  timestamp: 1234567890,
  responses: { /* 50+ question responses */ },
  score: 90,
  duration: 1800 // seconds
}
```

#### `getAllAttempts()`

Retrieves all saved test attempts.

```javascript
const allAttempts = storageService.getAllAttempts();
```

Returns: Array of test attempt objects

#### `deleteTestAttempt(testId)`

Deletes a specific test attempt.

```javascript
storageService.deleteTestAttempt(testId);
```

### Storage Implementation

- Uses browser's `localStorage` for persistent storage
- Stores test data as JSON strings
- Keys: `test_attempt_{testId}`
- Data persists across browser sessions
- Handles 50+ question response objects efficiently

### Response Data Structure

Responses stored in localStorage:
```javascript
{
  "Q001": "opt_b",    // Question ID -> Selected Option ID
  "Q002": "opt_a",
  "Q003": "opt_c",
  // ... continues for all 50+ questions
}
```
