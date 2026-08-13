import type { Metadata } from "next";
import { NewsCard } from "@/components/content/news-card";
import { getPublishedPosts } from "@/lib/content/news";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "News",
  description: "Read the latest Infernal Codex news and release updates.",
  alternates: { canonical: absoluteUrl("/news/") },
};

export default function NewsPage() {
  const posts = getPublishedPosts();

  return (
    <div className="shell page-section">
      <h1>News</h1>
      {posts.length === 0 ? (
        <p className="panel">No news posts have been published yet. Check back soon.</p>
      ) : (
        <div className="latest-news-grid">
          {posts.map((post) => (
            <NewsCard key={post.slug} post={post} headingLevel="h2" />
          ))}
        </div>
      )}
    </div>
  );
}
