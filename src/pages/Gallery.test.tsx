import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Gallery } from "./Gallery";
import { soccerBalls } from "../data/soccerBalls";

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
});
