import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../service-worker.js", import.meta.url), "utf8");
const homepage = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("service worker removes its old caches and unregisters itself", () => {
  assert.match(source, /caches\.delete/);
  assert.match(source, /self\.registration\.unregister\(\)/);
});

test("service worker no longer intercepts page navigation", () => {
  assert.doesNotMatch(source, /addEventListener\("fetch"/);
  assert.doesNotMatch(source, /cache\.addAll/);
});

test("homepage does not wait for the unpublished hero video", () => {
  assert.doesNotMatch(homepage, /hero-car-drive-scrub\.mp4/);
  assert.match(homepage, /antalya-transfer-hero\.png/);
});
