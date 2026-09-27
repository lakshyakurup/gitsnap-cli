import fs from 'node:fs';
import path from 'node:path';

export function getRepoContext() {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');

  let repoName = 'unknown';
  let description = 'No description provided.';

  if (fs.existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      repoName = pkg.name || repoName;
      description = pkg.description || description;
    } catch {
      // ignore invalid package.json
    }
  }

  return {
    repoName,
    repoPath: process.cwd(),
    description
  };
}
