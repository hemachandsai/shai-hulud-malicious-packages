// Usage: node utils/split.js 200
// (200 = 200 KB max chunk size)

const fs = require("fs");
const path = require("path");

const BASE_DIR = process.cwd();

// Input & output paths relative to working directory
const INPUT = path.join(BASE_DIR, "malicious_npm_packages.json");
const OUT_DIR = path.join(BASE_DIR, "malicious_npm_packages_chunked");

// Read chunk size argument
const sizeArg = process.argv[2];
if (!sizeArg || isNaN(sizeArg)) {
  console.error("Please provide chunk size in KB. Example:");
  console.error("  node utils/split-json-chunks.js 200");
  process.exit(1);
}

const TARGET_SIZE = parseInt(sizeArg, 10) * 1024; // KB → bytes

console.log(`Splitting JSON into chunks (max size: ${sizeArg} KB)...`);
console.log(`Working directory: ${BASE_DIR}`);

if (!fs.existsSync(INPUT)) {
  console.error(`Input file not found: ${INPUT}`);
  process.exit(1);
}

// Clean output directory
if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR);

// Read JSON file
const data = JSON.parse(fs.readFileSync(INPUT, "utf8"));
const entries = Object.entries(data);

let chunk = {};
let chunkSize = 2; // "{}"
let index = 0;

// Write a JSON chunk file
function writeChunk(obj, idx) {
  const file = path.join(OUT_DIR, `chunk_${String(idx).padStart(2, "0")}.json`);
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
  console.log(`Created: ${file}`);
}

for (const [key, value] of entries) {
  const entryObj = { [key]: value };
  const entryStr = JSON.stringify(entryObj, null, 2);
  const entrySize = Buffer.byteLength(entryStr, "utf8");

  // If adding this entry exceeds max size → write current chunk first
  if (chunkSize + entrySize > TARGET_SIZE && Object.keys(chunk).length > 0) {
    writeChunk(chunk, index++);
    chunk = {};
    chunkSize = 2;
  }

  // Add entry to current chunk
  chunk[key] = value;
  chunkSize += entrySize;
}

// Write final chunk
if (Object.keys(chunk).length > 0) {
  writeChunk(chunk, index++);
}

console.log("Done.");
