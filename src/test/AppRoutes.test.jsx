import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "../routes/AppRoutes";

const renderWithRouter = (initialEntry) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

describe("AppRoutes", () => {
  test("renders TN-DL Practice Test at /tn-dl-practice-test", () => {
    renderWithRouter("/tn-dl-practice-test");
    expect(screen.getByRole("heading", { level: 1, name: /TN-DL Practice Test/i })).toBeInTheDocument();
  });

  test("redirects /ky-dl-practice-test to /tn-dl-practice-test", () => {
    renderWithRouter("/ky-dl-practice-test");
    // After redirect, TN-DL page should render
    expect(screen.getByRole("heading", { level: 1, name: /TN-DL Practice Test/i })).toBeInTheDocument();
  });

  test("redirects root / to /tn-dl-practice-test", () => {
    renderWithRouter("/");
    expect(screen.getByRole("heading", { level: 1, name: /TN-DL Practice Test/i })).toBeInTheDocument();
  });

  test("no KY-DL heading or text is present on the page", () => {
    renderWithRouter("/tn-dl-practice-test");
    expect(screen.queryByText(/KY-DL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Kentucky/i)).not.toBeInTheDocument();
  });
});