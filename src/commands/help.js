export function helpCommand() {
  console.log(`
gitsnap CLI

Usage:
  gitsnap snapshot
  gitsnap status
  gitsnap diff
  gitsnap export --output snapshot.md
  gitsnap summary
  gitsnap commit "your message"
  gitsnap branch
  gitsnap version
  gitsnap help

Options:
  --no-diff        Skip diff output
  --no-context    Skip metadata
  --ai             AI-style output
  --stat           Diff summary only
  --json           JSON format
  --output file    Export to file
`);
}
