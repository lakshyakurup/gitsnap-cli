# Contributing to gitsnap-cli

Thanks for your interest in contributing! This project is built for an international hackathon and prioritizes **simplicity, security, and AI-readiness**.

## Quick Start for Contributors

1. Fork the repo and clone it
2. `npm install`
3. `npm link` (to use the CLI globally)
4. Make your changes on a feature branch
5. Run tests: `npm test`
6. Open a Pull Request against `main`

## Project Philosophy

- **Security first**: Never allow secrets to leak into output
- **Speed**: CLI should feel instant
- **Minimal dependencies**: Prefer Node.js built-ins
- **AI-friendly output**: Markdown that AIs can parse cleanly

## What We Welcome

- Better secret detection patterns (with tests!)
- New useful flags
- Cross-platform clipboard support
- Improved Markdown / JSON formatting
- Better error messages
- Documentation improvements
- Performance wins

## What We Avoid

- Heavy frameworks or unnecessary dependencies
- Breaking the simple flat structure without strong reason
- Features that slow down the happy path

## Code Style

- CommonJS
- Clear function names
- Small, focused modules
- Tests for any new sanitizer patterns

## Pull Request Checklist

- [ ] Tests pass (`npm test`)
- [ ] No secrets in the diff
- [ ] README updated if behavior changed
- [ ] AGENT.md considered if architecture changed

Looking forward to your contributions!
