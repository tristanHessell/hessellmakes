# HessellMakes Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/d24a906a-cdd5-4b4a-b9b7-899eef1d9451/deploy-status)](https://app.netlify.com/projects/statuesque-smakager-0729f9/deploys)

This is a React and TypeScript site for the HessellMakes brand, built with
[Vite](https://vite.dev).
The site has 5 pages: Home, Gallery, About, Contact, and Design.
The hamburger nav links to Home, Gallery, and About only — a visitor can
reach Contact and Design only through the direct URL (see
[Pages & navigation](#pages--navigation)).
The site runs locally with hot reload, and the build produces a static
bundle for upload to any CDN.

## Requirements

- Node.js, version 18 or a later version.
  The file `.nvmrc` pins the exact version used by CI and by local
  development — see Install below.
- npm

## Install

If you use [nvm](https://github.com/nvm-sh/nvm), switch to the pinned Node
version first:

```bash
nvm use
```

If you do not have that version yet, run `nvm install` first.
This command reads the file `.nvmrc`, so local development always matches
the Node version GitHub Actions uses, set in
[.github/workflows/validate.yml](.github/workflows/validate.yml).

Then install the dependencies:

```bash
npm install
```

## Run locally

```bash
npm run dev
```

This command starts a dev server, at `http://localhost:5173` by default,
with hot module reload.

## Build for production

```bash
npm run build
```

This command type-checks the project, then builds a static bundle into
`dist/`.
Each asset uses an absolute path, rooted at `/` — the setting `base: '/'` in
`vite.config.ts`.
Because of this, the site must sit at the domain root; change the `base`
setting if the site ever moves to a subfolder.

Before you deploy, preview the production build locally:

```bash
npm run preview
```

## Deploying to a CDN

Upload all the contents of `dist/` to your CDN or static host.
The site needs no server-side runtime — it is plain HTML, CSS, and JS.

The routing uses real URLs (see
[Pages & navigation](#pages--navigation)).
Because of this, the host needs an SPA fallback rewrite rule: a rule that
sends each path with no matching real file, for example `/gallery` or
`/contact`, to `dist/index.html`, instead of a 404 error.
React Router then reads the real path and renders the correct page.
Most static hosts and CDNs support this kind of rule, often called a
"rewrite all to index.html" rule or a "single-page app" rule.
The file `public/_redirects` already gives this rule for Netlify, and for
Cloudflare Pages, which also reads this file format.
The build copies this file to `dist/_redirects` automatically.

## Tests

The tests use [Vitest](https://vitest.dev), in browser mode, with
[React Testing Library](https://testing-library.com/react) — not Jest.
Each test runs inside a real headless Chromium instance, through Playwright,
not inside a simulated DOM (jsdom).
Because of this, the test results show real browser behaviour.

Before your first test run, install the Chromium browser that Playwright
needs:

```bash
npm run playwright:install
```

Then run the tests:

```bash
npm run test        # run once
npm run test:watch  # watch mode
```

Each test file sits next to the code it tests, with the name `*.test.tsx`.

## Linting, formatting & spellcheck

This project uses the standard, default config for each tool below, with
little customisation:

| Tool                              | Config file         | Checks                                                                                                                                                                | Command                                     |
| --------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [ESLint](https://eslint.org)      | `eslint.config.js`  | TypeScript and React code. Flat config, with `@eslint/js`, the recommended `typescript-eslint` rules, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. | `npm run lint` / `npm run lint:fix`         |
| [Prettier](https://prettier.io)   | `.prettierrc.json`  | Formatting. All settings use the default value.                                                                                                                       | `npm run format` / `npm run format:check`   |
| [Stylelint](https://stylelint.io) | `.stylelintrc.json` | CSS. Uses `stylelint-config-standard` and `stylelint-config-css-modules`. The rule `selector-class-pattern` allows the camelCase class names from CSS Modules.        | `npm run lint:css` / `npm run lint:css:fix` |
| [cspell](https://cspell.org)      | `cspell.json`       | Spelling, in code and in docs. Set to British English (`en-GB`), to match this repository.                                                                            | `npm run spellcheck`                        |

The ESLint config lists `eslint-config-prettier` last.
This turns off every ESLint formatting rule that could conflict with
Prettier, so the two tools never disagree.

Run every check above, plus the tests, together with this command:

```bash
npm run validate
```

## Continuous integration

The file `.github/workflows/validate.yml` sets up a GitHub Actions workflow.
This workflow runs `npm run validate` — the full check above, with the
tests — on each pull request against `main`.
The workflow first installs Chromium through Playwright on the runner,
since the tests need a real browser, not jsdom (see [Tests](#tests)).

This workflow shows a pass or fail check on each pull request.
To block a bad pull request from merging, require a pull request for each
change to `main`, and set this workflow as a required status check:

1. Go to **Settings → Branches → Add branch protection rule** for `main`.
2. Turn on "Require a pull request before merging".
3. Turn on "Require status checks to pass before merging".
   Select the `validate` check.

With this setup, each change to `main` goes through a pull request, and the
`validate` check must pass before GitHub allows the merge.
Netlify's own Git integration then deploys `main` as usual, so a broken
change never reaches `main`, and never reaches the live site.

## Theming (light / dark mode)

The brand colours come from the HessellMakes colour guide, `ColourGuide.pdf`:
Aussie Blue (`#1F305E`), English Red (`#C93C47`), Cream (`#CEB99F`), Black,
and White.
These colours live in `src/theme/colors.ts`.

- `src/theme/theme.css` sets CSS variables — for example `--color-bg`,
  `--color-text`, `--color-primary`, and `--color-danger` — for
  `[data-theme="light"]` and for `[data-theme="dark"]`.
  Each component must use these variables, never a fixed colour value.
- Use `--color-primary` and `--color-primary-text` for every regular button
  and interactive state — Aussie Blue in light mode, Cream in dark mode.
  Use `--color-danger` and `--color-danger-text` (English Red) only for a
  negative or destructive action; the site has no such action yet.
- `src/theme/ThemeContext.tsx` exports `ThemeProvider` and the hook
  `useTheme()`.
  On start, the provider reads the theme from `localStorage`, or from the
  browser setting `prefers-color-scheme` when `localStorage` has no theme,
  and it saves each change.
- `src/components/ThemeToggle.tsx` is a button.
  A click on this button switches between light mode and dark mode, through
  the function `useTheme().toggleTheme()`.

To use the theme in a new part of the app, call `useTheme()` from any child
component.
The file `src/App.tsx` already wraps the app in `<ThemeProvider>`.

## Styling: CSS Modules

Component styles and page styles use
[CSS Modules](https://vite.dev/guide/features.html#css-modules).
Each style sheet has the name `*.module.css`, for example
`NavMenu.module.css`, and each one is imported as a JS object:

```tsx
import styles from './NavMenu.module.css'

<div className={styles.navMenu}>
```

Vite scopes each class name to its own component automatically, so a class
name can stay short — for example `.link`, `.toggle`, or `.card` — with no
collision across files.
To combine multiple classes, use a template string, for example
`` `${styles.cta} ${styles.ctaPrimary}` ``.
A test that checks a class name, for example an active nav link, must
import the same `styles` object; do not hardcode the generated class string
in a test.

The global design tokens and the style reset, in `src/theme/theme.css` and
`src/index.css`, are not CSS Modules — this is correct by design.
These 2 files set CSS variables on `:root` and on `[data-theme]`, and base
element styles that must apply across the whole page.
CSS Modules scope styles to one component, so CSS Modules do not fit this
purpose.

## Responsive layout

The site works from phone widths up to laptop and desktop widths:

- `index.html` sets the tag
  `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
  and `src/index.css` sets a global `box-sizing: border-box` reset.
- Each grid, for example the features grid and the gallery grid, uses
  `repeat(auto-fit, minmax(...))`.
  Because of this, the columns collapse as the viewport narrows, with no
  separate breakpoint needed.
- The breakpoint `@media (width <= 640px)`, for a phone-sized screen,
  reduces the padding, stacks the hero call-to-action buttons, makes the
  contact submit button full width, and shrinks the header.
  The breakpoint `@media (width <= 380px)` hides the wordmark text, on a
  very narrow phone, to keep room for the hamburger icon and the theme
  toggle.
- The hero heading uses `clamp()` for its font size, so the font size scales
  smoothly between phone width and laptop width, with no sudden jump at a
  fixed breakpoint.

## Pages & navigation

The routing uses [React Router](https://reactrouter.com), in declarative
mode, through `BrowserRouter`.
Because of this, a URL looks like `/gallery`, not `/#/gallery`.
This setup needs the SPA fallback rewrite rule described in
[Deploying to a CDN](#deploying-to-a-cdn): each path resolves to the same
`index.html` file, and React Router then reads the route from the real URL
path.

- `/` — Home, in `src/pages/Home.tsx`.
  This page has the hero section and the features section.
- `/gallery` — Gallery, in `src/pages/Gallery.tsx`.
  This page shows a grid of custom soccer balls.
  A click on a ball opens a dialog with its name and its description.
- `/about` — About, in `src/pages/About.tsx`.
  This page has a founder blurb and a portrait.
  The portrait is a placeholder graphic,
  `src/components/FounderPortrait.tsx`, until a real photo is ready.
- `/contact` — Contact, in `src/pages/Contact.tsx`.
  This page has a simple contact form.
  By design, this page is not linked from the nav, and not linked from any
  other part of the UI — a visitor can reach this page only through the
  direct URL.
- `/design` — Design, in `src/pages/Design.tsx`.
  This page shows the brand colour palette.
  This page is also unlinked, by design, for the same reason.

Each page renders inside `AppLayout`, in `src/components/AppLayout.tsx`.
`AppLayout` renders the shared header (the logo, the hamburger nav, and the
theme toggle) and the footer, around a React Router `<Outlet />`.
The hamburger menu, in `src/components/NavMenu.tsx`, links to Home, to
Gallery, and to About, and highlights the active page.

## Project structure

```
index.html                       Entry HTML page
src/main.tsx                      App entry point
src/App.tsx                       Sets up ThemeProvider + BrowserRouter + routes
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
src/pages/Gallery.tsx              Gallery page (soccer balls + info dialog)
src/pages/Gallery.module.css       Gallery styles
src/pages/About.tsx                About page (founder blurb + portrait)
src/pages/About.module.css         About styles
src/components/FounderPortrait.tsx Placeholder founder portrait glyph
src/pages/Contact.tsx              Contact page
src/pages/Contact.module.css       Contact styles
src/pages/Design.tsx               Design page (brand palette; not linked from the nav)
src/pages/Design.module.css        Design styles
src/data/soccerBalls.ts            Soccer ball product data (name, photo, description)
src/assets/gallery/                Soccer ball product photos
src/setupTests.ts                  Test setup (jest-dom matchers)
vite.config.ts                     Build & test configuration
tsconfig*.json                      TypeScript configuration
```
