import React from 'react';
import './Question.css';

function Question({ question, questionNumber, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="question">
      <div className="question-header">
        <h2 className="question-text">{question.text}</h2>
        {question.hint && <p className="question-hint">💡 Hint: {question.hint}</p>}
      </div>

      <div className="answer-options">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`answer-option ${
              selectedAnswer === option ? 'selected' : ''
            }`}
          >
            <input
              type="radio"
              name={`question-${questionNumber}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
            />
            <span className="option-text">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;