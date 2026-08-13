# Release Checklist

Complete every item before publishing. Check items off as they're verified; leave a short note
next to anything that needed a fix.

## Content

- [ ] All public copy is approved (homepage, Features, Roadmap, About, Support, News).
- [ ] Android status is accurate — described as in progress, no unverified Google Play link, no
      claim of current availability.
- [ ] Windows desktop wording is accurate — described as "in development," no release date.
- [ ] No draft news post (`published: false`) is reachable from any published page, the sitemap,
      or a generated static route.
- [ ] All referenced image assets exist and are appropriately sized (`npm run validate:assets`).

## Automated checks

- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run test` (unit tests) passes.
- [ ] `npm run validate:assets` passes.
- [ ] `npm run build:pages` succeeds.
- [ ] `npm run validate:pages` passes.
- [ ] `npm run test:e2e` (Playwright: smoke, accessibility, links, responsive) passes.
- [ ] GitHub Actions CI workflow is green on the branch/PR being released.

## Manual review

- [ ] Logo and screenshots are sharp and not cropped incorrectly.
- [ ] Hero hierarchy clearly communicates Android first, Windows desktop in development.
- [ ] News cards and alternating feature rows remain readable at all reviewed widths
      (390×844, 768×1024, 1440×900, 1920×1080).
- [ ] Keyboard-only review: tab order, mobile menu open/close/Escape, skip link, visible focus
      rings, 200% browser zoom, and `prefers-reduced-motion` all work as expected.
- [ ] No horizontal overflow at any reviewed width.
- [ ] No private credential, build artifact, environment file, or reviewer identifier appears
      anywhere in the site or Git history.
- [ ] `siteConfig.privacyUrl` and `siteConfig.licensesUrl` both resolve to live pages.
- [ ] Product screenshots reflect the currently shipped Android app UI.
- [ ] All external links use HTTPS (or `mailto:`).

## Public deployment

- [ ] GitHub repository created/verified: `joshcookwv/infernal-codex` (public, `master` branch).
- [ ] GitHub Pages source set to **GitHub Actions**.
- [ ] Pages deployment workflow run succeeded — URL: _pending_
- [ ] Public site verified at `https://joshcookwv.github.io/infernal-codex/` — date: _pending_
- [ ] All seven public routes plus `sitemap.xml` return HTTP success and correct content.
- [ ] A nonexistent URL returns the branded 404 page.
