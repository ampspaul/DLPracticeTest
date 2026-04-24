'use strict';

/**
 * DL Practice Test - Application Logic
 */

const CORRECT_ANSWERS = {
  q1: 'c',
  q2: 'b',
};

/**
 * Calculates the score from form data.
 * @param {FormData} formData
 * @returns {{ score: number, total: number }}
 */
function calculateScore(formData) {
  let score = 0;
  const total = Object.keys(CORRECT_ANSWERS).length;

  for (const [question, correctAnswer] of Object.entries(CORRECT_ANSWERS)) {
    if (formData.get(question) === correctAnswer) {
      score += 1;
    }
  }

  return { score, total };
}

/**
 * Displays the result section with the calculated score.
 * @param {number} score
 * @param {number} total
 */
function displayResults(score, total) {
  const resultsSection = document.getElementById('results');
  const scoreDisplay = document.getElementById('score-display');

  if (!resultsSection || !scoreDisplay) {
    console.error('Results elements not found in the DOM.');
    return;
  }

  scoreDisplay.textContent = `You scored ${score} out of ${total}.`;
  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Handles quiz form submission.
 * @param {Event} event
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const { score, total } = calculateScore(formData);

  displayResults(score, total);
}

/**
 * Initialises the application.
 */
function init() {
  const form = document.getElementById('quiz-form');

  if (!form) {
    console.error('Quiz form not found.');
    return;
  }

  form.addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', init);