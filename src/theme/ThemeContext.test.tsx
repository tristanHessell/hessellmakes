import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme}>
      current theme: {theme}
    </button>
  );
}

/** A fake `MediaQueryList` for "(prefers-color-scheme: dark)", so a test can
 * set the system theme, and simulate the user changing it, without a real
 * OS-level dark mode setting. */
function mockSystemTheme(prefersDark: boolean) {
  let matches = prefersDark;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  vi.spyOn(window, 'matchMedia').mockReturnValue({
    get matches() {
      return matches;
    },
    media: '(prefers-color-scheme: dark)',
    addEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => listeners.add(listener),
    removeEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => listeners.delete(listener),
  } as unknown as MediaQueryList);

  return {
    change(nextPrefersDark: boolean) {
      matches = nextPrefersDark;
      const event = { matches } as MediaQueryListEvent;
      for (const listener of listeners) {
        listener(event);
      }
    },
  };
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    vi.restoreAllMocks();
  });

  it('defaults to light when there is no stored preference or dark media match', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent(
      'current theme: light',
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggles between light and dark, persisting the choice', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('current theme: dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(window.localStorage.getItem('hessellmakes-theme')).toBe('dark');
  });

  it('reads a previously stored theme preference on mount', () => {
    window.localStorage.setItem('hessellmakes-theme', 'dark');

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('current theme: dark');
  });

  it('defaults to dark when the browser or OS prefers dark, and there is no stored preference', () => {
    mockSystemTheme(true);

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('current theme: dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('follows a change in the browser or OS theme, when there is no stored preference', () => {
    const systemTheme = mockSystemTheme(false);

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button')).toHaveTextContent(
      'current theme: light',
    );

    act(() => systemTheme.change(true));

    expect(screen.getByRole('button')).toHaveTextContent('current theme: dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('ignores a change in the browser or OS theme, once the user has chosen a theme', () => {
    const systemTheme = mockSystemTheme(false);

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('current theme: dark');

    // The OS or browser theme goes back to light, but the user already made
    // an explicit choice, so the app must not follow this change.
    act(() => systemTheme.change(false));

    expect(screen.getByRole('button')).toHaveTextContent('current theme: dark');
  });
});
