# gitsnap-cli

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

A production-ready Git snapshot CLI and backend for capturing sanitized repository context, formatting it into AI-ready Markdown, and optionally syncing snapshots to a local API.

---

## Overview

**Gitsnap** helps engineers paste safe, concise Git context directly into AI prompts without leaking secrets, tokens, or environment values. It captures:

* **Current branch**
* **Git status output**
* **Git diff output**
* **Recent commit log metadata** (configurable)
* **Recently changed files** (configurable)
* **Optional backend sync** to a local Express server
* **Clipboard copy support** for instant paste into Copilot, ChatGPT, Claude, Cursor, Grok and similar tools

---

## Key Features

* **Safe Repo Validation**
* **Secret Masking** (API keys, JWTs, private keys, connection strings, .env values)
* **AI-Optimized Markdown**
* **JSON Mode**
* **Clipboard Support** (`--copy`)
* **Configurable Commits** (`--commits N`)
* **Recent Files** (`--files N`)
* **Backend Sync**

---

## CLI Flags

| Flag | Description | Example |
|------|-------------|--------|
| `-d, --diff` | Include Git diff | `gitsnap --diff` |
| `-c, --copy` | Copy to clipboard | `gitsnap --diff --copy` |
| `-n, --commits <N>` | Number of recent commits (default 3) | `gitsnap --commits 10` |
| `-f, --files <N>` | Number of recent files to list | `gitsnap --files 8` |
| `-j, --json` | Output JSON | `gitsnap --json` |
| `--no-secret-mask` | Disable masking (debug only) | `gitsnap --no-secret-mask` |

---

## Quick Start

```bash
npm install
npm link

gitsnap --diff
gitsnap --diff --copy
gitsnap -d -n 10 -f 8 --copy
```

---

## License

MIT
