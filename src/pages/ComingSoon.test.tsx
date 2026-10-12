import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComingSoon } from "./ComingSoon";
import { expectNoA11yViolations } from "../testUtils/a11y";

describe("ComingSoon", () => {
  it("shows the coming soon message", () => {
    render(<ComingSoon />);

    expect(screen.getByText(/coming soon!$/i)).toBeInTheDocument();
  });

  it("shows the brand name as the page heading", () => {
    render(<ComingSoon />);

    expect(
      screen.getByRole("heading", { level: 1, name: "HESSELLMAKES" }),
    ).toBeInTheDocument();
  });

  it("shows the footer copyright notice", () => {
    render(<ComingSoon />);

    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}.*HessellMakes`)),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ComingSoon />);
    await expectNoA11yViolations(container);
  });
});
