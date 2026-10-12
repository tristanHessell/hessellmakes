import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComingSoon } from "./ComingSoon";
import { expectNoA11yViolations } from "../testUtils/a11y";

describe("ComingSoon", () => {
  it("shows the coming soon message", () => {
    render(<ComingSoon />);

    expect(screen.getByText("Coming soon!")).toBeInTheDocument();
  });

  it("shows the brand name", () => {
    render(<ComingSoon />);

    expect(screen.getByText("HESSELL")).toBeInTheDocument();
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
