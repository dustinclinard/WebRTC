# WebRTC Angular Demo

Converted from the original `public/` UI into an Angular 18 app with OOP structure (services + session class).

## Run
```bash
npm i
npm start
# open http://localhost:4200
```
Backend:
- STUN UDP: `npm run demo` in the root project (or run your existing servers)
- WS signaling: `ws://localhost:8081`
- STUN URI: `stun:127.0.0.1:3478`
- Metrics: `http://localhost:8791/metrics`

## Structure
- `PeerPaneComponent` — self-contained peer UI
- `SignalingService` — WebSocket protocol (join/nick/signal)
- `RtcService` + `PeerSession` — WebRTC session (offer/answer/ICE, DC, stats)
- `MetricsService` — STUN metrics fetch
- `HomeComponent` — two peers (Alice/Bob) to simulate A/B
- `MonitorComponent` — metrics viewer

## Notes
- Each `PeerPaneComponent` gets its *own* `SignalingService` provider, isolating WS connections like the original iframes.
- Strong OOP: `PeerSession` class encapsulates RTCPeerConnection lifecycle and exposes clear callbacks.
