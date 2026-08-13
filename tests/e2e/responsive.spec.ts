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

test.describe("desktop composition", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("feature showcase uses a compact desktop deck", async ({ page }) => {
    await page.goto("/");

    const showcase = page.locator(".feature-showcase-grid");
    await expect(showcase).toBeVisible();

    const showcaseBox = await showcase.boundingBox();
    expect(showcaseBox?.height).toBeLessThanOrEqual(2200);

    const mediaHeights = await page.locator(".feature-showcase-media").evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().height),
    );
    expect(mediaHeights).toHaveLength(6);
    expect(Math.max(...mediaHeights)).toBeLessThanOrEqual(470);

    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(pageHeight).toBeLessThanOrEqual(5400);
  });

  test("news cards adapt their editorial width to the published article count", async ({ page }) => {
    await page.goto("/");

    const gridBox = await page.locator(".latest-news-grid").boundingBox();
    const cards = page.locator(".latest-news-grid .news-card");
    const cardCount = await cards.count();
    const cardBox = await cards.first().boundingBox();

    expect(gridBox).not.toBeNull();
    expect(cardBox).not.toBeNull();
    expect(cardCount).toBeGreaterThan(0);

    const minimumRatio = cardCount === 1 ? 0.65 : cardCount === 2 ? 0.45 : 0.3;
    expect((cardBox?.width ?? 0) / (gridBox?.width ?? 1)).toBeGreaterThanOrEqual(minimumRatio);
  });

  test("short pages keep the footer at the viewport edge", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1600 });
    await page.goto("/support/");

    const footerBox = await page.locator(".site-footer").boundingBox();
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    expect(Math.abs((footerBox?.y ?? 0) + (footerBox?.height ?? 0) - viewportHeight)).toBeLessThanOrEqual(2);
  });
});

test.describe("mobile menu composition", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("open navigation becomes a viewport-width dropdown", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const panelBox = await page.locator(".mobile-nav-panel").boundingBox();
    expect(panelBox).not.toBeNull();
    expect(panelBox?.width).toBeGreaterThanOrEqual(350);
    expect(panelBox?.x).toBeLessThanOrEqual(20);
  });
});

test.describe("news article composition", () => {
  test("desktop uses an editorial split", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/news/testers-wanted/");

    const headingBox = await page.locator(".news-article-heading").boundingBox();
    const mediaBox = await page.locator(".news-article-media").boundingBox();

    expect(headingBox).not.toBeNull();
    expect(mediaBox).not.toBeNull();
    expect(mediaBox?.x ?? 0).toBeGreaterThan((headingBox?.x ?? 0) + (headingBox?.width ?? 0));
    expect(Math.abs((mediaBox?.y ?? 0) - (headingBox?.y ?? 0))).toBeLessThan(180);
  });

  test("phone stacks the poster below the heading", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/news/testers-wanted/");

    const headingBox = await page.locator(".news-article-heading").boundingBox();
    const mediaBox = await page.locator(".news-article-media").boundingBox();

    expect(headingBox).not.toBeNull();
    expect(mediaBox).not.toBeNull();
    expect(mediaBox?.y ?? 0).toBeGreaterThan((headingBox?.y ?? 0) + (headingBox?.height ?? 0));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
