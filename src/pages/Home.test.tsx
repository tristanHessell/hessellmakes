import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home", () => {
  it("renders the hero heading", () => {
    renderHome();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Handmade, built to last.",
      }),
    ).toBeInTheDocument();
  });

  it("links the CTA to the Gallery page", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: "Explore the work" }),
    ).toHaveAttribute("href", "/gallery");
  });
});
