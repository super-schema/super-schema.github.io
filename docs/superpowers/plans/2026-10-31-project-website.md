# Super Schema Website Implementation Plan

> Steps use checkbox (`- [ ]`) syntax so an executor can track progress task by task.

**Goal:** Publish an accurate, useful Super Schema product website on GitHub Pages.

**Architecture:** Buildless HTML/CSS with a small progressive-enhancement module
and static example data. GitHub Pages serves the main branch at repository root.

**Tech Stack:** HTML, CSS, ES modules, Node 22 built-in tests, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-31-project-website-design.md`.

## Global Constraints

- No npm dependencies, backend, telemetry, or invented product claims.
- Use the approved brand mark and eight feature glyphs.
- Protobuf and Java POJO are preview targets; do not advertise disabled SDKs.
- Examples illustrate the workflow; this site does not run the application compiler.
- Document current emitter prerequisites and link to the actual source project.
- Work on `codex/website-launch`; preserve the application repository's changes.

---

### Task 1: Build the product site and guide

**Files:** `index.html`, `get-started.html`, `404.html`, `assets/site.css`,
`assets/mark.svg`, `assets/workbench.png`, `assets/social.png`, `assets/fonts/`,
`robots.txt`, `sitemap.xml`, `.nojekyll`, `.gitignore`, `README.md`.

**Interfaces:** Navigation anchors are `#example`, `#workflow`, and `#features`.
The guide lives at `/get-started.html`. Source links use
`https://github.com/super-schema/super-schema`.

- [ ] Create the semantic page structure with this exact hero copy:

```html
<h1>One model.<br><span>Many schemas.</span></h1>
<p>Design the logical shape of your data. Reuse it across schemas, APIs, and events.</p>
<a href="/get-started.html">Get started</a>
<a href="https://github.com/super-schema/super-schema">View on GitHub</a>
```

- [ ] Implement the light violet/ink design, the model-to-output example frame,
  four-stage workflow, eight feature rows, and dark product-screenshot section.
- [ ] Add the practical guide and recovery page. Copy only the selected brand
  assets and synthetic workbench screenshot from the application repository.
- [ ] Self-host the two font files with their original license texts. Add
  canonical/Open Graph metadata, robots, sitemap, and `.nojekyll`.

### Task 2: Implement the example interactions and checks

**Files:** `assets/examples.mjs`, `assets/site.mjs`, `tests/site.test.mjs`,
`package.json`.

**Interfaces:** `EXAMPLES` exports the keys `json`, `avro`, `protobuf`, and `sql`.
Each value supplies `label`, `filename`, `status`, and `code`. The DOM provides
`[role="tab"][data-format]`, `#example-code`, `#example-filename`, and
`#example-panel`. Copy controls name their code element with `data-copy`.

- [ ] Define the Customer example with required `id` and `name`, optional
  `email`, and matching JSON Schema, Avro, Protobuf, and PostgreSQL examples.
- [ ] Switch only among known example keys; update code with textContent and
  keep aria-selected, tabindex, and the panel label synchronized. Support
  ArrowLeft, ArrowRight, Home, and End.
- [ ] Copy only the referenced code text; announce success after the clipboard
  promise resolves and offer text selection if clipboard access fails.
- [ ] Use the platform test runner:

```json
{"scripts":{"test":"node --test tests/*.test.mjs","dev":"python3 -m http.server 4173 --bind 127.0.0.1"}}
```

- [ ] Run `npm test`. Check field optionality across examples, internal assets
  and anchors, required metadata, and the existence of `.nojekyll`.
- [ ] Preview with `npm run dev`; review the actual browser UI, tabs, keyboard
  navigation, copy control, guide links, mobile layout, and reduced motion.

### Task 3: Publish and verify

**Files:** finished source and documentation; no runtime configuration secrets.

**Interfaces:** GitHub Pages publishes `main:/`; the canonical origin is
`https://super-schema.github.io`.

- [ ] Commit the implementation, rebase onto main, and fast-forward main.
- [ ] Run `npm test` on main, push main, and enable Pages branch publishing.
- [ ] Verify deployment status, the live homepage and guide, and core assets.
- [ ] Set the repository website URL to the verified deployed address.
- [ ] Remove the clean merged worktree and implementation branch.
