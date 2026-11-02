# Super Schema website

The public product website for [Super Schema](https://github.com/super-schema/super-schema),
published at [super-schema.github.io](https://super-schema.github.io/).

## Develop

Use Node 22 and Python 3. No dependencies or build step are required.

```sh
npm test
npm run dev
```

Open `http://127.0.0.1:4173`. The homepage, guide, and recovery page use semantic
HTML, shared CSS, and a small ES module for example tabs and clipboard controls.
The schema examples are illustrative static text; generation runs in the application.

The hero offers eight schema previews. The model's format buttons, the target list,
and the keyboard-accessible tabs share the same selected output. “Explore an
example” focuses and scrolls to that output panel. Keep required fields and
optional email consistent, and retain each format's limitations in its note.

Reading text uses a system serif stack alongside Inter interface controls.
Body copy is 19px, controls are generally 16px, and code is at least 14px.
Anthropic's proprietary fonts are not bundled. Check phone layouts when changing
the type scale; labels should wrap instead of shrinking to fit.

The `#workflow` section progressively enhances four readable diagrams into
keyboard-accessible step tabs. It includes field intent inspection, declared
Customer references, target-specific output reviews, and a local version/pin
illustration. The target previews reuse `assets/examples.mjs`; workflow data and
version rules live in `assets/workflow-data.mjs`. No project data is changed.
Keep references distinct from observed runtime lineage, and keep publishing
examples distinct from actual application actions.

## Publish

GitHub Pages serves `main` at `/ (root)` with `.nojekyll`. Push reviewed changes
to `main`, then check the repository's Pages deployment and the live site.
All site paths assume the organization root URL above.

## Assets and provenance

- `assets/mark.svg` is the compact Canonical Hub primary logo, matching the
  application's `src/app/icon.svg`. The eight inline
  feature glyphs in `index.html` match its feature icon family.
- `assets/social.png` is the owner's uploaded Canonical Hub artwork, retained
  unchanged for social previews.
- `assets/github-mark.svg` is the existing vector mark with its dark tile removed;
  `assets/github-mark.png` is its transparent 512×512 GitHub-avatar export (12,178
  bytes, under GitHub's 1 MB limit). The original mark and uploaded artwork remain
  intact.
- `assets/workbench.png` is the application's entity-editor visual test fixture,
  using synthetic data. The page crops the fixture's masked application header.
- The mark and product image were copied from the
  [application repository](https://github.com/super-schema/super-schema).
- [Inter](https://fonts.google.com/specimen/Inter) and
  [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) are self-hosted
  Latin variable WOFF2 fonts from Google Fonts. Their original SIL Open Font
  License texts are retained under `assets/fonts/`.

The site's descriptions follow the application's current target catalog and
development documentation. Protobuf and Java POJO are labeled preview targets.
Update the guide when emitter prerequisites or supported targets change.
