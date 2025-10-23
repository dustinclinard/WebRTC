import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeerPaneComponent, PeerConfig } from '../shared/peer-pane.component';
import { MonitorComponent } from './monitor.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, PeerPaneComponent, MonitorComponent],
  template: `
  <div class="page-content">
    <h1>WebRTC P2P Demo</h1>
    
    <div class="grid2">
      <app-peer-pane [config]="peerA()" [autoJoin]="true"></app-peer-pane>
      <app-peer-pane [config]="peerB()" [autoJoin]="true"></app-peer-pane>
    </div>

    <div class="monitor-panel">
      <app-monitor></app-monitor>
    </div>
  </div>
  `,
  styles: [`
    .page-content {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 32px;
    }
    .grid2 {
      margin-bottom: 32px;
      gap: 32px;
    }
    .monitor-panel {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid var(--line);
    }
  `]
})
export class HomeComponent {
  private room = 'demo';
  private wsUrl = 'ws://localhost:8081';
  private stunUrl = 'stun:127.0.0.1:3478';
  private stunHttp = 'http://localhost:8791/metrics';

  peerA(): PeerConfig {
    return {
      nick: 'Alice',
      initiator: true,
      room: this.room,
      wsUrl: this.wsUrl,
      stunUrl: this.stunUrl,
      stunHttp: this.stunHttp
    };
  }

  peerB(): PeerConfig {
    return {
      nick: 'Bob',
      initiator: false,
      room: this.room,
      wsUrl: this.wsUrl,
      stunUrl: this.stunUrl,
      stunHttp: this.stunHttp
    };
  }
apply() {
    // signals will recompute; input-bound components will pick up changes
  }
}
