# Publishing a News Post

News posts live in `content/news/` as Markdown files with YAML front matter. Start from
[`content/news-template.md`](../content/news-template.md), which is a copy of the site's first
post with `published: false` so it's a ready-made unpublished starting point.

## A complete example

```md
---
title: "Encounter Runner Improvements"
date: "2026-09-01"
summary: "Faster initiative tracking and clearer condition badges."
category: "Release Notes"
published: true
image: "/images/news/encounter-runner-improvements.png"
---

The encounter runner now tracks conditions with clearer badges and remembers initiative order
between sessions.

This release also fixes a display issue where long creature names could overlap the hit-point
control on narrow screens.
```

Save this as `content/news/encounter-runner-improvements.md` — the filename (without `.md`)
becomes the post's URL slug, so it must be unique and URL-safe (lowercase, hyphen-separated).

## Front matter fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Plain text, used as the page `<h1>` and in navigation cards. |
| `date` | Yes | Must be `YYYY-MM-DD` and a real calendar date. Posts sort newest-first by this value. |
| `summary` | Yes | One or two sentences, shown on cards and used as the page description. |
| `category` | Yes | One of `News`, `Android`, `Desktop`, `Release Notes` (see `lib/content/types.ts`). |
| `published` | Yes | `true` to publish, `false` to keep as an unpublished draft. |
| `image` | No | Must start with `/images/` and point to a file that actually exists under `public/`. Omit it to use the automatic fallback artwork. |

The body below the front matter is standard Markdown. Raw HTML in the body is intentionally not
rendered (for safety) — write formatting in Markdown only.

## Previewing a draft

Set `published: false` and run:

```powershell
npm.cmd run dev
```

Draft posts never appear in `npm run build`'s output, the news index, the sitemap, or
`generateStaticParams` — there's no route to preview a draft's exact rendered page locally except
by temporarily setting `published: true` on your own machine before reverting it, since publishing
status controls which routes get generated at all.

## Publishing

1. Set `published: true`.
2. If you set `image`, make sure the file exists under `public/images/...` first.
3. Run the validation commands below.
4. Follow the repository's branch-and-pull-request workflow (see the plan's "Branching and
   Integration Workflow" section) rather than committing straight to `master`.

## Validation commands

```powershell
npm.cmd run test -- lib/content/__tests__/news.test.tsx
npm.cmd run validate:assets
npm.cmd run build
```

The content loader (`lib/content/news.ts`) validates every post's front matter at build time —
an invalid category, a malformed date, or a missing referenced image will fail the build with the
offending filename and field named in the error message.
