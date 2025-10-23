import { Metrics } from "./internal/Metrics";
import { StunServer } from "./StunServer";
import { MetricsHttpServer } from "./MetricsHttpServer";

const UDP_PORT = Number(process.env.STUN_PORT || 3478);
const HTTP_PORT = Number(process.env.STUN_HTTP_PORT || 8791);

const metrics = new Metrics(20);
const stun = new StunServer({ port: UDP_PORT, metrics, onLog: (m)=>console.log(m) });
const metricsHttp = new MetricsHttpServer({ port: HTTP_PORT, metrics, onLog: (m)=>console.log(m) });

stun.start();
metricsHttp.start();

process.on('SIGINT', () => { 
  console.log('[stun] shutting down'); 
  stun.stop(); 
  metricsHttp.stop(); 
  process.exit(0);
});
