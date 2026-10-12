import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeName } from "./colors";

const STORAGE_KEY = "hessellmakes-theme";

interface ThemeContextValue {
  theme: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

/** The theme the user set explicitly, through the theme toggle, if any. */
function getStoredTheme(): ThemeName | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

/** The theme the user's browser or OS currently prefers. */
function getSystemTheme(): ThemeName {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia?.(DARK_MEDIA_QUERY)?.matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(
    () => getStoredTheme() ?? getSystemTheme(),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    // The user has not chosen a theme explicitly yet, so this component
    // must keep following the browser or OS theme, until the user does.
    const media = window.matchMedia?.(DARK_MEDIA_QUERY);
    if (!media) {
      return;
    }

    function handleChange(event: MediaQueryListEvent) {
      if (getStoredTheme() !== null) {
        return;
      }
      setThemeState(event.matches ? "dark" : "light");
    }

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  function setTheme(next: ThemeName) {
    window.localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
