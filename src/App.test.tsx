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

  it("navigates to the Gallery and About pages via the hamburger menu", async () => {
    render(<App />);

    // The dropdown fades/flips visibility in via a CSS transition, so a nav
    // link isn't in the accessibility tree the instant the menu's class
    // changes — findByRole retries until the transition has actually
    // applied.
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(await screen.findByRole("link", { name: "Gallery" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Gallery" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(await screen.findByRole("link", { name: "About" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "About" }),
    ).toBeInTheDocument();
  });
});
