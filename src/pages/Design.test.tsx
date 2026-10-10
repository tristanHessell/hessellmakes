import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Design } from "./Design";

describe("Design", () => {
  it("lists all five brand palette colours", () => {
    render(<Design />);

    for (const name of [
      "Aussie Blue",
      "English Red",
      "Cream",
      "Black",
      "White",
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
