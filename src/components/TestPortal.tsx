import React, { useState, useEffect } from 'react';
import { Question, QUESTIONS, TOTAL_QUESTIONS } from '../data/questionsData';
import { storageService } from '../services/storageService';
import ProgressIndicator from './ProgressIndicator';
import QuestionDisplay from './QuestionDisplay';
import ResultsScreen from './ResultsScreen';

interface TestPortalProps {
  onComplete?: (results: TestResults) => void;
}

export interface TestResults {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  score: number;
  responses: { [key: string]: number };
}

const TestPortal: React.FC<TestPortalProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: string]: number }>({});
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const currentQuestion: Question = QUESTIONS[currentQuestionIndex];
  const questionsRemaining = TOTAL_QUESTIONS - currentQuestionIndex;

  // Load any previously saved responses
  useEffect(() => {
    const savedResponses = storageService.getResponses();
    if (savedResponses) {
      setResponses(savedResponses);
    }
  }, []);

  // Save responses to storage whenever they change
  useEffect(() => {
    storageService.saveResponses(responses);
  }, [responses]);

  const handleAnswerSelected = (answerIndex: number) => {
    const newResponses = {
      ...responses,
      [currentQuestion.id]: answerIndex
    };
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeTest = () => {
    const results = calculateResults();
    setTestResults(results);
    setIsTestComplete(true);
    storageService.saveTestResults(results);
    
    if (onComplete) {
      onComplete(results);
    }
  };

  const calculateResults = (): TestResults => {
    let correctCount = 0;

    QUESTIONS.forEach((question) => {
      if (responses[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

    return {
      totalQuestions: TOTAL_QUESTIONS,
      answeredQuestions: Object.keys(responses).length,
      correctAnswers: correctCount,
      score: score,
      responses: responses
    };
  };

  const handleRetakeTest = () => {
    setCurrentQuestionIndex(0);
    setResponses({});
    setIsTestComplete(false);
    setTestResults(null);
    storageService.clearResponses();
  };

  if (isTestComplete && testResults) {
    return (
      <ResultsScreen
        results={testResults}
        questions={QUESTIONS}
        onRetake={handleRetakeTest}
      />
    );
  }

  return (
    <div className="test-portal">
      <ProgressIndicator
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={TOTAL_QUESTIONS}
        questionsRemaining={questionsRemaining}
        answeredCount={Object.keys(responses).length}
      />

      <QuestionDisplay
        question={currentQuestion}
        selectedAnswer={responses[currentQuestion.id]}
        onAnswerSelected={handleAnswerSelected}
      />

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="btn-previous"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className={currentQuestionIndex === TOTAL_QUESTIONS - 1 ? 'btn-submit' : 'btn-next'}
        >
          {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? 'Submit Test' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default TestPortal;