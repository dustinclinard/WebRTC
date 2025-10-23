import dgram from "node:dgram";
import { AddressInfo } from "node:net";
import { Metrics } from "./internal/Metrics";
import { isBindingRequest, buildBindingSuccess } from "./internal/StunCodec";

export type StunServerOptions = {
  port: number;
  onLog?: (msg: string) => void;
  metrics: Metrics;
};

export class StunServer {
  private sock4 = dgram.createSocket({ type: "udp4", reuseAddr: true });
  private sock6 = dgram.createSocket({ type: "udp6", reuseAddr: true });

  constructor(private opts: StunServerOptions) {}

  start() {
    const { port } = this.opts;

    this.sock4.on("message", (msg, rinfo) => this.onMessage(msg, rinfo.address, rinfo.port, "IPv4"));
    this.sock6.on("message", (msg, rinfo) => this.onMessage(msg, rinfo.address, rinfo.port, "IPv6"));

    this.sock4.on("listening", () => this.log(`[stun] udp4 listening on :${(this.sock4.address() as AddressInfo).port}`));
    this.sock6.on("listening", () => this.log(`[stun] udp6 listening on :${(this.sock6.address() as AddressInfo).port}`));

    this.sock4.bind(port);
    this.sock6.bind(port);
  }

  stop() {
    try { this.sock4.close(); } catch {}
    try { this.sock6.close(); } catch {}
  }

  private onMessage(buf: Buffer, addr: string, port: number, family: 'IPv4'|'IPv6') {
    this.opts.metrics.record(addr, port, family);
    if (!isBindingRequest(buf)) return;
    const res = buildBindingSuccess(buf, { family, port, address: addr });
    const sock = family === 'IPv4' ? this.sock4 : this.sock6;
    try { sock.send(res, port, addr); } catch (err: any) { this.log(`[stun] send error: ${err && err.message}`); }
  }

  private log(m: string) { this.opts.onLog?.(m); }
}
