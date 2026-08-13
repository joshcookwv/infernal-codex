export const NEWS_CATEGORIES = [
  "News",
  "Android",
  "Desktop",
  "Release Notes",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: NewsCategory;
  published: boolean;
  image: string | null;
  body: string;
};
