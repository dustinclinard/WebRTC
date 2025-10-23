import { WebSocket } from "ws";

export class ClientConnection {
  public room: string | null = null;
  public nick?: string;

  constructor(public readonly id: string, public readonly ws: WebSocket) {}

  send(obj: any) {
    try { this.ws.send(JSON.stringify(obj)); } catch {}
  }
}
