import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Gallery } from "./Gallery";
import { soccerBalls } from "../data/soccerBalls";
import { expectNoA11yViolations } from "../testUtils/a11y";

function swipe(
  target: Element,
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  fireEvent.touchStart(target, {
    touches: [
      new Touch({ identifier: 0, target, clientX: start.x, clientY: start.y }),
    ],
  });
  fireEvent.touchEnd(target, {
    changedTouches: [
      new Touch({ identifier: 0, target, clientX: end.x, clientY: end.y }),
    ],
  });
}

describe("Gallery", () => {
  it("renders the page heading and a card for every ball", () => {
    render(<Gallery />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Gallery" }),
    ).toBeInTheDocument();

    for (const ball of soccerBalls) {
      expect(
        screen.getByRole("button", { name: ball.name }),
      ).toBeInTheDocument();
    }
  });

  it("opens a dialog with the ball's name and description when clicked", () => {
    render(<Gallery />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("open");
    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(firstBall.description)).toBeInTheDocument();
  });

  it("closes the dialog when the close button is clicked", () => {
    render(<Gallery />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.getByRole("dialog")).not.toHaveAttribute("open");
  });

  it("shows a different ball's details when another card is clicked", () => {
    render(<Gallery />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the next ball when the next button is clicked", () => {
    render(<Gallery />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Next ball" }));

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the previous ball when the previous button is clicked", () => {
    render(<Gallery />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Previous ball" }));

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the next ball when the right arrow key is pressed", () => {
    render(<Gallery />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowRight" });

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the previous ball when the left arrow key is pressed", () => {
    render(<Gallery />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowLeft" });

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the next ball when the dialog is swiped left", () => {
    render(<Gallery />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    const dialog = screen.getByRole("dialog");
    swipe(dialog, { x: 200, y: 0 }, { x: 100, y: 0 });

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the previous ball when the dialog is swiped right", () => {
    render(<Gallery />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));
    const dialog = screen.getByRole("dialog");
    swipe(dialog, { x: 100, y: 0 }, { x: 200, y: 0 });

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("does not change the ball when the swipe is too short", () => {
    render(<Gallery />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    const dialog = screen.getByRole("dialog");
    swipe(dialog, { x: 100, y: 0 }, { x: 120, y: 0 });

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("does not change the ball when the swipe is mostly vertical", () => {
    render(<Gallery />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    const dialog = screen.getByRole("dialog");
    swipe(dialog, { x: 100, y: 0 }, { x: 160, y: 200 });

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("wraps around at both ends of the list", () => {
    render(<Gallery />);
    const firstBall = soccerBalls[0];
    const lastBall = soccerBalls[soccerBalls.length - 1];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Previous ball" }));

    expect(
      screen.getByRole("heading", { level: 2, name: lastBall.name }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next ball" }));

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations, grid or with the dialog open", async () => {
    const { container } = render(<Gallery />);
    await expectNoA11yViolations(container);

    fireEvent.click(screen.getByRole("button", { name: soccerBalls[0].name }));
    await expectNoA11yViolations(container);
  });

  it("adds Product structured data for the open ball, and removes it when closed", async () => {
    render(<Gallery />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script?.textContent ?? "");
    expect(data).toMatchObject({
      "@type": "Product",
      name: firstBall.name,
      description: firstBall.description,
    });

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    // The <dialog> fires its native "close" event, and the resulting state
    // update, a tick after the click, so this check retries until the
    // script is actually removed.
    await waitFor(() => {
      expect(
        document.querySelector('script[type="application/ld+json"]'),
      ).toBeNull();
    });
  });
});
