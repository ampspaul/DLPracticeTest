const STORAGE_KEYS = {
  QUESTIONS: 'dl_questions',
  PROGRESS: 'dl_progress'
};

/**
 * Validate question object structure
 */
function isValidQuestion(question) {
  return (
    question &&
    typeof question === 'object' &&
    typeof question.id === 'string' &&
    typeof question.text === 'string' &&
    Array.isArray(question.options) &&
    question.options.length > 0 &&
    typeof question.correctAnswer === 'string'
  );
}

/**
 * Get all questions from storage
 */
export function getAllQuestions() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!data) {
      // Load default questions if none exist
      const defaultQuestions = getDefaultQuestions();
      saveQuestions(defaultQuestions);
      return defaultQuestions;
    }
    const questions = JSON.parse(data);
    if (!Array.isArray(questions)) {
      throw new Error('Invalid questions format');
    }
    return questions.filter(isValidQuestion);
  } catch (error) {
    console.error('Error retrieving questions:', error);
    return getDefaultQuestions();
  }
}

/**
 * Save questions to storage
 */
export function saveQuestions(questions) {
  try {
    if (!Array.isArray(questions)) {
      throw new Error('Questions must be an array');
    }
    const validQuestions = questions.filter(isValidQuestion);
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(validQuestions));
    return true;
  } catch (error) {
    console.error('Error saving questions:', error);
    return false;
  }
}

/**
 * Save user progress
 */
export function saveProgress(answers) {
  try {
    if (typeof answers !== 'object' || answers === null) {
      throw new Error('Answers must be an object');
    }
    const progress = {
      answers: answers,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
}

/**
 * Get saved progress
 */
export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) {
      return null;
    }
    const progress = JSON.parse(data);
    if (progress && typeof progress.answers === 'object') {
      return progress;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving progress:', error);
    return null;
  }
}

/**
 * Clear all stored data
 */
export function clearAllData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

/**
 * Default questions data
 */
function getDefaultQuestions() {
  return [
    {
      id: 'q1',
      text: 'What is the maximum speed limit on highways?',
      options: ['55 mph', '65 mph', '75 mph', '85 mph'],
      correctAnswer: '65 mph'
    },
    {
      id: 'q2',
      text: 'At a four-way stop, who has the right of way?',
      options: [
        'The vehicle on the left',
        'The vehicle that arrived first',
        'The vehicle on the right',
        'All vehicles simultaneously'
      ],
      correctAnswer: 'The vehicle that arrived first'
    },
    {
      id: 'q3',
      text: 'What does a yellow traffic light mean?',
      options: [
        'Stop immediately',
        'Proceed with caution',
        'Prepare to stop',
        'Speed up'
      ],
      correctAnswer: 'Prepare to stop'
    }
  ];
}