import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { EXAMPLES } from "../assets/examples.mjs";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const pages = ["index.html", "get-started.html", "404.html"];

test("Customer examples preserve the shared fields and email optionality", () => {
  const json = JSON.parse(EXAMPLES.json.code);
  const avro = JSON.parse(EXAMPLES.avro.code);
  assert.deepEqual(Object.keys(json.properties), ["id", "name", "email"]);
  assert.deepEqual(json.required, ["id", "name"]);
  assert.ok(Object.values(json.properties).every((field) => field.type === "string"));
  assert.equal(avro.name, json.title);
  assert.deepEqual(avro.fields.map((field) => field.name), Object.keys(json.properties));
  assert.deepEqual(avro.fields.slice(0, 2).map((field) => field.type), ["string", "string"]);
  assert.deepEqual(avro.fields[2].type, ["null", "string"]);
  assert.equal(avro.fields[2].default, null);
  assert.match(EXAMPLES.protobuf.code, /string id = 1;/);
  assert.match(EXAMPLES.protobuf.code, /string name = 2;/);
  assert.match(EXAMPLES.protobuf.code, /optional string email = 3;/);
  assert.equal(EXAMPLES.protobuf.status, "Preview");
  assert.match(EXAMPLES.sql.code, /id TEXT NOT NULL/);
  assert.match(EXAMPLES.sql.code, /name TEXT NOT NULL/);
  assert.match(EXAMPLES.sql.code, /email TEXT\n/);
  const openapi = JSON.parse(EXAMPLES.openapi.code);
  assert.equal(openapi.openapi, "3.0.3");
  assert.deepEqual(openapi.components.schemas.Customer.properties, json.properties);
  assert.deepEqual(openapi.components.schemas.Customer.required, json.required);
  for (const key of ["bigquery", "spanner"]) {
    assert.match(EXAMPLES[key].code, /id STRING(?:\(MAX\))? NOT NULL/);
    assert.match(EXAMPLES[key].code, /name STRING(?:\(MAX\))? NOT NULL/);
    assert.match(EXAMPLES[key].code, /email STRING(?:\(MAX\))?\n/);
  }
  assert.match(EXAMPLES.spanner.code, /PRIMARY KEY \(id\)/);
  assert.equal(EXAMPLES.java.status, "Preview");
  assert.match(EXAMPLES.java.code, /@JsonProperty\(value = "id", required = true\)/);
  assert.match(EXAMPLES.java.code, /@JsonProperty\("email"\)/);
  assert.match(EXAMPLES.java.note, /do not enforce runtime validation/);
});

test("the initial example works without JavaScript and copy targets exist", async () => {
  const home = await read("index.html");
  const initialCode = home.match(/<code id="example-code">([\s\S]*?)<\/code>/)[1];
  assert.deepEqual(JSON.parse(initialCode), JSON.parse(EXAMPLES.json.code));
  for (const page of pages) {
    const html = await read(page);
    for (const [, id] of html.matchAll(/data-copy="([^"]+)"/g)) {
      assert.ok(html.includes(`id="${id}"`), `${page}: copy target ${id}`);
    }
  }
});

test("every local navigation target, fragment, and asset resolves", async () => {
  for (const page of pages) {
    const html = await read(page);
    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(value, `https://super-schema.github.io/${page}`);
      if (url.origin !== "https://super-schema.github.io") continue;
      const file = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
      await access(new URL(file, root));
      if (url.hash) {
        const target = await read(file);
        assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${page}: ${value}`);
      }
    }
  }
  const css = await read("assets/site.css");
  for (const [, path] of css.matchAll(/url\("([^"]+)"\)/g)) {
    await access(new URL(path.slice(1), root));
  }
});

test("public pages have metadata and a single main heading", async () => {
  for (const page of pages) {
    const html = await read(page);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /<meta name="viewport"/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
    assert.match(html, /href="#main">Skip to content/);
    if (page !== "404.html") {
      const path = page === "index.html" ? "/" : `/${page}`;
      assert.ok(html.includes(`rel="canonical" href="https://super-schema.github.io${path}"`));
      assert.match(html, /property="og:image"/);
    } else assert.match(html, /name="robots" content="noindex"/);
  }
  await access(new URL(".nojekyll", root));
  assert.match(await read("robots.txt"), /Sitemap: https:\/\/super-schema.github.io\/sitemap.xml/);
  const sitemap = await read("sitemap.xml");
  assert.match(sitemap, /<loc>https:\/\/super-schema.github.io\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/super-schema.github.io\/get-started.html<\/loc>/);
});

test("self-hosted fonts retain their format and licenses", async () => {
  for (const [font, license] of [["inter-latin.woff2", "INTER-OFL.txt"], ["space-grotesk-latin.woff2", "SPACE-GROTESK-OFL.txt"]]) {
    const bytes = await readFile(new URL(`assets/fonts/${font}`, root));
    assert.equal(bytes.subarray(0, 4).toString(), "wOF2");
    assert.match(await read(`assets/fonts/${license}`), /SIL OPEN FONT LICENSE/);
  }
});

test("GitHub avatar stays a compact PNG with an alpha channel", async () => {
  const png = await readFile(new URL("assets/github-mark.png", root));
  assert.ok(png.length < 1_000_000);
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), 512);
  assert.equal(png.readUInt32BE(20), 512);
  assert.equal(png[25], 6); // RGBA PNG; preserve transparency when re-exporting.
  assert.doesNotMatch(await read("assets/github-mark.svg"), /hub-tile/);
});
