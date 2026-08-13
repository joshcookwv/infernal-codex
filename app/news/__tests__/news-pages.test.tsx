import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NewsPage from "@/app/news/page";
import sitemap from "@/app/sitemap";
import { generateStaticParams } from "@/app/news/[slug]/page";

describe("static news publishing", () => {
  it("lists published news newest first", () => {
    render(<NewsPage />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((heading) => heading.textContent)).toContain("Welcome to Infernal Codex");
  });

  it("generates only published article paths", () => {
    expect(generateStaticParams()).toEqual([{ slug: "welcome-to-infernal-codex" }]);
  });

  it("publishes canonical public URLs", () => {
    expect(sitemap().map((entry) => entry.url)).toContain(
      "https://joshcookwv.github.io/infernal-codex/news/welcome-to-infernal-codex/",
    );
  });
});

describe("news article metadata", () => {
  it("uses the post title, summary, canonical URL, and fallback image when needed", async () => {
    const { generateMetadata } = await import("@/app/news/[slug]/page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "welcome-to-infernal-codex" }),
    });

    expect(metadata.title).toBe("Welcome to Infernal Codex");
    expect(metadata.description).toBe(
      "Follow Android release news and the future development of Infernal Codex for Windows.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://joshcookwv.github.io/infernal-codex/news/welcome-to-infernal-codex/",
    );
    const ogImages = metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : undefined;
    expect(JSON.stringify(ogImages)).toContain("fallback.svg");
  });
});

describe("unknown news article", () => {
  it("passes unknown slugs to notFound()", async () => {
    vi.resetModules();
    vi.doMock("next/navigation", () => ({
      notFound: vi.fn(() => {
        throw new Error("NEXT_NOT_FOUND");
      }),
    }));

    const { default: NewsArticlePage } = await import("@/app/news/[slug]/page");

    await expect(
      NewsArticlePage({ params: Promise.resolve({ slug: "does-not-exist" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    vi.doUnmock("next/navigation");
    vi.resetModules();
  });
});
