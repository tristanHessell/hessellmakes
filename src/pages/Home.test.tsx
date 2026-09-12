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

  it("links the CTAs to the Gallery and Contact pages", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: "Explore the work" }),
    ).toHaveAttribute("href", "/gallery");
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("lists all five brand palette colours", () => {
    renderHome();

    for (const name of [
      "Aussie Blue",
      "English Red",
      "Cream",
      "Black",
      "White",
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
