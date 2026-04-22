import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  test("renders the TN-DL Practice Test navigation link", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /TN-DL Practice Test/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/tn-dl-practice-test");
  });

  test("does not contain any KY-DL reference in the navigation", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.queryByText(/KY-DL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Kentucky/i)).not.toBeInTheDocument();
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link.getAttribute("href")).not.toMatch(/ky-dl/i);
    });
  });
});