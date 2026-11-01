# Super Schema project website

Status: chosen for the initial public launch.

## Purpose

Help engineers understand Super Schema's logical-model approach, explore a concrete
example, and find the source project and development prerequisites.

## Direction

Use a product-led site with an interactive example and a practical guide. A
documentation-first site would underserve newcomers; a visual showcase alone
would not explain the workflow. The signature is a Customer model that fans out
to selectable schema examples. It is an illustration, not a hosted compiler.

Headline: **One model. Many schemas.**

Use the approved Canonical Hub branching mark and all eight feature glyphs.
The owner selected Canonical Hub on 2026-10-31, replacing the initial Schema Fold
mark. Retain the exact supplied artwork for social previews and use the compact
SVG for website logos and the favicon. Pair Space
Grotesk headings with Inter body text and system monospace for code. Self-host
the two Latin variable fonts and their OFL licenses.

Palette: mist `#F7F5F8`, ink `#28212E`, violet `#8B5CA0`, blush `#F5C0C0`,
graphite `#14141C`, and white `#FFFFFF`. Use blush for accents, not low-contrast
body text. Keep motion limited to subtle transitions; respect reduced motion.

## Pages and content

- `/`: product story, Customer example, supported-target strip, a four-stage
  workflow, eight feature descriptions, a real entity-workbench screenshot,
  and guide/source calls to action.
- `/get-started.html`: conceptual first-model guide, clone command, current
  development prerequisites, and links to the source documentation.
- `/404.html`: useful recovery links and noindex metadata.

The product screenshot comes from the application's synthetic visual fixtures.
Its test-only header mask is hidden by the presentation frame; the screenshot
is explicitly captioned as synthetic test data. No customer or usage claims.

Public copy must distinguish Protobuf and Java POJO preview targets from stable
schema targets. Do not advertise disabled SDK generators, runtime enforcement
of governance metadata, universal lossless conversion, regulatory compliance,
production readiness, or performance/usage statistics. No invented testimonials,
pricing, hosted application, or signup flow. The source repository is public;
no software license has been inferred from that fact.

The guide must disclose the application's current sibling TypeSpec-emitter
prerequisites instead of promising a one-command installation. It links to the
actual repository setup and database documentation.

## Implementation

Buildless semantic HTML, one CSS file, and small ES modules. No application
framework, npm dependencies, account system, form backend, or analytics.
The page remains useful without JavaScript. The output selector uses accessible
tabs with arrow/Home/End keyboard navigation; copy-command controls report real
success or provide a selection fallback. Code is assigned with textContent.

Responsive navigation wraps on small screens without a hamburger dependency.
Code panes scroll internally rather than widening the page. Use visible focus,
descriptive alt text, semantic headings, and accessible names for controls.

## Hosting

Public repository: `super-schema/super-schema.github.io`.
Public URL: `https://super-schema.github.io/`.
Publish `main` at repository root using GitHub Pages branch publishing and an
empty `.nojekyll`. No custom domain or paid service is needed for this launch.

## Acceptance

Node's built-in tests verify example consistency, relative assets, anchors,
metadata, and the static publishing contract. Computer-based browser checks
cover rendering, output tabs, keyboard operation, copy behavior, guide navigation,
and mobile layout. Verify the deployed URL and internal assets after the Pages
deployment completes. Commit in the implementation worktree, rebase and
fast-forward main, check main, push, and remove the clean merged worktree.
