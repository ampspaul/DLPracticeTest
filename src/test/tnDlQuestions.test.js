import tnDlQuestions from "../data/tnDlQuestions";

describe("tnDlQuestions data", () => {
  test("contains at least 10 questions", () => {
    expect(tnDlQuestions.length).toBeGreaterThanOrEqual(10);
  });

  test("every question has required fields", () => {
    tnDlQuestions.forEach((q, i) => {
      expect(q, `question ${i} missing id`).toHaveProperty("id");
      expect(q, `question ${i} missing question`).toHaveProperty("question");
      expect(q, `question ${i} missing options`).toHaveProperty("options");
      expect(q, `question ${i} missing answer`).toHaveProperty("answer");
      expect(q, `question ${i} missing explanation`).toHaveProperty("explanation");
    });
  });

  test("every answer index is within the options array bounds", () => {
    tnDlQuestions.forEach((q) => {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
    });
  });

  test("every question has at least 2 options", () => {
    tnDlQuestions.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
    });
  });

  test("no question, option, or explanation references Kentucky or KY", () => {
    tnDlQuestions.forEach((q) => {
      expect(q.question).not.toMatch(/Kentucky|KY-DL|\bKY\b/i);
      expect(q.explanation).not.toMatch(/Kentucky|KY-DL|\bKY\b/i);
      q.options.forEach((opt) => {
        expect(opt).not.toMatch(/Kentucky|KY-DL|\bKY\b/i);
      });
    });
  });

  test("all question IDs are unique", () => {
    const ids = tnDlQuestions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test("questions contain Tennessee-specific content", () => {
    const allText = tnDlQuestions
      .map((q) => `${q.question} ${q.explanation}`)
      .join(" ");
    expect(allText).toMatch(/Tennessee/i);
  });
});