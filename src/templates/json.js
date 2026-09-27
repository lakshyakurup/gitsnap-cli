export function jsonTemplate(snapshot) {
  return JSON.stringify({
    repo: snapshot.repoName,
    path: snapshot.repoPath,
    branch: snapshot.branch,
    lastCommit: snapshot.lastCommit,
    remote: snapshot.remote,
    description: snapshot.description,
    status: snapshot.status,
    untrackedFiles: snapshot.untrackedFiles,
    diff: snapshot.diff
  }, null, 2);
}
