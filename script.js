'use strict';

const questions = [
    {
        question: "What does a red traffic light mean?",
        options: ["Go", "Slow down", "Stop", "Proceed with caution"],
        answer: 2
    },
    {
        question: "What is the national speed limit on a single carriageway road?",
        options: ["50 mph", "60 mph", "70 mph", "80 mph"],
        answer: 1
    },
    {
        question: "When should you use hazard warning lights?",
        options: [
            "When parked on double yellow lines",
            "When your vehicle has broken down",
            "When driving in fog",
            "When overtaking cyclists"
        ],
        answer: 1
    }
];

let currentIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result-section');
const resultText = document.getElementById('result-text');

/**
 * Renders the current question and its options.
 */
function renderQuestion() {
    const current = questions[currentIndex];
    questionText.textContent = `Q${currentIndex + 1}: ${current.question}`;
    optionsList.innerHTML = '';
    resultSection.hidden = true;

    current.options.forEach((option, index) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');

        input.type = 'radio';
        input.name = 'option';
        input.value = index;
        input.id = `option-${index}`;
        label.setAttribute('for', `option-${index}`);

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        li.appendChild(label);
        optionsList.appendChild(li);
    });
}

/**
 * Handles the Next button click — validates selection, records answer,
 * and advances to the next question or shows final score.
 */
function handleNext() {
    const selected = document.querySelector('input[name="option"]:checked');

    if (!selected) {
        resultSection.hidden = false;
        resultText.textContent = 'Please select an answer before continuing.';
        resultText.style.color = '#b00020';
        return;
    }

    const selectedIndex = parseInt(selected.value, 10);
    const current = questions[currentIndex];

    if (selectedIndex === current.answer) {
        score += 1;
        resultText.textContent = '✓ Correct!';
        resultText.style.color = '#006400';
    } else {
        resultText.textContent = `✗ Incorrect. The correct answer was: "${current.options[current.answer]}"`;
        resultText.style.color = '#b00020';
    }

    resultSection.hidden = false;
    currentIndex += 1;

    if (currentIndex >= questions.length) {
        nextBtn.textContent = 'Finish';
        nextBtn.removeEventListener('click', handleNext);
        nextBtn.addEventListener('click', showFinalScore);
    }
}

/**
 * Displays the final score summary.
 */
function showFinalScore() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h2 class="heading-dark-green">Quiz Complete!</h2>
        <p>You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>
        <button type="button" id="restart-btn" style="margin-top:16px;">Restart</button>
    `;
    document.getElementById('restart-btn').addEventListener('click', () => {
        currentIndex = 0;
        score = 0;
        location.reload();
    });
}

nextBtn.addEventListener('click', handleNext);
renderQuestion();