import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { siteRoutes } from "./siteRoutes";

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

  it("renders the home page at the site root", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Handmade soccer balls, built to last.",
      }),
    ).toBeInTheDocument();
  });

  it("applies a theme attribute to the document root", () => {
    render(<App />);
    expect(document.documentElement.getAttribute("data-theme")).toMatch(
      /^(light|dark)$/,
    );
  });

  it.each(Object.entries(siteRoutes))(
    "uses the shared indexing setting for %s",
    (_page, { path, indexable }) => {
      window.history.pushState({}, "", `/${path}`);
      render(<App />);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
        "content",
        indexable ? "index, follow" : "noindex, nofollow",
      );
    },
  );

  it("navigates to the shop through its relative navigation link", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(await screen.findByRole("link", { name: "Shop" }));
    expect(window.location.pathname).toBe("/shop");
    expect(
      screen.getByRole("heading", { level: 1, name: "Shop" }),
    ).toBeVisible();
  });

  it("links to the shop from the home page", () => {
    render(<App />);
    const shopLink = screen.getByRole("link", { name: "Visit the shop" });
    expect(shopLink).toHaveAttribute("href", "/shop");
    fireEvent.click(shopLink);
    expect(window.location.pathname).toBe("/shop");
    expect(screen.getByRole("heading", { name: "Shop" })).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "The pre-made collection" }),
    ).not.toBeInTheDocument();
  });

  it("navigates to the Portfolio and About pages via the hamburger menu", async () => {
    render(<App />);

    // The dropdown fades/flips visibility in via a CSS transition, so a nav
    // link isn't in the accessibility tree the instant the menu's class
    // changes - findByRole retries until the transition has actually
    // applied.
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(await screen.findByRole("link", { name: "Portfolio" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Portfolio" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(await screen.findByRole("link", { name: "About" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "About" }),
    ).toBeInTheDocument();
  });

  it.each([
    ["/portfolio", "Portfolio"],
    ["/shop", "Shop"],
    ["/about", "About"],
    ["/contact", "Contact"],
    ["/design", "Our palette"],
  ])("renders a direct visit to %s", (path, heading) => {
    window.history.pushState({}, "", path);
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: heading }),
    ).toBeInTheDocument();
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${window.location.origin}${path}`,
    );
  });

  it.each([
    ["/site", "/"],
    ["/site/", "/"],
    ["/site/gallery?ref=bookmark#details", "/portfolio?ref=bookmark#details"],
    ["/gallery?ref=bookmark#details", "/portfolio?ref=bookmark#details"],
    ["/gallery/", "/portfolio"],
    ["/site/portfolio", "/portfolio"],
    ["/site/shop", "/shop"],
    ["/site/about", "/about"],
    ["/site/contact", "/contact"],
    ["/site/design", "/design"],
  ])("redirects the old URL %s to %s", (oldPath, newPath) => {
    window.history.pushState({}, "", oldPath);
    render(<App />);
    expect(
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
    ).toBe(newPath);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
