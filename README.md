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
* **Optional backend sync** to a local Express server
* **Clipboard copy support** for instant paste into Copilot, ChatGPT, Claude, Cursor, Grok and similar tools

---

## Architecture

```text
┌────────────────┐     ┌───────────────────┐     ┌────────────────────────┐
│  Git Repo      │ ──> │ gitsnap CLI      │ ──> │ Secret Sanitizer       │
└────────────────┘     └───────────────────┘     └────────────────────────┘
                                                         │
                                                         ▼
┌────────────────┐     ┌───────────────────┐     ┌────────────────────────┐
│ Local API / DB │ <── │ Express Backend  │ <── │ AI-Ready Markdown/JSON │
└────────────────┘     └───────────────────┘     └────────────────────────┘
```

---

## Key Features

* **Safe Repo Validation:** Automatic Git repo detection and branch tracking.
* **Secret Masking:** Strips API keys, JWTs, bearer tokens, private keys, connection strings and .env credentials.
* **AI-Optimized Output:** Markdown structure designed specifically for prompt ingestion.
* **JSON Mode:** Structured output support for developer tooling.
* **Clipboard Support:** One flag to copy the snapshot straight to your clipboard.
* **Configurable Commits:** Control how many recent commits appear with `--commits N`.
* **Backend Sync:** Optional persistence layer with a local Express API.

---

## CLI Flags & Options

| Flag | Description | Example |
| :--- | :--- | :--- |
| `-d, --diff` | Include Git diff output | `gitsnap --diff` |
| `-c, --copy` | Copy the snapshot to clipboard | `gitsnap --diff --copy` |
| `-n, --commits <N>` | Number of recent commits to include (default 3, max 50) | `gitsnap --commits 10` |
| `-j, --json` | Output structured JSON instead of Markdown | `gitsnap --json` |
| `-u, --upload` | Upload the generated snapshot to the backend | `gitsnap --upload` |
| `-m, --secret-mask` | Force masking of sensitive values (default) | `gitsnap --secret-mask` |
| `--no-secret-mask` | Disable secret masking (debug only) | `gitsnap --no-secret-mask` |
| `--api-url <url>` | Override the backend base URL | `gitsnap --api-url http://localhost:4000/api` |

---

## Quick Start

### 1. Install Dependencies & Link CLI
```bash
npm install
npm link
```

### 2. Generate a Git Snapshot
Inside any Git repository, run:
```bash
gitsnap --diff
```

Copy straight to clipboard:
```bash
gitsnap --diff --copy
```

Show more commit history:
```bash
gitsnap --diff --commits 15
# or short form
gitsnap -d -n 15
```

---

## Backend API Endpoints

The backend Express server runs on port `4000` by default:

* `GET /health` — Service health check
* `GET /api/snapshots` — Fetch all saved snapshots
* `POST /api/snapshots` — Save a new repository snapshot

### Starting the Server
```bash
npm start
```

---

## Security & Masking

Sensitive data is scrubbed before printing or uploading. The sanitizer automatically redacts:

* `.env` file variables
* API keys (OpenAI, Anthropic, AWS, GitHub, Slack, Google…)
* JWTs and bearer tokens
* Private key blocks
* Database / Redis connection strings

---

## License

This project is licensed under the **MIT License**.
