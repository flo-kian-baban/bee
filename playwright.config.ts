import { defineConfig, devices } from "@playwright/test";

// The tests start the production build, so run `npm run build` first.
// Set BASE_URL to test a site that is already running or deployed instead.
const port = 3210;
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: "tests",
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { ...devices["Desktop Chrome"], baseURL },
  projects: [
    // Smoke, accessibility and claims tests: `npm test`.
    { name: "checks", testIgnore: "screenshots.spec.ts" },
    // Milestone report screenshots: `MILESTONE=2 npm run screenshots`.
    { name: "screenshots", testMatch: "screenshots.spec.ts" },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npm run start -- --port ${port}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
});
