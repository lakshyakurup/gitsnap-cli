export function defaultTemplate(snapshot) {
  return `# Git Snapshot

- Repo: ${snapshot.repoName}
- Path: ${snapshot.repoPath}
- Branch: ${snapshot.branch}
- Last commit: ${snapshot.lastCommit}
- Remote: ${snapshot.remote}
- Description: ${snapshot.description}

## Git Status
${snapshot.status}

## Untracked Files
${snapshot.untrackedFiles}

## Diff
${snapshot.diff ? '\`\`\`diff\n' + snapshot.diff + '\n\`\`\`' : 'No diff output.'}
`;
}
