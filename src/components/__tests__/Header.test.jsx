import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header component", () => {
  it("renders the correct page header text", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Tennessee Driver Practice Test");
  });

  it("does not contain old KY-DL branding", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).not.toMatch(/KY[-\s]?DL/i);
    expect(heading.textContent).not.toMatch(/\bKY\b/i);
  });

  it("renders a banner landmark", () => {
    render(<Header />);
    const banner = screen.getByRole("banner");
    expect(banner).toBeInTheDocument();
  });

  it("header text is exactly 'Tennessee Driver Practice Test'", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent.trim()).toBe("Tennessee Driver Practice Test");
  });
});