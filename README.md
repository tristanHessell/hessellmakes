# HessellMakes Website

A React + TypeScript site for HessellMakes, built with [Vite](https://vite.dev). It has four pages — Home, Gallery, Catalog, and Contact — runs locally with hot reload, and builds to a static bundle you can upload to any CDN.

## Requirements

- Node.js 18 or newer
- npm

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Starts a dev server (default `http://localhost:5173`) with hot module reload.

## Build for production

```bash
npm run build
```

Type-checks the project and outputs a static bundle to `dist/`. Assets use relative paths (`base: './'` in `vite.config.ts`), so the contents of `dist/` can be uploaded as-is to a CDN or any static host, at the domain root or a subfolder.

Preview the production build locally before deploying:

```bash
npm run preview
```

## Deploying to a CDN

Upload the entire contents of `dist/` to your CDN/static host. No server-side runtime is required — it's plain HTML/CSS/JS.

## Tests

Tests use [Vitest](https://vitest.dev) in **browser mode** with [React Testing Library](https://testing-library.com/react) (not Jest). Tests run inside a real headless Chromium instance via Playwright rather than a simulated DOM (jsdom), so the results reflect actual browser behaviour.

The first time you run tests, install the Chromium browser Playwright needs:

```bash
npm run playwright:install
```

Then run the tests:

```bash
npm run test        # run once
npm run test:watch  # watch mode
```

Test files live alongside the code they test, using the `*.test.tsx` naming convention.

## Linting, formatting & spellcheck

The project uses default/standard configs for each tool — nothing heavily customised:

| Tool                              | Config file         | Checks                                                                                                                                                       | Command                                     |
| --------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| [ESLint](https://eslint.org)      | `eslint.config.js`  | TypeScript/React code (flat config: `@eslint/js` + `typescript-eslint` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`)            | `npm run lint` / `npm run lint:fix`         |
| [Prettier](https://prettier.io)   | `.prettierrc.json`  | Formatting, all defaults (no overrides)                                                                                                                      | `npm run format` / `npm run format:check`   |
| [Stylelint](https://stylelint.io) | `.stylelintrc.json` | CSS (`stylelint-config-standard` + `stylelint-config-css-modules`, with `selector-class-pattern` relaxed to allow the camelCase class names CSS Modules use) | `npm run lint:css` / `npm run lint:css:fix` |
| [cspell](https://cspell.org)      | `cspell.json`       | Spelling across code/docs (British English — `en-GB` — to match this repo's spelling)                                                                        | `npm run spellcheck`                        |

`eslint-config-prettier` is included last in the ESLint config to turn off any formatting rules that would conflict with Prettier, so the two tools never fight each other.

Run everything at once (lint, stylelint, format check, spellcheck, tests) with:

```bash
npm run validate
```

## Theming (light / dark mode)

Colours come from the HessellMakes colour guide (`ColourGuide.pdf`): Aussie Blue `#1F305E`, English Red `#C93C47`, Cream `#CEB99F`, Black, and White. These live in `src/theme/colors.ts`.

- `src/theme/theme.css` defines CSS variables (`--color-bg`, `--color-text`, `--color-primary`, `--color-danger`, etc.) for `[data-theme="light"]` and `[data-theme="dark"]`. Components should always use these variables rather than hardcoded colours.
- `--color-primary`/`--color-primary-text` (Aussie Blue in light mode, Cream in dark mode) are used for all regular buttons and interactive states. `--color-danger`/`--color-danger-text` (English Red) are reserved for negative/destructive actions — there aren't any on this page yet.
- `src/theme/ThemeContext.tsx` provides a `ThemeProvider` and `useTheme()` hook. It picks an initial theme from `localStorage`, falling back to the browser's `prefers-color-scheme`, and persists changes.
- `src/components/ThemeToggle.tsx` is a button that flips between light and dark mode via `useTheme().toggleTheme()`.

To use the theme elsewhere, wrap the app in `<ThemeProvider>` (already done in `src/App.tsx`) and call `useTheme()` from any child component.

## Styling: CSS Modules

Component and page styles use [CSS Modules](https://vite.dev/guide/features.html#css-modules) — every stylesheet is named `*.module.css` (e.g. `NavMenu.module.css`) and imported as a JS object:

```tsx
import styles from './NavMenu.module.css'

<div className={styles.navMenu}>
```

Vite scopes each class to the component automatically, so class names can stay short (`.link`, `.toggle`, `.card`) without colliding across files. Combine multiple classes with a template string, e.g. `` `${styles.cta} ${styles.ctaPrimary}` ``. Tests that assert on a class name (e.g. an active nav link) import the same `styles` object rather than hardcoding the generated class string.

The global design tokens and reset (`src/theme/theme.css`, `src/index.css`) are deliberately **not** modules — they set CSS variables on `:root`/`[data-theme]` and base element styles that need to apply page-wide, which CSS Modules' per-component scoping isn't meant for.

## Responsive layout

The site is designed to work from phone widths up through laptop/desktop:

- `index.html` sets `<meta name="viewport" content="width=device-width, initial-scale=1.0">` and `src/index.css` applies a global `box-sizing: border-box` reset.
- Grids (features, gallery) use `repeat(auto-fit, minmax(...))` so columns collapse naturally as the viewport narrows, without needing separate breakpoints.
- A `@media (width <= 640px)` breakpoint (roughly phone-sized) tightens up padding, stacks the hero CTAs, makes the contact submit button full-width, and shrinks the header; an additional `@media (width <= 380px)` breakpoint hides the wordmark text on very narrow phones so the hamburger/theme toggle always have room.
- The hero heading uses `clamp()` so its font size scales smoothly between phone and laptop widths instead of jumping at a fixed breakpoint.

## Pages & navigation

Routing uses [React Router](https://reactrouter.com) in declarative mode via `HashRouter` (URLs look like `/#/gallery`). A hash router is used deliberately so the built site works on any static/CDN host without server-side URL rewrite rules — every route resolves to the same `index.html`.

- `/` — Home (`src/pages/Home.tsx`): hero, features, and the brand palette.
- `/gallery` — Gallery (`src/pages/Gallery.tsx`): placeholder grid for finished pieces.
- `/catalog` — Catalog (`src/pages/Catalog.tsx`): a grid of custom soccer balls; clicking a ball opens a dialog with its name and description.
- `/contact` — Contact (`src/pages/Contact.tsx`): a simple contact form.

All four pages are rendered inside `AppLayout` (`src/components/AppLayout.tsx`), which renders the shared header (logo, hamburger nav, theme toggle) and footer around a React Router `<Outlet />`. The hamburger menu (`src/components/NavMenu.tsx`) links to all four pages and highlights whichever one is active.

## Project structure

```
index.html                       Entry HTML page
src/main.tsx                      App entry point
src/App.tsx                       Sets up ThemeProvider + HashRouter + routes
src/theme/colors.ts                Brand colour tokens
src/theme/theme.css                Light/dark CSS variables (global, not a module)
src/theme/ThemeContext.tsx         Theme provider & useTheme hook
src/components/AppLayout.tsx       Shared header/nav/footer chrome
src/components/AppLayout.module.css AppLayout styles
src/components/NavMenu.tsx         Hamburger navigation menu (+ theme toggle)
src/components/NavMenu.module.css  NavMenu styles
src/components/ThemeToggle.tsx     Sun/moon light/dark mode toggle
src/components/ThemeToggle.module.css ThemeToggle styles
src/components/Logo.tsx            HessellMakes icon mark
src/pages/Home.tsx                 Home page
src/pages/Home.module.css          Home styles
src/pages/Gallery.tsx              Gallery page
src/pages/Gallery.module.css       Gallery styles
src/pages/Catalog.tsx              Catalog page (soccer balls + info dialog)
src/pages/Catalog.module.css       Catalog styles
src/pages/Contact.tsx              Contact page
src/pages/Contact.module.css       Contact styles
src/components/SoccerBall.tsx      Soccer ball SVG glyph used in the Catalog
src/data/soccerBalls.ts            Soccer ball product data (name, colour, description)
src/setupTests.ts                  Test setup (jest-dom matchers)
vite.config.ts                     Build & test configuration
tsconfig*.json                      TypeScript configuration
```
