import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1440, height: 900 },
  { name: "desktop", width: 1920, height: 1080 },
];

for (const viewport of VIEWPORTS) {
  test.describe(`responsive: ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("no horizontal overflow and primary actions remain visible", async ({ page }) => {
      await page.goto("/");

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      );
      expect(overflow).toBe(true);

      await expect(page.getByRole("link", { name: "See the features" })).toBeVisible();
      const brandLink = page.getByRole("link", { name: "Infernal Codex" }).first();
      await expect(brandLink).toBeVisible();

      if (viewport.width < 640) {
        await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();
      } else {
        await expect(page.getByRole("navigation", { name: /primary/i })).toBeVisible();
      }

      await page.screenshot({
        path: `test-results/responsive-${viewport.name}.png`,
        fullPage: true,
      });
    });
  });
}
