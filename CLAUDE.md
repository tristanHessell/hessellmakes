# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install                # install dependencies
npm run dev                # dev server with HMR (http://localhost:5173)
npm run build              # tsc -b type-check, then vite build to dist/
npm run preview            # preview the production build locally

npm run playwright:install # one-time: installs Chromium for Vitest browser mode
npm run test                # run all tests once
npm run test:watch          # watch mode
npx vitest run src/pages/Catalog.test.tsx   # run a single test file
npx vitest run -t "opens a dialog"          # run tests matching a name

npm run lint / lint:fix     # ESLint (TS/React)
npm run lint:css / lint:css:fix  # Stylelint (CSS Modules)
npm run format / format:check    # Prettier
npm run spellcheck           # cspell (en-GB)
npm run validate             # lint + lint:css + format:check + spellcheck + test — run before considering work done
```

Tests use **Vitest in browser mode** (real headless Chromium via Playwright + `@vitest/browser-playwright`), not jsdom and not Jest — assertions reflect actual browser behaviour. Test files live next to the code they cover as `*.test.tsx`.

## Architecture

This is a static React + TypeScript site (Vite) for the HessellMakes brand, built as relocatable static assets (`base: './'` in `vite.config.ts`) for CDN hosting — no server runtime.

- **Routing**: `react-router-dom`'s `HashRouter` (deliberate — URLs like `/#/gallery` need no server-side rewrite rules on a static host). Routes are declared in `src/App.tsx`; all pages render inside `AppLayout` (`src/components/AppLayout.tsx`), which supplies the shared header/hamburger-nav/footer around an `<Outlet />`. Pages: `/` (Home), `/gallery`, `/catalog`, `/contact`.
- **Theming**: `src/theme/colors.ts` holds the brand palette (sourced from `ColourGuide.pdf`). `src/theme/theme.css` maps those colours to CSS custom properties per `[data-theme="light"|"dark"]` — components must consume the variables (`--color-primary`, `--color-bg`, etc.), never hardcode colours. `--color-danger`/`--color-danger-text` (English Red) is reserved exclusively for destructive/negative actions; regular buttons use `--color-primary`. `src/theme/ThemeContext.tsx` exposes `ThemeProvider`/`useTheme()`, initializing from `localStorage` then `prefers-color-scheme`, and persisting changes. The toggle lives inside the hamburger menu (`src/components/ThemeToggle.tsx`), not in the header directly.
- **Styling**: CSS Modules everywhere (`*.module.css`, camelCase class names, `import styles from './X.module.css'`) except the two genuinely global stylesheets — `src/theme/theme.css` (CSS variables on `:root`/`[data-theme]`) and `src/index.css` (base reset) — which are intentionally not modules.
- **Responsive layout**: no component-level breakpoint logic; grids use `repeat(auto-fit, minmax(...))` to reflow naturally, plus shared breakpoints at `@media (width <= 640px)` (phone-sized adjustments) and `@media (width <= 380px)` (hides the wordmark so the header still fits) using range-notation media queries (Stylelint-enforced style).
- **Catalog pattern**: `src/pages/Catalog.tsx` is the reference for "grid of items → native `<dialog>` on click" — product data lives separately in `src/data/soccerBalls.ts`, and a reusable placeholder glyph (`src/components/SoccerBall.tsx`) is parameterized by `accentColor` from the brand palette rather than using real photos.

## Tooling notes

- ESLint uses flat config (`eslint.config.js`, ESLint 10 + `typescript-eslint`). `eslint-plugin-react-hooks`'s flat preset must be referenced as `reactHooks.configs.flat['recommended-latest']`, not the legacy top-level export. `eslint-config-prettier` is last in the config so Prettier and ESLint never disagree on formatting.
- Stylelint (`stylelint-config-standard` + `stylelint-config-css-modules`) has `selector-class-pattern` overridden to `^[a-z][a-zA-Z0-9]*$` since `stylelint-config-css-modules` does not itself relax that rule for camelCase CSS Module class names.
- cspell (`cspell.json`) is configured for British English (`en-GB`); add genuinely new project-specific words to its `words` list rather than disabling checks.
- All four tools (plus tests) are aggregated by `npm run validate`.
