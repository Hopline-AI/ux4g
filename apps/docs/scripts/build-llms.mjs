// Serve the LLM index from the site root and build a full component
// reference for AI answer engines:
//   public/llms.txt       — the compact index (copied from repo root)
//   public/llms-full.txt  — the index + every component's usage note
// Both are generated at build time, so they stay in sync with the source.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url)); // apps/docs/scripts
const repoRoot = join(here, "..", "..", "..");
const publicDir = join(here, "..", "public");
mkdirSync(publicDir, { recursive: true });

// 1) Serve the canonical llms.txt at the site root.
const llmsSrc = join(repoRoot, "llms.txt");
let header = "";
if (existsSync(llmsSrc)) {
  header = readFileSync(llmsSrc, "utf8");
  writeFileSync(join(publicDir, "llms.txt"), header);
}

// 2) Build llms-full.txt: the index + each component's .prompt.md usage note.
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (entry.endsWith(".prompt.md")) out.push(p);
  }
  return out;
}
const srcDir = join(repoRoot, "packages", "react", "src");
const notes = existsSync(srcDir) ? walk(srcDir).sort() : [];
const parts = [header.trim(), "\n\n# Full component reference\n"];
for (const file of notes) {
  const name = file.split("/").pop().replace(".prompt.md", "");
  parts.push(`\n\n## ${name}\n\n${readFileSync(file, "utf8").trim()}`);
}
writeFileSync(join(publicDir, "llms-full.txt"), parts.join("") + "\n");
console.log(`llms: wrote llms.txt + llms-full.txt (${notes.length} component notes)`);
