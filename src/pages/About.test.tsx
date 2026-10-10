import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "./About";

describe("About", () => {
  it("renders the page heading and founder name", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { level: 1, name: "About" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Ava Hessell" }),
    ).toBeInTheDocument();
  });

  it("renders a portrait for the founder", () => {
    render(<About />);

    expect(
      screen.getByRole("img", { name: /placeholder portrait/i }),
    ).toBeInTheDocument();
  });
});
