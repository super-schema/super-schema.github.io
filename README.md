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

## Publish

GitHub Pages serves `main` at `/ (root)` with `.nojekyll`. Push reviewed changes
to `main`, then check the repository's Pages deployment and the live site.
All site paths assume the organization root URL above.

## Assets and provenance

- `assets/mark.svg` is the application's approved vector mark. The eight inline
  feature glyphs in `index.html` match its feature icon family.
- `assets/social.png` is the approved Schema Fold product concept.
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
