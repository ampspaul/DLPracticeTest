/**
 * scoring.test.js
 *
 * Dedicated scoring unit tests (AC7).
 * Tests the pure scoring function in isolation, then applies it
 * against every new question in questionsBank for deterministic coverage.
 *
 * No time-dependent assertions. No random data.
 */

import questionsBank from '../data/questionsBank';

// ─── Pure scoring function (mirrors app logic) ────────────────────────────────

/**
 * @param {object} question  - a questionsBank entry
 * @param {string} selected  - the user's selected answer
 * @returns {boolean}
 */
function isCorrect(question, selected) {
  if (selected === null || selected === undefined) return false;
  return selected === question.correctAnswer;
}

/**
 * Calculate a score for a set of answers.
 * @param {object[]} questions  - array of question objects
 * @param {object}   answers    - map of { questionId: selectedAnswer }
 * @returns {{ score: number, total: number, percentage: number }}
 */
function calculateScore(questions, answers) {
  const total = questions.length;
  const score = questions.filter((q) => isCorrect(q, answers[q.id])).length;
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);
  return { score, total, percentage };
}

// ─── Unit tests for pure scoring function ─────────────────────────────────────

describe('isCorrect() – pure scoring unit tests', () => {
  const mockQuestion = {
    id: 'q_mock',
    question: 'Mock question?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'B',
  };

  test('returns true when selected matches correctAnswer exactly', () => {
    expect(isCorrect(mockQuestion, 'B')).toBe(true);
  });

  test('returns false for a wrong option', () => {
    expect(isCorrect(mockQuestion, 'A')).toBe(false);
    expect(isCorrect(mockQuestion, 'C')).toBe(false);
    expect(isCorrect(mockQuestion, 'D')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(isCorrect(mockQuestion, '')).toBe(false);
  });

  test('returns false for undefined', () => {
    expect(isCorrect(mockQuestion, undefined)).toBe(false);
  });

  test('returns false for null', () => {
    expect(isCorrect(mockQuestion, null)).toBe(false);
  });

  test('is case-sensitive — lowercase mismatch returns false', () => {
    expect(isCorrect(mockQuestion, 'b')).toBe(false);
  });

  test('returns false for a whitespace-padded match', () => {
    expect(isCorrect(mockQuestion, ' B ')).toBe(false);
  });
});

// ─── calculateScore() unit tests ──────────────────────────────────────────────

describe('calculateScore() – aggregate scoring', () => {
  const qs = [
    { id: 'q_a', question: 'Q A?', options: ['X','Y','Z','W'], correctAnswer: 'X' },
    { id: 'q_b', question: 'Q B?', options: ['X','Y','Z','W'], correctAnswer: 'Y' },
    { id: 'q_c', question: 'Q C?', options: ['X','Y','Z','W'], correctAnswer: 'Z' },
    { id: 'q_d', question: 'Q D?', options: ['X','Y','Z','W'], correctAnswer: 'W' },
  ];

  test('all correct → score 4/4, 100%', () => {
    const answers = { q_a: 'X', q_b: 'Y', q_c: 'Z', q_d: 'W' };
    expect(calculateScore(qs, answers)).toEqual({ score: 4, total: 4, percentage: 100 });
  });

  test('all wrong → score 0/4, 0%', () => {
    const answers = { q_a: 'Y', q_b: 'X', q_c: 'W', q_d: 'Z' };
    expect(calculateScore(qs, answers)).toEqual({ score: 0, total: 4, percentage: 0 });
  });

  test('half correct → score 2/4, 50%', () => {
    const answers = { q_a: 'X', q_b: 'X', q_c: 'Z', q_d: 'Z' };
    expect(calculateScore(qs, answers)).toEqual({ score: 2, total: 4, percentage: 50 });
  });

  test('empty answers object → score 0/4, 0%', () => {
    expect(calculateScore(qs, {})).toEqual({ score: 0, total: 4, percentage: 0 });
  });

  test('empty question array → score 0/0, 0%', () => {
    expect(calculateScore([], {})).toEqual({ score: 0, total: 0, percentage: 0 });
  });

  test('percentage rounds to nearest integer (2/3 → 67%)', () => {
    const threeQs = qs.slice(0, 3);
    const answers = { q_a: 'X', q_b: 'Y', q_c: 'X' }; // 2/3 correct
    const result = calculateScore(threeQs, answers);
    expect(result.score).toBe(2);
    expect(result.total).toBe(3);
    expect(Number.isInteger(result.percentage)).toBe(true);
    expect(result.percentage).toBe(67);
  });
});

// ─── AC7 – Scoring accuracy against ALL new questions ─────────────────────────

describe('AC7 – Scoring all 50 new questions with correct answers → 100% score', () => {
  const newQuestions = questionsBank.filter(
    (q) => q.id && parseInt(q.id.replace('q', ''), 10) >= 101
  );

  test('there are exactly 50 new questions to score', () => {
    expect(newQuestions).toHaveLength(50);
  });

  test('answering all new questions correctly yields score = 50 / 100%', () => {
    const perfectAnswers = newQuestions.reduce((acc, q) => {
      acc[q.id] = q.correctAnswer;
      return acc;
    }, {});
    const { score, total, percentage } = calculateScore(newQuestions, perfectAnswers);
    expect(score).toBe(50);
    expect(total).toBe(50);
    expect(percentage).toBe(100);
  });

  test('correctAnswer is not always the first option (no positional bias)', () => {
    const correctlyAnsweredByFirstOption = newQuestions.filter(
      (q) => q.options[0] === q.correctAnswer
    ).length;
    // Must be < 50 to confirm answers are not trivially always option[0]
    expect(correctlyAnsweredByFirstOption).toBeLessThan(50);
  });

  test('each new question: correct answer scores true, all distractors score false', () => {
    newQuestions.forEach((q) => {
      expect(isCorrect(q, q.correctAnswer)).toBe(true);
      q.options
        .filter((o) => o !== q.correctAnswer)
        .forEach((distractor) => {
          expect(isCorrect(q, distractor)).toBe(false);
        });
    });
  });

  // Hard-coded deterministic spot-checks
  test('spot-check q101: "No passing zone" is correct', () => {
    const q = questionsBank.find((q) => q.id === 'q101');
    expect(q).toBeDefined();
    expect(isCorrect(q, 'No passing zone')).toBe(true);
    expect(isCorrect(q, 'School zone ahead')).toBe(false);
    expect(isCorrect(q, 'Yield ahead')).toBe(false);
    expect(isCorrect(q, 'Railroad crossing ahead')).toBe(false);
  });

  test('spot-check q102: "Warning of a hazard or road condition ahead" is correct', () => {
    const q = questionsBank.find((q) => q.id === 'q102');
    expect(q).toBeDefined();
    expect(isCorrect(q, 'Warning of a hazard or road condition ahead')).toBe(true);
    expect(isCorrect(q, 'Regulatory information')).toBe(false);
    expect(isCorrect(q, 'A designated historical site')).toBe(false);
    expect(isCorrect(q, 'Directions to a hospital')).toBe(false);
  });

  // Dynamic spot-checks: sampled IDs must exist and score correctly
  const sampledIds = ['q103','q110','q115','q120','q125','q130','q135','q140','q145','q150'];
  test.each(sampledIds)(
    'dynamic spot-check %s: selecting correctAnswer returns true',
    (id) => {
      const q = questionsBank.find((q) => q.id === id);
      if (!q) {
        throw new Error(`Question with id "${id}" not found in questionsBank`);
      }
      expect(isCorrect(q, q.correctAnswer)).toBe(true);
    }
  );
});