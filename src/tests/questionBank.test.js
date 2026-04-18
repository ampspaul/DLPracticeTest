/**
 * Data-integrity tests for the question bank.
 *
 * Validates:
 *  1. Every question conforms to the required schema.
 *  2. Exactly 50 new questions exist (IDs 11–60).
 *  3. Every question has exactly one correct answer that matches one of its options.
 *  4. No duplicate question stems exist across the entire bank.
 *  5. All options arrays have the same length as the first question's options (4).
 */

import questions from "../data/questions";

const EXPECTED_NEW_COUNT = 50;
const EXPECTED_OPTION_COUNT = 4;

describe("Question Bank – schema validation", () => {
  test("question bank is a non-empty array", () => {
    expect(Array.isArray(questions)).toBe(true);
    expect(questions.length).toBeGreaterThan(0);
  });

  test("contains at least 50 new questions (ids 11–60)", () => {
    const newQuestions = questions.filter((q) => q.id >= 11 && q.id <= 60);
    expect(newQuestions.length).toBe(EXPECTED_NEW_COUNT);
  });

  test("every question has a non-empty id", () => {
    questions.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(typeof q.id).toBe("number");
    });
  });

  test("every question has a non-empty question stem", () => {
    questions.forEach((q) => {
      expect(typeof q.question).toBe("string");
      expect(q.question.trim().length).toBeGreaterThan(0);
    });
  });

  test(`every question has exactly ${EXPECTED_OPTION_COUNT} answer options`, () => {
    questions.forEach((q) => {
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBe(EXPECTED_OPTION_COUNT);
    });
  });

  test("every question option is a non-empty string", () => {
    questions.forEach((q) => {
      q.options.forEach((opt) => {
        expect(typeof opt).toBe("string");
        expect(opt.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test("every question has a correctAnswer that is included in its options", () => {
    questions.forEach((q) => {
      expect(typeof q.correctAnswer).toBe("string");
      expect(q.correctAnswer.trim().length).toBeGreaterThan(0);
      expect(q.options).toContain(q.correctAnswer);
    });
  });

  test("no duplicate question stems exist", () => {
    const stems = questions.map((q) => q.question.trim().toLowerCase());
    const unique = new Set(stems);
    expect(unique.size).toBe(stems.length);
  });

  test("no duplicate question IDs exist", () => {
    const ids = questions.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  test("IDs are sequential starting from 1", () => {
    const ids = questions.map((q) => q.id).sort((a, b) => a - b);
    ids.forEach((id, index) => {
      expect(id).toBe(index + 1);
    });
  });
});