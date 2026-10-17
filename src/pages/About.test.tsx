import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "./About";
import emily from "../assets/emily.webp";

describe("About", () => {
  it("renders the page heading and Emily's introduction without a name heading", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { level: 1, name: "About" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("My name’s Emily and I love making balls."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("renders a portrait for the founder", () => {
    render(<About />);

    expect(
      screen.getByRole("img", {
        name: /Emily holding two handmade leather soccer balls/i,
      }),
    ).toHaveAttribute("src", emily);
  });
});
