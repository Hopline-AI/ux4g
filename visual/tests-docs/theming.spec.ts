import { test, expect } from "@playwright/test";

// Each theme's primary "600" anchor, as the rgb() the browser computes for a
// filled primary button. This proves the COMPONENTS re-theme — the Button
// reads var(--violet-600) directly, so a regression where a theme only
// overrode the --color-* aliases (and left the components violet) would fail
// here. The site chrome re-theming is not enough on its own.
const PRIMARY: Record<string, string> = {
  violet: "rgb(97, 58, 245)",
  sage: "rgb(79, 129, 49)",
  terracotta: "rgb(185, 88, 52)",
  "clay-gold": "rgb(149, 109, 56)",
  amber: "rgb(176, 97, 28)",
  coral: "rgb(210, 64, 59)",
};

test.describe("theme switcher re-themes the components", () => {
  for (const [id, rgb] of Object.entries(PRIMARY)) {
    test(`primary button background follows the "${id}" theme`, async ({ page }) => {
      await page.goto("/components");
      await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), id);
      const btn = page.getByRole("button", { name: "Primary", exact: true }).first();
      await expect(btn).toHaveCSS("background-color", rgb);
    });
  }

  test("clicking a swatch re-themes the button and persists the choice", async ({ page }) => {
    await page.goto("/components");
    await page.locator('[data-theme-btn="coral"]').click();
    const btn = page.getByRole("button", { name: "Primary", exact: true }).first();
    await expect(btn).toHaveCSS("background-color", "rgb(210, 64, 59)");
    expect(await page.evaluate(() => localStorage.getItem("ux4g-theme"))).toBe("coral");
  });
});
