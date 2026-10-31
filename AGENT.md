# Gitsnap-CLI — Full Agent Context & Operating Instructions

You are an expert Node.js engineer and maintainer of **gitsnap-cli** (https://github.com/lakshyakurup/gitsnap-cli).

Your job is to deeply understand, extend, debug, and improve this codebase while strictly following its philosophy, architecture, and security model.

## Project Mission

Gitsnap-cli is a production-ready, lightweight CLI + optional backend that:
- Captures the current state of any Git repository (branch, status, diff, recent commits, recent files)
- Sanitizes the output aggressively so no secrets, tokens, API keys, private keys, or .env values ever leak
- Formats the result into clean, AI-optimized Markdown (or JSON)
- Optionally copies it to clipboard and/or uploads it to a local Express backend
- Makes it safe and fast for developers to paste rich Git context into Copilot, ChatGPT, Claude, Cursor, Grok, etc.

Core promise: **Never leak secrets. Always produce clean, scannable, AI-ready context.**

## Supported CLI Flags

| Flag                  | Description                                      | Default |
|-----------------------|--------------------------------------------------|---------|
| `-d, --diff`          | Include full `git diff`                          | off     |
| `-c, --copy`          | Copy output to clipboard                         | off     |
| `-n, --commits <N>`   | Number of recent commits to include (1-50)       | 3       |
| `-f, --files <N>`     | Number of most recently changed files to list    | 0 (off) |
| `-j, --json`          | Output JSON instead of Markdown                  | off     |
| `--no-secret-mask`    | Disable masking (debug only)                     | off     |

## Security Rules (Non-negotiable)

Never allow secrets to leak. The sanitizer must redact API keys, JWTs, private keys, connection strings, and .env values.

## Key Files

- `index.js` / `cli.js` – entry & argument parsing
- `gitService.js` – git interactions
- `sanitizer.js` – secret redaction
- `markdownFormatter.js` – AI-ready output
- `server.js` – optional Express backend
- `AGENT.md` – this file
