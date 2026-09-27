# gitsnap-cli Usage Guide

## Basic Commands

### Snapshot
```bash
gitsnap snapshot
```
Creates a complete snapshot of repo state.

### Status
```bash
gitsnap status
```
Shows current git status.

### Export
```bash
gitsnap export --output snapshot.md
```
Saves snapshot to a file.

## Output Formats

### AI Template
```bash
gitsnap snapshot --ai
```

### JSON
```bash
gitsnap snapshot --json
```

### Compact
```bash
gitsnap snapshot --compact
```
