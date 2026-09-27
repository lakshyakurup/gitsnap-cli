export function createOutputBlock(title, value) {
  return `## ${title}\n${value}\n`;
}

export function addTrailingNewline(value) {
  return value.endsWith('\n') ? value : `${value}\n`;
}
