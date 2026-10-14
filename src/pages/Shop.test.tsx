import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Shop } from "./Shop";
import { soccerBalls } from "../data/soccerBalls";
import { expectNoA11yViolations } from "../testUtils/a11y";

function renderCollectionPreview() {
  const result = render(<Shop />);
  // Keep coverage for the retained collection while it is hidden from visitors.
  screen
    .getByRole("heading", {
      name: "The pre-made collection",
      hidden: true,
    })
    .closest("section")!.hidden = false;
  return result;
}

describe("Shop", () => {
  it("hides the retained collection and keeps the launch notice visible", () => {
    render(<Shop />);
    expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "The pre-made collection",
        hidden: true,
      }),
    ).not.toBeVisible();
    for (const ball of soccerBalls) {
      expect(
        screen.getByRole("heading", { name: ball.name, hidden: true }),
      ).not.toBeVisible();
      expect(
        screen.getByRole("img", { name: ball.imageAlt, hidden: true }),
      ).not.toBeVisible();
    }
    expect(
      screen.queryByRole("button", { name: /view /i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(screen.getByText("Online ordering is coming soon.")).toBeVisible();
    expect(screen.getByRole("link", { name: /Visit Etsy/ })).toHaveAttribute(
      "href",
      "https://www.etsy.com/au/shop/Hessellmakes",
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });

  it("opens product details with checkout disabled until the shop is connected", () => {
    renderCollectionPreview();
    const ball = soccerBalls[1];
    const opener = screen.getByRole("button", { name: `View ${ball.name}` });
    opener.focus();
    fireEvent.click(opener);
    const dialog = screen.getByRole("dialog", { name: ball.name });
    expect(
      within(dialog).getByRole("img", { name: ball.imageAlt }),
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
      screen.getByRole("button", { name: `View ${ball.name}` }),
    ).toHaveFocus();
  });

  it("closes on a backdrop click and shows the next selected ball", () => {
    renderCollectionPreview();
    fireEvent.click(
      screen.getByRole("button", { name: "View Triple Truchet Tile" }),
    );
    fireEvent.click(
      screen.getByRole("dialog", { name: "Triple Truchet Tile" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "View SK100" }));
    expect(screen.getByRole("dialog", { name: "SK100" })).toBeVisible();
  });

  it("has no accessibility violations in the collection or product details", async () => {
    const { container } = render(<Shop />);
    await expectNoA11yViolations(container);
    screen
      .getByRole("heading", {
        name: "The pre-made collection",
        hidden: true,
      })
      .closest("section")!.hidden = false;
    await expectNoA11yViolations(container);
    fireEvent.click(
      screen.getByRole("button", { name: "View Triple Truchet Tile" }),
    );
    await expectNoA11yViolations(container);
  });
});
