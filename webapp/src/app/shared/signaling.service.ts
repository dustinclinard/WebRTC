import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type Inbound =
  | { type: 'joined'; id: string; room: string }
  | { type: 'peers'; id: string; peers: { id: string; nick?: string }[] }
  | { type: 'signal'; from: string; data: any };

export type Outbound =
  | { type: 'join'; room: string; nick?: string }
  | { type: 'nick'; nick: string }
  | { type: 'signal'; data: any; to?: string };

export type WsState = 'idle'|'connecting'|'open'|'closed'|'error';

@Injectable()
export class SignalingService {
  private ws?: WebSocket;
  private url?: string;
  private pendingJoin?: { room: string; nick?: string };

  readonly state$ = new BehaviorSubject<WsState>('idle');
  readonly joined$ = new Subject<{ id: string; room: string }>();
  readonly peers$ = new BehaviorSubject<{ id: string; peers: {id: string; nick?: string}[] } | null>(null);
  readonly signal$ = new Subject<{ from: string; data: any }>();

  connect(url: string){
    this.url = url;
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) return;
    this.state$.next('connecting');
    this.ws = new WebSocket(url);
    this.ws.onopen = () => {
      this.state$.next('open');
      if (this.pendingJoin) {
        try { this.ws!.send(JSON.stringify({ type:'join', room: this.pendingJoin.room, nick: this.pendingJoin.nick })); } catch {}
      }
    };
    this.ws.onclose = () => this.state$.next('closed');
    this.ws.onerror = () => this.state$.next('error');
    this.ws.onmessage = (ev) => {
      let msg: Inbound;
      try { msg = JSON.parse(String(ev.data)); } catch { return; }
      if (msg.type === 'joined') this.joined$.next({ id: msg.id, room: msg.room });
      else if (msg.type === 'peers') this.peers$.next({ id: msg.id, peers: msg.peers });
      else if (msg.type === 'signal') this.signal$.next({ from: msg.from, data: msg.data });
    };
  }

  send(obj: Outbound){
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    try { this.ws.send(JSON.stringify(obj)); } catch {}
  }

  join(room: string, nick?: string){
    this.pendingJoin = { room, nick };
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({ type:'join', room, nick });
    }
  }

  updateNick(nick: string){ this.send({ type: 'nick', nick }); }
  sendSignal(data: any, to?: string){ this.send(to ? ({ type:'signal', data, to }) : ({ type:'signal', data })); }
}
