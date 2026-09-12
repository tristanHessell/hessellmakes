import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Catalog } from "./Catalog";
import { soccerBalls } from "../data/soccerBalls";

describe("Catalog", () => {
  it("renders the page heading and a card for every ball", () => {
    render(<Catalog />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Catalog" }),
    ).toBeInTheDocument();

    for (const ball of soccerBalls) {
      expect(
        screen.getByRole("button", { name: ball.name }),
      ).toBeInTheDocument();
    }
  });

  it("opens a dialog with the ball's name and description when clicked", () => {
    render(<Catalog />);
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
    render(<Catalog />);
    const firstBall = soccerBalls[0];

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.getByRole("dialog")).not.toHaveAttribute("open");
  });

  it("shows a different ball's details when another card is clicked", () => {
    render(<Catalog />);
    const [firstBall, secondBall] = soccerBalls;

    fireEvent.click(screen.getByRole("button", { name: firstBall.name }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(screen.getByRole("button", { name: secondBall.name }));

    expect(
      screen.getByRole("heading", { level: 2, name: secondBall.name }),
    ).toBeInTheDocument();
  });
});
