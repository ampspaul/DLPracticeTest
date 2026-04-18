import { QUESTIONS, TOTAL_QUESTIONS, Question } from '../data/questionsData';

describe('Questions Data', () => {
  describe('Question Structure', () => {
    it('should have exactly 50 new questions in total', () => {
      expect(TOTAL_QUESTIONS).toBe(50);
      expect(QUESTIONS.length).toBe(50);
    });

    it('should have each question properly structured', () => {
      QUESTIONS.forEach((question: Question) => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('options');
        expect(question).toHaveProperty('correctAnswer');
        expect(question).toHaveProperty('category');
      });
    });

    it('should have valid question IDs', () => {
      const ids = new Set();
      QUESTIONS.forEach((question: Question) => {
        expect(question.id).toBeDefined();
        expect(typeof question.id).toBe('string');
        expect(question.id).toMatch(/^q\d+$/);
        expect(ids.has(question.id)).toBe(false); // No duplicates
        ids.add(question.id);
      });
    });

    it('should have non-empty question text for each question', () => {
      QUESTIONS.forEach((question: Question) => {
        expect(question.text).toBeDefined();
        expect(question.text.length).toBeGreaterThan(0);
        expect(typeof question.text).toBe('string');
      });
    });

    it('should have at least 4 answer options per question', () => {
      QUESTIONS.forEach((question: Question) => {
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options.length).toBeGreaterThanOrEqual(4);
      });
    });

    it('should have non-empty answer options', () => {
      QUESTIONS.forEach((question: Question) => {
        question.options.forEach((option: string) => {
          expect(option).toBeDefined();
          expect(option.length).toBeGreaterThan(0);
          expect(typeof option).toBe('string');
        });
      });
    });

    it('should have valid correct answer indices', () => {
      QUESTIONS.forEach((question: Question) => {
        expect(typeof question.correctAnswer).toBe('number');
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(question.correctAnswer).toBeLessThan(question.options.length);
      });
    });

    it('should have valid categories', () => {
      const validCategories = new Set();
      QUESTIONS.forEach((question: Question) => {
        expect(question.category).toBeDefined();
        expect(question.category.length).toBeGreaterThan(0);
        expect(typeof question.category).toBe('string');
        validCategories.add(question.category);
      });
      expect(validCategories.size).toBeGreaterThan(0);
    });
  });

  describe('Question Content Validation', () => {
    it('should have diverse categories', () => {
      const categories = new Set(QUESTIONS.map(q => q.category));
      expect(categories.size).toBeGreaterThan(5);
    });

    it('should not have duplicate questions', () => {
      const questionTexts = new Set();
      QUESTIONS.forEach((question: Question) => {
        expect(questionTexts.has(question.text)).toBe(false);
        questionTexts.add(question.text);
      });
    });

    it('should not have duplicate answer options within a question', () => {
      QUESTIONS.forEach((question: Question) => {
        const optionSet = new Set(question.options);
        expect(optionSet.size).toBe(question.options.length);
      });
    });
  });

  describe('Total Question Count', () => {
    it('TOTAL_QUESTIONS constant should match array length', () => {
      expect(TOTAL_QUESTIONS).toBe(QUESTIONS.length);
    });

    it('should have expected total of 50 questions', () => {
      expect(TOTAL_QUESTIONS).toBe(50);
    });
  });
});