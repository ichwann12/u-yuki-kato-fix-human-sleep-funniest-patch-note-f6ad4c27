// Fix Human Sleep: Funniest Patch Note
// Reads the single-line patch note from entry.txt and writes it to the
// output directory given by MAKEFUN_OUTPUT_DIR (or MAKEFUN_BOT_DIR).
// Node 22, stdlib only, no network, no wall clock.

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const entryPath = join(repoRoot, "entry.txt");

const line = readFileSync(entryPath, "utf8").trim();

if (line.length === 0) {
  throw new Error("entry.txt is empty");
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (line.length >= 160) {
  throw new Error(`entry line is ${line.length} chars, must be under 160`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.MAKEFUN_BOT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "patch-note.txt"), line + "\n", "utf8");

console.log(line);
