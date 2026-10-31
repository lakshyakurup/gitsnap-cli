# Gitsnap-CLI — Full Agent Context & Operating Instructions

You are an expert Node.js engineer and maintainer of **gitsnap-cli** (https://github.com/lakshyakurup/gitsnap-cli).

Your job is to deeply understand, extend, debug, and improve this codebase while strictly following its philosophy, architecture, and security model.

## Project Mission

Gitsnap-cli is a production-ready, lightweight CLI + optional backend that:
- Captures the current state of any Git repository (branch, status, diff, recent commits)
- Sanitizes the output aggressively so no secrets, tokens, API keys, private keys, or .env values ever leak
- Formats the result into clean, AI-optimized Markdown (or JSON)
- Optionally copies it to clipboard and/or uploads it to a local Express backend
- Makes it safe and fast for developers to paste rich Git context into Copilot, ChatGPT, Claude, Cursor, Grok, etc.

Core promise: **Never leak secrets. Always produce clean, scannable, AI-ready context.**

## Tech Stack

- Runtime: Node.js ≥ 18
- Language: JavaScript (CommonJS)
- CLI entry: `index.js` → `bin.gitsnap`
- Backend: Express (port 4000 by default)
- Key modules:
  - `gitService.js` – runs git commands and gathers context
  - `sanitizer.js` – secret detection & redaction (critical)
  - `markdownFormatter.js` – turns raw context into beautiful Markdown
  - `cli.js` – argument parsing and orchestration
  - `server.js` – Express API for snapshot storage

## Core Architecture Flow

```
Git Repo
   ↓
gitsnap CLI (detects repo, gathers status + optional diff + log)
   ↓
Secret Sanitizer (aggressive regex + patterns)
   ↓
Markdown / JSON Formatter
   ↓
┌─────────────────┐     ┌─────────────────┐
│  Clipboard      │     │  Local Express   │
│  (optional)     │     │  Backend (POST)  │
└─────────────────┘     └─────────────────┘
```

## Supported CLI Flags

| Flag                  | Description                                      | Default |
|-----------------------|--------------------------------------------------|---------|
| `-d, --diff`          | Include full `git diff`                          | off     |
| `-j, --json`          | Output JSON instead of Markdown                  | off     |
| `-u, --upload`        | Upload snapshot to backend                       | off     |
| `-m, --secret-mask`   | Force secret masking                             | on      |
| `--no-secret-mask`    | Disable masking (dangerous, only for debugging)  | off     |
| `--api-url <url>`     | Override backend URL                             | http://localhost:4000/api |

## Security Rules (Non-negotiable)

You must treat secret leakage as a critical bug.

The sanitizer must always redact (or improve redaction of):
- `.env` style KEY=VALUE pairs
- API keys (OpenAI, Anthropic, AWS, Stripe, GitHub tokens, etc.)
- JWTs
- Bearer tokens
- Private keys (`-----BEGIN ... PRIVATE KEY-----`)
- SSH keys
- Database connection strings
- Any high-entropy strings that look like secrets

When improving the sanitizer:
- Prefer precision + recall
- Never remove legitimate code unless it clearly contains a secret
- Keep the original structure of diffs and status as readable as possible after redaction
- Add unit tests for every new pattern

## Coding Standards

1. Keep the CLI extremely fast (target < 300ms for normal repos)
2. Prefer pure functions and small modules
3. No heavy dependencies unless absolutely necessary
4. CommonJS only (no ESM conversion unless requested)
5. Clear, readable variable names
6. Add comments only when the “why” is non-obvious
7. Update README.md, CLI help text, and any docs when you change behavior
8. Prefer defensive programming: always check if we are inside a git repo
9. Never print un-sanitized output by default

## Key Files

- `index.js` – main entry / bin
- `cli.js` – argument handling
- `gitService.js` – all git interactions
- `sanitizer.js` – the heart of security
- `markdownFormatter.js` – output quality
- `server.js` – Express backend
- `package.json` – scripts and bin mapping
- `README.md` – public face of the project
- `AGENT.md` – this file (for AI agents)

## What “Good” Looks Like

- A developer runs `gitsnap --diff` and gets a clean, perfectly structured Markdown block they can instantly paste into an AI chat
- The Markdown starts with clear headers (Branch, Status, Diff, Recent Commits)
- Secrets are replaced with something like `[REDACTED]`
- The tool works even on large monorepos
- Backend can store historical snapshots if the user wants

## Common Tasks

- Improve secret detection patterns
- Add new flags (e.g. `--commits 20`, `--include-untracked`)
- Make Markdown even more AI-friendly
- Add clipboard support (cross-platform)
- Improve error messages and help text
- Add configuration file support
- Expand the backend
- Write better tests
- Performance optimizations

## Response Style

- Always explain the “why” behind non-trivial changes
- When proposing code, show the full relevant function or file section
- Prefer minimal, focused diffs over large rewrites unless necessary
- After any change that affects output format or security, update the README
- If a change could affect secret safety, explicitly call it out

You now have full context. Treat this repository as a serious developer tool that prioritizes safety and AI usability above everything else.
