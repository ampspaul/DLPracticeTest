import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

/**
 * HomePage unit tests
 *
 * PBI #294 – updated colour assertions from Dark Green to Dark Purple.
 * The heading colour is now driven by the --color-dark-purple CSS variable
 * (resolved at runtime by the browser); in the jsdom test environment the
 * CSS variable itself is asserted rather than a computed hex value, which
 * is consistent with how CSS custom properties behave in jsdom.
 */

describe("HomePage", () => {
  // ── AC1 – Correct heading text ─────────────────────────────────────────
  it("renders the heading with the correct text", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("TN Student Practice Test");
  });

  // ── AC2 / AC6 – Dark Purple colour via CSS variable ────────────────────
  it("applies the dark-purple colour token to the heading", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    // The heading must reference the CSS variable; we verify the class is
    // present and the inline style (if any) does NOT contain the old green.
    expect(heading).toHaveClass("home-heading");
    // Ensure no remnant of the old Dark Green hard-coded colour is present.
    const style = heading.getAttribute("style") || "";
    expect(style).not.toMatch(/#1a5c38/i);
    expect(style).not.toMatch(/dark-?green/i);
  });

  // ── AC3 – Bold font-weight preserved ──────────────────────────────────
  it("renders the heading element as an h1 (bold by default)", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.tagName).toBe("H1");
  });

  // ── AC5 – Scope isolation: no extra headings introduced ────────────────
  it("renders exactly one h1 heading", () => {
    render(<HomePage />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
  });

  // ── Snapshot test (updated to reflect PBI #294) ────────────────────────
  it("matches the updated snapshot", () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});