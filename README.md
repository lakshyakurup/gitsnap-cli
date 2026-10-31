<div align="center">

# 📦 gitsnap-cli

**Safe. Fast. AI-Ready Git Context Snapshots.**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/lakshyakurup/gitsnap-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com)
[![Made with Love](https://img.shields.io/badge/Made%20with-Love-red.svg)](https://github.com/lakshyakurup/gitsnap-cli)
[![Hackathon Ready](https://img.shields.io/badge/Hackathon-Ready-orange.svg)](https://github.com/lakshyakurup/gitsnap-cli)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/lakshyakurup/gitsnap-cli/graphs/commit-activity)

A production-ready CLI that captures sanitized Git context (branch, status, diff, commits, recent files) and formats it into clean Markdown or JSON — perfect for pasting into ChatGPT, Claude, Cursor, Copilot, Grok and any AI coding assistant.

**Never leak secrets. Always produce clean, scannable context.**

[Quick Start](#-quick-start) • [Demo](#-demo) • [Features](#-features) • [Usage](#-full-cli-reference) • [Architecture](#-architecture) • [Security](#-security) • [Contributing](#-contributing)

</div>

---

## 🚀 Quick Start

```bash
# Install & link
npm install
npm link

# Basic snapshot
gitsnap

# Full power
gitsnap --diff --commits 10 --files 8 --copy
```

That’s it. The output is ready to paste into any AI chat.

---

## 🎬 Demo

### 1. Basic Snapshot
```bash
gitsnap
```

**Output:**
```markdown
## Git Context Snapshot
**Branch:** main

### Status
```
 M README.md
 M cli.js
```

### Commits
```
a1b2c3d - lakshya: improve sanitizer
e4f5g6h - lakshya: add --files flag
```
```

### 2. Full Context + Clipboard
```bash
gitsnap --diff --commits 5 --files 6 --copy
```

**What happens:**
- Captures current branch + status
- Includes the last 5 commits
- Lists the 6 most recently changed files
- Adds the full diff
- Copies everything to your clipboard automatically

### 3. JSON Mode (for scripts / CI)
```bash
gitsnap --diff --json
```

**Output (truncated):**
```json
{
  "branch": "feature/auth",
  "status": " M src/auth.js\n?? src/utils/token.js",
  "diff": "diff --git a/src/auth.js...",
  "commitLog": "a1b2c3d - lakshya: fix token expiry",
  "recentFiles": ""
}
```

### 4. Real-world Workflow
```bash
# Make some changes in your project
vim src/app.js

# Capture everything and paste into Claude / ChatGPT / Cursor
gitsnap -d -n 8 -f 10 -c

# Now just Ctrl+V into your AI chat
```

> ✨ Tip: Add an alias to your shell for even faster use:
> ```bash
> alias gs='gitsnap --diff --copy'
> ```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Secret Sanitization** | Automatically redacts API keys, JWTs, private keys, connection strings, `.env` values |
| **AI-Optimized Markdown** | Clean headings and code blocks designed for LLM consumption |
| **JSON Mode** | Machine-readable output for tooling and pipelines |
| **Clipboard Support** | One flag copies the entire snapshot to your clipboard |
| **Configurable Commits** | Control how many recent commits appear |
| **Recent Files** | List the most recently changed files |
| **Zero Heavy Dependencies** | Only Express for the optional backend |
| **Cross-platform** | Works on macOS, Linux and Windows |

---

## 📋 Full CLI Reference

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--diff` | `-d` | Include full `git diff` output | off |
| `--copy` | `-c` | Copy the final output to clipboard | off |
| `--commits <N>` | `-n` | Number of recent commits to include (1–50) | `3` |
| `--files <N>` | `-f` | Number of most recently changed files to list (0–50) | `0` (off) |
| `--json` | `-j` | Output structured JSON instead of Markdown | off |
| `--no-secret-mask` | | Disable secret masking (debug only) | off |
| `--api-url <url>` | | Override backend URL when using upload | `http://localhost:4000/api` |

### Usage Examples

```bash
# Minimal
gitsnap

# Most common – diff + copy
gitsnap --diff --copy

# Full context for a complex change
gitsnap -d -n 15 -f 12 --copy

# JSON for scripts / CI
gitsnap --diff --json > context.json

# Short form
gitsnap -d -n 10 -f 8 -c
```

---

## 📊 Example Output

```markdown
## Git Context Snapshot
**Branch:** feature/auth-refactor

### Status
```
 M src/auth.js
 M src/middleware.js
?? src/utils/token.js
```

### Recent Files
```
src/auth.js
src/middleware.js
src/utils/token.js
package.json
```

### Diff
```diff
diff --git a/src/auth.js b/src/auth.js
...
```

### Commits
```
a1b2c3d - lakshya: fix token expiry
e4f5g6h - lakshya: add refresh logic
```
```

All secrets are automatically replaced with `[REDACTED]`.

---

## 🏗️ Architecture

### High-level Data Flow

```mermaid
flowchart LR
    A[Git Repository] --> B[gitsnap CLI]
    B --> C[gitService.js]
    C --> D[Raw Context]
    D --> E[sanitizer.js]
    E --> F[Clean Context]
    F --> G[markdownFormatter.js]
    G --> H[AI-Ready Markdown / JSON]
    H --> I[Clipboard]
    H --> J[Express Backend]
```

### Component Overview

```text
┌──────────────────────────────────────────────────────────┐
│                        gitsnap-cli                               │
│                                                                  │
│  index.js  ──►  cli.js  ──►  gitService.js                       │
│                      │                                           │
│                      ├──► sanitizer.js                            │
│                      │                                           │
│                      └──► markdownFormatter.js                    │
│                                                                  │
│  Optional: server.js (Express) → snapshots.json                  │
└──────────────────────────────────────────────────────────┘
```

---

## 🛡️ Security

The sanitizer aggressively redacts:

| Category | Examples |
|----------|----------|
| Environment variables | `API_KEY=...`, `SECRET=...`, `PASSWORD=...` |
| Provider keys | OpenAI (`sk-...`), Anthropic, Slack, GitHub PATs, AWS, Google |
| Tokens | JWTs, Bearer tokens |
| Private keys | `-----BEGIN RSA PRIVATE KEY-----` blocks |
| Connection strings | Postgres, MySQL, MongoDB, Redis URLs |

You can temporarily disable masking with `--no-secret-mask` (not recommended for real work).

---

## 💻 Installation & Development

```bash
git clone https://github.com/lakshyakurup/gitsnap-cli.git
cd gitsnap-cli
npm install
npm link          # makes `gitsnap` available globally

# Run tests
npm test

# Start optional backend
npm start         # http://localhost:4000
```

### Project Structure (core files)

```text
.
├── index.js              # CLI entry point
├── cli.js                # Argument parsing + clipboard
├── gitService.js         # Git command runner
├── sanitizer.js          # Secret redaction engine
├── markdownFormatter.js  # Output formatting
├── server.js             # Optional Express API
├── sanitizer.test.js     # Tests
├── AGENT.md              # Instructions for AI agents
├── CONTRIBUTING.md
└── README.md
```

---

## 🤖 For AI Agents / Copilot

See **[AGENT.md](AGENT.md)** for full operating instructions, coding standards and security rules when working on this repository.

---

## 📦 Backend API (Optional)

```bash
npm start
```

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/snapshots` | GET | List all saved snapshots |
| `/api/snapshots` | POST | Save a new snapshot |

---

## 👥 Contributing

We welcome contributions of all kinds — bug fixes, new features, documentation improvements, and ideas!

### How to Contribute

1. **Fork** the repository
2. **Clone** your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/gitsnap-cli.git
   cd gitsnap-cli
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-improvement
   ```
4. **Install & test**
   ```bash
   npm install
   npm test
   ```
5. **Make your changes** and commit
   ```bash
   git commit -m "feat: add amazing improvement"
   ```
6. **Push** and open a Pull Request
   ```bash
   git push origin feature/amazing-improvement
   ```

### Contribution Ideas

- Stronger secret detection patterns (with tests!)
- New useful flags
- Better Markdown / JSON formatting
- Cross-platform clipboard improvements
- Performance optimizations
- Documentation & examples

### Guidelines

- Keep the CLI fast and dependency-light
- Never weaken secret sanitization
- Add tests for new sanitizer patterns
- Update README when behavior changes
- Follow the existing code style (CommonJS, clear names)

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for more details.

---

## 🏆 Why gitsnap-cli?

Modern AI coding tools are only as good as the context you give them.  
`gitsnap` gives you a **safe, one-command way** to capture exactly what the AI needs — without ever risking a leaked secret.

Perfect for:

- Daily pair-programming with Claude / ChatGPT / Cursor
- Preparing clean context for code reviews
- CI pipelines that need structured Git state
- Hackathons and rapid prototyping

---

## 📚 License

MIT © [lakshyakurup](https://github.com/lakshyakurup)

---

<div align="center">

**Star the repo if it saves you time!** ⭐

Made for the international hackathon season 🚀

[Report Bug](https://github.com/lakshyakurup/gitsnap-cli/issues) • [Request Feature](https://github.com/lakshyakurup/gitsnap-cli/issues) • [Contribute](CONTRIBUTING.md)

</div>
