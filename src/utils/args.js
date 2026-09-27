export function parseArgs(args = []) {
  const flags = new Set();
  const values = [];

  for (const item of args) {
    if (item.startsWith('--') || item.startsWith('-')) {
      flags.add(item);
    } else {
      values.push(item);
    }
  }

  return { flags, values };
}
