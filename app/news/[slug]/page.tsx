import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsBody } from "@/components/content/news-body";
import { getPublishedPost, getPublishedPosts } from "@/lib/content/news";
import { absoluteUrl } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: absoluteUrl(`/news/${post.slug}/`) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      images: [{ url: absoluteUrl(post.image ?? "/images/news/fallback.svg") }],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) notFound();

  return (
    <article className="shell page-section">
      <p className="eyebrow">{post.category}</p>
      <h1>{post.title}</h1>
      <p className="news-card-date">
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <NewsBody markdown={post.body} />
    </article>
  );
}
