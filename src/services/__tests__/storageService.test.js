import {
  saveTestAttempt,
  loadTestAttempts,
  loadTestAttempt,
  getTestStatistics,
  clearTestAttempts,
} from '../storageService';

describe('storageService', () => {
  const testId = 'test-id';
  const userAnswers = { 0: 'Option A', 1: 'Option B' };
  const results = { testId, score: 2, total: 2, percentage: 100 };
  const questions = [
    { text: 'Q1', correctAnswer: 'Option A' },
    { text: 'Q2', correctAnswer: 'Option B' },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  test('saveTestAttempt should save a test attempt to localStorage', () => {
    const attemptId = saveTestAttempt(testId, userAnswers, results, questions);
    expect(attemptId).toBeTruthy();

    const attempts = loadTestAttempts(testId);
    expect(attempts).toHaveLength(1);
    expect(attempts[0].userAnswers).toEqual(userAnswers);
  });

  test('loadTestAttempts should return empty array if no attempts exist', () => {
    const attempts = loadTestAttempts(testId);
    expect(attempts).toEqual([]);
  });

  test('loadTestAttempt should find a specific attempt', () => {
    const attemptId = saveTestAttempt(testId, userAnswers, results, questions);
    const attempt = loadTestAttempt(testId, attemptId);
    expect(attempt).toBeTruthy();
    expect(attempt.id).toBe(attemptId);
  });

  test('getTestStatistics should calculate statistics from attempts', () => {
    saveTestAttempt(testId, userAnswers, { ...results, percentage: 100 }, questions);
    saveTestAttempt(testId, userAnswers, { ...results, percentage: 80 }, questions);

    const stats = getTestStatistics(testId);
    expect(stats.attemptCount).toBe(2);
    expect(stats.bestScore).toBe(100);
    expect(stats.averageScore).toBe(90);
  });

  test('clearTestAttempts should remove all attempts for a test', () => {
    saveTestAttempt(testId, userAnswers, results, questions);
    clearTestAttempts(testId);

    const attempts = loadTestAttempts(testId);
    expect(attempts).toEqual([]);
  });
});