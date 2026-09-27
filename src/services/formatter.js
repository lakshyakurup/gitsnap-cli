export class FormatterService {
  formatOutput(data, format = 'markdown') {
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'compact':
        return this.formatCompact(data);
      default:
        return this.formatMarkdown(data);
    }
  }

  formatMarkdown(data) {
    return `# Snapshot\n\n${JSON.stringify(data, null, 2)}`;
  }

  formatCompact(data) {
    return Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
  }
}
