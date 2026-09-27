export function trimToLength(value, max = 200) {
  const text = String(value || '').trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

export function escapeMarkdown(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\\\\\')
    .replace(/`/g, '\\`')
    .replace(/\|/g, '\\|');
}
