import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavMenu } from "./NavMenu";
import { ThemeProvider } from "../theme/ThemeContext";
import { expectNoA11yViolations } from "../testUtils/a11y";
import styles from "./NavMenu.module.css";

function renderNavMenu() {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={["/"]}>
        <NavMenu />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("NavMenu", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("is collapsed by default", () => {
    renderNavMenu();

    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the menu when the hamburger button is clicked", () => {
    renderNavMenu();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("renders links to each page", async () => {
    renderNavMenu();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    // The dropdown fades/flips visibility in via a CSS transition, so it
    // isn't in the accessibility tree the instant the class changes —
    // findByRole retries until the transition has actually applied.
    expect(await screen.findByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "href",
      "/gallery",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
      "href",
      "/shop",
    );
  });

  it("marks the current page link as active", async () => {
    renderNavMenu();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    expect(await screen.findByRole("link", { name: "Home" })).toHaveClass(
      styles.linkActive,
    );
    expect(screen.getByRole("link", { name: "Gallery" })).not.toHaveClass(
      styles.linkActive,
    );
  });

  it("closes the menu after a link is clicked", async () => {
    renderNavMenu();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(await screen.findByRole("link", { name: "Gallery" }));

    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes the menu when Escape is pressed", () => {
    renderNavMenu();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("includes the light/dark mode toggle inside the menu", async () => {
    renderNavMenu();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    expect(
      await screen.findByRole("button", { name: /switch to dark mode/i }),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations, collapsed or open", async () => {
    const { container } = renderNavMenu();
    await expectNoA11yViolations(container);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    await expectNoA11yViolations(container);
  });
});
