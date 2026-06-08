import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "packages", "react", "src");
const TOKENS = join(ROOT, "packages", "tokens");
const OUT = join(ROOT, "registry", "r");
mkdirSync(OUT, { recursive: true });

// Flatten styles.css by inlining its local @imports (keep remote font @import as-is).
function flattenCss() {
  const entry = readFileSync(join(TOKENS, "styles.css"), "utf8");
  return entry.replace(/@import url\("(tokens\/[a-z]+\.css)"\);/g, (_m, rel) =>
    "\n/* " + rel + " */\n" + readFileSync(join(TOKENS, rel), "utf8"));
}

// 1) tokens item (the CSS every component depends on)
const tokensItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "ux4g-tokens",
  type: "registry:file",
  title: "UX4G tokens",
  description: "UX4G design tokens + interaction layer (one CSS file).",
  files: [{
    path: "ux4g/ux4g.css",
    type: "registry:file",
    target: "styles/ux4g.css",
    content: flattenCss(),
  }],
};
writeFileSync(join(OUT, "ux4g-tokens.json"), JSON.stringify(tokensItem, null, 2));

// 2) one ui item per component .tsx
const groups = readdirSync(SRC).filter((d) => statSync(join(SRC, d)).isDirectory());
const items = [];
for (const group of groups) {
  for (const file of readdirSync(join(SRC, group)).filter((f) => f.endsWith(".tsx"))) {
    const name = basename(file, ".tsx");
    const slug = name.toLowerCase();
    const source = readFileSync(join(SRC, group, file), "utf8");
    const files = [{
      path: `ux4g/${file}`,
      type: "registry:ui",
      target: `components/ux4g/${file}`,
      content: source,
    }];
    // Bundle sibling modules referenced via a relative import so the component
    // resolves standalone after `shadcn add` (e.g. IndiaMap -> ./IndiaGeo).
    const relDeps = new Set([...source.matchAll(/from\s+["']\.\/([A-Za-z0-9_-]+)["']/g)].map((m) => m[1]));
    for (const dep of relDeps) {
      for (const ext of [".ts", ".tsx"]) {
        const depPath = join(SRC, group, dep + ext);
        if (existsSync(depPath)) {
          files.push({
            path: `ux4g/${dep}${ext}`,
            type: "registry:ui",
            target: `components/ux4g/${dep}${ext}`,
            content: readFileSync(depPath, "utf8"),
          });
          break;
        }
      }
    }
    const item = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: slug,
      type: "registry:ui",
      title: `UX4G ${name}`,
      description: `UX4G ${name} component.`,
      dependencies: ["react"],
      registryDependencies: ["./ux4g-tokens.json"],
      files,
    };
    writeFileSync(join(OUT, `${slug}.json`), JSON.stringify(item, null, 2));
    items.push({ name: slug, type: "registry:ui", title: item.title, description: item.description });
  }
}

// 3) registry.json index
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "ux4g",
  homepage: "https://github.com/Hopline-AI/ux4g",
  items: [{ name: "ux4g-tokens", type: "registry:file", title: tokensItem.title, description: tokensItem.description }, ...items],
};
writeFileSync(join(ROOT, "registry", "registry.json"), JSON.stringify(registry, null, 2));
console.log(`registry: wrote ${items.length} component items + tokens item`);
