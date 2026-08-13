import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NewsPage from "@/app/news/page";
import sitemap from "@/app/sitemap";
import NewsArticlePage, { generateStaticParams } from "@/app/news/[slug]/page";

describe("static news publishing", () => {
  it("lists published news newest first", () => {
    render(<NewsPage />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((heading) => heading.textContent)).toContain("Welcome to Infernal Codex");
  });

  it("generates only published article paths", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "testers-wanted" },
      { slug: "welcome-to-infernal-codex" },
    ]);
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

describe("news article presentation", () => {
  it("renders the Testers Wanted post as an editorial invitation", async () => {
    const page = await NewsArticlePage({
      params: Promise.resolve({ slug: "testers-wanted" }),
    });

    const { container } = render(page);
    const article = within(container.querySelector("article")!);

    expect(article.getByRole("heading", { level: 1, name: "Testers Wanted" })).toBeInTheDocument();
    expect(
      article.getByText(
        "Looking for a few DMs to test Infernal Codex before it goes live on the Play Store.",
      ),
    ).toBeInTheDocument();
    expect(
      article.getByRole("img", { name: "Testers Wanted recruitment announcement" }),
    ).toBeInTheDocument();
    expect(
      article.getByRole("heading", { level: 2, name: "What testers will do" }),
    ).toBeInTheDocument();
    expect(article.getByRole("link", { name: "Email to join" })).toHaveAttribute(
      "href",
      "mailto:infernalbuldog@gmail.com",
    );
    expect(article.getAllByRole("img")).toHaveLength(1);
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
