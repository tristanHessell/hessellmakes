import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Gallery } from "./Gallery";

describe("Gallery", () => {
  it("renders the page heading", () => {
    render(<Gallery />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Gallery" }),
    ).toBeInTheDocument();
  });

  it("renders a placeholder for each piece", () => {
    render(<Gallery />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(6);
  });
});
