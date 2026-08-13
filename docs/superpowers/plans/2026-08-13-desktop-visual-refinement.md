# Desktop visual refinement implementation plan

1. Add responsive browser assertions for the compact feature deck, adaptive single-news layout, full-width mobile navigation, and short-page footer anchoring. Run them against the current export and confirm they fail for the intended reasons.
2. Refactor the hero, benefit cards, homepage feature showcase, and Features page markup while retaining the approved copy and source assets.
3. Add the desktop art direction and responsive CSS for layered devices, feature media windows, section depth, adaptive News cards, connected roadmap stages, footer layout, and the mobile menu.
4. Run unit tests, typecheck, lint, asset validation, production export, and the complete Playwright suite.
5. Inspect desktop and mobile renders in the browser, compare them with the accepted live-site screenshots, correct any visual or interaction regressions, and commit the verified branch.
