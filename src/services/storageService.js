export function saveTestAttempt(testId, userAnswers, results, questions) {
  try {
    const attempts = loadTestAttempts(testId);
    const newAttempt = {
      id: `attempt-${Date.now()}`,
      testId,
      userAnswers,
      results,
      questionIds: questions.map((q) => q.text),
      timestamp: new Date().toISOString(),
    };

    attempts.push(newAttempt);
    localStorage.setItem(`test-attempts-${testId}`, JSON.stringify(attempts));
    return newAttempt.id;
  } catch (error) {
    console.error('Failed to save test attempt:', error);
    return null;
  }
}

export function loadTestAttempts(testId) {
  try {
    const stored = localStorage.getItem(`test-attempts-${testId}`);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load test attempts:', error);
    return [];
  }
}

export function loadTestAttempt(testId, attemptId) {
  try {
    const attempts = loadTestAttempts(testId);
    return attempts.find((a) => a.id === attemptId) || null;
  } catch (error) {
    console.error('Failed to load test attempt:', error);
    return null;
  }
}

export function getTestStatistics(testId) {
  try {
    const attempts = loadTestAttempts(testId);
    if (attempts.length === 0) return null;

    const scores = attempts.map((a) => a.results.percentage);
    const avgScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
    );
    const bestScore = Math.max(...scores);
    const attemptCount = attempts.length;

    return {
      attemptCount,
      averageScore: avgScore,
      bestScore,
      lastAttemptDate: attempts[attempts.length - 1].timestamp,
    };
  } catch (error) {
    console.error('Failed to calculate statistics:', error);
    return null;
  }
}

export function clearTestAttempts(testId) {
  try {
    localStorage.removeItem(`test-attempts-${testId}`);
    return true;
  } catch (error) {
    console.error('Failed to clear test attempts:', error);
    return false;
  }
}