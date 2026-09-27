export function aiTemplate(snapshot) {
  return `You are working on the repo "${snapshot.repoName}" at "${snapshot.repoPath}".

Context:
- branch: ${snapshot.branch}
- last commit: ${snapshot.lastCommit}
- description: ${snapshot.description}

Current status:
\`\`\`
${snapshot.status}
\`\`\`

Untracked files:
\`\`\`
${snapshot.untrackedFiles}
\`\`\`

Diff:
\`\`\`diff
${snapshot.diff || 'No diff output.'}
\`\`\`
`;
}
