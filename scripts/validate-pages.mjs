import fs from "node:fs";
import path from "node:path";

const required = [
  "out/index.html",
  "out/404.html",
  "out/news/welcome-to-infernal-codex/index.html",
  "out/news/testers-wanted/index.html",
];
const errors = required.filter((file) => !fs.existsSync(file)).map((file) => `Missing export: ${file}`);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

const htmlFiles = fs.existsSync("out") ? walk("out").filter((file) => file.endsWith(".html")) : [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)=["'](\/[^"']*)["']/g)) {
    const url = match[1];
    if (url !== "/infernal-codex" && !url.startsWith("/infernal-codex/")) {
      errors.push(`${file}: unprefixed root URL ${url}`);
    }
  }
  if (/\.env|\/builds\/|\.apk\b|\.aab\b|reviewer|secret/i.test(html)) {
    errors.push(`${file}: forbidden private or build reference`);
  }
}

const home = fs.existsSync("out/index.html") ? fs.readFileSync("out/index.html", "utf8") : "";
if (!home.includes("/infernal-codex/_next/")) errors.push("Homepage lacks the Pages asset prefix");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} GitHub Pages HTML files.`);
