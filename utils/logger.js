export function logSummary(newPkgCount, newVerCount) {
  console.log("\n===== SUMMARY =====");
  console.log(`New packages added: ${newPkgCount}`);
  console.log(`New versions added: ${newVerCount}`);
}

export function logChanges(changeList) {
  console.log("\n===== CHANGES =====");
  if (changeList.length) console.table(changeList);
  else console.log("No changes detected.");
}
