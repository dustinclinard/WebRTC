/**
 * Metrics aggregator for STUN server.
 */
export type RecentRequest = { addr: string; port: number; ts: number; family: 'IPv4'|'IPv6' };
export type StunMetricsSnapshot = {
  startedAt: number;
  totalRequests: number;
  ipv4: number;
  ipv6: number;
  last: RecentRequest[];
};

export class Metrics {
  private readonly startedAt = Date.now();
  private total = 0;
  private v4 = 0;
  private v6 = 0;
  private last: RecentRequest[] = [];
  constructor(private maxLast: number = 20) {}
  record(addr: string, port: number, family: 'IPv4'|'IPv6') {
    this.total += 1;
    if (family === 'IPv4') this.v4 += 1; else this.v6 += 1;
    this.last.unshift({ addr, port, ts: Date.now(), family });
    if (this.last.length > this.maxLast) this.last.length = this.maxLast;
  }
  snapshot(): StunMetricsSnapshot {
    return { startedAt: this.startedAt, totalRequests: this.total, ipv4: this.v4, ipv6: this.v6, last: [...this.last] };
  }
}
