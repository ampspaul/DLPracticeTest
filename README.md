# Driver License Practice Test Portal

A React-based web application for practicing driver license test questions.

## Features

- Interactive practice questions
- Real-time progress tracking
- Results summary with score calculation
- Local storage for progress persistence
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ampspaul/DLPracticeTest.git
cd DLPracticeTest
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/
│   ├── HomePage.js         # Landing page
│   ├── TestPortal.js       # Main test interface
│   ├── Question.js         # Individual question component
│   └── ResultsScreen.js    # Results display
├── services/
│   └── storageService.js   # Local storage management
├── App.js                  # Main app component
├── App.css                 # Global styles
└── index.js                # Entry point
```

## How It Works

1. Start on the home page
2. Click "Start Test" to begin
3. Answer each question by selecting an option
4. Review your results on the final screen
5. Progress is automatically saved locally

## Technologies Used

- React 18
- CSS3
- LocalStorage API

## License

MIT License - see LICENSE file for details

## Author

ampspaul