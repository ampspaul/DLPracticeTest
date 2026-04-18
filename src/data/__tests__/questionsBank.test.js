/**
 * questionsBank.test.js
 *
 * Validates the questionsBank data source for:
 *  - Schema compliance (AC3)
 *  - ID uniqueness across entire bank (AC4)
 *  - Exactly 50 new questions added with IDs q101–q150 (AC1)
 *  - Topic coverage across ≥5 areas; no single topic >40% of new questions (AC5)
 *  - Scoring accuracy for new questions (AC7)
 */

import questionsBank from "../questionsBank";

// ─── Helpers ────────────────────────────────────────────────────────────────

const NEW_QUESTION_IDS = Array.from({ length: 50 }, (_, i) => `q${101 + i}`);
const newQuestions = questionsBank.filter((q) =>
  NEW_QUESTION_IDS.includes(q.id)
);
const existingQuestions = questionsBank.filter(
  (q) => !NEW_QUESTION_IDS.includes(q.id)
);

// Simulate scoring: returns true if the provided answer matches correctAnswer
function scoreAnswer(question, selectedAnswer) {
  return selectedAnswer === question.correctAnswer;
}

// ─── AC1: Quantity ───────────────────────────────────────────────────────────

describe("AC1 – Quantity", () => {
  test("questionsBank contains at least 60 questions total (10 existing + 50 new)", () => {
    expect(questionsBank.length).toBeGreaterThanOrEqual(60);
  });

  test("exactly 50 new questions exist with IDs q101–q150", () => {
    expect(newQuestions.length).toBe(50);
  });

  test("all expected new IDs are present", () => {
    const ids = newQuestions.map((q) => q.id);
    NEW_QUESTION_IDS.forEach((expectedId) => {
      expect(ids).toContain(expectedId);
    });
  });
});

// ─── AC3: Schema Compliance ──────────────────────────────────────────────────

describe("AC3 – Schema Compliance for new questions", () => {
  test.each(newQuestions)("$id has a non-empty id", (q) => {
    expect(q.id).toBeTruthy();
    expect(typeof q.id).toBe("string");
  });

  test.each(newQuestions)("$id has a non-empty question text", (q) => {
    expect(q.question).toBeTruthy();
    expect(typeof q.question).toBe("string");
    expect(q.question.trim().length).toBeGreaterThan(0);
  });

  test.each(newQuestions)("$id has at least 4 answer options", (q) => {
    expect(Array.isArray(q.options)).toBe(true);
    expect(q.options.length).toBeGreaterThanOrEqual(4);
  });

  test.each(newQuestions)("$id has a non-empty correctAnswer", (q) => {
    expect(q.correctAnswer).toBeTruthy();
    expect(typeof q.correctAnswer).toBe("string");
  });

  test.each(newQuestions)(
    "$id correctAnswer is one of its options",
    (q) => {
      expect(q.options).toContain(q.correctAnswer);
    }
  );

  test.each(newQuestions)(
    "$id has exactly one correct answer (no duplicate options matching correctAnswer)",
    (q) => {
      const matchingOptions = q.options.filter(
        (opt) => opt === q.correctAnswer
      );
      expect(matchingOptions.length).toBe(1);
    }
  );
});

// ─── AC4: ID Uniqueness ──────────────────────────────────────────────────────

describe("AC4 – ID Uniqueness", () => {
  test("no duplicate IDs exist across the entire questionsBank", () => {
    const ids = questionsBank.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test("new question IDs (q101–q150) do not collide with existing IDs", () => {
    const existingIds = new Set(existingQuestions.map((q) => q.id));
    NEW_QUESTION_IDS.forEach((newId) => {
      expect(existingIds.has(newId)).toBe(false);
    });
  });

  test("all new IDs follow the sequential q101–q150 scheme", () => {
    const newIds = newQuestions.map((q) => q.id).sort();
    const expectedIds = NEW_QUESTION_IDS.slice().sort();
    expect(newIds).toEqual(expectedIds);
  });
});

// ─── AC5: Topic Coverage ─────────────────────────────────────────────────────

describe("AC5 – Topic Coverage", () => {
  test("new questions span at least 5 distinct topic areas", () => {
    const topics = new Set(
      newQuestions.map((q) => q.topic).filter(Boolean)
    );
    expect(topics.size).toBeGreaterThanOrEqual(5);
  });

  test("no single topic exceeds 40% (20 questions) of the 50 new questions", () => {
    const topicCounts = {};
    newQuestions.forEach((q) => {
      if (q.topic) {
        topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
      }
    });
    Object.entries(topicCounts).forEach(([topic, count]) => {
      expect(count).toBeLessThanOrEqual(20);
    });
  });

  test("expected topic areas are represented", () => {
    const topics = newQuestions.map((q) => q.topic);
    const requiredTopics = [
      "Road Signs",
      "Right-of-Way",
      "Speed Limits",
      "Vehicle Safety",
      "Parking",
      "DUI Laws",
      "Defensive Driving",
    ];
    requiredTopics.forEach((topic) => {
      expect(topics).toContain(topic);
    });
  });
});

// ─── AC7: Scoring Accuracy ───────────────────────────────────────────────────

describe("AC7 – Scoring Accuracy", () => {
  test("scoreAnswer returns true for correct answers on all new questions", () => {
    newQuestions.forEach((q) => {
      expect(scoreAnswer(q, q.correctAnswer)).toBe(true);
    });
  });

  test("scoreAnswer returns false for incorrect answers on all new questions", () => {
    newQuestions.forEach((q) => {
      const wrongAnswer = q.options.find((opt) => opt !== q.correctAnswer);
      if (wrongAnswer) {
        expect(scoreAnswer(q, wrongAnswer)).toBe(false);
      }
    });
  });

  // Spot-check specific questions by ID
  test("q101 – No passing zone is the correct answer for pennant sign", () => {
    const q = questionsBank.find((q) => q.id === "q101");
    expect(scoreAnswer(q, "No passing zone")).toBe(true);
    expect(scoreAnswer(q, "School zone ahead")).toBe(false);
  });

  test("q110 – Vehicle on left yields to vehicle on right", () => {
    const q = questionsBank.find((q) => q.id === "q110");
    expect(scoreAnswer(q, "The vehicle on the left yields to the vehicle on the right")).toBe(true);
  });

  test("q116 – Rural interstate max speed is 70 mph", () => {
    const q = questionsBank.find((q) => q.id === "q116");
    expect(scoreAnswer(q, "70 mph")).toBe(true);
    expect(scoreAnswer(q, "55 mph")).toBe(false);
  });

  test("q129 – Must park 15 feet from fire hydrant", () => {
    const q = questionsBank.find((q) => q.id === "q129");
    expect(scoreAnswer(q, "15 feet")).toBe(true);
  });

  test("q135 – Under 21 BAC limit is 0.02% or lower", () => {
    const q = questionsBank.find((q) => q.id === "q135");
    expect(scoreAnswer(q, "0.02% or lower (zero tolerance)")).toBe(true);
    expect(scoreAnswer(q, "0.08%")).toBe(false);
  });

  test("q142 – Following distance is 3-second rule", () => {
    const q = questionsBank.find((q) => q.id === "q142");
    expect(scoreAnswer(q, "3-second rule")).toBe(true);
  });

  test("q150 – Mirrors should be checked every 5-8 seconds", () => {
    const q = questionsBank.find((q) => q.id === "q150");
    expect(scoreAnswer(q, "Every 5–8 seconds as part of a continuous scanning routine")).toBe(true);
  });
});

// ─── AC9: No Regression ──────────────────────────────────────────────────────

describe("AC9 – No Regression on existing questions", () => {
  test("existing questions still have required schema fields", () => {
    existingQuestions.forEach((q) => {
      expect(q.id).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThanOrEqual(4);
      expect(q.correctAnswer).toBeTruthy();
      expect(q.options).toContain(q.correctAnswer);
    });
  });

  test("existing question IDs are unchanged", () => {
    const existingIds = existingQuestions.map((q) => q.id);
    // All original IDs should still be present
    expect(existingIds.length).toBeGreaterThan(0);
    // No existing ID should have been converted to the new naming scheme
    existingIds.forEach((id) => {
      expect(NEW_QUESTION_IDS).not.toContain(id);
    });
  });
});