// DL Practice Test Application

const questions = [
    {
        question: "What does a red traffic light mean?",
        options: ["Go", "Slow down", "Stop", "Yield"],
        answer: 2
    },
    {
        question: "What is the speed limit in a school zone unless otherwise posted?",
        options: ["15 mph", "20 mph", "25 mph", "35 mph"],
        answer: 2
    },
    {
        question: "When should you use your headlights?",
        options: [
            "Only at night",
            "30 minutes after sunset to 30 minutes before sunrise",
            "Whenever visibility is less than 1000 feet",
            "Both B and C"
        ],
        answer: 3
    },
    {
        question: "What does a yellow traffic light mean?",
        options: ["Speed up", "Stop if safe to do so", "Go", "Yield to pedestrians"],
        answer: 1
    },
    {
        question: "When are you allowed to pass another vehicle on the right?",
        options: [
            "Never",
            "When the vehicle ahead is turning left",
            "On a two-lane road",
            "Whenever you want"
        ],
        answer: 1
    }
];

function buildQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    container.innerHTML = '';

    questions.forEach(function(q, index) {
        const block = document.createElement('div');
        block.classList.add('question-block');

        const questionText = document.createElement('p');
        questionText.textContent = (index + 1) + '. ' + q.question;
        block.appendChild(questionText);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        q.options.forEach(function(option, optIndex) {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'question-' + index;
            radio.value = optIndex;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            optionsDiv.appendChild(label);
        });

        block.appendChild(optionsDiv);
        container.appendChild(block);
    });
}

function calculateScore() {
    let score = 0;

    questions.forEach(function(q, index) {
        const selected = document.querySelector('input[name="question-' + index + '"]:checked');
        if (selected && parseInt(selected.value, 10) === q.answer) {
            score++;
        }
    });

    return score;
}

function showResults(score) {
    const summary = document.getElementById('score-summary');
    const scoreText = document.getElementById('score-text');
    if (!summary || !scoreText) return;

    summary.style.display = 'block';
    scoreText.textContent = 'You scored ' + score + ' out of ' + questions.length + '.';

    if (score === questions.length) {
        scoreText.textContent += ' Excellent! You passed!';
        scoreText.className = 'result-correct';
    } else if (score >= Math.ceil(questions.length * 0.7)) {
        scoreText.textContent += ' Good job!';
        scoreText.className = 'result-correct';
    } else {
        scoreText.textContent += ' Keep practicing!';
        scoreText.className = 'result-incorrect';
    }
}

function init() {
    buildQuiz();

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const score = calculateScore();
            showResults(score);
        });
    }
}

document.addEventListener('DOMContentLoaded', init);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questions, buildQuiz, calculateScore, showResults, init };
}