'use strict';

const HEADING_TEXT = 'Tennessee Student Driver\'s License Practice Test';
const SECTION_HEADING = 'TN Student Practice Questions';

/**
 * Initialises the practice test application.
 */
function init() {
    setHeading();
    loadQuestions();
}

/**
 * Sets the main page heading.
 */
function setHeading() {
    const mainHeading = document.getElementById('main-heading');
    if (mainHeading) {
        mainHeading.textContent = HEADING_TEXT;
    }
}

/**
 * Loads practice questions into the DOM.
 */
function loadQuestions() {
    const questionArea = document.getElementById('question-area');
    if (!questionArea) {
        return;
    }
    // Questions are loaded from questions.js
    if (typeof questions !== 'undefined' && Array.isArray(questions)) {
        renderQuestions(questions, questionArea);
    }
}

/**
 * Renders questions into the provided container element.
 * @param {Array} questionList - Array of question objects.
 * @param {HTMLElement} container - DOM element to render into.
 */
function renderQuestions(questionList, container) {
    container.innerHTML = '';
    questionList.forEach(function (q, index) {
        const questionEl = document.createElement('div');
        questionEl.classList.add('question');
        questionEl.setAttribute('data-index', index);
        questionEl.textContent = (index + 1) + '. ' + q.text;
        container.appendChild(questionEl);
    });
}

document.addEventListener('DOMContentLoaded', init);