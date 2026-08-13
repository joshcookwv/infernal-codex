import Image from "next/image";
import Link from "next/link";
import type { NewsPost } from "@/lib/content/types";

export function NewsCard({
  post,
  headingLevel = "h3",
}: {
  post: NewsPost;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article className="panel news-card">
      <Image
        src={post.image ?? "/images/news/fallback.svg"}
        alt=""
        width={640}
        height={360}
        className="news-card-image"
      />
      <p className="eyebrow">{post.category}</p>
      <Heading>
        <Link href={`/news/${post.slug}/`}>{post.title}</Link>
      </Heading>
      <p>{post.summary}</p>
      <p className="news-card-date">
        <time dateTime={post.date}>{post.date}</time>
      </p>
    </article>
  );
}
