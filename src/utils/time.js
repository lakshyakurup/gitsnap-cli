export function formatTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

export function getTimestamp() {
  return new Date().toISOString();
}
