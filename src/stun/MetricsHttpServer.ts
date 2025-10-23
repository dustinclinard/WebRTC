import http from "node:http";
import { Metrics } from "./internal/Metrics";

export type MetricsHttpOptions = {
  port: number;
  metrics: Metrics;
  onLog?: (msg: string) => void;
};

export class MetricsHttpServer {
  private server = http.createServer((_req, res) => {
    const body = JSON.stringify(this.opts.metrics.snapshot(), null, 2);
    res.statusCode = 200;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("access-control-allow-methods", "GET, OPTIONS");
    res.setHeader("access-control-allow-headers", "content-type");
    if (_req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }
    res.end(body);
  });

  constructor(private opts: MetricsHttpOptions) {}

  start() {
    this.server.listen(this.opts.port, () => this.opts.onLog?.(`[stun] http metrics on :${this.opts.port}`));
  }

  stop() {
    try { this.server.close(); } catch {}
  }
}
