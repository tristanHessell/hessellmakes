import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Shop } from "./Shop";
import { soccerBalls } from "../data/soccerBalls";
import { expectNoA11yViolations } from "../testUtils/a11y";

describe("Shop", () => {
  it("shows the pre-made collection without custom order controls", () => {
    render(<Shop />);
    expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "The pre-made collection" }),
    ).toBeVisible();
    for (const ball of soccerBalls) {
      expect(screen.getByRole("heading", { name: ball.name })).toBeVisible();
      expect(screen.getByRole("img", { name: ball.imageAlt })).toBeVisible();
    }
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(screen.getByText("Online ordering is coming soon.")).toBeVisible();
    expect(screen.getByRole("link", { name: "Visit Etsy" })).toHaveAttribute(
      "href",
      "https://www.etsy.com/au/shop/Hessellmakes",
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });

  it("opens product details with checkout disabled until the shop is connected", () => {
    render(<Shop />);
    const opener = screen.getByRole("button", { name: "View Patchwork" });
    opener.focus();
    fireEvent.click(opener);
    const dialog = screen.getByRole("dialog", { name: "Patchwork" });
    expect(
      within(dialog).getByRole("img", { name: soccerBalls[1].imageAlt }),
    ).toBeVisible();
    expect(
      within(dialog).getByRole("button", { name: "Buy online" }),
    ).toBeDisabled();
    expect(
      within(dialog).getByText(
        /availability for this ball has not been confirmed/i,
      ),
    ).toBeVisible();
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View Patchwork" }),
    ).toHaveFocus();
  });

  it("closes on a backdrop click and shows the next selected ball", () => {
    render(<Shop />);
    fireEvent.click(screen.getByRole("button", { name: "View Wave Weave" }));
    fireEvent.click(screen.getByRole("dialog", { name: "Wave Weave" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "View Match Day" }));
    expect(screen.getByRole("dialog", { name: "Match Day" })).toBeVisible();
  });

  it("has no accessibility violations in the collection or product details", async () => {
    const { container } = render(<Shop />);
    await expectNoA11yViolations(container);
    fireEvent.click(screen.getByRole("button", { name: "View Wave Weave" }));
    await expectNoA11yViolations(container);
  });
});
