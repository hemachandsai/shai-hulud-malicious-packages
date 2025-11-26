import { readLines, readJson, exists } from "../utils/filesystem.js";
import { extractNpmMalicious } from "../utils/osvParser.js";

const ADVISORY_PREFIX = "malicious-packages/";

export function extractNewMalicious(advisoryListPath) {
  const lines = readLines(advisoryListPath);
  const extracted = [];
  console.log(`Extracting malicious package data from ${lines.length} advisories...`);
  for (let path of lines) {
    // Apply prefix
    path = ADVISORY_PREFIX + path;

    if (!exists(path)) {
      // console.warn(`Missing advisory file: ${path}`);
      continue;
    }

    let json;
    try {
      json = readJson(path);
    } catch {
      console.error(`Invalid JSON in ${path}`);
      continue;
    }

    const entries = extractNpmMalicious(json, path);
    extracted.push(...entries);
  }
  return extracted;
}
