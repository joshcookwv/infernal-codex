import { describe, expect, it } from "vitest";
import { absoluteUrl, siteConfig, withBasePath } from "./site-config";

describe("site configuration", () => {
  it("keeps the canonical GitHub Pages project path", () => {
    expect(siteConfig.canonicalBasePath).toBe("/infernal-codex");
    expect(withBasePath("/images/brand/logo.png", "/infernal-codex")).toBe(
      "/infernal-codex/images/brand/logo.png",
    );
    expect(absoluteUrl("/news/launch-preview/")).toBe(
      "https://joshcookwv.github.io/infernal-codex/news/launch-preview/",
    );
  });
});
