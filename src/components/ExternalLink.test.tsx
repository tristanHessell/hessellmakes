import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExternalLink } from "./ExternalLink";
import { expectNoA11yViolations } from "../testUtils/a11y";

describe("ExternalLink", () => {
  it("shows an icon and opens a protected new tab", () => {
    render(<ExternalLink href="https://example.com" label="Visit Etsy" />);
    const link = screen.getByRole("link", {
      name: "Visit Etsy (opens in a new tab)",
    });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveTextContent(/^Visit Etsy$/);
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ExternalLink href="https://example.com" label="Watch on Instagram" />,
    );
    await expectNoA11yViolations(container);
  });
});
