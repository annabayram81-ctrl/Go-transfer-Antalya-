import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("journey-card-fix.css", "utf8");
const script = readFileSync("journeys.js", "utf8");

test("Android journey cards use natural height and fully visible copy", () => {
  assert.match(css, /min-width:\s*320px[\s\S]*max-width:\s*480px/);
  assert.match(css, /\.gotransfer-android-app \.journey-card\s*\{[\s\S]*height:\s*auto/);
  assert.match(css, /\.journey-card h3\s*\{[\s\S]*font-size:\s*clamp\(1\.15rem/);
  assert.match(css, /\.journey-card p\s*\{[\s\S]*overflow:\s*visible/);
});

test("journey actions remain above the full-card link and accept taps", () => {
  assert.match(css, /\.journey-card nav\s*\{[\s\S]*z-index:\s*3[\s\S]*pointer-events:\s*auto/);
  assert.match(css, /\.journey-card nav a\s*\{[\s\S]*z-index:\s*4[\s\S]*pointer-events:\s*auto/);
  assert.match(css, /journey-card__shade[\s\S]*pointer-events:\s*none/);
  assert.match(script, /journey-card__image-link[\s\S]*href="\$\{detailsUrl\}"/);
});

test("Android back control stays in flow and respects bottom safe area", () => {
  assert.match(css, /\.mobile-back-button\s*\{[\s\S]*position:\s*sticky/);
  assert.match(css, /padding-bottom:\s*calc\(24px \+ env\(safe-area-inset-bottom\)\)/);
});
