import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const activity = readFileSync(
  "android/app/src/main/java/com/gotransfer/antalya/MainActivity.kt",
  "utf8",
);
const baseTheme = readFileSync("android/app/src/main/res/values/styles.xml", "utf8");
const android15Theme = readFileSync(
  "android/app/src/main/res/values-v35/styles.xml",
  "utf8",
);
const strings = readFileSync("android/app/src/main/res/values/strings.xml", "utf8");

test("Android app never requests fullscreen or immersive navigation", () => {
  assert.doesNotMatch(
    activity,
    /SYSTEM_UI_FLAG_(?:HIDE_NAVIGATION|IMMERSIVE|IMMERSIVE_STICKY|FULLSCREEN)/,
  );
  assert.doesNotMatch(activity, /setDecorFitsSystemWindows\(false\)|enableEdgeToEdge/);
  assert.match(baseTheme, /android:windowFullscreen">false/);
});

test("Samsung three-button navigation is explicitly restored throughout lifecycle", () => {
  assert.match(activity, /setDecorFitsSystemWindows\(true\)/);
  assert.match(activity, /show\(WindowInsets\.Type\.statusBars\(\) or WindowInsets\.Type\.navigationBars\(\)\)/);
  assert.match(activity, /override fun onResume\(\)[\s\S]*?keepSystemBarsVisible\(\)/);
  assert.match(activity, /override fun onWindowFocusChanged\(hasFocus: Boolean\)[\s\S]*?keepSystemBarsVisible\(\)/);
  assert.match(activity, /APPEARANCE_LIGHT_NAVIGATION_BARS/);
  assert.match(android15Theme, /windowOptOutEdgeToEdgeEnforcement">true/);
});

test("Android app opens the canonical site where device language is detected", () => {
  assert.match(strings, /<string name="site_url">https:\/\/gotransfer\.my\/\?source=android-app<\/string>/);
});
