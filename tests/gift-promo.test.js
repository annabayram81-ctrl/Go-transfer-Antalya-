import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const promo = readFileSync("gift-promo.js", "utf8");
const promoCss = readFileSync("gift-promo.css", "utf8");

test("wheel has the requested ten-sector probability distribution", () => {
  const match = promo.match(/const sectors = \[([^\]]+)\]/);
  assert.ok(match, "sector configuration is present");
  const sectors = match[1].split(",").map((value) => Number(value.trim()));
  assert.equal(sectors.length, 10);
  assert.deepEqual(
    Object.fromEntries([5, 10, 15, 20].map((discount) => [discount, sectors.filter((value) => value === discount).length])),
    { 5: 4, 10: 3, 15: 2, 20: 1 },
  );
});

test("coupon is persisted and all requested analytics events are emitted", () => {
  assert.match(promo, /localStorage\.setItem\(STORAGE_KEY/);
  assert.match(promo, /document\.cookie =/);
  assert.match(promo, /const lockedCoupon = readCoupon\(\);[\s\S]*const index = randomSectorIndex\(\)/);
  assert.match(promo, /saveCoupon\(value\);[\s\S]*spinButton\.hidden = true/);
  assert.match(promo, /addEventListener\("storage"/);
  for (const eventName of ["gift_open", "wheel_spin", "coupon_won", "coupon_whatsapp_click"]) {
    assert.match(promo, new RegExp(`track\\("${eventName}"`));
  }
});

test("wheel rotation uses the selected sector and the topbar offer is responsive", () => {
  assert.match(promo, /index \* 36/);
  assert.match(promo, /rotationFor\(index, true\)/);
  assert.match(promoCss, /@media\(max-width:620px\)/);
  assert.match(promo, /querySelector\("\.quick-links"\)/);
  assert.doesNotMatch(promoCss, /\.gift-promo__teaser\{position:fixed/);
});

test("gift copy and WhatsApp message follow every supported site language", () => {
  assert.match(promo, /const LANGUAGE_KEY = "gotransfer-language"/);
  for (const language of ["ru", "tr", "en", "de", "ar"]) assert.match(promo, new RegExp(`${language}: \\{`));
  assert.match(promo, /encodeURIComponent\(text\.message\(value\)\)/);
});

test("static and server-rendered pages load the promotion", () => {
  const locale = readFileSync("site-locale.js", "utf8");
  const localizedHtml = readFileSync("api/localized-html.js", "utf8");
  assert.equal((locale.match(/return-transfer-ui\.js/g) || []).length, 1);
  assert.equal((localizedHtml.match(/return-transfer-ui\.js/g) || []).length, 1);
});
