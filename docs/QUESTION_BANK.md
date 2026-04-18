# Question Bank Documentation

## Overview

The DLPracticeTest question bank contains **50+ multiple-choice questions** covering comprehensive driver license examination topics.

## Question Structure

Each question in the question bank must follow this structure:

```json
{
  "id": "unique_question_identifier",
  "question": "The question text describing the scenario or rule",
  "options": [
    {
      "id": "option_a",
      "text": "Option A text",
      "isCorrect": false
    },
    {
      "id": "option_b",
      "text": "Option B text",
      "isCorrect": true
    },
    {
      "id": "option_c",
      "text": "Option C text",
      "isCorrect": false
    },
    {
      "id": "option_d",
      "text": "Option D text",
      "isCorrect": false
    }
  ]
}
```

## Requirements

### Mandatory Fields

- **id**: Unique identifier for the question (string, e.g., "Q001", "Q002", etc.)
- **question**: Question text (string, clear and concise)
- **options**: Array of answer options (minimum 4 per question)
  - Each option must have: `id`, `text`, and `isCorrect` boolean
  - Exactly one option must have `isCorrect: true`

### Answer Options

- Minimum of 4 answer options per question
- Each option must be distinct and plausible
- Exactly one option must be marked as correct (`isCorrect: true`)
- Options must be presented in randomized or consistent order

## Question Coverage

The 50+ questions cover the following topics:

1. **Road Signs & Signals** (8-10 questions)
   - Regulatory signs
   - Warning signs
   - Traffic signals
   - Pavement markings

2. **Right-of-Way Rules** (8-10 questions)
   - Intersection right-of-way
   - Pedestrian right-of-way
   - Yield signs
   - Stop signs

3. **Speed & Safe Driving** (8-10 questions)
   - Speed limits
   - Appropriate speeds for conditions
   - Tailgating prevention
   - Safe following distance

4. **Vehicle Control & Safety** (8-10 questions)
   - Steering techniques
   - Braking
   - Traction control
   - Tire safety

5. **Parking Regulations** (3-5 questions)
   - No parking zones
   - Handicap parking
   - Parallel parking

6. **Driving Laws & Regulations** (3-5 questions)
   - Seat belt laws
   - Child safety seats
   - Headlight requirements
   - Cell phone usage

7. **Defensive Driving & Special Situations** (3-5 questions)
   - Weather conditions
   - Animal hazards
   - Mechanical failure response
   - Sharing the road

## Integration Points

### TestPortal Component

The TestPortal component displays questions from the question bank:
- Loads all 50+ questions on test initialization
- Displays one question at a time
- Captures user selections via the Question component
- Updates progress tracking with current question index and total count

### Question Component

The Question component renders individual questions:
- Displays the question text
- Renders all answer options from the options array
- Handles user selection of an option
- Highlights selected option

### StorageService

The storageService persists question responses:
- Stores user selections for each question (option ID selected)
- Associates responses with question ID for later matching
- Supports retrieval of responses for answer review

### ResultsScreen Component

The ResultsScreen uses question bank data for scoring:
- Retrieves stored user responses
- Matches responses against correct answers from question bank
- Calculates score: (Number of Correct Answers / 50+) × 100
- Displays answer review with correct/incorrect indicators

## Data Validation

When loading questions from the question bank, the system validates:

1. **Question Count**: Confirms at least 50 questions are loaded
2. **Structure Integrity**: Validates each question has required fields
3. **Option Count**: Ensures each question has minimum 4 options
4. **Correct Answer**: Verifies exactly one answer marked as correct per question
5. **Unique IDs**: Ensures all question IDs are unique

## Adding New Questions

To add new questions to the bank:

1. Create new question objects following the required structure
2. Assign unique IDs (e.g., "Q051", "Q052", etc.)
3. Mark exactly one answer as correct
4. Include minimum 4 answer options
5. Validate structure before committing
6. Update progress tracking if total count changes

## Performance Considerations

- All 50+ questions are loaded in memory on test initialization
- Questions are displayed one at a time to minimize DOM operations
- Storage operations are optimized to handle response persistence for all questions
- Consider pagination or lazy loading if question count exceeds 100+
