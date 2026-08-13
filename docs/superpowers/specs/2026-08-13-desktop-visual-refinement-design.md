# Infernal Codex desktop visual refinement

## Goal

Make the showcase site feel intentionally composed for a computer display while preserving the approved mobile-app identity, content, navigation, and honest platform messaging.

## Design direction

- Keep the obsidian, charcoal, ember-orange, and parchment-white palette already derived from the app logo.
- Keep every existing word in the hero. Improve its presence with atmospheric light, a subtle brand watermark, and two layered phone frames built from the existing screenshots.
- Turn the three plain benefit statements into compact titled cards with restrained line icons and supporting copy.
- Replace the homepage's six full-height alternating screenshot rows with a desktop-first feature deck. The first two tools receive wider cards; the remaining four form a compact supporting row. Portrait screenshots sit inside cropped, fixed-ratio media windows so they do not dictate page height.
- Keep the dedicated Features page detailed, but present each screenshot inside a constrained device window so the copy and imagery share a balanced desktop rhythm.
- Let News adapt to its content count. A single article becomes a wide editorial card rather than occupying one third of the row.
- Present Now, Next, and Later as connected roadmap stages on larger screens and a vertical path on small screens.
- Anchor the footer to the bottom of short pages and give it a clearer brand/navigation split.
- On phones, open navigation as a full-width dropdown below the header row. Keep touch targets, keyboard behavior, Escape handling, and reduced-motion support.

## Boundaries

- Do not modify `D:\Claude\projects\dm-assistant-mobile`.
- Do not add a CMS, desktop application code, generated artwork, third-party package, or release claim.
- Do not alter the homepage section order or hero copy.
- Use only the existing brand logo and app screenshots.

## Acceptance criteria

- At 1440px, the homepage feature deck is no taller than 2,200px and the full homepage is no taller than 5,400px.
- At 1440px, no homepage feature media window exceeds 470px in height.
- With one published post, its News card consumes at least 65% of the available News grid width.
- At 390px, the open navigation panel is at least 350px wide and aligned within 20px of the viewport edge.
- The footer reaches the viewport bottom on a short page.
- The exact hero heading, paragraph, CTA, and two status strings remain unchanged.
- Unit tests, typecheck, lint, production export, Playwright responsive checks, and accessibility checks pass.
