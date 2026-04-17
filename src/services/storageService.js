/**
 * Storage Service
 * Manages persistent storage of questions and user test sessions
 * Implements deduplication, retrieval, and caching for optimal performance
 */

import RAGPipeline from './ragPipeline';

class StorageService {
  constructor() {
    this.questionCache = null;
    this.sessionCache = new Map();
    this.cacheTimestamp = null;
    this.CACHE_TTL = 1800000; // 30 minutes in milliseconds
  }

  /**
   * Initializes storage and loads questions into cache
   * @returns {Promise<Boolean>} Success status
   */
  async initialize() {
    try {
      this.questionCache = RAGPipeline.getAllQuestions();
      this.cacheTimestamp = Date.now();
      console.log(`Storage initialized with ${this.questionCache.length} questions`);
      return true;
    } catch (error) {
      console.error('Storage initialization failed:', error);
      return false;
    }
  }

  /**
   * Checks if cache is still valid
   * @returns {Boolean} True if cache is valid and fresh
   */
  isCacheValid() {
    if (!this.questionCache || !this.cacheTimestamp) {
      return false;
    }
    return Date.now() - this.cacheTimestamp < this.CACHE_TTL;
  }

  /**
   * Gets all questions (uses cache when valid)
   * @returns {Promise<Array>} Array of all questions
   */
  async getAllQuestions() {
    if (!this.isCacheValid()) {
      await this.initialize();
    }
    return [...this.questionCache];
  }

  /**
   * Gets questions by topic
   * @param {String} topic - Topic filter
   * @returns {Promise<Array>} Filtered questions
   */
  async getQuestionsByTopic(topic) {
    const allQuestions = await this.getAllQuestions();
    return allQuestions.filter(q => q.topic === topic);
  }

  /**
   * Gets questions by difficulty
   * @param {String} difficulty - Difficulty filter
   * @returns {Promise<Array>} Filtered questions
   */
  async getQuestionsByDifficulty(difficulty) {
    const allQuestions = await this.getAllQuestions();
    return allQuestions.filter(q => q.difficulty === difficulty);
  }

  /**
   * Gets questions by topic and difficulty
   * @param {String} topic - Topic filter
   * @param {String} difficulty - Difficulty filter
   * @returns {Promise<Array>} Filtered questions
   */
  async getQuestionsByTopicAndDifficulty(topic, difficulty) {
    const allQuestions = await this.getAllQuestions();
    return allQuestions.filter(q => q.topic === topic && q.difficulty === difficulty);
  }

  /**
   * Gets a random selection of questions without duplicates
   * @param {Number} count - Number of questions to retrieve
   * @param {Array} excludeIds - Question IDs to exclude from selection
   * @returns {Promise<Array>} Array of unique questions
   */
  async getRandomQuestions(count, excludeIds = []) {
    const allQuestions = await this.getAllQuestions();
    const available = allQuestions.filter(q => !excludeIds.includes(q.id));
    
    if (available.length < count) {
      console.warn(`Requested ${count} questions but only ${available.length} available after exclusions`);
    }

    const selected = [];
    const indices = new Set();

    while (selected.length < Math.min(count, available.length)) {
      const idx = Math.floor(Math.random() * available.length);
      if (!indices.has(idx)) {
        indices.add(idx);
        selected.push({ ...available[idx] });
      }
    }

    return selected;
  }

  /**
   * Creates a test session with questions and tracks state
   * @param {String} sessionId - Unique session identifier
   * @param {Number} questionCount - Number of questions for test
   * @param {Object} filters - Optional filters (topic, difficulty)
   * @returns {Promise<Object>} Session object with questions
   */
  async createTestSession(sessionId, questionCount = 10, filters = {}) {
    try {
      let questions;

      if (filters.topic && filters.difficulty) {
        questions = await this.getQuestionsByTopicAndDifficulty(filters.topic, filters.difficulty);
      } else if (filters.topic) {
        questions = await this.getQuestionsByTopic(filters.topic);
      } else if (filters.difficulty) {
        questions = await this.getQuestionsByDifficulty(filters.difficulty);
      } else {
        questions = await this.getRandomQuestions(questionCount);
      }

      // Shuffle questions for randomness
      const shuffled = this.shuffleArray(questions).slice(0, questionCount);

      const session = {
        sessionId,
        createdAt: new Date().toISOString(),
        questionCount: shuffled.length,
        questions: shuffled,
        currentIndex: 0,
        answers: {},
        completed: false
      };

      this.sessionCache.set(sessionId, session);
      return session;
    } catch (error) {
      console.error('Failed to create test session:', error);
      throw error;
    }
  }

  /**
   * Retrieves an existing test session
   * @param {String} sessionId - Session identifier
   * @returns {Object} Session object or null if not found
   */
  getTestSession(sessionId) {
    return this.sessionCache.get(sessionId) || null;
  }

  /**
   * Updates answer for a question in a session
   * @param {String} sessionId - Session identifier
   * @param {Number} questionId - Question ID
   * @param {Number} answerIndex - Selected answer index
   * @returns {Boolean} Success status
   */
  updateSessionAnswer(sessionId, questionId, answerIndex) {
    const session = this.getTestSession(sessionId);
    if (!session) {
      console.error(`Session ${sessionId} not found`);
      return false;
    }

    session.answers[questionId] = answerIndex;
    return true;
  }

  /**
   * Marks session as completed
   * @param {String} sessionId - Session identifier
   * @returns {Boolean} Success status
   */
  completeTestSession(sessionId) {
    const session = this.getTestSession(sessionId);
    if (!session) {
      console.error(`Session ${sessionId} not found`);
      return false;
    }

    session.completed = true;
    session.completedAt = new Date().toISOString();
    return true;
  }

  /**
   * Calculates test results for a session
   * @param {String} sessionId - Session identifier
   * @returns {Object} Results with score, correct count, and details
   */
  calculateResults(sessionId) {
    const session = this.getTestSession(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const results = {
      sessionId,
      totalQuestions: session.questions.length,
      correctCount: 0,
      incorrectCount: 0,
      unansweredCount: 0,
      score: 0,
      details: []
    };

    session.questions.forEach(question => {
      const userAnswer = session.answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      const isUnanswered = userAnswer === undefined;

      if (isUnanswered) {
        results.unansweredCount++;
      } else if (isCorrect) {
        results.correctCount++;
      } else {
        results.incorrectCount++;
      }

      results.details.push({
        questionId: question.id,
        text: question.text,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        isUnanswered,
        topic: question.topic,
        difficulty: question.difficulty
      });
    });

    results.score = (results.correctCount / results.totalQuestions) * 100;
    return results;
  }

  /**
   * Clears a test session from cache
   * @param {String} sessionId - Session identifier
   * @returns {Boolean} Success status
   */
  clearTestSession(sessionId) {
    return this.sessionCache.delete(sessionId);
  }

  /**
   * Clears all test sessions from cache
   * @returns {void}
   */
  clearAllSessions() {
    this.sessionCache.clear();
  }

  /**
   * Helper: Shuffles array using Fisher-Yates algorithm
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Gets statistics about the question bank
   * @returns {Promise<Object>} Statistics object
   */
  async getQuestionBankStats() {
    return RAGPipeline.extractMetadata();
  }

  /**
   * Gets validation report for question bank
   * @returns {Promise<Object>} Validation report
   */
  async getValidationReport() {
    return RAGPipeline.validateQuestionBank();
  }
}

// Export singleton instance
export default new StorageService();