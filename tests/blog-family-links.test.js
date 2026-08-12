import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("blog topic cards link only to published articles", async () => {
  const source = await readFile(new URL("../blog-family.js", import.meta.url), "utf8");

  assert.match(source, /href="\/blog\/our-first-car-gotransfer-story\?lang=\$\{language\(\)\}"/);
  assert.doesNotMatch(source, /\/stories\/our-first-car-gotransfer-story/);
  assert.match(source, /class="is-upcoming"/);
  assert.match(source, /current\.soon/);
});
