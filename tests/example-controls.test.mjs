import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { EXAMPLES } from "../assets/examples.mjs";

const read = (file) => readFile(new URL("../" + file, import.meta.url), "utf8");

test("every advertised format has a preview tab and both clickable entrances", async () => {
  const html = await read("index.html");
  assert.equal(Object.keys(EXAMPLES).length, 8);
  for (const key of Object.keys(EXAMPLES)) {
    assert.equal([...html.matchAll(new RegExp(`data-format="${key}"`, "g"))].length, 1, key);
    assert.equal([...html.matchAll(new RegExp(`data-target="${key}"`, "g"))].length, 2, key);
    assert.ok(html.includes(`id="format-${key}"`));
  }
  assert.match(html, /href="#example-panel" data-explore-example/);
  assert.doesNotMatch(html, /output-targets" aria-hidden="true"/);
});

test("format buttons, keyboard tabs, and the explore link operate the same output panel", async () => {
  const html = await read("index.html");
  const keys = [...html.matchAll(/data-format="([^"]+)"/g)].map((match) => match[1]);
  const node = (dataset = {}) => ({
    dataset, textContent: "", attributes: {}, classes: new Set(), handlers: {},
    parentElement: { scrollTop: 0, scrollLeft: 0 },
    addEventListener(event, handler) { this.handlers[event] = handler; },
    setAttribute(name, value) { this.attributes[name] = value; },
    focus() { this.focused = true; },
    scrollIntoView() { this.scrolled = true; },
    get classList() { return { toggle: (name, active) => active ? this.classes.add(name) : this.classes.delete(name) }; }
  });
  const tabs = keys.map((format) => node({ format }));
  const targets = [...keys, ...keys].map((target) => node({ target }));
  const explore = node();
  const elements = Object.fromEntries(["example-panel", "example-code", "example-filename", "example-detail"].map((id) => [id, node()]));
  const history = { replaceState(_state, _unused, url) { this.url = url; } };
  const document = {
    getElementById: (id) => elements[id],
    querySelector: () => explore,
    querySelectorAll: (selector) => selector.includes("data-format") ? tabs : selector === "[data-target]" ? targets : []
  };
  const source = (await read("assets/site.mjs")).replace(/^import .*\n/, "");
  vm.runInNewContext(source, { document, history, EXAMPLES });
  for (const target of targets) {
    target.handlers.click();
    const key = target.dataset.target;
    assert.equal(elements["example-filename"].textContent, EXAMPLES[key].filename);
    assert.equal(elements["example-code"].textContent, EXAMPLES[key].code);
    assert.equal(elements["example-panel"].attributes["aria-labelledby"], `format-${key}`);
    assert.equal(tabs.filter((tab) => tab.attributes["aria-selected"] === "true").length, 1);
    assert.ok(targets.filter((button) => button.dataset.target === key).every((button) => button.attributes["aria-pressed"] === "true"));
  }
  tabs[0].handlers.keydown({ key: "End", preventDefault() {} });
  assert.equal(tabs.at(-1).focused, true);
  tabs.at(-1).handlers.keydown({ key: "ArrowRight", preventDefault() {} });
  assert.equal(tabs[0].focused, true);
  explore.handlers.click({ preventDefault() { this.prevented = true; } });
  assert.equal(history.url, "#example-panel");
  assert.equal(elements["example-panel"].focused, true);
  assert.equal(elements["example-panel"].scrolled, true);
});
