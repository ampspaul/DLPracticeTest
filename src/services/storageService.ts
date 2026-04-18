import { TestResults } from '../components/TestPortal';

/**
 * Storage Service
 * Handles persistence of test responses and results
 */

const STORAGE_KEYS = {
  RESPONSES: 'dltest_responses',
  TEST_RESULTS: 'dltest_results',
  LAST_TEST_DATE: 'dltest_last_date'
};

export const storageService = {
  /**
   * Save user responses to local storage
   */
  saveResponses: (responses: { [key: string]: number }): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
    } catch (error) {
      console.error('Error saving responses:', error);
    }
  },

  /**
   * Retrieve saved responses from local storage
   */
  getResponses: (): { [key: string]: number } | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESPONSES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving responses:', error);
      return null;
    }
  },

  /**
   * Save test results to local storage
   */
  saveTestResults: (results: TestResults): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(results));
      localStorage.setItem(STORAGE_KEYS.LAST_TEST_DATE, new Date().toISOString());
    } catch (error) {
      console.error('Error saving test results:', error);
    }
  },

  /**
   * Retrieve last test results from local storage
   */
  getTestResults: (): TestResults | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving test results:', error);
      return null;
    }
  },

  /**
   * Get the date of the last test
   */
  getLastTestDate: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_TEST_DATE);
    } catch (error) {
      console.error('Error retrieving last test date:', error);
      return null;
    }
  },

  /**
   * Clear all saved responses
   */
  clearResponses: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.RESPONSES);
    } catch (error) {
      console.error('Error clearing responses:', error);
    }
  },

  /**
   * Clear all test data
   */
  clearAllTestData: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.RESPONSES);
      localStorage.removeItem(STORAGE_KEYS.TEST_RESULTS);
      localStorage.removeItem(STORAGE_KEYS.LAST_TEST_DATE);
    } catch (error) {
      console.error('Error clearing all test data:', error);
    }
  }
};