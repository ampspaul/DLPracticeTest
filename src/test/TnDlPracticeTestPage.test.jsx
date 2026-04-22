import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TnDlPracticeTestPage from "../pages/TnDlPracticeTestPage";
import tnDlQuestions from "../data/tnDlQuestions";

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <TnDlPracticeTestPage />
      </MemoryRouter>
    </HelmetProvider>
  );

describe("TnDlPracticeTestPage", () => {
  test("renders the heading 'TN-DL Practice Test'", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: /TN-DL Practice Test/i })).toBeInTheDocument();
  });

  test("sets the document title to 'TN-DL Practice Test'", async () => {
    renderPage();
    await waitFor(() => {
      expect(document.title).toBe("TN-DL Practice Test");
    });
  });

  test("displays the first question", () => {
    renderPage();
    expect(screen.getByText(tnDlQuestions[0].question)).toBeInTheDocument();
  });

  test("shows progress label '1 of N'", () => {
    renderPage();
    expect(screen.getByText(`Question 1 of ${tnDlQuestions.length}`)).toBeInTheDocument();
  });

  test("renders all four options for the first question", () => {
    renderPage();
    tnDlQuestions[0].options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument();
    });
  });

  test("shows explanation after selecting an option", () => {
    renderPage();
    const correctOptionText = tnDlQuestions[0].options[tnDlQuestions[0].answer];
    fireEvent.click(screen.getByText(correctOptionText));
    expect(screen.getByText(tnDlQuestions[0].explanation)).toBeInTheDocument();
  });

  test("marks correct answer green and incorrect answer red", () => {
    renderPage();
    const firstQuestion = tnDlQuestions[0];
    const wrongIdx = firstQuestion.answer === 0 ? 1 : 0;
    const wrongOptionText = firstQuestion.options[wrongIdx];
    fireEvent.click(screen.getByText(wrongOptionText));

    const wrongBtn = screen.getByText(wrongOptionText).closest("button");
    const correctBtn = screen.getByText(firstQuestion.options[firstQuestion.answer]).closest("button");

    expect(wrongBtn).toHaveClass("tn-dl-option--incorrect");
    expect(correctBtn).toHaveClass("tn-dl-option--correct");
  });

  test("advances to the next question after clicking Next", () => {
    renderPage();
    const firstQuestion = tnDlQuestions[0];
    fireEvent.click(screen.getByText(firstQuestion.options[firstQuestion.answer]));
    fireEvent.click(screen.getByText("Next Question →"));
    expect(screen.getByText(tnDlQuestions[1].question)).toBeInTheDocument();
    expect(screen.getByText(`Question 2 of ${tnDlQuestions.length}`)).toBeInTheDocument();
  });

  test("does not allow re-selecting an option after answering", () => {
    renderPage();
    const firstQuestion = tnDlQuestions[0];
    const otherOption = firstQuestion.options[firstQuestion.answer === 0 ? 1 : 0];
    // Select correct answer
    fireEvent.click(screen.getByText(firstQuestion.options[firstQuestion.answer]));
    // Try to click another option — should be disabled
    const otherBtn = screen.getByText(otherOption).closest("button");
    expect(otherBtn).toBeDisabled();
  });

  test("shows results screen after completing all questions", () => {
    renderPage();
    tnDlQuestions.forEach((q) => {
      fireEvent.click(screen.getByText(q.options[q.answer]));
      const nextLabel = tnDlQuestions.indexOf(q) + 1 === tnDlQuestions.length
        ? "See Results"
        : "Next Question →";
      fireEvent.click(screen.getByText(nextLabel));
    });
    expect(screen.getByRole("heading", { name: /Your Results/i })).toBeInTheDocument();
  });

  test("restart button resets to the first question", () => {
    renderPage();
    tnDlQuestions.forEach((q) => {
      fireEvent.click(screen.getByText(q.options[q.answer]));
      const nextLabel = tnDlQuestions.indexOf(q) + 1 === tnDlQuestions.length
        ? "See Results"
        : "Next Question →";
      fireEvent.click(screen.getByText(nextLabel));
    });
    fireEvent.click(screen.getByText("Restart Practice Test"));
    expect(screen.getByText(`Question 1 of ${tnDlQuestions.length}`)).toBeInTheDocument();
  });

  test("contains no Kentucky (KY) references in the page", () => {
    renderPage();
    const bodyText = document.body.textContent || "";
    expect(bodyText).not.toMatch(/\bKY\b/i);
    expect(bodyText).not.toMatch(/Kentucky/i);
    expect(bodyText).not.toMatch(/ky-dl/i);
  });

  test("all questions reference Tennessee content, not Kentucky", () => {
    tnDlQuestions.forEach((q) => {
      expect(q.question).not.toMatch(/Kentucky|KY-DL|\bKY\b/i);
      expect(q.explanation).not.toMatch(/Kentucky|KY-DL|\bKY\b/i);
    });
  });
});