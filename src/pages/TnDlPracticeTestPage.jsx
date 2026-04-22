import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import tnDlQuestions from "../data/tnDlQuestions";
import "./TnDlPracticeTestPage.css";

const PAGE_TITLE = "TN-DL Practice Test";

export default function TnDlPracticeTestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Reset state when component mounts (handles navigation back to the page)
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  const currentQuestion = tnDlQuestions[currentIndex];
  const totalQuestions = tnDlQuestions.length;

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return; // Already answered
    setSelectedOption(index);
    setShowExplanation(true);

    const isCorrect = index === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selected: index, correct: isCorrect }
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
  };

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 70;

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content="Tennessee Driver's Licence Practice Test — prepare for your TN DL exam with questions on Tennessee traffic laws, road signs, and rules of the road." />
      </Helmet>

      <main className="tn-dl-page" aria-label={PAGE_TITLE}>
        <header className="tn-dl-header">
          <h1 className="tn-dl-title">{PAGE_TITLE}</h1>
          <p className="tn-dl-subtitle">
            Tennessee-specific questions covering traffic laws, road signs, and rules of the road.
          </p>
        </header>

        {!completed ? (
          <section className="tn-dl-quiz-section" aria-label="Practice test questions">
            <div className="tn-dl-progress-bar" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={totalQuestions}>
              <div
                className="tn-dl-progress-fill"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
            <p className="tn-dl-progress-label">
              Question {currentIndex + 1} of {totalQuestions}
            </p>

            <div className="tn-dl-question-card">
              <h2 className="tn-dl-question-text">{currentQuestion.question}</h2>

              <ul className="tn-dl-options" role="list">
                {currentQuestion.options.map((option, idx) => {
                  let optionClass = "tn-dl-option";
                  if (selectedOption !== null) {
                    if (idx === currentQuestion.answer) {
                      optionClass += " tn-dl-option--correct";
                    } else if (idx === selectedOption && idx !== currentQuestion.answer) {
                      optionClass += " tn-dl-option--incorrect";
                    } else {
                      optionClass += " tn-dl-option--disabled";
                    }
                  }
                  return (
                    <li key={idx}>
                      <button
                        className={optionClass}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={selectedOption !== null}
                        aria-pressed={selectedOption === idx}
                      >
                        <span className="tn-dl-option-letter">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {option}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {showExplanation && (
                <div className="tn-dl-explanation" role="alert">
                  <strong>{selectedOption === currentQuestion.answer ? "✓ Correct!" : "✗ Incorrect."}</strong>
                  {" "}{currentQuestion.explanation}
                </div>
              )}

              {selectedOption !== null && (
                <button className="tn-dl-next-btn" onClick={handleNext}>
                  {currentIndex + 1 >= totalQuestions ? "See Results" : "Next Question →"}
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="tn-dl-results-section" aria-label="Test results">
            <div className="tn-dl-results-card">
              <h2 className="tn-dl-results-heading">Your Results</h2>
              <p className={`tn-dl-results-verdict ${passed ? "tn-dl-results-verdict--pass" : "tn-dl-results-verdict--fail"}`}>
                {passed ? "🎉 Congratulations — You Passed!" : "Keep Practicing — You'll Get There!"}
              </p>
              <p className="tn-dl-results-score">
                Score: <strong>{score}</strong> / {totalQuestions} ({percentage}%)
              </p>
              <p className="tn-dl-results-note">
                Tennessee requires a score of 70% or higher to pass the written knowledge test.
              </p>
              <button className="tn-dl-restart-btn" onClick={handleRestart}>
                Restart Practice Test
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
}