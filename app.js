'use strict';

const questions = [
  {
    question: 'What does a red traffic light mean?',
    options: ['Go', 'Slow down', 'Stop', 'Yield'],
    answer: 'Stop'
  },
  {
    question: 'What is the default speed limit in a residential area?',
    options: ['25 mph', '35 mph', '45 mph', '55 mph'],
    answer: '25 mph'
  },
  {
    question: 'When must you use your headlights?',
    options: [
      'Only at night',
      'When visibility is less than 1000 feet',
      'Only in tunnels',
      'Never required'
    ],
    answer: 'When visibility is less than 1000 feet'
  },
  {
    question: 'What should you do at a yellow traffic light?',
    options: ['Speed up', 'Stop if safe to do so', 'Ignore it', 'Sound your horn'],
    answer: 'Stop if safe to do so'
  },
  {
    question: 'Who has the right of way at an unmarked intersection?',
    options: [
      'The driver on the left',
      'The driver on the right',
      'The faster vehicle',
      'No one'
    ],
    answer: 'The driver on the right'
  }
];

function buildQuiz() {
  const questionBlock = document.getElementById('question-block');
  if (!questionBlock) return;

  questionBlock.innerHTML = '';

  questions.forEach((q, index) => {
    const questionEl = document.createElement('div');
    questionEl.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionEl.appendChild(questionText);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    q.options.forEach(option => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question-${index}`;
      radio.value = option;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      optionsDiv.appendChild(label);
    });

    questionEl.appendChild(optionsDiv);
    questionBlock.appendChild(questionEl);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.textContent = 'Submit Answers';
  submitBtn.addEventListener('click', evaluateQuiz);
  questionBlock.after(submitBtn);
}

function evaluateQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score += 1;
    }
  });

  const resultBlock = document.getElementById('result-block');
  const scoreDisplay = document.getElementById('score-display');

  if (resultBlock && scoreDisplay) {
    scoreDisplay.textContent = `You scored ${score} out of ${questions.length}.`;
    resultBlock.classList.remove('hidden');
    resultBlock.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', buildQuiz);