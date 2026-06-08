import { defineConfig, devices } from "@playwright/test";

// Theming proofs: switch the [data-theme] palette and assert the real UX4G
// components (not just the site chrome) re-theme. Runs against the built docs
// site via `astro preview` on :4321, so `pnpm build` must have run first.
export default defineConfig({
  testDir: "./tests-docs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm --filter docs preview",
    url: "http://localhost:4321/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
