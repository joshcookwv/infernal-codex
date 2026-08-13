import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { NEWS_CATEGORIES, type NewsPost } from "./types";

const metadataSchema = z.object({
  title: z.string().trim().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const parsed = Date.parse(`${value}T00:00:00Z`);
    return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value;
  }, "must be a real calendar date"),
  summary: z.string().trim().min(1),
  category: z.enum(NEWS_CATEGORIES),
  published: z.boolean(),
  image: z.string().startsWith("/images/").refine((value) => !value.includes(".."), "must not traverse directories").optional(),
}).strict();

export function loadNewsPosts(
  directory = path.join(process.cwd(), "content/news"),
  publicDirectory = path.join(process.cwd(), "public"),
): NewsPost[] {
  if (!fs.existsSync(directory)) return [];
  const seen = new Set<string>();
  return fs.readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = path.basename(filename, ".md");
      const key = slug.toLowerCase();
      if (seen.has(key)) throw new Error(`${filename}: duplicate slug`);
      seen.add(key);
      const source = fs.readFileSync(path.join(directory, filename), "utf8");
      const { data, content } = matter(source);
      const result = metadataSchema.safeParse(data);
      if (!result.success) {
        const fields = result.error.issues.map((issue) => issue.path.join(".")).join(", ");
        throw new Error(`${filename}: invalid ${fields}`);
      }
      if (result.data.image) {
        const imageFile = path.join(publicDirectory, result.data.image.replace(/^\/+/, ""));
        if (!fs.existsSync(imageFile)) throw new Error(`${filename}: image asset not found`);
      }
      return { slug, ...result.data, image: result.data.image ?? null, body: content.trim() };
    });
}

export function getPublishedPosts(directory?: string, publicDirectory?: string) {
  return loadNewsPosts(directory, publicDirectory)
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPublishedPost(slug: string, directory?: string, publicDirectory?: string) {
  return getPublishedPosts(directory, publicDirectory).find((post) => post.slug === slug);
}
