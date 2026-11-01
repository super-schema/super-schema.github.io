import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { EXAMPLES } from "../assets/examples.mjs";
import { FIELD_INTENT, REFERENCES, TARGET_REVIEW, pinnedFields } from "../assets/workflow-data.mjs";

test("logical field intent and every reviewed target retain the same Customer fields", () => {
  const schema = JSON.parse(EXAMPLES.json.code);
  const avro = JSON.parse(EXAMPLES.avro.code);
  assert.deepEqual(Object.keys(FIELD_INTENT), Object.keys(schema.properties));
  for (const [name, field] of Object.entries(FIELD_INTENT)) {
    assert.equal(field.optional, !schema.required.includes(name));
    assert.ok(field.description && field.classification);
  }
  for (const [key, review] of Object.entries(TARGET_REVIEW)) {
    assert.ok(EXAMPLES[key]);
    assert.deepEqual(Object.keys(review.mapped), Object.keys(FIELD_INTENT));
    assert.ok(review.note);
  }
  assert.deepEqual(avro.fields.find((field) => field.name === "email").type, ["null", "string"]);
  assert.equal(TARGET_REVIEW.avro.mapped.email, "null | string");
  assert.match(TARGET_REVIEW.sql.mapped.id, /NOT NULL/);
  assert.match(TARGET_REVIEW.sql.mapped.email, /nullable/);
});

test("entity, API, and event examples all reference the shared Customer definition", () => {
  assert.match(REFERENCES.order.code, /customer: Customer;/);
  for (const key of ["api", "event"]) {
    assert.match(REFERENCES[key].code, /\$ref: "#\/components\/schemas\/Customer"/);
    assert.ok(REFERENCES[key].title && REFERENCES[key].description && REFERENCES[key].language);
  }
});

test("publishing makes a new version available without changing an existing explicit pin", () => {
  assert.equal(pinnedFields("1.1", false), null);
  const before = [...pinnedFields("1.0", false)];
  const after = pinnedFields("1.0", true);
  assert.deepEqual(after, before);
  assert.deepEqual(pinnedFields("1.1", true), [...before, "phone?: string"]);
  assert.equal(pinnedFields("latest", true), null);
  assert.equal(pinnedFields("2.0", true), null);
  assert.ok(Object.isFrozen(after));
});

test("all workflow steps have readable static diagrams and valid fallback anchors", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const step of ["model", "connect", "generate", "publish"]) {
    assert.ok(html.includes(`href="#workflow-${step}"`));
    assert.ok(html.includes(`id="workflow-${step}"`));
    assert.ok(html.includes(`id="workflow-tab-${step}"`));
    assert.ok(!new RegExp(`id="workflow-${step}"[^>]*\\bhidden`).test(html));
  }
  const initialCode = html.match(/<code id="wf-output-code">([\s\S]*?)<\/code>/)[1];
  assert.deepEqual(JSON.parse(initialCode), JSON.parse(EXAMPLES.json.code));
});
