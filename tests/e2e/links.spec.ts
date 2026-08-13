import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/features/",
  "/news/",
  "/news/testers-wanted/",
  "/news/welcome-to-infernal-codex/",
  "/roadmap/",
  "/about/",
  "/support/",
];

test("every internal link resolves and external links use HTTPS or mailto", async ({
  page,
  baseURL,
}) => {
  const sameOriginPaths = new Set<string>();
  const externalHrefs = new Set<string>();

  for (const route of ROUTES) {
    await page.goto(route);
    const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
    );

    for (const href of hrefs) {
      if (!href || href.startsWith("#")) continue;
      if (href.startsWith("mailto:")) {
        externalHrefs.add(href);
        continue;
      }
      if (href.startsWith("/")) {
        sameOriginPaths.add(href);
        continue;
      }
      if (baseURL && href.startsWith(baseURL)) {
        sameOriginPaths.add(href.slice(baseURL.length) || "/");
        continue;
      }
      externalHrefs.add(href);
    }
  }

  for (const href of externalHrefs) {
    expect(href.startsWith("https:") || href.startsWith("mailto:")).toBe(true);
  }

  for (const path of sameOriginPaths) {
    const response = await page.goto(path);
    expect(response, `no response for ${path}`).not.toBeNull();
    expect(response?.status(), `unexpected status for ${path}`).toBeLessThan(400);
    await expect(page.getByText(/this site can.t be reached/i)).toHaveCount(0);
  }
});
