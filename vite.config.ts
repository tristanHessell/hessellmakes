import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

// Config notes:
// - `base: './'` makes the build use relative asset paths, so the bundle
//   can be dropped into any CDN path/subfolder without extra rewriting.
// - `build.outDir` is the folder to upload to the CDN after `npm run build`.
// - Tests run in a real Chromium instance via Playwright (Vitest browser
//   mode) instead of the simulated jsdom environment.
export default defineConfig({
  plugins: [react()],
  base: "./",
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
