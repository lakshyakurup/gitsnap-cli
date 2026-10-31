#!/usr/bin/env node
const { runCLI } = require('./cli');

runCLI(process.argv.slice(2))
	.then(({ output, uploaded, copied, copyRequested }) => {
		process.stdout.write(`${output}${output.endsWith('\n') ? '' : '\n'}`);
		if (uploaded) process.stderr.write('Snapshot uploaded successfully.\n');
		if (copyRequested) {
			const message = copied
				? 'Snapshot copied to clipboard.\n'
				: 'Clipboard copy failed; install xclip or xsel on Linux.\n';
			process.stderr.write(message);
		}
	})
	.catch((error) => {
		process.stderr.write(`gitsnap: ${error.message}\n`);
		process.exitCode = 1;
	});
