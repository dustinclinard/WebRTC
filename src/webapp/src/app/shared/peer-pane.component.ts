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
  private processedSdpIds = new Set<string>();
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
      this.processSignalData(data);
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
    this.processedSdpIds.clear(); // Reset SDP tracking for new session
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
        this.processSignalData(p.data);
      }
      this.pendingSignals = [];
    }
  }

  private processSignalData(data: any) {
    if (!this.session) return;
    
    if (data.sdp) {
      // Create a unique ID for this SDP to prevent duplicate processing
      const sdpId = `${data.sdp.type}-${data.sdp.sdp.slice(0, 50)}`;
      if (this.processedSdpIds.has(sdpId)) {
        console.log(`[WebRTC] Ignoring duplicate SDP: ${data.sdp.type}`);
        return;
      }
      this.processedSdpIds.add(sdpId);
      this.log(`[WebRTC] Processing ${data.sdp.type} SDP`);
      this.session.handleRemoteSdp(data.sdp);
    } else if (data.candidate) {
      this.session.handleRemoteCandidate(data.candidate);
    }
  }

  hangup(){
    try { this.session?.close(); } catch {}
    this.session = undefined; this.dcState = undefined; this.iceState = undefined;
    this.processedSdpIds.clear();
  }

  send(){ if (this.session && this.sendText.trim()) { this.session.send(this.sendText); this.log(`[tx] ${this.sendText}`); this.sendText=''; } }
  canSend(){ return !!this.session && this.dcState === 'open'; }

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
