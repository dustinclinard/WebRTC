import { ClientConnection } from "./ClientConnection";
import { Room } from "./Room";

export class RoomManager {
  private rooms = new Map<string, Room>();

  roomByName(name: string): Room | undefined { return this.rooms.get(name); }

  join(roomName: string, client: ClientConnection) {
    if (client.room) this.leave(client.room, client);
    const room = this.rooms.get(roomName) || this.create(roomName);
    room.add(client);
    client.room = roomName;
    this.broadcastPeers(roomName);
  }

  leave(roomName: string, client: ClientConnection) {
    const room = this.rooms.get(roomName);
    if (!room) return;
    room.remove(client);
    if (room.size() === 0) this.rooms.delete(roomName);
    this.broadcastPeers(roomName);
  }

  broadcastPeers(roomName: string) {
    const room = this.rooms.get(roomName);
    if (!room) return;
    const peers = room.list();
    room.broadcast(null, { type: "peers", peers });
  }

  roomOf(client: ClientConnection): Room | undefined {
    if (!client.room) return;
    return this.rooms.get(client.room);
  }

  private create(name: string): Room {
    const r = new Room(name);
    this.rooms.set(name, r);
    return r;
  }
}
