export const NEWS_CATEGORIES = [
  "News",
  "Android",
  "Desktop",
  "Release Notes",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsVideo = {
  /** Site-relative path under /videos/, an mp4 that exists under public/. */
  src: string;
};

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: NewsCategory;
  published: boolean;
  image: string | null;
  video: NewsVideo | null;
  body: string;
};
