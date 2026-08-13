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

  it("reports a specified image that does not exist", () => {
    expect(() =>
      loadNewsPosts(path.join(fixtures, "invalid", "image"), path.join(fixtures, "public")),
    ).toThrow(/missing-image\.md[\s\S]*image asset not found/);
  });
});
