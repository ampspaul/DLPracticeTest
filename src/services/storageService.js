/**
 * Storage Service
 * Provides question retrieval and test progress persistence.
 */

import questions from '../data/questions';

/**
 * Returns a copy of all questions in the question bank.
 * @returns {Array} Array of all question objects
 */
export function getAllQuestions() {
  return [...questions];
}

/**
 * Saves user test progress/answers to sessionStorage.
 * @param {Object} answers - Map of questionId to selected answer string
 */
export function saveProgress(answers) {
  try {
    sessionStorage.setItem('dltest_progress', JSON.stringify(answers));
  } catch (err) {
    console.error('Failed to save progress to sessionStorage:', err);
  }
}

/**
 * Loads previously saved test progress from sessionStorage.
 * @returns {Object|null} Saved answers map or null if none found
 */
export function loadProgress() {
  try {
    const saved = sessionStorage.getItem('dltest_progress');
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error('Failed to load progress from sessionStorage:', err);
    return null;
  }
}

/**
 * Clears saved test progress from sessionStorage.
 */
export function clearProgress() {
  try {
    sessionStorage.removeItem('dltest_progress');
  } catch (err) {
    console.error('Failed to clear progress from sessionStorage:', err);
  }
}