import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';

// These are the two global stylesheets the app loads in src/main.tsx
// (everything else is a CSS Module imported directly by its component).
// Without them, CSS custom properties like --color-primary are undefined,
// so components render with browser-default colours/fonts instead of the
// real theme - including in the screenshots Vitest's browser mode captures
// on a failing test.
import './index.css';
import './theme/theme.css';

// Default every test to the light theme so those custom properties resolve
// to real values. Tests that render ThemeProvider override this via its own
// effect; tests that don't still get the real site styling instead of
// plain, unstyled markup.
beforeEach(() => {
  document.documentElement.setAttribute('data-theme', 'light');
});
