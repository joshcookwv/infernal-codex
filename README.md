# Infernal Codex Showcase Website

A standalone, accessible showcase and news website for **Infernal Codex**, an offline-first
campaign toolkit for Dungeon Masters. Android is the primary product; a Windows desktop edition
is in development.

This repository is the website only. It does **not** depend on, import from, or need either
application repository (`dm-assistant-mobile` or `dm-assistant`) to build, run, or deploy —
approved product screenshots and the logo were copied in as static files, not linked.

## Getting started (no prior experience needed)

You need [Node.js 24](https://nodejs.org/) installed (`node --version` should report `v24.x.x` —
see `.nvmrc`).

Open a terminal in this folder and run:

```powershell
npm.cmd install
npm.cmd run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. The page updates
automatically as you edit files.

Before committing any change, run the full verification suite:

```powershell
npm.cmd run verify
```

This runs type checking, linting, unit tests, asset validation, a production build, the full
browser test suite (accessibility, links, responsive layout), a GitHub Pages build, and a
GitHub Pages output check — the same checks that run in CI on every pull request.

## What each folder owns

| Folder | Owns |
| --- | --- |
| `app/` | Every public page/route, plus global layout, styles, sitemap, and robots policy |
| `components/` | Reusable UI: shared layout (header/footer/nav), marketing sections, content rendering |
| `content/news/` | Published and draft news posts, written in Markdown — see [`docs/publishing-news.md`](docs/publishing-news.md) |
| `lib/` | Content loading/validation, site configuration, and typed marketing/roadmap data |
| `public/` | Static files served as-is: images, favicon, manifest |
| `tests/e2e/` | Browser-based accessibility, link, responsive, and smoke tests (Playwright) |
| `scripts/` | Build-time validators (`validate:assets`, `validate:pages`) |
| `.github/workflows/` | CI (`ci.yml`) and the GitHub Pages deploy (`pages.yml`) |

## Why the site uses `/infernal-codex` as a path prefix

This site is published as a **static export** to GitHub Pages at
`https://joshcookwv.github.io/infernal-codex/` — a project page, not a custom domain. GitHub
Pages serves project pages under a path matching the repository name, so every internal link,
image, and script needs that `/infernal-codex` prefix to resolve correctly once deployed.

- Locally (`npm run dev` or a plain `npm run build`), there's no prefix — the site behaves as if
  it were hosted at the domain root, which is simpler for local development.
- `npm run build:pages` sets `NEXT_PUBLIC_BASE_PATH=/infernal-codex` before building, which is
  what actually gets deployed.
- Because raw `<img>`-style asset references (favicons, the social share image, and anything
  rendered through `next/image` under `images.unoptimized: true`) do **not** get this prefix
  automatically, the site funnels them all through the `assetPath()` helper in
  `lib/site-config.ts`, which adds the prefix only when it's set.

If the site ever moves to a custom domain or a server-capable host, this is the one mechanism
that would need to change — everything else (content, components, pages) is written to be
host-agnostic.

## What static hosting means for this site

GitHub Pages only serves files — there's no server to run code on each request. That's why this
project uses Next.js's [static export](https://nextjs.org/docs/app/guides/static-exports) mode
(`output: "export"`): every page is pre-rendered to HTML at build time via
`generateStaticParams`, images are left unoptimized (no on-demand image resizing service), and
nothing in this codebase relies on API routes, middleware, server actions, or any other
server-only Next.js feature. Publishing a new page or news post means running a fresh build and
deploying its output, not deploying "live" server code.

## Publishing news

See [`docs/publishing-news.md`](docs/publishing-news.md) for how to write and publish a news
post, and [`docs/release-checklist.md`](docs/release-checklist.md) for the full pre-publish
checklist.
