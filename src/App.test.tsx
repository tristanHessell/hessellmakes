import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the home page by default", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Handmade, built to last.",
      }),
    ).toBeInTheDocument();
  });

  it("applies a theme attribute to the document root", () => {
    render(<App />);
    expect(document.documentElement.getAttribute("data-theme")).toMatch(
      /^(light|dark)$/,
    );
  });

  it("navigates to the Gallery, Catalog and Contact pages via the hamburger menu", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getByRole("link", { name: "Gallery" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Gallery" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getByRole("link", { name: "Catalog" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Catalog" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getByRole("link", { name: "Contact" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeInTheDocument();
  });
});
