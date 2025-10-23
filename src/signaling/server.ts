import { SignalingServer } from "./SignalingServer";

const PORT = Number(process.env.WS_PORT || 8081);
const server = new SignalingServer({ port: PORT, onLog: (m) => console.log(m) });
server.start();

process.on('SIGINT', () => { console.log('[signal] shutting down'); server.stop(); process.exit(0); });
