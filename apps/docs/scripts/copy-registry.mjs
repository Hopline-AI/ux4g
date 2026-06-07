// Copy the built shadcn registry into the docs site's public/ so the deployed
// site hosts it (enables `npx shadcn add https://<site>/r/<name>.json`).
// Self-bootstraps the registry build if it hasn't been generated yet.
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url)); // apps/docs/scripts
const repoRoot = join(here, "..", "..", "..");
const registryR = join(repoRoot, "registry", "r");
const registryIndex = join(repoRoot, "registry", "registry.json");

if (!existsSync(registryR) || readdirSync(registryR).length === 0) {
  console.log("registry not built yet — running build-registry.mjs");
  execSync("node scripts/build-registry.mjs", { cwd: repoRoot, stdio: "inherit" });
}

const publicDir = join(here, "..", "public");
mkdirSync(join(publicDir, "r"), { recursive: true });
cpSync(registryR, join(publicDir, "r"), { recursive: true });
cpSync(registryIndex, join(publicDir, "registry.json"));
console.log(`copied ${readdirSync(registryR).length} registry items into apps/docs/public/r`);
