import { ClientConnection } from "./ClientConnection";

export class Room {
  private peers = new Set<ClientConnection>();
  constructor(public readonly name: string) {}

  add(c: ClientConnection) { this.peers.add(c); }
  remove(c: ClientConnection) { this.peers.delete(c); }
  has(c: ClientConnection) { return this.peers.has(c); }
  size() { return this.peers.size; }
  list(): { id: string; nick?: string }[] {
    return Array.from(this.peers).map(p => ({ id: p.id, nick: p.nick }));
  }
  members(): Iterable<ClientConnection> { return this.peers.values(); }
  broadcast(except: ClientConnection | null, payload: any) {
    for (const p of this.peers) if (!except || p !== except) p.send(payload);
  }
}
