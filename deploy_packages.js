const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("📦 Configuring packages and npm publishing workflow...");

// 1. Ensure root package.json has workspaces configured so GitHub/npm recognizes packages
const rootPkgPath = 'package.json';
if (fs.existsSync(rootPkgPath)) {
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
  rootPkg.workspaces = ["packages/*"];
  fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2));
  console.log("✔ Updated root package.json with workspaces definition.");
}

// 2. Create GitHub Actions workflow to publish packages to GitHub Packages / npm registry
const workflowDir = path.join('.github', 'workflows');
if (!fs.existsSync(workflowDir)) {
  fs.mkdirSync(workflowDir, { recursive: true });
}

const publishWorkflow = `name: Publish Packages

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
          registry-url: 'https://npm.pkg.github.com'
      - run: npm ci
        env:
          NODE_AUTH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      - name: Publish packages
        run: |
          for d in packages/*; do
            if [ -d "$d" ]; then
              cd "$d"
              npm publish --access public || true
              cd ../..
            fi
          done
        env:
          NODE_AUTH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;

fs.writeFileSync(path.join(workflowDir, 'publish-packages.yml'), publishWorkflow);
console.log("✔ Created: .github/workflows/publish-packages.yml");

// 3. Stage, Commit, and Push to main branch
console.log("\n📦 Staging and committing package updates...");
execSync('git add .', { stdio: 'inherit' });

try {
  execSync('git commit -m "chore: configure npm workspaces and package publishing workflow"', { stdio: 'inherit' });
} catch (e) {
  console.log("No new changes to commit.");
}

console.log("\n🚀 Pushing updates to main branch...");
execSync('git push origin main', { stdio: 'inherit' });

console.log("\n✨ SUCCESS! Package configurations and publishing workflows pushed to main!");
