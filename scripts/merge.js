import { readJson, writeJson } from "../utils/filesystem.js";
import { semverCompare } from "../utils/semver.js";
import { logSummary, logChanges } from "../utils/logger.js";
import { appendToChangelog } from "../utils/changelog.js";
import fs from "fs";

export function mergeIntoMaliciousDB(dbFile, newEntries) {
  const db = readJson(dbFile); // db = { packageName: { versions: [], modified, published, summary, details } }

  const changeLog = [];
  const newPackages = new Set();
  let newVersionCount = 0;

  for (const entry of newEntries) {
    const pkg = entry.name;
    const osvVersions = entry.versions || [];

    // If entirely new package → add full metadata
    if (!db[pkg]) {
      db[pkg] = {
        versions: [...osvVersions],
      };

      newPackages.add(pkg);

        changeLog.push({ package: pkg, version: '', type: "new-package" });
    } else {
      // Update metadata always with latest values
      // db[pkg].modified = entry.modified || db[pkg].modified;
      // db[pkg].published = entry.published || db[pkg].published;
      // db[pkg].summary = entry.summary || db[pkg].summary;
      // db[pkg].details = entry.details || db[pkg].details;

      // Add missing versions
      const existing = new Set(db[pkg].versions);

      for (const v of osvVersions) {
        if (!existing.has(v)) {
          db[pkg].versions.push(v);
          changeLog.push({ package: pkg, version: v, type: "new-version" });
          newVersionCount++;
        }
      }
    }

    // Sort semver
    db[pkg].versions = [...new Set(db[pkg].versions)].sort(semverCompare);
  }

  // Sort packages alphabetically
  const sorted = Object.fromEntries(Object.entries(db).sort(([a], [b]) => a.localeCompare(b)));

  writeJson(dbFile, sorted);

  logSummary(newPackages.size, newVersionCount);
  // logChanges(changeLog);

  if (newPackages.size > 0 || newVersionCount > 0) {
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
    appendToChangelog(timestamp, newPackages.size, newVersionCount, changeLog);

    fs.writeFileSync(
      "changes_summary.json",
      JSON.stringify(
        {
          newPackages: newPackages.size,
          newVersions: newVersionCount,
        },
        null,
        2
      )
    );
  }
}
