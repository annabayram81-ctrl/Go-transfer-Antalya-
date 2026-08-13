import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import routeHandler from "../api/route-page.js";

function responseCapture() {
  return { headers:{}, statusCode:0, body:"", setHeader(name,value){this.headers[name]=value}, status(code){this.statusCode=code;return this}, send(body){this.body=body} };
}

test("Kundu has a complete indexable page in every supported language", async () => {
  for (const language of ["ru","en","tr","de","ar"]) {
    const response=responseCapture();
    await routeHandler({query:{slug:"kundu",lang:language,localized:"1"},method:"GET"},response);
    assert.equal(response.statusCode,200,language);
    assert.match(response.body,new RegExp(`<html lang="${language}"`));
    assert.match(response.body,/17\.1 km/);
    assert.match(response.body,/€30/);
    assert.match(response.body,/application\/ld\+json/);
    assert.match(response.body,/property="og:title"/);
    assert.match(response.body,new RegExp(`href="/routes/lara\\?lang=${language}"`));
    assert.match(response.body,/href="\/routes"/);
  }
});

test("homepage renders twelve primary routes and keeps all route cards linked", async () => {
  const [html,script,css]=await Promise.all([
    readFile(new URL("../index.html",import.meta.url),"utf8"),
    readFile(new URL("../popular-routes.js",import.meta.url),"utf8"),
    readFile(new URL("../popular-routes.css",import.meta.url),"utf8"),
  ]);
  assert.match(html,/<h2 id="popularRoutesTitle">Популярные направления<\/h2>/);
  assert.match(script,/const primary = \["lara","kundu","belek","side","alanya","kemer","beldibi","goynuk","camyuva","tekirova","adrasan","kas"\]/);
  assert.match(script,/calculateTransferPrice\(STANDARD_TARIFF_TIER,distance,2\)/);
  assert.match(script,/href="\/routes\/\$\{route\.id\}\?lang=\$\{lang\}"/);
  assert.match(css,/@media\(max-width:520px\).*grid-template-columns:minmax\(0,1fr\)/);
});
