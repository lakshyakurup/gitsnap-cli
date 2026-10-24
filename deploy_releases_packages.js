const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("🚀 Generating 10 modular packages and preparing 5 releases...");

// 1. Create 10 Package directories with individual package.json files
for (let i = 1; i <= 10; i++) {
  const pkgDir = path.join('packages', `plugin-${i}`);
  if (!fs.existsSync(pkgDir)) {
    fs.mkdirSync(pkgDir, { recursive: true });
  }

  const pkgJsonContent = JSON.stringify({
    name: `gitsnap-plugin-${i}`,
    version: `1.0.${i}`,
    description: `Modular extension plugin ${i} for gitsnap-cli`,
    main: "index.js",
    license: "MIT"
  }, null, 2);

  const indexJsContent = `module.exports = { name: "gitsnap-plugin-${i}", load: () => console.log("Plugin ${i} active") };\n`;

  fs.writeFileSync(path.join(pkgDir, 'package.json'), pkgJsonContent);
  fs.writeFileSync(path.join(pkgDir, 'index.js'), indexJsContent);
  console.log(`✔ Created Package: packages/plugin-${i}`);
}

// 2. Stage all files
console.log("\n📦 Staging files...");
execSync('git add .', { stdio: 'inherit' });

try {
  execSync('git commit -m "feat: add 10 modular plugins and packages structure"', { stdio: 'inherit' });
} catch (e) {
  console.log("No new changes to commit.");
}

// 3. Push main branch
console.log("\n🚀 Pushing code to main branch...");
execSync('git push origin main', { stdio: 'inherit' });

// 4. Create and push 5 Git Releases/Tags (v1.0.0 to v1.0.4)
console.log("\n🏷️ Creating and pushing 5 releases (tags)...");
for (let i = 0; i < 5; i++) {
  const tagName = `v1.0.${i}`;
  try {
    // Delete local tag if it exists
    execSync(`git tag -d ${tagName}`, { stdio: 'ignore' });
  } catch (e) {}

  try {
    // Delete remote tag if it exists
    execSync(`git push origin --delete ${tagName}`, { stdio: 'ignore' });
  } catch (e) {}

  // Create annotated tag representing a release
  execSync(`git tag -a ${tagName} -m "Release version 1.0.${i} - Gitsnap Milestone"`, { stdio: 'inherit' });
  // Push tag to GitHub
  execSync(`git push origin ${tagName}`, { stdio: 'inherit' });
  console.log(`✔ Published Release Tag: ${tagName}`);
}

console.log("\n✨ SUCCESS! 10 packages created and 5 releases published to GitHub!");
