# Testers Wanted article design

## Goal

Publish the Testers Wanted announcement as a deliberate recruitment page instead of a generic Markdown article, while preserving the existing Infernal Codex visual system and factual claims.

## Approved presentation

- Use an editorial split hero on desktop: title, Android category, publication date, and existing summary on the left; the supplied portrait recruitment poster on the right.
- Stack the heading content above the poster on mobile, with no horizontal overflow or clipped poster text.
- Display the poster once. Remove its duplicate inline Markdown placement and render the frontmatter image through Next.js with the configured GitHub Pages base path.
- Follow the hero with a narrow reading column. Reorganize the existing invitation into a short introduction, a `What testers will do` section, and three plain-language bullets: install the app, run a session or two, and report what is confusing, broken, or missing.
- End with a prominent `Email to join` mail link and retain the existing tester-list Gmail address. Do not add a form, analytics, signup database, release date, availability claim, or qualification requirement.
- Keep the existing poster unchanged and use the current obsidian, ember, border, typography, radius, and focus styles.

## Shared behavior

- News articles with a frontmatter image use the editorial hero; articles without one keep a text-only header.
- Root-relative Markdown images are passed through the existing `assetPath` helper so future posts also work under `/infernal-codex`.
- Mail links rendered in news bodies receive the CTA treatment while ordinary links remain ordinary inline links.

## Verification

- A component test verifies the Testers Wanted heading, summary, poster, participation section, and mail link.
- The existing Markdown-image regression test verifies the GitHub Pages prefix.
- Responsive browser tests verify two published news cards receive a two-column desktop layout.
- The complete `npm run verify` pipeline must pass, including accessibility, production export, and Pages validation.
- Desktop and mobile article screenshots are visually inspected before publishing.
