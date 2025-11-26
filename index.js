import { extractNewMalicious } from "./scripts/extract.js";
import { mergeIntoMaliciousDB } from "./scripts/merge.js";

const ADVISORY_LIST = "advisories.txt";
const MALICIOUS_DB = "malicious_npm_packages.json";

const newEntries = extractNewMalicious(ADVISORY_LIST);
mergeIntoMaliciousDB(MALICIOUS_DB, newEntries);

console.log("\n✔ Completed processing malicious npm advisories.");
