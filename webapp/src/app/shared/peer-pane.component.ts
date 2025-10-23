import { Component, Input, OnDestroy, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalingService } from './signaling.service';
import { RtcService, PeerSession, IceState, DcState } from './rtc.service';
import { MetricsService } from './metrics.service';

export type PeerConfig = {
  nick: string;
  room: string;
  wsUrl: string;
  stunUrl: string;
  stunHttp?: string;
  initiator: boolean;
};

@Component({
  standalone: true,
  selector: 'app-peer-pane',
  imports: [CommonModule, FormsModule],
  providers: [SignalingService, RtcService, MetricsService],
  template: `
  <div class="card panel">
    <div class="header">
      <span class="tag">{{ config?.nick }}</span>
      <span class="tag">room: {{ config?.room }}</span>
      <span class="tag">WS: <b>{{ wsState }}</b></span>
      <span class="tag">DC: <b [ngClass]="dcStateClass()">{{ dcState || '-' }}</b></span>
      <span class="tag">ICE: <b [ngClass]="iceStateClass()">{{ iceState || '-' }}</b></span>
    </div>

    <div class="toolbar">
      <button (click)="doJoin()" [disabled]="wsState==='connecting'">Join</button>
      <button (click)="hangup()">Hangup</button>
      <button (click)="icedump()">ICE Dump</button>
      <button (click)="toggleStats()">{{ statsOn ? 'Stop' : 'Start' }} Stats</button>
    </div>

    <div class="content" [class.has-ice]="iceVisible" [class.no-ice]="!iceVisible">
      <textarea [(ngModel)]="logText" readonly></textarea>
      <textarea *ngIf="iceVisible" [(ngModel)]="iceText" readonly></textarea>
      <div class="composer">
        <input [(ngModel)]="sendText" placeholder="enter text..." />
        <button (click)="send()" [disabled]="!canSend()">Send</button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .card.panel {
      height: 100%;
      min-height: 500px;
    }
    .header {
      padding: 16px !important;
    }
    .toolbar {
      padding: 16px !important;
    }
    .content {
      padding: 16px !important;
    }
    .content textarea {
      padding: 12px !important;
      min-height: 200px;
    }
    .composer {
      margin-top: 16px;
    }
    .composer input {
      padding: 8px 12px;
    }
    .tag {
      background: var(--bg);
      padding: 4px 8px;
      border-radius: 4px;
    }
  `]
})
export class PeerPaneComponent implements OnInit, OnDestroy {
  @Input({ required: true }) config!: PeerConfig;
  @Input() autoJoin = false;

  wsState: 'idle'|'connecting'|'open'|'closed'|'error' = 'idle';
  dcState?: DcState;
  iceState?: IceState;
  iceVisible = false;
  statsOn = false;

  logText = '';
  iceText = '';
  sendText = '';

  private session?: PeerSession;
  private pendingSignals: any[] = [];
  private joined = false;
  private _statsCb = (arr: any[]) => { this.iceText = JSON.stringify(arr, null, 2); };

  constructor(
    private signal: SignalingService,
    private rtc: RtcService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.signal.state$.subscribe(s => this.wsState = s);
    this.signal.joined$.subscribe(({ id, room }) => {
      this.joined = true;
      this.log(`[joined] id=${id} room=${room}`);
      this.setupSession();
    });
    this.signal.peers$.subscribe(update => {
      if (update && this.joined) {
        this.log(`[peers] count=${update.peers.length}`);
        // If we're the initiator and there are peers, start the connection
        if (this.config.initiator && update.peers.length > 0) {
          this.setupSession();
          this.session?.startOffer();
        }
      }
    });
    this.signal.signal$.subscribe(({ from, data }) => {
      // If we haven't created a PeerSession yet, buffer incoming signals
      // so they aren't dropped by a race between signaling and session setup.
      if (!this.session) {
        this.pendingSignals.push({ from, data });
        return;
      }
      if ((data as any).sdp) this.session.handleRemoteSdp((data as any).sdp);
      else if ((data as any).candidate) this.session.handleRemoteCandidate((data as any).candidate);
    });
    if (this.autoJoin) setTimeout(()=>this.doJoin(), 0);
  }

  ngOnDestroy(){ this.hangup(); }

  doJoin(){
    if (!this.config) return;
    this.signal.connect(this.config.wsUrl);
    this.signal.join(this.config.room, this.config.nick);
  }

  setupSession(){
    this.session?.close();
    this.session = this.rtc.createSession(this.config.initiator, this.config.stunUrl, {
      onSignal: (data)=> this.ngZone.run(() => this.signal.sendSignal(data)),
      onIceState: (s)=> this.ngZone.run(() => {
        this.iceState = s;
        this.cdr.detectChanges();
      }),
      onDcState: (s)=> this.ngZone.run(() => {
        this.dcState = s;
        this.cdr.detectChanges();
      }),
      onDcMessage: (t)=> this.ngZone.run(() => this.log(`[rx] ${t}`))
    });
    // If there were any signals received before the session existed, replay them now
    if (this.pendingSignals.length) {
      for (const p of this.pendingSignals) {
        const data = p.data;
        if ((data as any).sdp) this.session.handleRemoteSdp((data as any).sdp);
        else if ((data as any).candidate) this.session.handleRemoteCandidate((data as any).candidate);
      }
      this.pendingSignals = [];
    }
  }

  hangup(){
    try { this.session?.close(); } catch {}
    this.session = undefined; this.dcState = undefined; this.iceState = undefined;
  }

  send(){ if (this.session && this.sendText.trim()) { this.session.send(this.sendText); this.log(`[tx] ${this.sendText}`); this.sendText=''; } }
  canSend(){ return !!this.session && this.dcState === 'open'; }

  icedump(){ this.iceVisible = true; if (this.session) this.session.startStatsLoop(this._statsCb); }
  toggleStats(){ this.statsOn = !this.statsOn; this.iceVisible = this.statsOn; if (this.session) (this.statsOn ? this.session.startStatsLoop(this._statsCb) : this.session.stopStatsLoop()); }

  log(msg: string){ 
    this.ngZone.run(() => {
      this.logText += (this.logText ? '\n' : '') + msg;
      this.cdr.detectChanges();
      // Force textarea to scroll to bottom
      queueMicrotask(() => {
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
        if (textarea) {
          textarea.scrollTop = textarea.scrollHeight;
        }
      });
    });
  }

  dcStateClass(){ return { 'ok': this.dcState==='open', 'warn': this.dcState==='connecting', 'bad': this.dcState==='closed' || this.dcState==='closing' }; }
  iceStateClass(){ return { 'ok': this.iceState==='connected' || this.iceState==='completed', 'warn': this.iceState==='checking', 'bad': this.iceState==='failed' || this.iceState==='disconnected' || this.iceState==='closed' }; }
}
