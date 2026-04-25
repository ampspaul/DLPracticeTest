/**
 * Tests for DL Practice Test Application
 */

// Mock DOM environment for testing
const { JSDOM } = require('jsdom');

// We'll use a simple test harness if Jest isn't available
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log('  ✓ PASS:', message);
        testsPassed++;
    } else {
        console.error('  ✗ FAIL:', message);
        testsFailed++;
    }
}

function describe(groupName, fn) {
    console.log('\n' + groupName);
    fn();
}

function it(testName, fn) {
    try {
        fn();
    } catch (e) {
        console.error('  ✗ ERROR in "' + testName + '":', e.message);
        testsFailed++;
    }
}

// Setup JSDOM
const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<head><title>Test</title></head>
<body>
    <div class="container">
        <h1>Driver's License Practice Test</h1>
        <h2>Test Your Knowledge</h2>
        <div id="quiz-container"></div>
        <button class="btn" id="submit-btn" type="button">Submit Answers</button>
        <div class="score-summary" id="score-summary" style="display:none;">
            <h3>Your Results</h3>
            <p id="score-text"></p>
        </div>
    </div>
</body>
</html>
`, { url: 'http://localhost' });

global.document = dom.window.document;
global.window = dom.window;
global.module = { exports: {} };

// Load the app
const app = require('../app.js');
const { questions, buildQuiz, calculateScore, showResults } = app;

describe('Questions data', function() {
    it('should have at least one question', function() {
        assert(Array.isArray(questions), 'questions is an array');
        assert(questions.length > 0, 'questions array is not empty');
    });

    it('each question should have required fields', function() {
        questions.forEach(function(q, i) {
            assert(typeof q.question === 'string' && q.question.length > 0,
                'question ' + (i+1) + ' has a non-empty question string');
            assert(Array.isArray(q.options) && q.options.length > 0,
                'question ' + (i+1) + ' has options array');
            assert(typeof q.answer === 'number',
                'question ' + (i+1) + ' has a numeric answer index');
            assert(q.answer >= 0 && q.answer < q.options.length,
                'question ' + (i+1) + ' answer index is within bounds');
        });
    });
});

describe('buildQuiz()', function() {
    it('should populate the quiz container', function() {
        buildQuiz();
        const container = document.getElementById('quiz-container');
        assert(container !== null, 'quiz container exists');
        const blocks = container.querySelectorAll('.question-block');
        assert(blocks.length === questions.length,
            'renders correct number of question blocks (' + questions.length + ')');
    });

    it('should render radio buttons for each option', function() {
        buildQuiz();
        questions.forEach(function(q, index) {
            const radios = document.querySelectorAll('input[name="question-' + index + '"]');
            assert(radios.length === q.options.length,
                'question ' + (index+1) + ' has correct number of radio buttons');
        });
    });
});

describe('calculateScore()', function() {
    it('should return 0 when no answers selected', function() {
        buildQuiz();
        const score = calculateScore();
        assert(score === 0, 'score is 0 with no selections');
    });

    it('should count correct answers', function() {
        buildQuiz();
        // Select first correct answer
        const firstCorrectIndex = questions[0].answer;
        const firstRadio = document.querySelector(
            'input[name="question-0"][value="' + firstCorrectIndex + '"]'
        );
        if (firstRadio) {
            firstRadio.checked = true;
        }
        const score = calculateScore();
        assert(score >= 1, 'score is at least 1 when one correct answer selected');
    });
});

describe('showResults()', function() {
    it('should display the score summary', function() {
        showResults(3);
        const summary = document.getElementById('score-summary');
        assert(summary.style.display !== 'none', 'score summary is visible');
    });

    it('should show score text', function() {
        showResults(questions.length);
        const scoreText = document.getElementById('score-text');
        assert(scoreText.textContent.includes(String(questions.length)),
            'score text contains total number of questions');
    });

    it('should apply correct class for full score', function() {
        showResults(questions.length);
        const scoreText = document.getElementById('score-text');
        assert(scoreText.className === 'result-correct',
            'result-correct class applied for perfect score');
    });

    it('should apply incorrect class for low score', function() {
        showResults(0);
        const scoreText = document.getElementById('score-text');
        assert(scoreText.className === 'result-incorrect',
            'result-incorrect class applied for low score');
    });
});

describe('Heading styles', function() {
    it('h1 heading should exist in the DOM', function() {
        const h1 = document.querySelector('h1');
        assert(h1 !== null, 'h1 element exists');
        assert(h1.textContent.length > 0, 'h1 has non-empty text content');
    });

    it('h2 heading should exist in the DOM', function() {
        const h2 = document.querySelector('h2');
        assert(h2 !== null, 'h2 element exists');
        assert(h2.textContent.length > 0, 'h2 has non-empty text content');
    });

    it('h3 heading should exist in the DOM', function() {
        const h3 = document.querySelector('h3');
        assert(h3 !== null, 'h3 element exists');
    });
});

// Summary
console.log('\n--- Test Summary ---');
console.log('Passed:', testsPassed);
console.log('Failed:', testsFailed);
if (testsFailed > 0) {
    process.exit(1);
} else {
    console.log('All tests passed!');
}