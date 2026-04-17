/**
 * RAG (Retrieval-Augmented Generation) Pipeline
 * Extracts, validates, and formats driver license practice questions
 * Ensures consistency, deduplication, and metadata enrichment
 */

import { questionBank } from '../data/questionBank';

class RAGPipeline {
  /**
   * Retrieves all questions from the question bank
   * @returns {Array} Array of question objects
   */
  static getAllQuestions() {
    return [...questionBank];
  }

  /**
   * Retrieves questions filtered by topic
   * @param {String} topic - Topic category (road_signs, traffic_rules, vehicle_operation, safety_regulations)
   * @returns {Array} Filtered questions
   */
  static getQuestionsByTopic(topic) {
    return questionBank.filter(q => q.topic === topic);
  }

  /**
   * Retrieves questions filtered by difficulty level
   * @param {String} difficulty - Difficulty level (easy, medium, hard)
   * @returns {Array} Filtered questions
   */
  static getQuestionsByDifficulty(difficulty) {
    return questionBank.filter(q => q.difficulty === difficulty);
  }

  /**
   * Retrieves questions by topic and difficulty
   * @param {String} topic - Topic category
   * @param {String} difficulty - Difficulty level
   * @returns {Array} Filtered questions
   */
  static getQuestionsByTopicAndDifficulty(topic, difficulty) {
    return questionBank.filter(q => q.topic === topic && q.difficulty === difficulty);
  }

  /**
   * Validates question structure
   * @param {Object} question - Question object to validate
   * @returns {Object} Validation result with status and errors
   */
  static validateQuestion(question) {
    const errors = [];

    if (!question.id || typeof question.id !== 'number') {
      errors.push('Invalid or missing question ID');
    }

    if (!question.text || typeof question.text !== 'string' || question.text.trim().length === 0) {
      errors.push('Invalid or missing question text');
    }

    if (!Array.isArray(question.options) || question.options.length < 3) {
      errors.push('Question must have at least 3 answer options');
    }

    if (typeof question.correctAnswer !== 'number' || question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
      errors.push('Invalid or missing correct answer index');
    }

    if (!['easy', 'medium', 'hard'].includes(question.difficulty)) {
      errors.push('Invalid difficulty level');
    }

    if (!['road_signs', 'traffic_rules', 'vehicle_operation', 'safety_regulations'].includes(question.topic)) {
      errors.push('Invalid topic category');
    }

    if (!question.source || typeof question.source !== 'string') {
      errors.push('Missing source attribution');
    }

    if (typeof question.qaApproved !== 'boolean') {
      errors.push('Missing QA approval status');
    }

    return {
      valid: errors.length === 0,
      errors,
      questionId: question.id
    };
  }

  /**
   * Validates entire question bank
   * @returns {Object} Validation summary
   */
  static validateQuestionBank() {
    const results = {
      totalQuestions: questionBank.length,
      validQuestions: 0,
      invalidQuestions: 0,
      errors: [],
      topicDistribution: {},
      difficultyDistribution: {}
    };

    questionBank.forEach(question => {
      const validation = this.validateQuestion(question);
      if (validation.valid) {
        results.validQuestions++;
      } else {
        results.invalidQuestions++;
        results.errors.push({
          questionId: validation.questionId,
          errors: validation.errors
        });
      }

      // Track distribution
      results.topicDistribution[question.topic] = (results.topicDistribution[question.topic] || 0) + 1;
      results.difficultyDistribution[question.difficulty] = (results.difficultyDistribution[question.difficulty] || 0) + 1;
    });

    return results;
  }

  /**
   * Extracts metadata from questions
   * @returns {Object} Metadata summary
   */
  static extractMetadata() {
    const metadata = {
      totalCount: questionBank.length,
      topics: {},
      difficulties: {},
      sources: new Set(),
      qaApprovedCount: 0,
      topicCoverage: {}
    };

    questionBank.forEach(q => {
      metadata.topics[q.topic] = (metadata.topics[q.topic] || 0) + 1;
      metadata.difficulties[q.difficulty] = (metadata.difficulties[q.difficulty] || 0) + 1;
      metadata.sources.add(q.source);
      if (q.qaApproved) metadata.qaApprovedCount++;
    });

    metadata.sources = Array.from(metadata.sources);

    // Calculate topic coverage percentage
    Object.keys(metadata.topics).forEach(topic => {
      metadata.topicCoverage[topic] = ((metadata.topics[topic] / metadata.totalCount) * 100).toFixed(2) + '%';
    });

    return metadata;
  }

  /**
   * Retrieves unique sources used in questions
   * @returns {Array} Array of unique source attributions
   */
  static getUniqueSources() {
    return [...new Set(questionBank.map(q => q.source))];
  }

  /**
   * Retrieves topic categories available
   * @returns {Array} Array of topic categories
   */
  static getTopicCategories() {
    return [...new Set(questionBank.map(q => q.topic))];
  }

  /**
   * Retrieves difficulty levels available
   * @returns {Array} Array of difficulty levels
   */
  static getDifficultyLevels() {
    return [...new Set(questionBank.map(q => q.difficulty))];
  }

  /**
   * Generates a random question from the bank
   * @returns {Object} Random question object
   */
  static getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    return { ...questionBank[randomIndex] };
  }

  /**
   * Generates multiple random questions
   * @param {Number} count - Number of questions to return
   * @param {Array} excludeIds - Question IDs to exclude
   * @returns {Array} Array of random questions
   */
  static getRandomQuestions(count, excludeIds = []) {
    const available = questionBank.filter(q => !excludeIds.includes(q.id));
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
   * Formats question for display
   * @param {Object} question - Question object
   * @returns {Object} Formatted question with display properties
   */
  static formatForDisplay(question) {
    return {
      id: question.id,
      text: question.text,
      options: question.options.map((opt, idx) => ({
        index: idx,
        text: opt
      })),
      metadata: {
        difficulty: question.difficulty,
        topic: question.topic,
        source: question.source
      }
    };
  }

  /**
   * Formats multiple questions for display
   * @param {Array} questions - Array of question objects
   * @returns {Array} Array of formatted questions
   */
  static formatQuestionsForDisplay(questions) {
    return questions.map(q => this.formatForDisplay(q));
  }
}

export default RAGPipeline;