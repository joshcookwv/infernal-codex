import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getPublishedPosts,
  loadNewsPosts,
} from "../news";
import { render, screen } from "@testing-library/react";
import { NewsBody } from "@/components/content/news-body";

const fixtures = path.join(process.cwd(), "lib/content/__tests__/fixtures");

describe("news content", () => {
  it("sorts published posts newest first and removes drafts", () => {
    const posts = getPublishedPosts(path.join(fixtures, "valid"));
    expect(posts.map((post) => post.slug)).toEqual(["newer", "older"]);
  });

  it("reports the filename and field for invalid metadata", () => {
    expect(() => loadNewsPosts(path.join(fixtures, "invalid", "category"))).toThrow(
      /bad-category\.md[\s\S]*category/,
    );
  });

  it("renders Markdown without enabling raw HTML", () => {
    const { container } = render(
      <NewsBody markdown={"## Safe\n<script>alert(1)</script>"} />,
    );
    expect(screen.getByRole("heading", { name: "Safe" })).toBeInTheDocument();
    expect(container.querySelector("script")).toBeNull();
  });

  it("prefixes local Markdown images for the configured deployment path", () => {
    const previousBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
    process.env.NEXT_PUBLIC_BASE_PATH = "/infernal-codex";

    try {
      render(
        <NewsBody markdown={'![Testers Wanted](/images/news/testers-wanted-2026-08.jpg)'} />,
      );

      expect(screen.getByRole("img", { name: "Testers Wanted" })).toHaveAttribute(
        "src",
        "/infernal-codex/images/news/testers-wanted-2026-08.jpg",
      );
    } finally {
      if (previousBasePath === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
      else process.env.NEXT_PUBLIC_BASE_PATH = previousBasePath;
    }
  });

  it("loads an optional video that exists under public/videos", () => {
    const [post] = loadNewsPosts(path.join(fixtures, "with-video"), path.join(fixtures, "public"));
    expect(post.video).toEqual({ src: "/videos/news/clip.mp4" });
    expect(post.image).toBe("/images/news/clip-poster.jpg");
  });

  it("gives posts without a video a null video", () => {
    const posts = loadNewsPosts(path.join(fixtures, "valid"));
    expect(posts.every((post) => post.video === null)).toBe(true);
  });

  it("reports a video that does not exist", () => {
    expect(() =>
      loadNewsPosts(path.join(fixtures, "invalid", "video"), path.join(fixtures, "public")),
    ).toThrow(/missing-video\.md[\s\S]*video asset not found/);
  });

  it("rejects a video path that traverses directories or is not an mp4 under /videos/", () => {
    expect(() =>
      loadNewsPosts(path.join(fixtures, "invalid", "video-path"), path.join(fixtures, "public")),
    ).toThrow(/bad-video\.md[\s\S]*video/);
  });

  it("reports a video larger than the 40 MB limit", () => {
    expect(() =>
      loadNewsPosts(path.join(fixtures, "with-video"), path.join(fixtures, "public"), { maxVideoBytes: 8 }),
    ).toThrow(/clip\.md[\s\S]*video asset exceeds/);
  });

  it("reports a specified image that does not exist", () => {
    expect(() =>
      loadNewsPosts(path.join(fixtures, "invalid", "image"), path.join(fixtures, "public")),
    ).toThrow(/missing-image\.md[\s\S]*image asset not found/);
  });
});
