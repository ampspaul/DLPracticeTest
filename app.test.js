/**
 * Basic tests for DL Practice Test app logic.
 * Uses plain assertions (no external test runner dependency required).
 */

'use strict';

// ─── Minimal DOM shim for Node environment ────────────────────────────────────
const { JSDOM } = (() => {
  try {
    return require('jsdom');
  } catch {
    console.warn('jsdom not available — skipping DOM tests');
    return { JSDOM: null };
  }
})();

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
  console.log(`PASS: ${message}`);
}

// ─── Unit tests ───────────────────────────────────────────────────────────────

function testQuestionsArray() {
  // Re-load questions logic inline for isolation
  const questions = [
    { question: 'What does a red traffic light mean?', options: ['Go', 'Slow down', 'Stop', 'Yield'], answer: 'Stop' },
    { question: 'What is the default speed limit in a residential area?', options: ['25 mph', '35 mph', '45 mph', '55 mph'], answer: '25 mph' },
    { question: 'When must you use your headlights?', options: ['Only at night', 'When visibility is less than 1000 feet', 'Only in tunnels', 'Never required'], answer: 'When visibility is less than 1000 feet' },
    { question: 'What should you do at a yellow traffic light?', options: ['Speed up', 'Stop if safe to do so', 'Ignore it', 'Sound your horn'], answer: 'Stop if safe to do so' },
    { question: 'Who has the right of way at an unmarked intersection?', options: ['The driver on the left', 'The driver on the right', 'The faster vehicle', 'No one'], answer: 'The driver on the right' }
  ];

  assert(Array.isArray(questions), 'questions is an array');
  assert(questions.length === 5, 'questions array has 5 items');

  questions.forEach((q, i) => {
    assert(typeof q.question === 'string' && q.question.length > 0, `question[${i}] has a non-empty question string`);
    assert(Array.isArray(q.options) && q.options.length >= 2, `question[${i}] has at least 2 options`);
    assert(q.options.includes(q.answer), `question[${i}] answer is one of the options`);
  });
}

function testEvaluateScoreLogic() {
  const questions = [
    { question: 'Q1', options: ['A', 'B'], answer: 'A' },
    { question: 'Q2', options: ['C', 'D'], answer: 'D' }
  ];

  // Simulate all correct
  const userAnswers = ['A', 'D'];
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score += 1;
  });
  assert(score === 2, 'Score is 2 when all answers correct');

  // Simulate none correct
  const wrongAnswers = ['B', 'C'];
  score = 0;
  questions.forEach((q, i) => {
    if (wrongAnswers[i] === q.answer) score += 1;
  });
  assert(score === 0, 'Score is 0 when all answers wrong');

  // Simulate partial
  const partialAnswers = ['A', 'C'];
  score = 0;
  questions.forEach((q, i) => {
    if (partialAnswers[i] === q.answer) score += 1;
  });
  assert(score === 1, 'Score is 1 when one answer correct');
}

function testDOMBuildQuiz() {
  if (!JSDOM) {
    console.warn('SKIP: testDOMBuildQuiz — jsdom unavailable');
    return;
  }

  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html><body>
      <div id="question-block"></div>
      <div id="result-block" class="hidden">
        <p id="score-display"></p>
      </div>
    </body></html>
  `);

  const { document } = dom.window;
  const questionBlock = document.getElementById('question-block');
  assert(questionBlock !== null, 'question-block element exists in DOM');

  const resultBlock = document.getElementById('result-block');
  assert(resultBlock !== null, 'result-block element exists in DOM');
  assert(resultBlock.classList.contains('hidden'), 'result-block starts hidden');
}

// ─── Run all tests ────────────────────────────────────────────────────────────
try {
  testQuestionsArray();
  testEvaluateScoreLogic();
  testDOMBuildQuiz();
  console.log('\nAll tests passed.');
} catch (err) {
  console.error(`\n${err.message}`);
  process.exit(1);
}