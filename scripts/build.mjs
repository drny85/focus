// Wraps web/app.html (the page body, as published to Claude Artifacts) into a
// complete standalone document at web/dist/index.html, and copies it into the
// Android TV wrapper's assets so the APK ships the same app.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const body = readFileSync(join(root, "web/app.html"), "utf8");
const doc = `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">` +
  `<style>html,body{margin:0}[hidden]{display:none!important}</style></head><body>\n${body}\n</body></html>\n`;

for (const out of ["web/dist/index.html", "android-tv/app/src/main/assets/index.html"]) {
  const p = join(root, out);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, doc);
  console.log("wrote", out);
}
