import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes every static page and every published article, but no drafts", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://joshcookwv.github.io/infernal-codex/");
    expect(urls).toContain("https://joshcookwv.github.io/infernal-codex/features/");
    expect(urls).toContain("https://joshcookwv.github.io/infernal-codex/news/");
    expect(urls).toContain("https://joshcookwv.github.io/infernal-codex/roadmap/");
    expect(urls).toContain("https://joshcookwv.github.io/infernal-codex/about/");
    expect(urls).toContain("https://joshcookwv.github.io/infernal-codex/support/");
    expect(urls).toContain(
      "https://joshcookwv.github.io/infernal-codex/news/welcome-to-infernal-codex/",
    );
    expect(urls.some((url) => url.includes("/news/news-template/"))).toBe(false);
  });
});

describe("robots", () => {
  it("allows public crawling and points to the canonical sitemap", () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe("https://joshcookwv.github.io/infernal-codex/sitemap.xml");
  });
});
