# Infernal Codex Showcase Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a standalone, accessible Infernal Codex showcase and news website for Dungeon Masters, with Android as the primary product and Windows desktop accurately presented as in development.

**Architecture:** A Next.js App Router project renders repository-owned Markdown and TypeScript content into a fully static export. Shared layout, marketing sections, content parsing, path helpers, and metadata generation remain isolated so the site can begin on GitHub Pages under `/infernal-codex` and later move to a server-capable Next.js host without redesigning the public pages.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Markdown, `gray-matter`, `zod`, `react-markdown`, Vitest, Testing Library, Playwright, axe-core, GitHub Actions, and GitHub Pages.

## Global Constraints

- The website is created only in `C:\Users\joshc\OneDrive\Documents\ChatGPT\Infernal Codex`.
- Do not modify `D:\Claude\projects\dm-assistant-mobile` or `D:\Claude\projects\dm-assistant`.
- Android is the primary product; Windows desktop is labeled `In development` with no release date.
- Do not advertise iOS or a hosted web application as committed products.
- Initial production hosting is the static GitHub Pages address `https://joshcookwv.github.io/infernal-codex/`.
- Initial deployment uses the repository's `master` branch.
- Initial publishing contains no accounts, comments, email collection, analytics, advertising trackers, nonessential cookies, payment processing, CMS, or server-only Next.js features.
- Public build and store links are manually approved content; never discover or publish application artifacts automatically.
- Meet the implemented-scope requirements of WCAG 2.2 AA, including keyboard use, visible focus, contrast, semantic structure, reduced motion, text alternatives, zoom, and touch targets.
- Use the official Next.js static-export model: `output: "export"`, build-time `generateStaticParams`, unoptimized images, and no server-only features.
- Use Node.js 24 LTS (`>=24 <25`); the planning machine currently reports `v24.18.0`.
- Keep `package-lock.json` committed so the exact dependency versions resolved during implementation are reproducible.

## Source References

- Approved design: `docs/superpowers/specs/2026-08-11-infernal-codex-showcase-design.md`
- Next.js static exports: `https://nextjs.org/docs/app/guides/static-exports`
- Next.js `generateStaticParams`: `https://nextjs.org/docs/app/api-reference/functions/generate-static-params`
- Next.js `basePath`: `https://nextjs.org/docs/pages/api-reference/config/next-config-js/basePath`
- GitHub Pages custom workflows: `https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages`

## File and Responsibility Map

```text
app/
  about/page.tsx                 About page
  features/page.tsx              Full feature showcase
  news/[slug]/page.tsx           Build-time news article route
  news/page.tsx                  Published-news index
  roadmap/page.tsx               Now/Next/Later roadmap
  support/page.tsx               Support, FAQ, and legal links
  globals.css                    Design tokens and global accessibility styles
  layout.tsx                     Metadata, header, footer, and document shell
  not-found.tsx                  Branded 404 experience
  page.tsx                       Homepage composition
  robots.ts                      Static crawler policy
  sitemap.ts                     Published-route sitemap
components/
  content/news-body.tsx          Safe Markdown article renderer
  content/news-card.tsx          News summary card
  layout/mobile-nav.tsx          Only client-side navigation component
  layout/site-footer.tsx         Global footer
  layout/site-header.tsx         Global header
  marketing/benefit-grid.tsx     Three core benefits
  marketing/feature-showcase.tsx Alternating feature rows
  marketing/hero.tsx             Hero, platform status, and calls to action
  marketing/latest-news.tsx      Three newest posts
  marketing/platform-status.tsx  Android and Windows status
  marketing/roadmap-preview.tsx  Homepage roadmap summary
content/news/                     Markdown source posts
content/news-template.md          Copyable unpublished post template
lib/content/news.ts               Validated post loading and sorting
lib/content/types.ts              News types and category constants
lib/content/__tests__/            Content-engine tests and fixtures
lib/site-config.ts                Canonical URLs, navigation, public links, paths
lib/site-config.test.ts           Base-path and URL tests
public/images/                    Website-owned approved assets
tests/e2e/                        Browser, accessibility, and link checks
.github/workflows/ci.yml          Pull-request and branch verification
.github/workflows/pages.yml       Verified static build and Pages deployment
README.md                         Beginner setup, publishing, and deployment guide
```

---

### Task 1: Establish the Reproducible Next.js Project and Test Harness

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `.gitignore`
- Create: `.nvmrc`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Test: `lib/site-config.test.ts`

**Interfaces:**
- Consumes: approved static-export architecture and `/infernal-codex` production base path.
- Produces: `npm run dev`, `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`; a static `out/` directory; `siteConfig`, `withBasePath()`, `assetPath()`, and `absoluteUrl()` for later tasks.

- [ ] **Step 1: Initialize the dependency manifest without scaffolding over the existing documentation**

Run from `C:\Users\joshc\OneDrive\Documents\ChatGPT\Infernal Codex`:

```powershell
npm.cmd init -y
npm.cmd install next react react-dom gray-matter react-markdown zod
npm.cmd install --save-dev typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss eslint eslint-config-next vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @axe-core/playwright @playwright/test serve
npm.cmd pkg set private=true --json
npm.cmd pkg set engines.node=">=24 <25"
npm.cmd pkg set scripts.dev="next dev"
npm.cmd pkg set scripts.build="next build"
npm.cmd pkg set scripts.typecheck="tsc --noEmit"
npm.cmd pkg set scripts.lint="eslint ."
npm.cmd pkg set scripts.test="vitest run"
npm.cmd pkg set scripts.test:watch="vitest"
npm.cmd pkg set scripts.test:e2e="playwright test"
npm.cmd pkg set scripts.verify="npm run typecheck && npm run lint && npm run test && npm run build"
```

Confirm `package.json` contains `"private": true` as a Boolean, not the string `"true"`; correct it if `npm pkg set` serialized a string. Record the installed Node and package versions in the first implementation commit through `package.json` and `package-lock.json`.

Create `.nvmrc` containing only `24` followed by a newline. Before installing, `node --version` must report major version 24; otherwise install Node 24 LTS before continuing.

- [ ] **Step 2: Write the failing base-path test**

Create `lib/site-config.test.ts`:

```ts
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
```

- [ ] **Step 3: Run the test and verify the missing module failure**

Run:

```powershell
npm.cmd test -- lib/site-config.test.ts
```

Expected: FAIL because `lib/site-config.ts` does not exist.

- [ ] **Step 4: Add the exact project configuration and site-path interface**

Create `lib/site-config.ts`:

```ts
export const siteConfig = {
  name: "Infernal Codex",
  description:
    "An offline-first campaign toolkit for Dungeon Masters, available on Android with a Windows desktop edition in development.",
  origin: "https://joshcookwv.github.io",
  canonicalBasePath: "/infernal-codex",
  supportEmail: "infernalbuldog@gmail.com",
  githubUrl: "https://github.com/joshcookwv/infernal-codex",
  mobileGithubUrl: "https://github.com/joshcookwv/dm-assistant-mobile",
  privacyUrl: "https://joshcookwv.github.io/dm-assistant-mobile/privacy/",
  licensesUrl: "https://joshcookwv.github.io/dm-assistant-mobile/licenses/",
} as const;

export function withBasePath(pathname: string, basePath: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${basePath}${normalized}`;
}

export function assetPath(pathname: string): string {
  return withBasePath(pathname, process.env.NEXT_PUBLIC_BASE_PATH ?? "");
}

export function absoluteUrl(pathname = "/"): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.origin}${siteConfig.canonicalBasePath}${normalized}`;
}
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

Create `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", "out/**", "playwright-report/**", "test-results/**"]),
]);
```

Create `postcss.config.mjs`:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

Create `vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"] },
});
```

Create `vitest.setup.ts` with `import "@testing-library/jest-dom/vitest";`. Create the standard generated `next-env.d.ts` references and do not edit that file afterward.

Create `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = { title: "Infernal Codex" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
```

Create `app/page.tsx` with `export default function Home() { return <main><h1>Infernal Codex</h1></main>; }`. Start `app/globals.css` with `@import "tailwindcss";` plus `html { color-scheme: dark; }` and `body { margin: 0; }`.

Add `out/`, `.next/`, `node_modules/`, coverage, `.env*` except `.env.example`, `playwright-report/`, and `test-results/` to `.gitignore`.

- [ ] **Step 5: Run the foundation checks**

Run:

```powershell
npm.cmd test -- lib/site-config.test.ts
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
Test-Path out\index.html
```

Expected: all commands pass and the final command returns `True`.

- [ ] **Step 6: Commit the project foundation**

```powershell
git add package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts vitest.setup.ts .gitignore .nvmrc app lib/site-config.ts lib/site-config.test.ts
git commit -m "chore: establish static Next.js showcase"
```

---

### Task 2: Build the Validated Markdown News Engine

**Files:**
- Create: `lib/content/types.ts`
- Create: `lib/content/news.ts`
- Create: `lib/content/__tests__/news.test.tsx`
- Create: `lib/content/__tests__/fixtures/valid/older.md`
- Create: `lib/content/__tests__/fixtures/valid/newer.md`
- Create: `lib/content/__tests__/fixtures/valid/draft.md`
- Create: `lib/content/__tests__/fixtures/invalid/category/bad-category.md`
- Create: `lib/content/__tests__/fixtures/invalid/image/missing-image.md`
- Create: `components/content/news-body.tsx`
- Create: `content/news-template.md`
- Create: `content/news/welcome-to-infernal-codex.md`
- Create: `public/images/news/fallback.svg`

**Interfaces:**
- Consumes: `assetPath()` from Task 1 and Markdown files with the approved front matter.
- Produces: `NEWS_CATEGORIES`, `NewsCategory`, `NewsPost`, `loadNewsPosts()`, `getPublishedPosts()`, `getPublishedPost()`, and `NewsBody`.

- [ ] **Step 1: Define the content interfaces**

Create `lib/content/types.ts`:

```ts
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
```

- [ ] **Step 2: Write failing validation, sorting, draft, slug, image, and Markdown tests**

Create `older.md`, `newer.md`, and `draft.md` with this structure, changing the title/date/published values to `Older/2026-08-01/true`, `Newer/2026-08-10/true`, and `Draft/2026-08-11/false` respectively:

```md
---
title: "Older"
date: "2026-08-01"
summary: "Fixture summary."
category: "News"
published: true
---

Fixture body.
```

Create `invalid/category/bad-category.md` with the same required fields, `published: true`, and `category: "Rumor"`. Create `invalid/image/missing-image.md` with a valid `News` category and `image: "/images/news/missing.webp"`.

Create `lib/content/__tests__/news.test.tsx` with these exact behaviors:

```ts
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
      /bad-category\.md.*category/s,
    );
  });

  it("renders Markdown without enabling raw HTML", () => {
    const { container } = render(
      <NewsBody markdown={"## Safe\n<script>alert(1)</script>"} />,
    );
    expect(screen.getByRole("heading", { name: "Safe" })).toBeInTheDocument();
    expect(container.querySelector("script")).toBeNull();
  });
});
```

Add this test to the same suite:

```ts
it("reports a specified image that does not exist", () => {
  expect(() =>
    loadNewsPosts(path.join(fixtures, "invalid", "image"), path.join(fixtures, "public")),
  ).toThrow(/missing-image\.md.*image asset not found/s);
});
```

- [ ] **Step 3: Run tests and verify they fail**

```powershell
npm.cmd test -- lib/content/__tests__/news.test.tsx
```

Expected: FAIL because `lib/content/news.ts` does not exist.

- [ ] **Step 4: Implement the content loader and renderer**

Implement `lib/content/news.ts` with this public shape and logic:

```ts
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
```

Create `components/content/news-body.tsx`:

```tsx
import ReactMarkdown from "react-markdown";

export function NewsBody({ markdown }: { markdown: string }) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}
```

Do not install or enable `rehype-raw`. Keep filesystem access in `lib/content/news.ts`; page and card components receive typed post objects.

- [ ] **Step 5: Add real content, template, and fallback artwork**

Create `content/news-template.md` by copying the following post and changing `published` to `false`. Create `content/news/welcome-to-infernal-codex.md` with this exact initial content:

```md
---
title: "Welcome to Infernal Codex"
date: "2026-08-11"
summary: "Follow Android release news and the future development of Infernal Codex for Windows."
category: "News"
published: true
---

Infernal Codex brings campaign organization, encounters, searchable rules, creatures, notes, maps, and optional AI-assisted preparation into one toolkit for Dungeon Masters.

The current priority is completing the Android production release. This site will publish verified availability information, release notes, and meaningful changes as that work progresses.

A Windows desktop edition is also in development. Desktop updates will appear here when there is concrete progress to share; no release date has been announced.
```

Create `public/images/news/fallback.svg` using the obsidian, charcoal, and ember palette, an abstract codex mark, and no tiny text.

- [ ] **Step 6: Verify and commit the content engine**

```powershell
npm.cmd test -- lib/content/__tests__/news.test.tsx
npm.cmd run typecheck
npm.cmd run lint
git add lib/content components/content/news-body.tsx content public/images/news
git commit -m "feat: add validated Markdown news content"
```

---

### Task 3: Create the Shared Visual Foundation and Responsive Site Shell

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/layout/site-header.tsx`
- Create: `components/layout/mobile-nav.tsx`
- Create: `components/layout/site-footer.tsx`
- Create: `components/layout/__tests__/site-header.test.tsx`
- Create: `public/images/brand/logo.png`
- Create: `public/images/brand/social-card.svg`

**Interfaces:**
- Consumes: `siteConfig`, `assetPath()`, and approved branding copied from the mobile repository.
- Produces: `SiteHeader`, `MobileNav`, `SiteFooter`, shared `.shell`, button, panel, eyebrow, skip-link, and focus styles used by every page.

- [ ] **Step 1: Copy only approved public brand assets into the website**

Read from the mobile repository and write copies only into the website repository:

```powershell
New-Item -ItemType Directory -Force 'public\images\brand'
Copy-Item -LiteralPath 'D:\Claude\projects\dm-assistant-mobile\assets\images\logo.png' -Destination 'public\images\brand\logo.png'
```

Verify the source repository remains unchanged:

```powershell
git -C 'D:\Claude\projects\dm-assistant-mobile' status --short
```

Record the output before continuing; do not alter or clean any pre-existing mobile changes.

- [ ] **Step 2: Write the failing navigation accessibility test**

Create `components/layout/__tests__/site-header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "../site-header";

describe("SiteHeader", () => {
  it("provides the complete primary navigation and Android status", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    for (const name of ["Features", "News", "Roadmap", "About", "Support"]) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
    expect(screen.getByText("Android launch in progress")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test and verify the missing component failure**

```powershell
npm.cmd test -- components/layout/__tests__/site-header.test.tsx
```

Expected: FAIL because `site-header.tsx` does not exist.

- [ ] **Step 4: Implement the server shell and isolated mobile interaction**

Create `SiteHeader` and `SiteFooter` as Server Components. Create `MobileNav` as the only `"use client"` component in the shell, using a native button with `aria-expanded`, `aria-controls`, and Escape-to-close behavior. Use `next/link` for internal routes so configured `basePath` is added automatically.

`app/layout.tsx` must:

- Export `metadata` with `metadataBase: new URL(absoluteUrl("/"))`, title template, description, social-card image, and canonical root.
- Render a skip link targeting `#main-content`.
- Render `SiteHeader`, `<main id="main-content">`, and `SiteFooter`.
- Avoid client state in the root layout.

- [ ] **Step 5: Implement the visual tokens and accessibility baseline**

In `app/globals.css`, define and use these exact foundation colors from the approved mobile direction:

```css
:root {
  --canvas: #0b0706;
  --surface: #17100d;
  --surface-raised: #211510;
  --border: #40271d;
  --ember: #ff6b1a;
  --ember-highlight: #ff9a4a;
  --text: #fff5ed;
  --text-muted: #c4a79d;
}
```

Add the shared layout classes, a visible `:focus-visible` treatment, minimum 44px interactive targets, readable line lengths, responsive typography, horizontal-overflow prevention, visually hidden utilities, and `@media (prefers-reduced-motion: reduce)` rules that remove nonessential animation and smooth scrolling.

Create `public/images/brand/social-card.svg` at 1200x630 using the same palette, logo area, product name, and headline.

- [ ] **Step 6: Verify and commit the shared shell**

```powershell
npm.cmd test -- components/layout/__tests__/site-header.test.tsx
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
git add app components/layout public/images/brand
git commit -m "feat: add Infernal Codex site shell"
```

---

### Task 4: Build the Benefit-Led Homepage

**Files:**
- Modify: `app/page.tsx`
- Create: `components/marketing/hero.tsx`
- Create: `components/marketing/benefit-grid.tsx`
- Create: `components/marketing/feature-showcase.tsx`
- Create: `components/marketing/platform-status.tsx`
- Create: `components/marketing/latest-news.tsx`
- Create: `components/marketing/roadmap-preview.tsx`
- Create: `components/content/news-card.tsx`
- Create: `components/marketing/__tests__/homepage.test.tsx`
- Create: `lib/marketing-content.ts`

**Interfaces:**
- Consumes: `getPublishedPosts()`, `NewsPost`, `assetPath()`, shared shell styles, and approved product wording.
- Produces: a complete homepage and reusable typed marketing-content collections for later pages.

- [ ] **Step 1: Define typed marketing content**

Create `lib/marketing-content.ts` exporting:

```ts
export type Feature = {
  title: string;
  benefit: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const benefits = [
  "Prepare everything in one place.",
  "Run encounters without breaking momentum.",
  "Keep campaign data local and under your control.",
] as const;

export const features: Feature[] = [
  {
    title: "Campaign organization",
    benefit: "Keep the people, places, and sessions of a campaign connected.",
    description: "Build a campaign roster, organize locations, and keep related NPCs, encounters, and notes within reach when the table takes an unexpected turn.",
    image: "/images/screenshots/campaign.png",
    imageAlt: "Infernal Codex campaign overview showing party and location information.",
  },
  {
    title: "Encounter tracking",
    benefit: "Keep combat moving without losing the current turn.",
    description: "Track initiative, hit points, armor class, and conditions in one focused encounter view that saves progress as the fight changes.",
    image: "/images/screenshots/encounter.png",
    imageAlt: "Infernal Codex encounter runner showing initiative and combatant status.",
  },
  {
    title: "Rules and monsters",
    benefit: "Find the rule or creature you need without opening another book.",
    description: "Search the bundled offline rules reference and monster bestiary, filter sources, and keep commonly needed combat guidance close at hand.",
    image: "/images/screenshots/rules.png",
    imageAlt: "Infernal Codex offline rules browser with searchable categories.",
  },
  {
    title: "NPCs, notes, and maps",
    benefit: "Capture campaign details before they disappear between sessions.",
    description: "Record memorable NPCs, search Markdown notes, and attach map images or links so the information behind the adventure stays organized.",
    image: "/images/screenshots/notes.png",
    imageAlt: "Infernal Codex searchable campaign notes displayed as cards.",
  },
  {
    title: "Backup and restore",
    benefit: "Take control of your campaign archive.",
    description: "Export the app's local campaign records and map images into a backup, then restore them when moving to another supported Android device.",
    image: "/images/screenshots/dashboard.png",
    imageAlt: "Infernal Codex dashboard providing access to campaign tools.",
  },
  {
    title: "Optional Pro AI tools",
    benefit: "Ask for help only when you choose to use it.",
    description: "Generate NPC ideas, prepare summaries, or review a PDF import through optional Pro actions. Ordinary campaign organization remains usable without invoking AI.",
    image: "/images/screenshots/npc-ai.png",
    imageAlt: "Infernal Codex NPC editor showing optional AI suggestion controls.",
  },
];
```

- [ ] **Step 2: Write the failing homepage content test**

Create `components/marketing/__tests__/homepage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("homepage", () => {
  it("leads with Android and honestly labels desktop development", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Your campaign. At the table." }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Android launch in progress").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Desktop version in development").length).toBeGreaterThan(0);
    expect(screen.queryByText(/available on ios/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test and verify the expected content failure**

```powershell
npm.cmd test -- components/marketing/__tests__/homepage.test.tsx
```

Expected: FAIL because the homepage does not yet contain the approved sections and copy.

- [ ] **Step 4: Implement focused homepage components**

Build each named component as a focused Server Component:

- `Hero`: approved headline, concise DM-focused description, `Android launch in progress` non-download status, Features link, approved mobile imagery, and `Desktop version in development` label.
- `BenefitGrid`: the three approved benefit statements with one-sentence explanations.
- `FeatureShowcase`: alternating image/copy rows from all six complete `Feature` objects.
- `PlatformStatus`: Android primary card and Windows in-development card; no iOS card and no unavailable download control.
- `LatestNews`: call `getPublishedPosts().slice(0, 3)` and render `NewsCard` components; render intentional empty-state copy if no posts exist.
- `RoadmapPreview`: hard-code only approved `Now`, `Next`, and `Later` summaries and link to `/roadmap/`.

Compose them in `app/page.tsx` in the approved order. Give every section a stable heading and avoid duplicating the page `<h1>`.

- [ ] **Step 5: Verify and commit the homepage**

```powershell
npm.cmd test -- components/marketing/__tests__/homepage.test.tsx
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
git add app/page.tsx components/content components/marketing lib/marketing-content.ts
git commit -m "feat: build showcase homepage"
```

---

### Task 5: Add the Features, Roadmap, About, and Support Pages

**Files:**
- Create: `app/features/page.tsx`
- Create: `app/roadmap/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/support/page.tsx`
- Create: `app/__tests__/informational-pages.test.tsx`
- Create: `lib/roadmap-content.ts`

**Interfaces:**
- Consumes: `features`, `siteConfig`, shared page styles, and the approved Now/Next/Later positioning.
- Produces: four static public routes and `roadmapStages` used by both Home and Roadmap.

- [ ] **Step 1: Centralize complete roadmap content**

Create `lib/roadmap-content.ts`:

```ts
export type RoadmapStage = {
  label: "Now" | "Next" | "Later";
  title: string;
  items: readonly string[];
};

export const roadmapStages: readonly RoadmapStage[] = [
  {
    label: "Now",
    title: "Preparing the Android release",
    items: ["Complete production validation", "Publish verified Android availability"],
  },
  {
    label: "Next",
    title: "Improve the released experience",
    items: ["Publish release notes", "Prioritize feedback from Dungeon Masters"],
  },
  {
    label: "Later",
    title: "Build the Windows desktop edition",
    items: ["Modernize the existing desktop foundation", "Share approved development previews"],
  },
] as const;
```

Update `RoadmapPreview` from Task 4 to consume this array rather than duplicate the data.

- [ ] **Step 2: Write failing route-content tests**

In `app/__tests__/informational-pages.test.tsx`, render each page directly and assert:

- Features contains all six feature headings.
- Roadmap contains Now, Next, Later, and no date-pattern promise such as `Q1`, `Q2`, `Q3`, or `Q4`.
- About describes the independent project and local-first direction.
- Support exposes `infernalbuldog@gmail.com`, the issue-reporting URL, Privacy, Licenses, and an FAQ heading.

Use `screen.getByRole()` for headings and links instead of matching implementation classes.

- [ ] **Step 3: Run tests and verify missing-route failures**

```powershell
npm.cmd test -- app/__tests__/informational-pages.test.tsx
```

Expected: FAIL because the four page modules do not exist.

- [ ] **Step 4: Implement the four pages with the approved public copy**

Each page exports unique `Metadata` with title, description, and canonical path.

- Features maps `features` into six `<article>` elements beneath `<h1>Tools for the whole campaign</h1>` and uses each `benefit` as the lead sentence and `description` as supporting copy.
- Roadmap renders `roadmapStages` beneath `<h1>What we are building</h1>` and includes: `This roadmap shows direction, not promised dates. Priorities may change as production validation and Dungeon Master feedback reveal what matters most.`
- About uses `<h1>Built for the person behind the screen</h1>` and this body copy: `Infernal Codex is an independent project focused on practical campaign tools for Dungeon Masters. Ordinary campaign records are designed to stay local to the app. Optional online services act only when a user deliberately invokes the relevant feature.`
- Support uses `<h1>Support</h1>`, exposes the configured email and issue link, and renders this exact FAQ data:

```ts
const faqs = [
  { question: "Where can I get Infernal Codex?", answer: "Android production release work is in progress. This page will link to the verified Google Play listing when it is public." },
  { question: "Where is my campaign data stored?", answer: "Ordinary campaign records are stored locally by the app. See the Privacy Policy for the complete, current data-handling explanation." },
  { question: "Do I have to use AI features?", answer: "No. AI tools are optional actions, and the standard campaign tools do not require you to invoke them." },
  { question: "Is the desktop edition available?", answer: "Not yet. A Windows desktop edition is in development, and approved progress will be shared in News and the Roadmap." },
  { question: "How do I report a problem?", answer: "Use the public issue tracker for non-sensitive bugs or email the support address for account, purchase, or privacy questions." },
] as const;
```

Link `siteConfig.privacyUrl`, `siteConfig.licensesUrl`, and `${siteConfig.mobileGithubUrl}/issues/new` with descriptive link text. Each page exports unique `Metadata` with its canonical URL from `absoluteUrl()`.

- [ ] **Step 5: Verify and commit the informational pages**

```powershell
npm.cmd test -- app/__tests__/informational-pages.test.tsx
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
git add app/features app/roadmap app/about app/support app/__tests__ lib/roadmap-content.ts components/marketing/roadmap-preview.tsx
git commit -m "feat: add showcase information pages"
```

---

### Task 6: Add Static News Routes, Metadata, Sitemap, Robots, and 404

**Files:**
- Create: `app/news/page.tsx`
- Create: `app/news/[slug]/page.tsx`
- Create: `app/not-found.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/news/__tests__/news-pages.test.tsx`
- Create: `app/__tests__/metadata-routes.test.ts`

**Interfaces:**
- Consumes: `getPublishedPosts()`, `getPublishedPost()`, `NewsCard`, `absoluteUrl()`, `assetPath()`, and Markdown rendering.
- Produces: `/news/`, one exported route per published slug, `generateStaticParams()`, `generateMetadata()`, `/sitemap.xml`, `/robots.txt`, and the global 404 page.

- [ ] **Step 1: Write failing news-route and metadata tests**

Create tests with this structure:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NewsPage from "@/app/news/page";
import sitemap from "@/app/sitemap";
import { generateStaticParams } from "@/app/news/[slug]/page";

describe("static news publishing", () => {
  it("lists published news newest first", () => {
    render(<NewsPage />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((heading) => heading.textContent)).toContain("Welcome to Infernal Codex");
  });

  it("generates only published article paths", () => {
    expect(generateStaticParams()).toEqual([{ slug: "welcome-to-infernal-codex" }]);
  });

  it("publishes canonical public URLs", () => {
    expect(sitemap().map((entry) => entry.url)).toContain(
      "https://joshcookwv.github.io/infernal-codex/news/welcome-to-infernal-codex/",
    );
  });
});
```

The completed tests also assert:

- News index orders titles newest-first and omits drafts.
- `generateStaticParams()` returns only published slugs.
- Unknown `getPublishedPost()` values are passed to `notFound()`.
- Article metadata uses the post title, summary, canonical URL, and fallback image when needed.
- Sitemap includes the seven static pages plus published articles and excludes drafts.
- Robots allows public crawling and points to the canonical sitemap.

Mock `next/navigation` only for the isolated unknown-slug unit test. Do not mock the content engine for sorting or sitemap tests.

- [ ] **Step 2: Run tests and verify missing-module failures**

```powershell
npm.cmd test -- app/news/__tests__/news-pages.test.tsx app/__tests__/metadata-routes.test.ts
```

Expected: FAIL because the route and metadata modules do not exist.

- [ ] **Step 3: Implement the News index and build-time article route**

`app/news/page.tsx` renders all published posts or the intentional empty state.

`app/news/[slug]/page.tsx` must export:

```ts
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map(({ slug }) => ({ slug }));
}
```

Use the current App Router async `params: Promise<{ slug: string }>` signature. Await params in both the page and `generateMetadata()`. Call `notFound()` for an unpublished or unknown slug. Render Markdown without raw HTML support.

- [ ] **Step 4: Implement metadata routes and the branded 404**

- `sitemap.ts` returns `MetadataRoute.Sitemap` using `absoluteUrl()` for Home, Features, News, Roadmap, About, Support, and every published article.
- `robots.ts` returns `MetadataRoute.Robots` allowing `/` and pointing to `absoluteUrl("/sitemap.xml")`.
- `not-found.tsx` explains that the page was not found and links to Home, News, and Support.

- [ ] **Step 5: Verify exported news files and commit**

```powershell
npm.cmd test -- app/news/__tests__/news-pages.test.tsx app/__tests__/metadata-routes.test.ts
npm.cmd run typecheck
npm.cmd run lint
$env:NEXT_PUBLIC_BASE_PATH='/infernal-codex'; npm.cmd run build; Remove-Item Env:\NEXT_PUBLIC_BASE_PATH
Test-Path 'out\news\welcome-to-infernal-codex\index.html'
Test-Path 'out\404.html'
Test-Path 'out\sitemap.xml'
Test-Path 'out\robots.txt'
```

Expected: all checks pass and all four `Test-Path` calls return `True`.

```powershell
git add app/news app/not-found.tsx app/sitemap.ts app/robots.ts app/__tests__
git commit -m "feat: publish static news and metadata routes"
```

---

### Task 7: Integrate Approved Product Screenshots and Final Showcase Copy

**Files:**
- Create: `public/images/screenshots/dashboard.png`
- Create: `public/images/screenshots/campaign.png`
- Create: `public/images/screenshots/npc-ai.png`
- Create: `public/images/screenshots/notes.png`
- Create: `public/images/screenshots/encounter.png`
- Create: `public/images/screenshots/rules.png`
- Create: `public/images/screenshots/monsters.png`
- Modify: `lib/marketing-content.ts`
- Modify: `components/marketing/hero.tsx`
- Modify: `app/features/page.tsx`
- Create: `scripts/validate-assets.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: approved current store screenshots from the mobile repository and all image paths referenced by marketing/news content.
- Produces: website-owned optimized public assets and `npm run validate:assets`.

- [ ] **Step 1: Copy the exact approved screenshot set without changing the mobile repository**

```powershell
New-Item -ItemType Directory -Force 'public\images\screenshots'
Copy-Item -LiteralPath 'D:\Claude\projects\dm-assistant-mobile\docs\store-screenshots\phone-2026-08-10\01-dashboard.png' -Destination 'public\images\screenshots\dashboard.png'
Copy-Item -LiteralPath 'D:\Claude\projects\dm-assistant-mobile\docs\store-screenshots\phone-2026-08-10\02-campaign-overview.png' -Destination 'public\images\screenshots\campaign.png'
Copy-Item -LiteralPath 'D:\Claude\projects\dm-assistant-mobile\docs\store-screenshots\phone-2026-08-10\04-npc-ai-tools.png' -Destination 'public\images\screenshots\npc-ai.png'
Copy-Item -LiteralPath 'D:\Claude\projects\dm-assistant-mobile\docs\store-screenshots\phone-2026-08-10\05-searchable-notes.png' -Destination 'public\images\screenshots\notes.png'
Copy-Item -LiteralPath 'D:\Claude\projects\dm-assistant-mobile\docs\store-screenshots\phone-2026-08-10\06-encounter-runner.png' -Destination 'public\images\screenshots\encounter.png'
Copy-Item -LiteralPath 'D:\Claude\projects\dm-assistant-mobile\docs\store-screenshots\phone-2026-08-10\07-offline-rules.png' -Destination 'public\images\screenshots\rules.png'
Copy-Item -LiteralPath 'D:\Claude\projects\dm-assistant-mobile\docs\store-screenshots\phone-2026-08-10\08-monster-bestiary.png' -Destination 'public\images\screenshots\monsters.png'
```

Do not copy APKs, AABs, environment files, database files, API keys, reviewer credentials, or non-public internal documents.

- [ ] **Step 2: Write the failing asset validator**

Create `scripts/validate-assets.mjs`:

```js
import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "content", "lib"];
const sourceExtensions = new Set([".ts", ".tsx", ".md"]);

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const referenced = new Set();
for (const file of roots.flatMap(walk).filter((file) => sourceExtensions.has(path.extname(file)))) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/["'](\/images\/[^"']+)["']/g)) {
    referenced.add(match[1]);
  }
}

const errors = [];
for (const publicPath of referenced) {
  const file = path.join("public", publicPath.replace(/^\/+/, ""));
  if (!fs.existsSync(file)) {
    errors.push(`Missing asset: ${publicPath}`);
  } else if (fs.statSync(file).size > 2.5 * 1024 * 1024) {
    errors.push(`Asset exceeds 2.5 MB: ${publicPath}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${referenced.size} referenced image assets.`);
```

Add:

```json
"validate:assets": "node scripts/validate-assets.mjs"
```

to `package.json`, then temporarily change one marketing image to `/images/screenshots/missing.png`.

- [ ] **Step 3: Run the validator and verify the intentional failure**

```powershell
npm.cmd run validate:assets
```

Expected: FAIL naming `/images/screenshots/missing.png`.

- [ ] **Step 4: Complete all final image mappings and public copy**

Replace the intentional missing path. Complete every `Feature` object with its copied screenshot, useful alternative text describing the visible app screen, and benefit-led copy. Use the dashboard and encounter imagery in the hero device composition. Do not claim Google Play availability until the listing URL is verified and approved.

- [ ] **Step 5: Verify source isolation, assets, and build**

```powershell
npm.cmd run validate:assets
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
git -C 'D:\Claude\projects\dm-assistant-mobile' status --short
git -C 'D:\Claude\projects\dm-assistant' status --short
```

Compare the last two outputs with their pre-task state; the website work must not add or modify entries.

- [ ] **Step 6: Commit the approved product presentation**

```powershell
git add public/images/screenshots lib/marketing-content.ts components/marketing/hero.tsx app/features/page.tsx scripts/validate-assets.mjs package.json package-lock.json
git commit -m "feat: add approved product showcase assets"
```

---

### Task 8: Add Browser, Accessibility, Responsive, and Internal-Link Verification

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/showcase.spec.ts`
- Create: `tests/e2e/accessibility.spec.ts`
- Create: `tests/e2e/links.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Create: `scripts/validate-pages.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: production `out/` export and all public routes.
- Produces: repeatable Chromium smoke, axe, internal-link, keyboard, and viewport checks through `npm run test:e2e` and `npm run verify`.

- [ ] **Step 1: Write the browser smoke test before adding its server configuration**

In `tests/e2e/showcase.spec.ts`, visit Home, Features, News, the seeded article, Roadmap, About, Support, and a missing route. Assert successful page headings, the custom 404, Android-primary copy, Windows in-development copy, and absence of iOS-availability copy.

Run:

```powershell
npx.cmd playwright test tests/e2e/showcase.spec.ts
```

Expected: FAIL with connection errors because no Playwright web server is configured.

- [ ] **Step 2: Configure Playwright against the local production export**

Create `playwright.config.ts` with:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npx serve out -l 4173",
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
```

Install the browser once:

```powershell
npx.cmd playwright install chromium
```

- [ ] **Step 3: Build locally and make the smoke test pass**

```powershell
npm.cmd run build
npm.cmd run test:e2e -- tests/e2e/showcase.spec.ts
```

Expected: PASS.

- [ ] **Step 4: Add explicit Pages build and Pages-output validation scripts**

Add to `package.json`:

```json
"build:pages": "cross-env NEXT_PUBLIC_BASE_PATH=/infernal-codex next build",
"validate:pages": "node scripts/validate-pages.mjs"
```

Install `cross-env` as a development dependency so the command is cross-platform:

```powershell
npm.cmd install --save-dev cross-env
npm.cmd run build:pages
npm.cmd run validate:pages
```

Create `scripts/validate-pages.mjs`:

```js
import fs from "node:fs";
import path from "node:path";

const required = [
  "out/index.html",
  "out/404.html",
  "out/news/welcome-to-infernal-codex/index.html",
];
const errors = required.filter((file) => !fs.existsSync(file)).map((file) => `Missing export: ${file}`);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

const htmlFiles = fs.existsSync("out") ? walk("out").filter((file) => file.endsWith(".html")) : [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)=["'](\/[^"']*)["']/g)) {
    const url = match[1];
    if (url !== "/infernal-codex" && !url.startsWith("/infernal-codex/")) {
      errors.push(`${file}: unprefixed root URL ${url}`);
    }
  }
  if (/\.env|\/builds\/|\.apk\b|\.aab\b|reviewer|secret/i.test(html)) {
    errors.push(`${file}: forbidden private or build reference`);
  }
}

const home = fs.existsSync("out/index.html") ? fs.readFileSync("out/index.html", "utf8") : "";
if (!home.includes("/infernal-codex/_next/")) errors.push("Homepage lacks the Pages asset prefix");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} GitHub Pages HTML files.`);
```

Expected: `npm run validate:pages` passes.

- [ ] **Step 5: Add axe, keyboard, internal-link, and viewport tests**

- `accessibility.spec.ts`: run `AxeBuilder` on every public route and assert zero WCAG 2.2 A/AA violations; Tab from the top, verify the skip link becomes visible, activate it, and verify focus reaches `#main-content`; verify mobile navigation button state and Escape behavior.
- `links.spec.ts`: collect every same-origin `<a href>`, visit each unique route, and assert no response/status failure and no generic browser error page. Assert external links use HTTPS except `mailto:`.
- `responsive.spec.ts`: test 390x844, 768x1024, 1440x900, and 1920x1080; assert `document.documentElement.scrollWidth <= window.innerWidth`; verify primary actions remain visible; save screenshots under Playwright's test output only.

- [ ] **Step 6: Run the full automated verification and commit**

```powershell
npm.cmd pkg set scripts.verify="npm run typecheck && npm run lint && npm run test && npm run validate:assets && npm run build && npm run test:e2e && npm run build:pages && npm run validate:pages"
npm.cmd run verify
git add playwright.config.ts tests scripts/validate-pages.mjs package.json package-lock.json
git commit -m "test: verify showcase accessibility and routes"
```

---

### Task 9: Add Continuous Integration, GitHub Pages Deployment, and Beginner Documentation

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/pages.yml`
- Create: `README.md`
- Create: `docs/publishing-news.md`
- Create: `docs/release-checklist.md`

**Interfaces:**
- Consumes: all verification scripts and the `out/` Pages build.
- Produces: required CI evidence, least-privilege Pages deployment, and screen-by-screen beginner instructions for local preview and publishing.

- [ ] **Step 1: Create pull-request and branch CI**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [master]
  pull_request:

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run verify
      - name: Upload Playwright report on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
          retention-days: 7
```

- [ ] **Step 2: Create the least-privilege Pages workflow**

Create `.github/workflows/pages.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test
      - run: npm run validate:assets
      - run: npm run build:pages
      - run: npm run validate:pages
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Write the beginner README**

`README.md` must include exact PowerShell steps for:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run verify
```

Explain how to open `http://localhost:3000`, what each major folder owns, why GitHub Pages builds use `/infernal-codex`, how static hosting limits server features, and that neither application repository is a website dependency.

- [ ] **Step 4: Write the news-publishing guide and release checklist**

`docs/publishing-news.md` must show one complete Markdown example, how to preview it as a draft, how to set `published: true`, how dates/categories/images work, and the exact validation commands.

`docs/release-checklist.md` must contain checkboxes for copy approval, Android status accuracy, desktop wording, drafts, assets, typecheck, lint, unit tests, asset validation, Pages build, E2E checks, keyboard review, responsive review, external links, GitHub Actions, and public post-deployment verification.

- [ ] **Step 5: Validate YAML, documentation commands, and commit**

Run:

```powershell
npm.cmd run verify
git diff --check
```

Read both workflow files against the official GitHub Pages custom-workflow sequence: checkout, build, configure Pages, upload `out`, then deploy.

```powershell
git add .github README.md docs/publishing-news.md docs/release-checklist.md
git commit -m "ci: add verified GitHub Pages publishing"
```

---

### Task 10: Perform Visual Review, Connect GitHub, and Verify the Public Site

**Files:**
- Update: `docs/release-checklist.md`

**Interfaces:**
- Consumes: complete local site, passing automated checks, GitHub authentication, and explicit user approval for public repository creation/push.
- Produces: a verified public repository and GitHub Pages site at `https://joshcookwv.github.io/infernal-codex/`.

- [ ] **Step 1: Run the complete local verification from a clean checkout state**

```powershell
npm.cmd ci
npx.cmd playwright install chromium
npm.cmd run verify
git diff --check
git status --short --branch
```

Expected: all checks pass and Git status contains only the intentionally updated release checklist, if any.

- [ ] **Step 2: Complete the manual visual and accessibility review**

Use the production Pages build and review 390x844, 768x1024, 1440x900, and 1920x1080. Check every item in `docs/release-checklist.md`. Specifically verify:

- Logo and screenshots are sharp and not cropped incorrectly.
- Hero hierarchy clearly communicates Android first and Windows in development.
- News cards and alternating feature rows remain readable at all widths.
- Keyboard order, menu behavior, skip link, focus rings, 200% zoom, and reduced motion work visibly.
- There is no horizontal overflow.
- No private credential, build artifact, environment file, or reviewer identifier appears in the site or Git history.

Fix only evidenced issues, rerun the nearest focused test, and then rerun `npm run verify`.

- [ ] **Step 3: Obtain the required external-action approval**

Before creating a public GitHub repository or pushing, show the user:

- Repository owner/name: `joshcookwv/infernal-codex`
- Visibility: public
- Branch: `master`
- Public URL: `https://joshcookwv.github.io/infernal-codex/`
- Exact staged/committed scope

Proceed only after explicit approval. This checkpoint cannot be satisfied by the earlier design approval because it authorizes a new public external resource.

- [ ] **Step 4: Create and push the public repository**

Verify authentication:

```powershell
gh auth status
```

If `origin` does not exist, create the repository and push:

```powershell
gh repo create joshcookwv/infernal-codex --public --source . --remote origin --push
```

If the repository already exists, verify its owner and visibility before adding the exact remote and pushing `master`; do not overwrite an unrelated repository.

- [ ] **Step 5: Enable GitHub Actions as the Pages source and observe deployment**

Open the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions**, and run the Pages workflow if the initial push did not trigger it. Record the workflow URL and wait for both build and deploy jobs to succeed.

- [ ] **Step 6: Verify the public deployment**

Check these exact URLs in a private browser session:

```text
https://joshcookwv.github.io/infernal-codex/
https://joshcookwv.github.io/infernal-codex/features/
https://joshcookwv.github.io/infernal-codex/news/
https://joshcookwv.github.io/infernal-codex/news/welcome-to-infernal-codex/
https://joshcookwv.github.io/infernal-codex/roadmap/
https://joshcookwv.github.io/infernal-codex/about/
https://joshcookwv.github.io/infernal-codex/support/
https://joshcookwv.github.io/infernal-codex/sitemap.xml
```

Verify HTTP success, correct branding, working assets and navigation, accurate platform status, and expected social metadata. Test one nonexistent URL and verify the branded 404.

- [ ] **Step 7: Record evidence and commit the completed release checklist**

Add the public URL, successful workflow run URL, verification date, and checked results to `docs/release-checklist.md`.

```powershell
git add docs/release-checklist.md
git commit -m "docs: verify public showcase deployment"
git push origin master
git status --short --branch
```

Expected: clean status and local `master` synchronized with `origin/master`.

## Final Completion Evidence

Do not call the website complete until all of the following are available in the same handoff:

- Passing `npm run verify` output from the final commit.
- Clean `git diff --check` and Git status.
- Confirmation that both application repository statuses are unchanged from their pre-implementation state.
- Public GitHub repository URL.
- Successful GitHub Pages workflow URL.
- Verified public website URL and route checklist.
- Screenshots or browser evidence at phone and desktop widths.
- Any deliberately deferred item clearly labeled as outside this website scope.
