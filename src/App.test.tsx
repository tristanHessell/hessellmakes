import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  // TEMPORARY: the site root shows a Coming Soon page, and the real site
  // sits under "/site" — see the routing comment in App.tsx. This test, and
  // the "/site" push in each test below, can go once that page is removed.
  it("shows the coming soon page at the site root", () => {
    render(<App />);
    expect(screen.getByText(/coming soon!$/i)).toBeInTheDocument();
  });

  it("renders the home page under /site", () => {
    window.history.pushState({}, "", "/site");
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Handmade soccer balls, built to last.",
      }),
    ).toBeInTheDocument();
  });

  it("applies a theme attribute to the document root", () => {
    window.history.pushState({}, "", "/site");
    render(<App />);
    expect(document.documentElement.getAttribute("data-theme")).toMatch(
      /^(light|dark)$/,
    );
  });

  it("navigates to the Gallery and About pages via the hamburger menu", async () => {
    window.history.pushState({}, "", "/site");
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
