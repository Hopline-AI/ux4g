import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/gallery.html");
  await page.evaluate(() => document.fonts.ready);
});

test("primary filled button = violet #613AF5, 8px radius, 40px tall, Roboto label", async ({ page }) => {
  const btn = page.getByRole("button", { name: "Primary" });
  await expect(btn).toHaveCSS("background-color", "rgb(97, 58, 245)");
  await expect(btn).toHaveCSS("border-radius", "8px");
  await expect(btn).toHaveCSS("height", "40px");
  await expect(btn).toHaveCSS("font-family", /Roboto/);
});

test("keyboard focus renders the 4px violet halo (UX4G focus ring)", async ({ page }) => {
  await page.keyboard.press("Tab"); // first focusable is the Primary button
  const btn = page.getByRole("button", { name: "Primary" });
  await expect(btn).toBeFocused();
  await expect(btn).toHaveCSS("box-shadow", "rgba(97, 58, 245, 0.48) 0px 0px 0px 4px");
});

test("input border is 1.5px and error state sets aria-invalid", async ({ page }) => {
  const errorInput = page.getByLabel("Error");
  // The UX4G input border is 1.5px. Chromium's getComputedStyle() snaps the
  // *used* border width to whole CSS pixels (reports "1px"), so assert the
  // genuine *specified* value the component applies via the CSSOM instead.
  const specifiedBorder = await errorInput.evaluate(
    (el: HTMLElement) => el.style.borderTopWidth || el.style.border,
  );
  expect(specifiedBorder).toMatch(/^1\.5px\b/);
  await expect(errorInput).toHaveAttribute("aria-invalid", "true");
});

test("default input does not set aria-invalid", async ({ page }) => {
  await expect(page.getByLabel("Default")).not.toHaveAttribute("aria-invalid", "true");
});

test("card has a 1px #DBDBDB border and 12px radius", async ({ page }) => {
  const card = page.locator('[data-testid="card"] .ux-card');
  await expect(card).toHaveCSS("border-top-width", "1px");
  await expect(card).toHaveCSS("border-top-color", "rgb(219, 219, 219)");
  await expect(card).toHaveCSS("border-radius", "12px");
});
