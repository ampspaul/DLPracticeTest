import { storageService } from '../services/storageService';
import { TestResults } from '../components/TestPortal';

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Response Persistence', () => {
    it('should save responses to localStorage', () => {
      const responses = {
        q51: 0,
        q52: 1,
        q53: 2
      };

      storageService.saveResponses(responses);

      const saved = localStorage.getItem('dltest_responses');
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved!)).toEqual(responses);
    });

    it('should retrieve saved responses', () => {
      const responses = {
        q51: 0,
        q52: 1,
        q53: 2
      };

      storageService.saveResponses(responses);
      const retrieved = storageService.getResponses();

      expect(retrieved).toEqual(responses);
    });

    it('should return null when no responses saved', () => {
      const retrieved = storageService.getResponses();
      expect(retrieved).toBeNull();
    });

    it('should clear responses', () => {
      const responses = { q51: 0 };
      storageService.saveResponses(responses);
      storageService.clearResponses();

      const retrieved = storageService.getResponses();
      expect(retrieved).toBeNull();
    });
  });

  describe('Test Results Persistence', () => {
    it('should save test results', () => {
      const results: TestResults = {
        totalQuestions: 50,
        answeredQuestions: 50,
        correctAnswers: 40,
        score: 80,
        responses: { q51: 0 }
      };

      storageService.saveTestResults(results);

      const saved = localStorage.getItem('dltest_results');
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved!)).toEqual(results);
    });

    it('should retrieve saved test results', () => {
      const results: TestResults = {
        totalQuestions: 50,
        answeredQuestions: 50,
        correctAnswers: 40,
        score: 80,
        responses: { q51: 0 }
      };

      storageService.saveTestResults(results);
      const retrieved = storageService.getTestResults();

      expect(retrieved).toEqual(results);
    });

    it('should save test date when saving results', () => {
      const results: TestResults = {
        totalQuestions: 50,
        answeredQuestions: 50,
        correctAnswers: 40,
        score: 80,
        responses: { q51: 0 }
      };

      storageService.saveTestResults(results);
      const date = storageService.getLastTestDate();

      expect(date).toBeTruthy();
      expect(new Date(date!).getTime()).toBeGreaterThan(0);
    });
  });

  describe('Data Clearing', () => {
    it('should clear all test data', () => {
      const responses = { q51: 0 };
      const results: TestResults = {
        totalQuestions: 50,
        answeredQuestions: 50,
        correctAnswers: 40,
        score: 80,
        responses
      };

      storageService.saveResponses(responses);
      storageService.saveTestResults(results);

      storageService.clearAllTestData();

      expect(storageService.getResponses()).toBeNull();
      expect(storageService.getTestResults()).toBeNull();
      expect(storageService.getLastTestDate()).toBeNull();
    });
  });
});