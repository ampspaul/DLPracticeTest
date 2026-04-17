# Driver License Practice Test Portal

A ReactJS-based web application for practicing driver license tests with multiple-choice questions, progress tracking, and answer review.

## Features

- ✅ Practice tests with multiple-choice questions
- ✅ One question at a time display
- ✅ Real-time progress tracking
- ✅ Navigation controls (next/previous)
- ✅ Test completion with results summary
- ✅ Answer review showing correct/incorrect answers
- ✅ Persistent storage across browser sessions
- ✅ Responsive design for desktop and tablet
- ✅ Sub-3 second page load time

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm build
```

## Project Structure

```
src/
├── components/
│   ├── HomePage.js              # Landing page with test selection
│   ├── TestPortal.js            # Main test container
│   ├── Question.js              # Question display component
│   ├── ResultsScreen.js         # Results and answer review
│   └── __tests__/               # Component tests
├── services/
│   ├── questionsService.js      # Question data and loading
│   ├── storageService.js        # localStorage management
│   └── __tests__/               # Service tests
├── App.js                        # Root component
└── index.js                      # Application entry point
```

## Functionality

### Test Types

1. **Permit Knowledge Test** - 50 questions covering driving rules
2. **Road Signs & Signals** - 30 questions on traffic signs
3. **Traffic Laws & Rules** - 40 questions on traffic laws

### User Flow

1. Select a practice test from the home page
2. Answer each question one at a time
3. Navigate between questions using Next/Previous buttons
4. Click Finish on the last question to complete the test
5. View results with score, percentage, and answer review
6. Review correct/incorrect answers with explanations
7. Return to home to start another test

### Data Persistence

All test attempts are stored in browser localStorage with:
- User answers for each question
- Test scores and percentages
- Timestamps for each attempt
- Question content snapshot

### Performance

- Initial page load: <3 seconds
- Question navigation: <100ms
- Results calculation: Instant
- Local data retrieval: <50ms

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- Semantic HTML structure
- ARIA labels for form controls
- Keyboard navigation support
- Color contrast compliant

## Future Enhancements

- Backend API integration for test data
- User authentication and profiles
- Test history and statistics dashboard
- Timed practice tests
- Difficulty levels
- Custom question sets
- Mobile app version

## License

MIT