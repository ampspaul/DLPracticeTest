import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("sets the document title to Tennessee Driver Practice Test", () => {
    render(<App />);
    expect(document.title).toBe("Tennessee Driver Practice Test");
  });

  it("displays the Tennessee Driver Practice Test header", () => {
    render(<App />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /Tennessee Driver Practice Test/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("does not display old KY-DL header text", () => {
    render(<App />);
    expect(screen.queryByText(/KY[-\s]?DL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/KY-DL Practice TEST/i)).not.toBeInTheDocument();
  });
});