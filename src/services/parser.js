export class ParserService {
  parseDelaySignal(payload) {
    const raw = payload.delay_minutes || 0;
    const minutes = typeof raw === 'number' ? raw : parseInt(raw, 10);
    return {
      line_name: payload.line_name || 'Unknown',
      delay_minutes: minutes,
      status: minutes > 0 ? 'Delayed' : 'On Time'
    };
  }
}
