/**
 * Tests for DL Practice Test application logic.
 */

'use strict';

const { calculateScore } = require('./app');

// Mock FormData for Node.js test environment
class MockFormData {
  constructor(data = {}) {
    this._data = data;
  }

  get(key) {
    return this._data[key] || null;
  }
}

describe('calculateScore', () => {
  test('returns full score when all answers are correct', () => {
    const formData = new MockFormData({ q1: 'c', q2: 'b' });
    const { score, total } = calculateScore(formData);
    expect(score).toBe(2);
    expect(total).toBe(2);
  });

  test('returns zero score when all answers are wrong', () => {
    const formData = new MockFormData({ q1: 'a', q2: 'a' });
    const { score, total } = calculateScore(formData);
    expect(score).toBe(0);
    expect(total).toBe(2);
  });

  test('returns partial score for mixed answers', () => {
    const formData = new MockFormData({ q1: 'c', q2: 'a' });
    const { score, total } = calculateScore(formData);
    expect(score).toBe(1);
    expect(total).toBe(2);
  });

  test('returns zero score when no answers provided', () => {
    const formData = new MockFormData({});
    const { score, total } = calculateScore(formData);
    expect(score).toBe(0);
    expect(total).toBe(2);
  });
});