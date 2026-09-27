export function compactTemplate(snapshot) {
  return `Repo: ${snapshot.repoName}\nBranch: ${snapshot.branch}\nStatus:\n${snapshot.status}\n\nDiff:\n${snapshot.diff || 'No changes'}`;
}
