import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "content", "lib"];
const sourceExtensions = new Set([".ts", ".tsx", ".md"]);

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const referenced = new Set();
for (const file of roots
  .flatMap(walk)
  .filter((file) => sourceExtensions.has(path.extname(file)))
  .filter((file) => !file.split(path.sep).includes("__tests__"))) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/["'](\/images\/[^"']+)["']/g)) {
    referenced.add(match[1]);
  }
}

const errors = [];
for (const publicPath of referenced) {
  const file = path.join("public", publicPath.replace(/^\/+/, ""));
  if (!fs.existsSync(file)) {
    errors.push(`Missing asset: ${publicPath}`);
  } else if (fs.statSync(file).size > 2.5 * 1024 * 1024) {
    errors.push(`Asset exceeds 2.5 MB: ${publicPath}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${referenced.size} referenced image assets.`);
