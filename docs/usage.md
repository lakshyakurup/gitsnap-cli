# Usage

The supported executable is the root `gitsnap` command. Run it from a Git working tree; options are flags, not subcommands.

```bash
gitsnap
gitsnap --diff
gitsnap --json
gitsnap --upload --api-url http://localhost:4000/api
```

Secret masking is enabled by default. `--no-secret-mask` disables it and can expose credentials in printed or uploaded repository content.

For installation, every supported flag, output fields, and limitations, see the [README CLI reference](../README.md#cli-reference) and [snapshot format](../README.md#snapshot-format).
