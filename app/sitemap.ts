import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/content/news";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

const STATIC_PATHS = ["/", "/features/", "/news/", "/roadmap/", "/about/", "/support/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((path) => ({ url: absoluteUrl(path) }));
  const articleEntries = getPublishedPosts().map((post) => ({
    url: absoluteUrl(`/news/${post.slug}/`),
  }));

  return [...staticEntries, ...articleEntries];
}
