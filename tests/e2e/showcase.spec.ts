import { expect, test } from "@playwright/test";

test.describe("showcase smoke test", () => {
  test("Home renders with Android and desktop status", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Your campaign. At the table." })).toBeVisible();
    await expect(page.getByText("Android launch in progress").first()).toBeVisible();
    await expect(page.getByText("Desktop version in development").first()).toBeVisible();
    await expect(page.getByText(/available on ios/i)).toHaveCount(0);
  });

  test("Features renders", async ({ page }) => {
    await page.goto("/features/");
    await expect(page.getByRole("heading", { level: 1, name: "Tools for the whole campaign" })).toBeVisible();
  });

  test("News index renders", async ({ page }) => {
    await page.goto("/news/");
    await expect(page.getByRole("heading", { level: 1, name: "News" })).toBeVisible();
  });

  test("seeded News article renders", async ({ page }) => {
    await page.goto("/news/welcome-to-infernal-codex/");
    await expect(page.getByRole("heading", { level: 1, name: "Welcome to Infernal Codex" })).toBeVisible();
  });

  test("Testers Wanted article renders its recruitment action", async ({ page }) => {
    await page.goto("/news/testers-wanted/");
    await expect(page.getByRole("heading", { level: 1, name: "Testers Wanted" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Email to join" })).toHaveAttribute(
      "href",
      "mailto:infernalbuldog@gmail.com",
    );
  });

  test("Roadmap renders", async ({ page }) => {
    await page.goto("/roadmap/");
    await expect(page.getByRole("heading", { level: 1, name: "What we are building" })).toBeVisible();
  });

  test("About renders", async ({ page }) => {
    await page.goto("/about/");
    await expect(page.getByRole("heading", { level: 1, name: "Built for the person behind the screen" })).toBeVisible();
  });

  test("Support renders", async ({ page }) => {
    await page.goto("/support/");
    await expect(page.getByRole("heading", { level: 1, name: "Support" })).toBeVisible();
  });

  test("missing route shows the branded 404", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  });
});
