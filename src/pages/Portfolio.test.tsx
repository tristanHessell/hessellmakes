import { describe, expect, it } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Portfolio } from "./Portfolio";
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

describe("Portfolio", () => {
  it("groups the balls in the requested order", () => {
    render(<Portfolio />);
    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["Custom Balls", "Commissions + Collaborations", "Can it Ball?"]);
    expect(
      within(screen.getByRole("region", { name: "Custom Balls" }))
        .getAllByRole("button")
        .map((button) => button.textContent),
    ).toEqual([
      "Triple Truchet Tile",
      "Tudor Rose",
      "Cat Ball",
      "Blanket Stitch Truchet Tile",
      "Stitch-less",
    ]);
    expect(
      within(
        screen.getByRole("region", { name: "Commissions + Collaborations" }),
      )
        .getAllByRole("button")
        .map((button) => button.textContent),
    ).toEqual([
      "SK100",
      "Calcio Italiano",
      "AFC Womens Asian Cup",
      "Pritchards Pencil",
      "Studio Honeymoone",
      "Indivisa",
    ]);
    const comingSoon = screen.getByRole("region", { name: "Can it Ball?" });
    expect(
      within(comingSoon).getByText(
        "A series testing out unique materials. Coming Soon!",
      ),
    ).toBeInTheDocument();
    expect(within(comingSoon).queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows each ball's details and its reel when available", async () => {
    render(<Portfolio />);
    for (const ball of soccerBalls) {
      fireEvent.click(screen.getByRole("button", { name: ball.name }));
      expect(
        screen.getByText(`Completed - ${ball.completed}`),
      ).toBeInTheDocument();
      expect(screen.getByText(ball.construction)).toBeInTheDocument();
      expect(screen.getByText(ball.description)).toBeInTheDocument();
      if (ball.instagramUrl) {
        expect(
          screen.getByTitle(`${ball.name} - Instagram reel`),
        ).toHaveAttribute("src", `${ball.instagramUrl}/embed/`);
        expect(
          screen.getByRole("link", { name: /watch on instagram/i }),
        ).toHaveAttribute("href", ball.instagramUrl);
      } else {
        expect(
          screen.queryByTitle(`${ball.name} - Instagram reel`),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole("link", { name: /watch on instagram/i }),
        ).not.toBeInTheDocument();
      }
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
      await waitFor(() =>
        expect(
          screen.queryByTitle(`${ball.name} - Instagram reel`),
        ).not.toBeInTheDocument(),
      );
    }
  });
  it("removes the reel for Studio Honeymoone and restores it for the next ball", () => {
    render(<Portfolio />);
    fireEvent.click(screen.getByRole("button", { name: "Pritchards Pencil" }));
    const previousVideo = screen.getByTitle(
      "Pritchards Pencil - Instagram reel",
    );

    fireEvent.click(screen.getByRole("button", { name: "Next ball" }));
    expect(
      screen.getByRole("heading", { name: "Studio Honeymoone" }),
    ).toBeInTheDocument();
    expect(previousVideo).not.toBeInTheDocument();
    expect(document.querySelector("dialog iframe")).toBeNull();
    expect(
      screen.queryByRole("link", { name: /watch on instagram/i }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next ball" }));
    expect(screen.getByTitle("Indivisa - Instagram reel")).toBeInTheDocument();
  });

  it("has no accessibility violations with the description-only dialog open", async () => {
    const { container } = render(<Portfolio />);
    fireEvent.click(screen.getByRole("button", { name: "Studio Honeymoone" }));
    await expectNoA11yViolations(container);
  });

  it("renders the page heading and a card for every ball", () => {
    render(<Portfolio />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Portfolio" }),
    ).toBeInTheDocument();

    for (const ball of soccerBalls) {
      expect(
        screen.getByRole("button", { name: ball.name }),
      ).toBeInTheDocument();
    }
  });

  it("opens a dialog with the ball's name and description when clicked", () => {
    render(<Portfolio />);
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
    render(<Portfolio />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.getByRole("dialog")).not.toHaveAttribute("open");
  });

  it("shows a different ball's details when another card is clicked", () => {
    render(<Portfolio />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the next ball when the next button is clicked", () => {
    render(<Portfolio />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    const previousVideo = screen.getByTitle(
      `${firstBall.name} - Instagram reel`,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next ball" }));
    expect(previousVideo).not.toBeInTheDocument();
    expect(
      screen.getByTitle(`${secondBall.name} - Instagram reel`),
    ).toHaveAttribute("src", `${secondBall.instagramUrl}/embed/`);

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the previous ball when the previous button is clicked", () => {
    render(<Portfolio />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Previous ball" }));

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the next ball when the right arrow key is pressed", () => {
    render(<Portfolio />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowRight" });

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the previous ball when the left arrow key is pressed", () => {
    render(<Portfolio />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowLeft" });

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the next ball when the dialog is swiped left", () => {
    render(<Portfolio />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    const dialog = screen.getByRole("dialog");
    swipe(dialog, { x: 200, y: 0 }, { x: 100, y: 0 });

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });

  it("shows the previous ball when the dialog is swiped right", () => {
    render(<Portfolio />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));
    const dialog = screen.getByRole("dialog");
    swipe(dialog, { x: 100, y: 0 }, { x: 200, y: 0 });

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("does not change the ball when the swipe is too short", () => {
    render(<Portfolio />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    const dialog = screen.getByRole("dialog");
    swipe(dialog, { x: 100, y: 0 }, { x: 120, y: 0 });

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("does not change the ball when the swipe is mostly vertical", () => {
    render(<Portfolio />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    const dialog = screen.getByRole("dialog");
    swipe(dialog, { x: 100, y: 0 }, { x: 160, y: 200 });

    expect(
      screen.getByRole("heading", { level: 2, name: firstBall.name }),
    ).toBeInTheDocument();
  });

  it("wraps around at both ends of the list", () => {
    render(<Portfolio />);
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
    const { container } = render(<Portfolio />);
    await expectNoA11yViolations(container);

    fireEvent.click(screen.getByRole("button", { name: soccerBalls[0].name }));
    await expectNoA11yViolations(container);
  });

  it("adds Product structured data for the open ball, and removes it when closed", async () => {
    render(<Portfolio />);
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
