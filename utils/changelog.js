import fs from "fs";

export function appendToChangelog(timestamp, newPackages, newVersions, changeLog) {
  const header = `## ${timestamp} — Added ${newPackages} new packages, updated ${newVersions} versions\n\n`;

  let md = header;

  // New Packages
  md += `### 🆕 New Packages (${newPackages})\n`;
  if (newPackages === 0) {
    md += `_None_\n\n`;
  } else {
    const pkgList = [...new Set(changeLog.filter(c => c.type === "new-package").map(c => c.package))];
    pkgList.forEach(pkg => md += `- ${pkg}\n`);
    md += `\n`;
  }

  // Updated Versions
  md += `### 🔄 Updated Versions (${newVersions})\n`;
  if (newVersions === 0) {
    md += `_None_\n\n`;
  } else {
    md += `| Package | Version | Type |\n`;
    md += `|---------|---------|-------|\n`;
    changeLog
      .filter(c => c.type === "new-version")
      .forEach(row => {
        md += `| ${row.package} | ${row.version} | ${row.type} |\n`;
      });
    md += `\n`;
  }

  // Ensure file exists with header
  if (!fs.existsSync("CHANGELOG.md")) {
    fs.writeFileSync("CHANGELOG.md", "# Malicious NPM Packages Changelog\n\n");
  }

  // Read existing content
  const existing = fs.readFileSync("CHANGELOG.md", "utf8");

  // Prepend new content
  const updated = md + "\n" + existing;

  // Write back
  fs.writeFileSync("CHANGELOG.md", updated);
}
