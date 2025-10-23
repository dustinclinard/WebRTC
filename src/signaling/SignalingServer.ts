import http from "node:http";
import { WebSocketServer, WebSocket, RawData } from "ws";
import { ClientConnection } from "./internal/ClientConnection";
import { RoomManager } from "./internal/RoomManager";

export type SignalingServerOptions = {
  port: number;
  onLog?: (msg: string) => void;
};

type Inbound =
  | { type: "join"; room: string; nick?: string }
  | { type: "signal"; data: any; to?: string; target?: string }
  | { type: "nick"; nick: string };

export class SignalingServer {
  private server = http.createServer();
  private wss = new WebSocketServer({ server: this.server });
  private rooms = new RoomManager();
  private clients = new Map<string, ClientConnection>();

  constructor(private opts: SignalingServerOptions) {}

  start() {
    this.wss.on("connection", (ws) => this.onConnection(ws));
    this.server.listen(this.opts.port, () => this.log(`[signal] ws on :${this.opts.port}`));
  }

  stop() {
    try { this.wss.close(); } catch {}
    try { this.server.close(); } catch {}
  }

  private onConnection(ws: WebSocket) {
    const me = new ClientConnection(id(), ws);
    this.clients.set(me.id, me);

    ws.on("message", (data: RawData) => {
      try {
        const msg: Inbound = JSON.parse(String(data));
        this.handleInbound(me, msg);
      } catch (err: any) {
        this.log(`[signal] bad message: ${err && err.message}`);
      }
    });

    ws.on("close", () => {
      if (me.room) this.rooms.leave(me.room, me);
      this.clients.delete(me.id);
    });
  }

  private handleInbound(me: ClientConnection, msg: Inbound) {
    switch (msg.type) {
      case "join": {
        me.nick = msg.nick;
        this.rooms.join(msg.room, me);
        me.send({ type: "joined", id: me.id, room: msg.room });
        this.broadcastPeers(msg.room);
        break;
      }
      case "nick": {
        me.nick = msg.nick;
        if (me.room) this.broadcastPeers(me.room);
        break;
      }
      case "signal": {
        const target = (msg.to || msg.target || "").trim();
        const payload = { type: "signal", from: me.id, data: msg.data };
        if (target) {
          const peer = this.clients.get(target);
          if (peer) peer.send(payload);
        } else if (me.room) {
          const room = this.rooms.roomByName(me.room);
          if (!room) break;
          for (const c of room.members()) if (c !== me) c.send(payload);
        }
        break;
      }
    }
  }

  private broadcastPeers(roomName: string) {
    const room = this.rooms.roomByName(roomName);
    if (!room) return;
    const peers = room.list();
    for (const p of room.members()) {
      p.send({ type: "peers", id: p.id, peers });
    }
  }

  private log(m: string) { this.opts.onLog?.(m); }
}

function id() { return Math.random().toString(36).slice(2, 10); }
