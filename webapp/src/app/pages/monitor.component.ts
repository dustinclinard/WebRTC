import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MetricsService } from '../shared/metrics.service';

@Component({
  standalone: true,
  selector: 'app-monitor',
  imports: [CommonModule, FormsModule],
  providers: [MetricsService],
  template: `
  <div class="card">
    <div class="header">
      <div><b>STUN Metrics</b></div>
      <button (click)="toggle()">{{ polling ? 'Stop' : 'Start' }} Polling</button>
    </div>
    <pre>{{ metricsJson }}</pre>
  </div>
  `,
  styles: [`
    .card {
      background: var(--bg2);
      border: 1px solid var(--line);
      border-radius: 4px;
      padding: 16px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    pre {
      height: 200px;
      overflow: auto;
      margin: 0;
      font-size: 13px;
      line-height: 1.5;
    }
  `]
})
export class MonitorComponent {
  stunHttp = 'http://localhost:8791/metrics';
  metricsJson = '';
  polling = false;
  private timer?: any;

  constructor(private metrics: MetricsService) {}

  toggle(){
    if (this.polling) { this.polling = false; clearInterval(this.timer); this.timer = null; return; }
    this.polling = true;
    const tick = async () => {
      try {
        const data = await this.metrics.fetchMetrics(this.stunHttp);
        this.metricsJson = JSON.stringify(data, null, 2);
      } catch (e: any) {
        this.metricsJson = 'fetch failed: ' + (e?.message ?? e);
      }
    };
    tick();
    this.timer = setInterval(tick, 1500);
  }
}
