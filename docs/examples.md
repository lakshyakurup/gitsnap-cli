# Examples

## Markdown snapshot with diff

```bash
gitsnap --diff
```

## JSON snapshot

```bash
gitsnap --json > snapshot.json
```

## Upload to the local backend

Start the API in another terminal with `npm start`, then run:

```bash
gitsnap --upload
```

To upload the diff to a different API base URL:

```bash
gitsnap --diff --upload --api-url http://localhost:4100/api
```

## Read JSON from Node.js

```js
const { execFileSync } = require('node:child_process');

const snapshot = JSON.parse(
	execFileSync('gitsnap', ['--json'], { encoding: 'utf8' })
);
console.log(snapshot.branch);
```

All commands and output fields are documented in the [README](../README.md).
