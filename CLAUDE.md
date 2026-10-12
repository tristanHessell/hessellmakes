# CLAUDE.md

This file gives rules to Claude Code for work in this repository.

## Writing style for non-user text

Write all text in ASD-STE100 (Simplified Technical English) style, except text that a visitor to the website sees (page headings, button labels, body copy).
This rule covers code comments, commit messages, pull request text, and the prose in `CLAUDE.md` and `README.md`.

This project is a software project, not an aircraft maintenance manual.
Do not restrict words to the ASD-STE100 approved word list — that list has no entries for terms like "component" or "repository".
Instead, follow the structural and grammar rules below:

- Write short sentences.
  Use 20 words or fewer in an instruction.
  Use 25 words or fewer in a statement.
- Write one idea in each sentence.
  Split a sentence with "and", "which", or a dash into 2 or more sentences.
- Use the active voice.
  Write "Run the build", not "The build is run".
- Use simple verb forms: the simple present tense, the simple past tense, or the imperative mood.
  Do not use continuous or perfect tenses.
- Use articles.
  Write "the file", not "file".
- Do not chain more than 3 nouns together.
  Write "the config file for ESLint", not "the ESLint config file settings".
- Use the same word for the same idea each time.
  Do not swap in a synonym.
- Do not use idioms or slang.
- Use a numbered or bulleted list for a sequence of steps.

## Commit message format

Write each commit message in the Conventional Commits format: `type(scope): description`.

- Use one of these types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, or `chore`.
- Add a scope in parentheses when it helps, for example `fix(workflow):` or `feat(gallery):`.
  Skip the scope when the change touches many areas.
- Write the description in the imperative mood, in lower case, with no full stop at the end — for example `fix(workflow): remove invalid secrets reference from if condition`.
- Add `!` after the type or scope for a breaking change, for example `feat!: drop support for Node 18`, and explain the break in a `BREAKING CHANGE:` footer.
- Add a body when the summary line needs more context.
  Write the body in the ASD-STE100 style above, and explain why the change was made, not just what changed.
- Add an attribution footer to every commit that an agent contributes to.
  For Codex, use `Co-Authored-By: Codex <noreply@openai.com>`.
  For Claude, keep the attribution footer from its system instructions, for example `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.
  Separate the footer from the body with a blank line.
  Keep the attribution footer as the last line.

## Commands

```bash
npm install                # install dependencies
npm run dev                # dev server with HMR (http://localhost:5173)
npm run build              # tsc -b type-check, then vite build to dist/
npm run preview            # preview the production build locally

npm run playwright:install # one-time: installs Chromium for Vitest browser mode
npm run test                # run all tests once
npm run test:watch          # watch mode
npx vitest run src/pages/Gallery.test.tsx   # run a single test file
npx vitest run -t "opens a dialog"          # run tests matching a name

npm run lint / lint:fix     # ESLint (TS/React)
npm run lint:css / lint:css:fix  # Stylelint (CSS Modules)
npm run lint:md / lint:md:fix    # markdownlint (all Markdown files)
npm run format / format:check    # Prettier
npm run spellcheck           # cspell (en-GB)
npm run validate             # lint + lint:css + lint:md + lint:package-json + format:check + spellcheck + test + build — run before considering work done
```

The tests run in Vitest browser mode.
This mode uses real headless Chromium through Playwright and `@vitest/browser-playwright`.
The tests do not use jsdom.
The tests do not use Jest.
The test results show real browser behaviour.
Each test file sits next to the code it tests, with the name `*.test.tsx`.

The file `src/setupTests.ts` imports 2 global style sheets: `theme.css` and `index.css`.
Before each test, this file sets `data-theme="light"` on `document.documentElement`.
This makes a component use the real theme colours and fonts, not the browser defaults.
Because of this, a failed test produces a correct screenshot of the styled page.
A test that renders `ThemeProvider` can still change the theme through the normal `ThemeProvider` effect.

**Accessibility tests**: The file `src/testUtils/a11y.ts` exports the function `expectNoA11yViolations(container)`.
Several test files call this function, for example `Home.test.tsx` and `NavMenu.test.tsx`.
The function runs `axe-core` on a rendered container, then checks for 0 violations.
The function calls `axe-core` directly.
The function does not use a `jest-axe` or `vitest-axe` wrapper.
Do not add such a wrapper.
These wrappers load `axe-core` through Node's `createRequire` function, and this fails in real-browser mode — Vite removes `node:module` from client code, which gives the error `TypeError: ... createRequire is not a function`.
Add this same test pattern to each new page and each new interactive component.
For an interactive component, call the function once for each distinct state — for example, the nav menu closed and the nav menu open, or the dialog closed and the dialog open.

## Architecture

This is a static React and TypeScript site, built with Vite, for the HessellMakes brand.
The build produces static assets only, with no server runtime, for CDN hosting.
The file `vite.config.ts` sets `base: '/'`.
This setting assumes the site sits at the domain root.

**Routing**: The app uses `BrowserRouter` from `react-router-dom`.
This gives real URLs, for example `/site/gallery`, instead of hash URLs like `/#/site/gallery`.
Because of this, the static host needs an SPA fallback rewrite rule, to send each unmatched path to `index.html` — without this rule, a direct link to `/site/gallery` or a refresh on `/site/gallery` gives a 404 error.
`src/App.tsx` declares the routes.
Each page except `ComingSoon` renders inside `AppLayout` (`src/components/AppLayout.tsx`), which gives the shared header, the hamburger nav, and the footer around an `<Outlet />`.
`AppLayout`, `NavMenu`, and the in-app links all use route-relative paths, for example `to="."` and `to="gallery"`, not an absolute path like `to="/gallery"`.
Because of this, the whole site still works if its mount path, currently `/site`, ever changes.
The pages are:

- `/` — `ComingSoon` (`src/pages/ComingSoon.tsx`). **Temporary**: see the "Coming Soon page" note below.
- `/site` — Home.
- `/site/gallery` — Gallery.
- `/site/about` — About.
  This page has the founder blurb, in `src/pages/About.tsx`.
  This page uses `src/components/FounderPortrait.tsx` as a placeholder graphic, until a real photo is ready.
- `/site/contact` — Contact.
  `NavMenu` does not link to this page, and no other UI element links to this page.
  A visitor can reach this page only through the URL.
- `/site/design` — Design.
  This page shows the brand colour palette, in `src/pages/Design.tsx`.
  `NavMenu` does not link to this page, and no other UI element links to this page.
  A visitor can reach this page only through the URL.

**Coming Soon page (temporary)**: `src/pages/ComingSoon.tsx` is a holding page, shown at the site root while the rest of the site sits under `/site`.
It shows the logo, with the same hover animation as the header, the message "Coming soon!", and the footer.
It reuses `src/components/Footer.tsx`, the component `AppLayout` also uses, but keeps its own CSS module, so it has no other tie to `AppLayout`.
To remove this page and restore the site at `/`, follow the numbered comment next to the routes in `src/App.tsx`.

**SEO**: `src/hooks/useSeo.ts` sets the document title, the meta description, the canonical link, the robots directive, and the Open Graph / Twitter preview tags, for the current page.
Call it once in each page component, with a short `title` and a 1 or 2 sentence `description` — see an existing page for the exact shape.
Pass `noindex: true` for a page that is intentionally unlinked, for example Contact or Design, so a search engine does not index it.
`index.html` sets a default value for each of these tags, and a static `LocalBusiness` JSON-LD block, for a crawler that does not run JavaScript; `useSeo` then overrides the tags with a page-specific value, for a crawler or a browser that does.
`src/hooks/useJsonLd.ts` adds a `<script type="application/ld+json">` with structured data to the page, for example the `Product` data Gallery adds for the open ball, and removes it again when the data changes or the component unmounts.
`public/robots.txt` and `public/sitemap.xml` are static files, copied as-is into the build.
Update both, along with the hardcoded domain in `index.html`, if the live domain, `https://www.hessellmakes.com`, ever changes.
**Temporary**: `public/sitemap.xml` lists each page's current URL, under `/site`; update these URLs, the same way as the routes in `src/App.tsx`, once the Coming Soon page comes down.

**Theming**: `src/theme/colors.ts` holds the brand palette, taken from `ColourGuide.pdf`.
`src/theme/theme.css` maps these colours to CSS custom properties, set per `[data-theme="light"]` and per `[data-theme="dark"]`.
Each component must use these properties, for example `--color-primary` and `--color-bg` — never write a fixed colour value in a component.
Use `--color-danger` and `--color-danger-text` (English Red) only for a destructive or negative action; use `--color-primary` for a normal button.
`src/theme/ThemeContext.tsx` exports `ThemeProvider` and the hook `useTheme()`.
On start, `ThemeProvider` reads the theme from `localStorage`, or from the setting `prefers-color-scheme` when `localStorage` has no theme, and it saves each change.
The theme toggle sits inside the hamburger menu (`src/components/ThemeToggle.tsx`), not in the header.

**Styling**: The app uses CSS Modules in each component — each file has the name `*.module.css`, each class name uses camelCase, and each import reads `import styles from './X.module.css'`.
There are 2 exceptions, by design: `src/theme/theme.css` (CSS variables on `:root` and on `[data-theme]`) and `src/index.css` (the base style reset).
These 2 files are not CSS Modules.

**Responsive layout**: No component holds its own breakpoint logic.
Each grid uses `repeat(auto-fit, minmax(...))`, so it can reflow with no extra code.
The app uses 2 shared breakpoints: `@media (width <= 640px)` adjusts the layout for a phone screen, and `@media (width <= 380px)` hides the wordmark, to keep room for the header on a very narrow screen.
Write each media query in range notation — Stylelint enforces this format.

**Gallery pattern**: `src/pages/Gallery.tsx` shows the standard pattern for a grid of items, where a click on an item opens a native `<dialog>` element.
The product data sits in a separate file, `src/data/soccerBalls.ts`, and each photo comes from `src/assets/gallery/`.
Each grid thumbnail has `alt=""`, because the name text already sits next to it.
The larger image in the dialog has real, descriptive `alt` text, because the dialog is the detail view.

## Tooling notes

- ESLint uses the flat config format, in `eslint.config.js`, with ESLint 10 and `typescript-eslint`.
  Reference the flat preset from `eslint-plugin-react-hooks` as `reactHooks.configs.flat['recommended-latest']` — do not use the old top-level export.
  `eslint-config-prettier` must be the last entry in the config, to stop ESLint rules from conflicting with Prettier rules.
- Stylelint uses `stylelint-config-standard`, `stylelint-config-css-modules`, and the recommended config from `stylelint-plugin-defensive-css`. It overrides `selector-class-pattern` to `^[a-z][a-zA-Z0-9]*$` because `stylelint-config-css-modules` does not itself relax that rule for camelCase class names, and allows intentional global/theme selectors in `defensive-css/require-pure-selectors`.
- cspell uses the config file `cspell.json`, set to British English (`en-GB`).
  Add a genuinely new, correct project word to the `words` list; do not turn off a spelling check.
- markdownlint uses `.markdownlint-cli2.jsonc` for all Markdown files, including files in hidden directories.
  Use the default rules except `MD013` for one sentence per line and `MD033` for the README logo image.
- npm-package-json-lint uses the config file `.npmpackagejsonlintrc.json`.
  The rules `prefer-absolute-version-dependencies` and `prefer-absolute-version-devDependencies` require an exact version for each package in `dependencies` and in `devDependencies` — no `^` and no `~` prefix.
  Pin a new dependency to its exact installed version, from `package-lock.json`, when you add it.
- The command `npm run validate` runs all 6 tools above, plus the tests, plus a production build, together.
  The test runner does not type-check a file, only transpile it, so the build step catches a type error the tests miss.
- The file `.github/workflows/validate.yml` sets up a GitHub Actions workflow.
  This workflow runs on each pull request against `main`.
  The workflow first installs Chromium through Playwright, since the tests need a real browser, then runs `npm run validate`.
  The workflow does not deploy; deploys stay on Netlify's own Git integration, for the native `main` branch.
  This workflow blocks a bad merge only when the repository settings require this check to pass — see the "Continuous integration" section in `README.md` for the setup steps.
- The file `.nvmrc` sets the Node version for this project.
  Run `nvm use` to switch to this version locally.
  The GitHub Actions workflow reads the same file, through the setting `node-version-file: .nvmrc` in `actions/setup-node`, so CI and local development never drift apart.
  To change the Node version, edit only the file `.nvmrc`.
- The skill `.claude/skills/add-gallery-item/SKILL.md` gives the steps for adding a new product to the Gallery page, from a title, an image, and a description.
  Use this skill instead of re-deriving the steps from scratch.
