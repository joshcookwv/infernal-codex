# Release Checklist

Complete every item before publishing. Check items off as they're verified; leave a short note
next to anything that needed a fix.

## Content

- [x] All public copy is approved (homepage, Features, Roadmap, About, Support, News) — matches
      the approved design spec and plan.
- [x] Android status is accurate — described as in progress, no unverified Google Play link, no
      claim of current availability. Enforced by `homepage.test.tsx` and `showcase.spec.ts`.
- [x] Windows desktop wording is accurate — described as "in development," no release date.
- [x] No draft news post (`published: false`) is reachable from any published page, the sitemap,
      or a generated static route. Enforced by `generateStaticParams`/sitemap tests.
- [x] All referenced image assets exist and are appropriately sized (`npm run validate:assets`).

## Automated checks

- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes.
- [x] `npm run test` (unit tests) passes.
- [x] `npm run validate:assets` passes.
- [x] `npm run build:pages` succeeds.
- [x] `npm run validate:pages` passes.
- [x] `npm run test:e2e` (Playwright: smoke, accessibility, links, responsive) passes.
- [x] GitHub Actions CI workflow is green on the branch/PR being released — see
      [CI run](https://github.com/joshcookwv/infernal-codex/actions/runs/31664279874).

## Manual review

- [x] Logo and screenshots are sharp and not cropped incorrectly (reviewed via captured
      screenshots at all four responsive widths).
- [x] Hero hierarchy clearly communicates Android first, Windows desktop in development (fixed a
      real layout gap during this review — see plan Task 10 Step 2 deviation note).
- [x] News cards and alternating feature rows remain readable at all reviewed widths
      (390×844, 768×1024, 1440×900, 1920×1080).
- [x] Keyboard-only review, partial: skip link and mobile menu open/close/Escape are verified by
      `accessibility.spec.ts`. **Not independently verified in this environment:** an exhaustive
      manual tab-order walk, visible focus-ring appearance by eye, 200% browser zoom, and
      functional (not just CSS-presence) `prefers-reduced-motion` behavior — no interactive
      browser session with zoom controls was available here. Recommend a quick manual pass before
      or shortly after wider public sharing.
- [x] No horizontal overflow at any reviewed width (asserted by `responsive.spec.ts`).
- [x] No private credential, build artifact, environment file, or reviewer identifier appears
      anywhere in the site or Git history (asserted by `validate-pages.mjs`; git history is limited
      to this project's own 16 commits).
- [x] `siteConfig.privacyUrl` and `siteConfig.licensesUrl` both resolve to live pages — verified
      `200 OK` on both `https://joshcookwv.github.io/dm-assistant-mobile/privacy/` and `.../licenses/`.
- [x] Product screenshots reflect the currently shipped Android app UI, to the extent verifiable
      here: they're the most recent approved capture in `dm-assistant-mobile` (`phone-2026-08-10`)
      at the time of this release: not independently re-verified against the live Play Store build.
- [x] All external links use HTTPS (or `mailto:`) — asserted by `links.spec.ts`.

## Public deployment

- [x] GitHub repository created/verified: `joshcookwv/infernal-codex` (public, `master` branch).
- [x] GitHub Pages source set to **GitHub Actions**.
- [x] Pages deployment workflow run succeeded — [run 31664279868](https://github.com/joshcookwv/infernal-codex/actions/runs/31664279868).
- [x] Public site verified at `https://joshcookwv.github.io/infernal-codex/` — 2026-08-13.
- [x] All seven public routes plus `sitemap.xml` return HTTP success and correct content.
- [x] A nonexistent URL returns the branded 404 page (HTTP 404, correct copy).
