import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";
import { expectNoA11yViolations } from "../testUtils/a11y";

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
