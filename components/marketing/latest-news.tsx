import Link from "next/link";
import { NewsCard } from "@/components/content/news-card";
import { getPublishedPosts } from "@/lib/content/news";

export function LatestNews() {
  const posts = getPublishedPosts().slice(0, 3);

  return (
    <section className="shell latest-news">
      <div className="latest-news-header">
        <h2>Latest news</h2>
        <Link href="/news/">All news</Link>
      </div>
      {posts.length === 0 ? (
        <p className="panel">No news posts have been published yet. Check back soon.</p>
      ) : (
        <div className="latest-news-grid">
          {posts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
