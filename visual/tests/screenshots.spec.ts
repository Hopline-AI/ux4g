import { test, expect } from "@playwright/test";

const SECTIONS = ["buttons", "inputs", "card", "alerts", "badges", "chips", "avatars"];

test.beforeEach(async ({ page }) => {
  await page.goto("/gallery.html");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250); // let webfonts settle for stable pixels
});

for (const id of SECTIONS) {
  test(`visual: ${id}`, async ({ page }) => {
    await expect(page.locator(`[data-testid="${id}"]`)).toHaveScreenshot(`${id}.png`);
  });
}
