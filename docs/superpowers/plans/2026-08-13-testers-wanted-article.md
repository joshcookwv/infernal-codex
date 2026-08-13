# Testers Wanted Editorial Article Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task by task.

**Goal:** Turn the Testers Wanted news post into a polished recruitment article with a desktop editorial split, a clear testing checklist, and a prominent email call to action while preserving the existing mobile-first Infernal Codex visual language.

**Architecture:** Keep the content in Markdown and add a reusable image-aware article hero to the existing static news route. Render the frontmatter image with `next/image`, keep Markdown body rendering in `NewsBody`, and style mail links as article CTAs. Articles without a frontmatter image retain the current text-only layout.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, React Markdown, CSS, Vitest/Testing Library, Playwright.

---

## Task 1: Lock the editorial article contract with a failing test

- [ ] In `app/news/__tests__/news-pages.test.tsx`, import the article route and add a test that renders `testers-wanted`.
- [ ] Assert the page exposes the title, summary, one recruitment poster, `What testers will do`, and an `Email to join` mail link.
- [ ] Run `npm test -- app/news/__tests__/news-pages.test.tsx` and confirm the new test fails for missing editorial content.

## Task 2: Implement the article hero and recruitment content

- [ ] In `app/news/[slug]/page.tsx`, conditionally render an image-aware hero using `Image` and `assetPath`, with the category, title, summary, date, and poster.
- [ ] In `components/content/news-body.tsx`, render `mailto:` Markdown links with a dedicated CTA class while preserving normal links and base-path-safe Markdown images.
- [ ] In `content/news/testers-wanted.md`, remove the duplicate inline poster and rewrite the body into the approved intro, three-item tester checklist, availability note, and `Email to join` CTA.
- [ ] In `app/globals.css`, add responsive editorial hero, article body, list, poster, and CTA styles. Use a two-column hero on desktop and a single-column stack on smaller screens.
- [ ] Run the focused unit tests and confirm they pass.

## Task 3: Extend route and responsive coverage

- [ ] Add the Testers Wanted route to relevant Playwright route inventories so the new article receives smoke, accessibility, and link checks.
- [ ] Add or refine a responsive assertion for the article hero so desktop uses a split layout and mobile stacks it.
- [ ] Run the focused Playwright tests and correct any failures.

## Task 4: Verify the full site and visual result

- [ ] Run `npm run verify` and require every check to pass.
- [ ] Build/serve the GitHub Pages output and inspect the Testers Wanted article at desktop and phone viewports in the browser.
- [ ] Verify the URL, title, poster, checklist, and email CTA; inspect browser logs and accessibility state.
- [ ] Capture and visually inspect desktop and mobile screenshots.

## Task 5: Publish the corrective change

- [ ] Review the final diff and confirm it contains only the approved article polish plus the PR #4 repairs.
- [ ] Commit the implementation on `codex/fix-news-post-deploy`.
- [ ] Push the branch, open a corrective pull request, monitor required checks, merge it, and verify the GitHub Pages deployment.
- [ ] Confirm the public article URL serves the redesigned post.
