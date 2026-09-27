export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function indent(text, spaces = 2) {
  const prefix = ' '.repeat(spaces);
  return text.split('\n').map(line => prefix + line).join('\n');
}
