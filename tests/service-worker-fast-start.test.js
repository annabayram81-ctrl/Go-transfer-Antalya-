import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../service-worker.js", import.meta.url), "utf8");

test("service worker precaches only the fast homepage shell", () => {
  const coreBlock = source.match(/const CORE_ASSETS = \[([\s\S]*?)\];/)?.[1] || "";
  const assets = [...coreBlock.matchAll(/"([^"\n]+)"/g)].map((match) => match[1]);

  assert.ok(assets.length <= 12, `expected at most 12 startup assets, found ${assets.length}`);
  assert.ok(assets.includes("/index.html"));
  assert.ok(assets.includes("/site-locale.js?v=20260801-nav-2"));
  assert.ok(!assets.includes("/reviews.html"));
  assert.ok(!assets.some((asset) => asset.startsWith("/images/reviews/")));
});

test("navigation requests cannot wait on the network forever", () => {
  assert.match(source, /function fetchWithTimeout/);
  assert.match(source, /controller\.abort\(\)/);
  assert.match(source, /fetchWithTimeout\(event\.request\)/);
});
