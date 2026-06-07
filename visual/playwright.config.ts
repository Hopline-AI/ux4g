import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02 } },
  use: { baseURL: "http://localhost:5173", viewport: { width: 1000, height: 800 } },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm --filter playground dev -- --port 5173 --strictPort",
    url: "http://localhost:5173/gallery.html",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
