export function extractNpmMalicious(jsonData, filePath) {
  const summary = jsonData.summary || "";
  const lower = summary.toLowerCase();

  if (!summary.startsWith("Malicious code in") || !lower.includes("npm")) {
    return [];
  }

  if (!Array.isArray(jsonData.affected)) return [];

  const modified = jsonData.modified || "";
  const published = jsonData.published || "";
  const details = jsonData.details || "";

  const results = [];

  for (const aff of jsonData.affected) {
    if (aff.package?.ecosystem === "npm") {
      results.push({
        file: filePath,
        name: aff.package.name,
        versions: aff.versions || [],
        modified,
        published,
        details
      });
    }
  }
  return results;
}
