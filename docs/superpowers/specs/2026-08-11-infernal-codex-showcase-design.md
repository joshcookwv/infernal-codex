# Infernal Codex Showcase Website Design

**Date:** August 11, 2026
**Status:** Approved for implementation planning

## Purpose

Build a polished public website that introduces Infernal Codex to Dungeon Masters of any experience level. The first release showcases the Android application, explains its benefits and features, publishes project news, and communicates that a Windows desktop edition is in development.

The website is a standalone product-marketing and communications project. It does not contain, import, or modify the production-bound mobile application or the existing desktop application.

## Goals

- Help a first-time visitor quickly understand what Infernal Codex does and why it is useful at the table.
- Make Android the primary product story and provide a clear Google Play action when the production listing is ready.
- Present the Windows desktop edition honestly as an upcoming project without promising a release date.
- Publish news, release notes, previews, and development updates through simple version-controlled Markdown files.
- Establish a professional, accessible visual identity based on the mobile application's approved Infernal Codex design system.
- Launch on a free GitHub Pages address while preserving a practical migration path to a custom domain and server-capable hosting.

## Non-Goals

- Changing, importing, or sharing runtime code with `D:\Claude\projects\dm-assistant-mobile`.
- Changing or modernizing `D:\Claude\projects\dm-assistant` as part of the website project.
- Providing user accounts, comments, email subscriptions, payment processing, an administrative dashboard, or personalized content in the initial release.
- Promising an iOS edition or a dated Windows release.
- Automatically publishing application builds or unapproved release information.

## Audience and Product Positioning

The primary audience is Dungeon Masters of any experience level. Copy emphasizes concrete outcomes rather than technical implementation:

- Keep campaign material organized in one place.
- Prepare sessions more efficiently.
- Run encounters without losing momentum.
- Find rules and creatures quickly.
- Keep ordinary campaign data local and under the user's control.

The website must remain understandable to visitors who are not developers and are unfamiliar with the existing repositories.

## Platform Story

- **Android:** The primary, production-bound product. Before launch, calls to action use accurate availability language. After launch, they point to the verified Google Play listing.
- **Windows desktop:** Displayed as "In development." The site may publish approved progress reports and previews but does not provide a date until one is explicitly approved.
- **iOS and web application:** Not advertised as committed platforms in the initial release.

## Technical Architecture

The website is a new standalone Next.js project in `C:\Users\joshc\OneDrive\Documents\ChatGPT\Infernal Codex`.

- Use the Next.js App Router with TypeScript.
- Use Tailwind CSS for styling and shared design tokens.
- Produce a static export suitable for GitHub Pages.
- Store all initial editorial content in the repository.
- Use Markdown for news and update posts.
- Deploy only the generated static site; no Node.js server runs in production.

The intended GitHub repository name is `infernal-codex`, producing the initial project address `https://joshcookwv.github.io/infernal-codex/`. If GitHub requires a different repository name when the remote is created, update the documented address and deployment base path together before the first public deployment.

Static hosting deliberately excludes server-only Next.js features. If the project later needs accounts, comments, a CMS, server-side personalization, or private APIs, migrate deployment to a Next.js-capable host. The page components, content, styling, and URLs should remain reusable during that migration.

## Repository Boundaries

The website, mobile application, and desktop application remain three independent repositories.

- Public screenshots, logos, and approved copy may be copied into the website repository.
- The website must not reference source files through paths into either application checkout.
- Store and build links are manually approved website content.
- The website must not scan build directories or publish the newest artifact automatically.
- Privacy and licensing pages may link to the existing verified public documents until a deliberate consolidation is separately designed and approved.
- Desktop downloads may be linked later, but desktop binaries and source code are not part of this website design.

## Information Architecture

### Home

The homepage tells the complete product story in a concise sequence:

1. Global navigation.
2. Hero with Android availability and desktop-development status.
3. Three core product benefits.
4. Feature showcase with screenshots.
5. Platform status section.
6. Three most recent news posts.
7. Short roadmap preview.
8. Closing action and footer.

### Features

Explain the major user-facing capabilities using benefits, screenshots, and short examples:

- Campaign organization
- Encounter tracking
- Searchable rules and monsters
- NPCs, notes, and maps
- Backup and restore
- Optional Pro AI tools

The page distinguishes ordinary local features from optional AI processing and avoids unsupported claims.

### News

Show published posts newest-first, with category, date, title, summary, and optional image. Categories are:

- News
- Android
- Desktop
- Release Notes

Each post has a stable, shareable detail URL.

### Roadmap

Organize approved work into broad `Now`, `Next`, and `Later` stages. Do not show delivery dates by default. Clearly distinguish released work, active development, and longer-term ideas.

### About

Explain the project's purpose, independent status, local-first approach, and commitment to practical tools for Dungeon Masters.

### Support

Provide:

- Support contact
- Public issue-reporting link
- Frequently asked questions
- Privacy-policy link
- Open-content licensing link
- Clear direction for downloading or finding the current Android release

### News Article

Render one Markdown post with title, date, category, optional image, article body, and a link back to the News index.

### Not Found

Provide a branded 404 page with concise navigation back to Home, News, and Support.

## Homepage Design

### Navigation

Place the Infernal Codex logo and name on the left and links for Features, News, Roadmap, About, and Support on the right. Include one emphasized Android availability action. On small screens, provide an accessible compact menu with full keyboard support.

### Hero

Use the approved headline "Your campaign. At the table." Add a short explanation written for Dungeon Masters, a primary Android status or Google Play action, and a secondary Features action. Present current approved mobile screenshots in polished device frames and include a restrained "Desktop version in development" label.

### Core Benefits

Lead with three benefits:

1. Prepare everything in one place.
2. Run encounters without breaking momentum.
3. Keep campaign data local and under your control.

### Feature Showcase

Use alternating image-and-copy sections. Each section explains a Dungeon Master's task, the friction Infernal Codex removes, and the relevant feature. Do not rely on feature names alone.

### Platform Status

Present Android as the primary product. Present Windows desktop as active future development without a date. Do not show unavailable download buttons.

### Latest News and Roadmap Preview

Generate the latest-news cards from the three newest published Markdown posts. Show only an abbreviated roadmap on Home and link to the complete Roadmap page.

### Footer

Repeat the primary availability action and provide links to News, Support, Privacy, Licenses, GitHub, and the support contact. Include an independence disclaimer.

## Visual System

The website uses the established Infernal Codex direction: a modern campaign command center rather than a parchment-themed fantasy interface.

- Obsidian canvas and layered charcoal surfaces
- Ember-orange accents for priority, state, and calls to action
- Pale primary text and warm muted secondary text
- Rounded panels and controls
- Restrained borders, gradients, and glow effects
- Clear hierarchy and generous spacing for marketing content
- Mobile screenshots as the primary product imagery

Motion is subtle, never required to understand content, and disabled or reduced when the visitor requests reduced motion.

## Content Model

News posts live in a dedicated content directory and use Markdown with validated front matter:

```yaml
title: "Infernal Codex update title"
date: "2026-08-11"
summary: "One concise public summary."
category: "Android"
published: true
image: "/images/news/example.webp"
```

Rules:

- `title`, `date`, `summary`, `category`, and `published` are required.
- `image` is optional and uses a branded fallback when omitted.
- `category` must match one of the four approved categories.
- `published: false` excludes the post from builds and navigation.
- Published posts sort by date descending.
- Filenames provide stable URL slugs and must not be changed after publication without an explicit redirect plan.
- Dates are displayed unambiguously in United States English.

## Content Flow

1. An editor copies the documented news-post template.
2. The editor fills in metadata and Markdown content.
3. Local validation checks the metadata, links, and build.
4. A pull request or reviewed commit records the change.
5. GitHub Actions runs all required checks.
6. A successful build deploys the static export to GitHub Pages.
7. The public article and affected indexes are checked after deployment.

Platform status, store links, roadmap entries, and downloads follow the same reviewed source-control flow. No external application state automatically changes public availability claims.

## Error Handling

- Invalid or missing required post metadata fails the build with a message naming the file and invalid field.
- Unknown post slugs and routes render the branded Not Found page.
- Posts that omit the optional `image` field use a local branded fallback.
- Posts that specify an image path whose file is missing fail validation rather than rendering broken media.
- External download and store actions identify their destination and open safely.
- Draft posts never appear in generated indexes, metadata, or the sitemap.
- Empty news and roadmap states provide intentional explanatory copy.

## Accessibility

- Meet WCAG 2.2 AA contrast and interaction expectations for the implemented scope.
- Support keyboard navigation with visible focus indicators.
- Use semantic landmarks, headings, lists, links, and buttons.
- Give meaningful screenshots descriptive alternative text; mark decorative imagery appropriately.
- Maintain usable layouts at 200% browser zoom and across phone, tablet, laptop, and wide desktop widths.
- Respect reduced-motion preferences.
- Provide touch targets suitable for mobile use.
- Do not communicate platform status through color alone.

## Search and Sharing

- Provide unique page titles and descriptions.
- Generate canonical URLs using the deployed base address.
- Provide social-sharing metadata and a default branded sharing image.
- Generate a sitemap containing published public routes only.
- Provide crawler rules appropriate for the public showcase.
- Exclude drafts and internal build artifacts from discoverable output.

## Privacy

The initial site uses no behavioral analytics, advertising trackers, accounts, comments, email collection, or nonessential cookies. External services added later require a separate privacy and architecture review before implementation.

## Testing and Verification

Automated checks must include:

- TypeScript type checking
- Linting
- Production static export
- News metadata validation
- Published/draft filtering tests
- Newest-first sorting tests
- Stable route generation tests
- Internal-link validation
- Sitemap exclusion of drafts

Manual review must include:

- Phone, tablet, laptop, and wide-desktop layouts
- Keyboard-only navigation
- Visible focus states
- Heading order and landmark review
- Contrast and reduced-motion behavior
- Image loading and alternative text
- 404 behavior
- Android availability wording and links
- Desktop-development wording
- Privacy, licensing, support, and GitHub links
- Post-deployment verification of the public GitHub Pages site

## Deployment

Use GitHub Actions with least-privilege permissions to build and deploy the static export to GitHub Pages. Deployment occurs from the repository's `master` branch only after required checks pass.

The deployment configuration must account for the GitHub Pages project base path. Navigation, assets, metadata, sitemap entries, and social URLs must all work beneath that path. A future custom domain must be configurable without rewriting page components.

## Future Expansion

The website may later add a custom domain, a CMS, privacy-respecting aggregate analytics, an email update list, richer release feeds, or server-backed features. Each addition requires separate approval because it can change hosting, privacy, operating cost, or maintenance requirements.

The Windows desktop application is a separate follow-up project. Its design should begin from the existing `D:\Claude\projects\dm-assistant` application, preserve working functionality where appropriate, and adopt the mobile application's visual language and selected feature improvements. The website can report that work and link approved releases, but it does not define or implement the desktop architecture.

## Acceptance Criteria

The website design is satisfied when:

- A first-time Dungeon Master can understand the product, primary benefits, and Android availability without reading technical documentation.
- The site contains Home, Features, News, Roadmap, About, Support, news-detail, and Not Found experiences.
- Approved screenshots and branding match the Infernal Codex mobile visual direction.
- Android is the primary platform and Windows is accurately labeled as in development.
- Markdown posts generate validated, correctly sorted public news pages.
- The site exports statically and deploys successfully to the free GitHub Pages address.
- Accessibility, link, metadata, responsive-layout, and post-deployment checks pass.
- Neither application repository is modified by the website project.
