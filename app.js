const questions = [
  {
    question: "What is the maximum speed limit in a residential area unless otherwise posted?",
    options: ["25 mph", "35 mph", "45 mph", "55 mph"],
    answer: 0
  },
  {
    question: "When you see a yellow traffic light, you should:",
    options: [
      "Speed up to get through the intersection",
      "Stop immediately",
      "Slow down and prepare to stop",
      "Honk your horn"
    ],
    answer: 2
  },
  {
    question: "You must stop your vehicle at an intersection when you see a:",
    options: ["Flashing yellow light", "Green light", "Red light or stop sign", "Yield sign"],
    answer: 2
  },
  {
    question: "When driving in fog, you should use your:",
    options: ["High beam headlights", "Low beam headlights", "Hazard lights only", "No lights"],
    answer: 1
  },
  {
    question: "A solid white line on the right edge of the highway slants in toward your left. This means that:",
    options: [
      "The road will be getting narrower",
      "You are approaching a construction zone",
      "Passing is permitted",
      "You should stay right"
    ],
    answer: 0
  },
  {
    question: "Which of the following is true about large trucks?",
    options: [
      "They stop faster than cars",
      "They have no blind spots",
      "They need more room to maneuver",
      "They are always in the right lane"
    ],
    answer: 2
  },
  {
    question: "You may not park within how many feet of a fire hydrant?",
    options: ["10 feet", "15 feet", "20 feet", "25 feet"],
    answer: 1
  },
  {
    question: "When should you use your headlights?",
    options: [
      "Only at night",
      "Only in rain",
      "From sunset to sunrise and any time visibility is reduced",
      "Only when other cars use them"
    ],
    answer: 2
  },
  {
    question: "A flashing red traffic light means:",
    options: [
      "Slow down",
      "Stop, then proceed when safe",
      "The light is broken",
      "Yield to oncoming traffic"
    ],
    answer: 1
  },
  {
    question: "What should you do when an emergency vehicle approaches with its siren on?",
    options: [
      "Speed up to get out of the way",
      "Stop in the middle of the road",
      "Pull over to the right and stop",
      "Continue driving at normal speed"
    ],
    answer: 2
  }
];

let currentQuestion = 0;
let userAnswers = [];

function loadQuestions() {
  currentQuestion = 0;
  userAnswers = [];
  renderQuestion();
}

function renderQuestion() {
  const quizContainer = document.getElementById('quiz-container');
  const submitBtn = document.getElementById('submit-btn');
  const scoreSummary = document.getElementById('score-summary');

  if (!quizContainer) return;

  if (currentQuestion >= questions.length) {
    quizContainer.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';
    calculateScore();
    return;
  }

  const q = questions[currentQuestion];
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');

  if (questionText) {
    questionText.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  }

  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    q.options.forEach(function(option, index) {
      const label = document.createElement('label');
      label.style.display = 'block';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'option';
      radio.value = index;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + option));
      optionsContainer.appendChild(label);
    });
  }

  if (scoreSummary) scoreSummary.style.display = 'none';
  if (submitBtn) submitBtn.style.display = 'inline-block';
}

function calculateScore() {
  let score = 0;
  userAnswers.forEach(function(answer, index) {
    if (answer === questions[index].answer) {
      score++;
    }
  });

  const scoreText = document.getElementById('score-text');
  const scoreSummary = document.getElementById('score-summary');

  if (scoreText) {
    scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
  }
  if (scoreSummary) {
    scoreSummary.style.display = 'block';
  }
}

function submitAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert('Please select an answer.');
    return;
  }
  userAnswers.push(parseInt(selected.value, 10));
  currentQuestion++;
  renderQuestion();
}

document.addEventListener('DOMContentLoaded', function() {
  loadQuestions();

  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitAnswer);
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions, loadQuestions, renderQuestion, calculateScore, submitAnswer };
}