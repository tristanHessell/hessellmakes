import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

// Config notes:
// - `base: '/'` assumes the site is hosted at the domain root. Relative
//   asset paths (`base: './'`) can't be used with BrowserRouter, since a
//   deep route like /gallery would resolve them against the wrong path.
//   If the site is ever hosted under a subpath instead, set this to match
//   that subpath.
// - `build.outDir` is the folder to upload to the CDN after `npm run build`.
// - Tests run in a real Chromium instance via Playwright (Vitest browser
//   mode) instead of the simulated jsdom environment.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  test: {
    globals: true,
    setupFiles: "./src/setupTests.ts",
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
});
