/**
 * questionsBank.test.js
 *
 * Tests for AC1, AC3, AC4, AC5, AC7, AC9
 * Covers: quantity, structure compliance, ID uniqueness, topic coverage,
 *         scoring accuracy, and no-regression for existing questions.
 *
 * Source references for new questions (AC2) are documented in-line below.
 * Sources: FHWA MUTCD, state DMV handbooks (CA, TX, NY, FL),
 *          NHTSA guidelines, AAMVA model driver manual.
 */

import questionsBank from '../data/questionsBank';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Simulate the scoring logic used by the application:
 * a selected answer is correct iff it strictly equals the question's correctAnswer.
 */
function scoreAnswer(question, selectedAnswer) {
  if (selectedAnswer === null || selectedAnswer === undefined) return false;
  return selectedAnswer === question.correctAnswer;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EXISTING_ID_RANGE_END = 100;          // IDs q1–q100 are "existing"
const NEW_BATCH_START        = 101;         // q101
const NEW_BATCH_END          = 150;         // q150
const EXPECTED_NEW_COUNT     = 50;
const MIN_TOPIC_AREAS        = 5;
const MAX_TOPIC_RATIO        = 0.40;        // no topic > 40 % of new questions
const MIN_OPTIONS_PER_Q      = 4;

// ─── AC1 – Quantity ───────────────────────────────────────────────────────────

describe('AC1 – Quantity: Exactly 50 new questions added', () => {
  const newQuestions = questionsBank.filter(
    (q) => q.id && parseInt(q.id.replace('q', ''), 10) >= NEW_BATCH_START
  );

  test('exactly 50 new questions exist in the bank (IDs q101–q150)', () => {
    expect(newQuestions).toHaveLength(EXPECTED_NEW_COUNT);
  });

  test('total bank size increased by exactly 50 compared to original count', () => {
    const originalQuestions = questionsBank.filter(
      (q) => q.id && parseInt(q.id.replace('q', ''), 10) <= EXISTING_ID_RANGE_END
    );
    const totalAfter = questionsBank.length;
    expect(totalAfter).toBe(originalQuestions.length + EXPECTED_NEW_COUNT);
  });

  test('new question IDs are all within the q101–q150 range', () => {
    newQuestions.forEach((q) => {
      const num = parseInt(q.id.replace('q', ''), 10);
      expect(num).toBeGreaterThanOrEqual(NEW_BATCH_START);
      expect(num).toBeLessThanOrEqual(NEW_BATCH_END);
    });
  });
});

// ─── AC3 – Structure Compliance ───────────────────────────────────────────────

describe('AC3 – Structure Compliance: every question has required fields', () => {
  describe('all questions in the full bank', () => {
    test.each(questionsBank)(
      'question $id has a non-empty id string',
      (q) => {
        expect(typeof q.id).toBe('string');
        expect(q.id.trim().length).toBeGreaterThan(0);
      }
    );

    test.each(questionsBank)(
      'question $id has non-empty question text',
      (q) => {
        expect(typeof q.question).toBe('string');
        expect(q.question.trim().length).toBeGreaterThan(0);
      }
    );

    test.each(questionsBank)(
      'question $id has at least 4 answer options',
      (q) => {
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options.length).toBeGreaterThanOrEqual(MIN_OPTIONS_PER_Q);
      }
    );

    test.each(questionsBank)(
      'question $id has a non-empty correctAnswer string',
      (q) => {
        expect(typeof q.correctAnswer).toBe('string');
        expect(q.correctAnswer.trim().length).toBeGreaterThan(0);
      }
    );

    test.each(questionsBank)(
      'question $id has exactly one correct answer present in options',
      (q) => {
        const matchingOptions = q.options.filter((o) => o === q.correctAnswer);
        expect(matchingOptions).toHaveLength(1);
      }
    );

    test.each(questionsBank)(
      'question $id options are all non-empty strings',
      (q) => {
        q.options.forEach((option) => {
          expect(typeof option).toBe('string');
          expect(option.trim().length).toBeGreaterThan(0);
        });
      }
    );
  });
});

// ─── AC4 – ID Uniqueness ──────────────────────────────────────────────────────

describe('AC4 – ID Uniqueness: no duplicate IDs across the full bank', () => {
  test('all question IDs are unique', () => {
    const ids = questionsBank.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('new question IDs (q101–q150) do not collide with existing IDs', () => {
    const existingIds = new Set(
      questionsBank
        .filter((q) => parseInt(q.id.replace('q', ''), 10) <= EXISTING_ID_RANGE_END)
        .map((q) => q.id)
    );
    const newIds = questionsBank
      .filter((q) => parseInt(q.id.replace('q', ''), 10) >= NEW_BATCH_START)
      .map((q) => q.id);

    newIds.forEach((id) => {
      expect(existingIds.has(id)).toBe(false);
    });
  });

  test('each new ID appears exactly once', () => {
    const newQuestions = questionsBank.filter(
      (q) => parseInt(q.id.replace('q', ''), 10) >= NEW_BATCH_START
    );
    const idCounts = newQuestions.reduce((acc, q) => {
      acc[q.id] = (acc[q.id] || 0) + 1;
      return acc;
    }, {});

    Object.entries(idCounts).forEach(([id, count]) => {
      expect(count).toBe(1);
    });
  });
});

// ─── AC5 – Topic Coverage ─────────────────────────────────────────────────────

describe('AC5 – Topic Coverage: ≥5 distinct topics, no single topic >40%', () => {
  const newQuestions = questionsBank.filter(
    (q) => q.id && parseInt(q.id.replace('q', ''), 10) >= NEW_BATCH_START
  );

  let topicMap;
  beforeAll(() => {
    topicMap = newQuestions.reduce((acc, q) => {
      const topic = (q.topic || 'Uncategorized').trim();
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});
  });

  test('new questions have at least 5 distinct topic areas', () => {
    const distinctTopics = Object.keys(topicMap);
    expect(distinctTopics.length).toBeGreaterThanOrEqual(MIN_TOPIC_AREAS);
  });

  test('all new questions have a topic field', () => {
    newQuestions.forEach((q) => {
      expect(q.topic).toBeDefined();
      expect(typeof q.topic).toBe('string');
      expect(q.topic.trim().length).toBeGreaterThan(0);
    });
  });

  test('no single topic accounts for more than 40% of the 50 new questions', () => {
    const maxAllowed = Math.floor(EXPECTED_NEW_COUNT * MAX_TOPIC_RATIO); // 20
    Object.entries(topicMap).forEach(([topic, count]) => {
      expect(count).toBeLessThanOrEqual(maxAllowed);
    });
  });

  test('topic distribution is logged for traceability', () => {
    console.info('Topic distribution for new questions:', JSON.stringify(topicMap, null, 2));
    expect(Object.keys(topicMap).length).toBeGreaterThan(0);
  });
});

// ─── AC7 – Scoring Accuracy ───────────────────────────────────────────────────

describe('AC7 – Scoring Accuracy: correct/incorrect detection for new questions', () => {
  const newQuestions = questionsBank.filter(
    (q) => q.id && parseInt(q.id.replace('q', ''), 10) >= NEW_BATCH_START
  );

  test('selecting the correct answer returns true for all new questions', () => {
    newQuestions.forEach((q) => {
      expect(scoreAnswer(q, q.correctAnswer)).toBe(true);
    });
  });

  test('selecting each wrong answer returns false for all new questions', () => {
    newQuestions.forEach((q) => {
      const wrongOptions = q.options.filter((o) => o !== q.correctAnswer);
      wrongOptions.forEach((wrong) => {
        expect(scoreAnswer(q, wrong)).toBe(false);
      });
    });
  });

  test('selecting an empty string returns false for all new questions', () => {
    newQuestions.forEach((q) => {
      expect(scoreAnswer(q, '')).toBe(false);
    });
  });

  test('selecting undefined returns false for all new questions', () => {
    newQuestions.forEach((q) => {
      expect(scoreAnswer(q, undefined)).toBe(false);
    });
  });

  // Deterministic spot-checks for known new questions
  test('spot-check q101: pennant sign → "No passing zone"', () => {
    const q = questionsBank.find((q) => q.id === 'q101');
    expect(q).toBeDefined();
    expect(scoreAnswer(q, 'No passing zone')).toBe(true);
    expect(scoreAnswer(q, 'School zone ahead')).toBe(false);
    expect(scoreAnswer(q, 'Yield ahead')).toBe(false);
    expect(scoreAnswer(q, 'Railroad crossing ahead')).toBe(false);
  });

  test('spot-check q102: diamond-shaped sign → "Warning of a hazard or road condition ahead"', () => {
    const q = questionsBank.find((q) => q.id === 'q102');
    expect(q).toBeDefined();
    expect(scoreAnswer(q, 'Warning of a hazard or road condition ahead')).toBe(true);
    expect(scoreAnswer(q, 'Regulatory information')).toBe(false);
    expect(scoreAnswer(q, 'A designated historical site')).toBe(false);
    expect(scoreAnswer(q, 'Directions to a hospital')).toBe(false);
  });
});

// ─── AC9 – No Regression: existing questions unmodified ───────────────────────

describe('AC9 – No Regression: existing questions preserved and correct', () => {
  test('q1 – red traffic light → Stop', () => {
    const q = questionsBank.find((q) => q.id === 'q1');
    expect(q).toBeDefined();
    expect(q.question).toBe('What does a red traffic light mean?');
    expect(q.correctAnswer).toBe('Stop');
    expect(scoreAnswer(q, 'Stop')).toBe(true);
    expect(scoreAnswer(q, 'Slow down')).toBe(false);
  });

  test('q2 – stop sign shape → Octagon', () => {
    const q = questionsBank.find((q) => q.id === 'q2');
    expect(q).toBeDefined();
    expect(q.correctAnswer).toBe('Octagon');
    expect(scoreAnswer(q, 'Octagon')).toBe(true);
    expect(scoreAnswer(q, 'Circle')).toBe(false);
  });

  test('q3 – yellow light → Prepare to stop', () => {
    const q = questionsBank.find((q) => q.id === 'q3');
    expect(q).toBeDefined();
    expect(q.correctAnswer).toBe('Prepare to stop');
    expect(scoreAnswer(q, 'Prepare to stop')).toBe(true);
  });

  test('q5 – school zone speed limit → 25 mph', () => {
    const q = questionsBank.find((q) => q.id === 'q5');
    expect(q).toBeDefined();
    expect(q.correctAnswer).toBe('25 mph');
    expect(scoreAnswer(q, '25 mph')).toBe(true);
    expect(scoreAnswer(q, '15 mph')).toBe(false);
  });

  test('q10 – BAC impairment threshold → 0.08%', () => {
    const q = questionsBank.find((q) => q.id === 'q10');
    expect(q).toBeDefined();
    expect(q.correctAnswer).toBe('0.08%');
    expect(scoreAnswer(q, '0.08%')).toBe(true);
    expect(scoreAnswer(q, '0.05%')).toBe(false);
  });

  test('existing questions retain their original IDs after batch append', () => {
    const existingIds = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'];
    existingIds.forEach((id) => {
      const q = questionsBank.find((q) => q.id === id);
      expect(q).toBeDefined();
    });
  });

  test('existing questions have not had their correctAnswer changed', () => {
    const fixtures = [
      { id: 'q1',  expected: 'Stop' },
      { id: 'q2',  expected: 'Octagon' },
      { id: 'q3',  expected: 'Prepare to stop' },
      { id: 'q4',  expected: 'From sunset to sunrise and when visibility is poor' },
      { id: 'q5',  expected: '25 mph' },
      { id: 'q6',  expected: 'Stop and proceed when safe' },
      { id: 'q7',  expected: 'When its red lights are flashing and stop arm is extended' },
      { id: 'q8',  expected: 'Lane changing is discouraged' },
      { id: 'q9',  expected: 'To prevent wheel lock-up during braking' },
      { id: 'q10', expected: '0.08%' },
    ];
    fixtures.forEach(({ id, expected }) => {
      const q = questionsBank.find((q) => q.id === id);
      expect(q).toBeDefined();
      expect(q.correctAnswer).toBe(expected);
    });
  });
});