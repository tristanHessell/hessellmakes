import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./NavMenu.module.css";

interface NavItem {
  label: string;
  to: string;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
];

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        // The menu becomes invisible immediately, so move focus back to the
        // toggle rather than leaving it stranded on a hidden link.
        toggleRef.current?.focus();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.navMenu} ref={containerRef}>
      <button
        type="button"
        ref={toggleRef}
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.bar} aria-hidden="true" />
        <span className={styles.bar} aria-hidden="true" />
        <span className={styles.bar} aria-hidden="true" />
      </button>

      <nav
        id="primary-navigation"
        className={isOpen ? `${styles.list} ${styles.listOpen}` : styles.list}
        aria-label="Primary"
      >
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }: { isActive: boolean }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className={styles.divider} role="separator" />
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
}
