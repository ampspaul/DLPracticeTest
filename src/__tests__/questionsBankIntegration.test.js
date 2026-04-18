/**
 * questionsBankIntegration.test.js
 *
 * Integration tests covering AC6, AC8, AC9 (integration layer):
 *  - AC6: questionsBank is importable, application-level contract is intact
 *  - AC8: total question count is reflected correctly (for UI consumers)
 *  - AC9: no-regression integration checks
 *
 * These tests do NOT mount React components (no DOM dependency) but they
 * verify the data-contract that TestPortal and ResultsScreen depend on.
 */

import questionsBank from '../data/questionsBank';

const EXPECTED_NEW_COUNT = 50;
const NEW_BATCH_START     = 101;

// ─── AC6 – Backward Compatibility ─────────────────────────────────────────────

describe('AC6 – Backward Compatibility: module contract', () => {
  test('questionsBank is importable as a default export', () => {
    expect(questionsBank).toBeDefined();
  });

  test('questionsBank exports an Array', () => {
    expect(Array.isArray(questionsBank)).toBe(true);
  });

  test('questionsBank is non-empty', () => {
    expect(questionsBank.length).toBeGreaterThan(0);
  });

  test('every entry exposes at minimum: id, question, options, correctAnswer', () => {
    questionsBank.forEach((q) => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q).toHaveProperty('correctAnswer');
    });
  });

  test('schema shape is consistent — new entries carry topic field', () => {
    const newQuestions = questionsBank.filter(
      (q) => parseInt(q.id.replace('q', ''), 10) >= NEW_BATCH_START
    );
    newQuestions.forEach((q) => {
      expect(q).toHaveProperty('topic');
    });
  });
});

// ─── AC8 – UI Integrity: count contract ───────────────────────────────────────

describe('AC8 – UI Integrity: total count is correct for progress/results display', () => {
  test('questionsBank.length equals originalCount + 50', () => {
    const newCount = questionsBank.filter(
      (q) => parseInt(q.id.replace('q', ''), 10) >= NEW_BATCH_START
    ).length;
    const oldCount = questionsBank.length - newCount;
    expect(newCount).toBe(EXPECTED_NEW_COUNT);
    expect(oldCount).toBeGreaterThanOrEqual(1);
    expect(questionsBank.length).toBe(oldCount + EXPECTED_NEW_COUNT);
  });

  test('questionsBank.length is a finite positive integer', () => {
    expect(Number.isInteger(questionsBank.length)).toBe(true);
    expect(questionsBank.length).toBeGreaterThan(0);
    expect(Number.isFinite(questionsBank.length)).toBe(true);
  });

  test('total question count is deterministic across multiple reads', () => {
    const count1 = questionsBank.length;
    const count2 = questionsBank.length;
    expect(count1).toBe(count2);
  });

  test('no question has undefined or null id', () => {
    questionsBank.forEach((q) => {
      expect(q.id).not.toBeUndefined();
      expect(q.id).not.toBeNull();
    });
  });
});

// ─── AC9 – No Regression: integration ────────────────────────────────────────

describe('AC9 – No Regression: application-level data contract unchanged', () => {
  test('the first question in the bank still has id "q1"', () => {
    expect(questionsBank[0].id).toBe('q1');
  });

  test('existing questions appear before new questions in array order', () => {
    const firstNewIndex = questionsBank.findIndex(
      (q) => parseInt(q.id.replace('q', ''), 10) >= NEW_BATCH_START
    );
    const lastOldIndex = questionsBank.reduce((lastIdx, q, i) => {
      return parseInt(q.id.replace('q', ''), 10) < NEW_BATCH_START ? i : lastIdx;
    }, -1);
    expect(firstNewIndex).toBeGreaterThan(lastOldIndex);
  });

  test('the correctAnswer of every question is one of its own options (full bank)', () => {
    questionsBank.forEach((q) => {
      expect(q.options).toContain(q.correctAnswer);
    });
  });

  test('no question has duplicate options within itself', () => {
    questionsBank.forEach((q) => {
      const uniqueOptions = new Set(q.options);
      expect(uniqueOptions.size).toBe(q.options.length);
    });
  });

  test('all IDs follow the "q<number>" format', () => {
    const idPattern = /^q\d+$/;
    questionsBank.forEach((q) => {
      expect(q.id).toMatch(idPattern);
    });
  });
});