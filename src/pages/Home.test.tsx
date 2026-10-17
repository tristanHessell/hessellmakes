import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";
import { expectNoA11yViolations } from "../testUtils/a11y";
import landing from "../assets/landing.webp";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home", () => {
  it("shows the landing photograph with priority loading", () => {
    renderHome();
    const image = screen.getByRole("img", {
      name: /a collection of hand-stitched leather soccer balls/i,
    });
    expect(image).toHaveAttribute("src", landing);
    expect(image).toHaveAttribute("width", "6000");
    expect(image).toHaveAttribute("height", "3376");
    expect(image).toHaveAttribute("fetchpriority", "high");
  });

  it("renders the hero heading", () => {
    renderHome();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Handmade soccer balls, built to last.",
      }),
    ).toBeInTheDocument();
  });

  it("links the CTA to the Portfolio page", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: "Explore the work" }),
    ).toHaveAttribute("href", "/portfolio");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderHome();
    await expectNoA11yViolations(container);
  });
});
