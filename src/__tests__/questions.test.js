/**
 * Tests for the question bank dataset.
 * Validates schema compliance, uniqueness, count, and correctAnswer validity.
 */

import questions from '../data/questions';

describe('Question Bank Dataset', () => {
  test('contains exactly 100 questions', () => {
    expect(questions).toHaveLength(100);
  });

  test('all question IDs are unique', () => {
    const ids = questions.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(questions.length);
  });

  test('question IDs follow the expected pattern', () => {
    questions.forEach(q => {
      expect(q.id).toMatch(/^q\d+$/);
    });
  });

  test('every question has non-empty text', () => {
    questions.forEach(q => {
      expect(typeof q.text).toBe('string');
      expect(q.text.trim().length).toBeGreaterThan(0);
    });
  });

  test('every question has between 3 and 4 answer options', () => {
    questions.forEach(q => {
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.options.length).toBeLessThanOrEqual(4);
    });
  });

  test('every option is a non-empty string', () => {
    questions.forEach(q => {
      q.options.forEach(option => {
        expect(typeof option).toBe('string');
        expect(option.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test('every question has a correctAnswer that is one of its options', () => {
    questions.forEach(q => {
      expect(typeof q.correctAnswer).toBe('string');
      expect(q.correctAnswer.trim().length).toBeGreaterThan(0);
      expect(q.options).toContain(q.correctAnswer);
    });
  });

  test('each question has exactly one correct answer (correctAnswer appears once in options)', () => {
    questions.forEach(q => {
      const correctCount = q.options.filter(opt => opt === q.correctAnswer).length;
      expect(correctCount).toBe(1);
    });
  });

  test('original 50 questions (q1–q50) are present and unmodified', () => {
    const originalIds = Array.from({ length: 50 }, (_, i) => `q${i + 1}`);
    originalIds.forEach(id => {
      const found = questions.find(q => q.id === id);
      expect(found).toBeDefined();
    });
  });

  test('new 50 questions (q51–q100) are present', () => {
    const newIds = Array.from({ length: 50 }, (_, i) => `q${i + 51}`);
    newIds.forEach(id => {
      const found = questions.find(q => q.id === id);
      expect(found).toBeDefined();
    });
  });
});

describe('storageService', () => {
  const { getAllQuestions, saveProgress, loadProgress, clearProgress } = require('../services/storageService');

  beforeEach(() => {
    sessionStorage.clear();
  });

  test('getAllQuestions returns all 100 questions', () => {
    const result = getAllQuestions();
    expect(result).toHaveLength(100);
  });

  test('getAllQuestions returns a copy, not the original array', () => {
    const result1 = getAllQuestions();
    const result2 = getAllQuestions();
    expect(result1).not.toBe(result2);
    expect(result1).toEqual(result2);
  });

  test('saveProgress persists answers to sessionStorage', () => {
    const answers = { q1: 'Stop and wait', q2: 'Stop if safe to do so' };
    saveProgress(answers);
    const raw = sessionStorage.getItem('dltest_progress');
    expect(JSON.parse(raw)).toEqual(answers);
  });

  test('loadProgress retrieves previously saved answers', () => {
    const answers = { q1: 'Stop and wait', q51: 'Treat it as a four-way stop' };
    saveProgress(answers);
    const loaded = loadProgress();
    expect(loaded).toEqual(answers);
  });

  test('loadProgress returns null when nothing is saved', () => {
    expect(loadProgress()).toBeNull();
  });

  test('clearProgress removes saved answers', () => {
    saveProgress({ q1: 'Stop and wait' });
    clearProgress();
    expect(loadProgress()).toBeNull();
  });
});