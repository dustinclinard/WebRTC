# AI Agent Instructions for WebRTC STUN Demo

## Architecture Overview
This project implements a WebRTC demo with three main components:
1. **STUN Server** (`src/stun/`) - UDP server for ICE candidate gathering with metrics
2. **Signaling Server** (`src/signaling/`) - WebSocket server for WebRTC handshaking
3. **Angular Web App** (`webapp/`) - Demo UI with peer-to-peer connectivity

### Key Design Patterns
- **Service Isolation**: Each `PeerPaneComponent` gets its own `SignalingService` provider to isolate WebSocket connections
- **Strong OOP**: `PeerSession` class in `rtc.service.ts` encapsulates RTCPeerConnection lifecycle with clear callbacks
- **Protocol Types**: Explicit `Inbound`/`Outbound` union types for all protocol messages (signaling + RTC)
- **Tool-based Build**: Custom Node.js tools in `tools/` handle complex build orchestration

## Development Workflow

### Build Commands
```bash
# Full build (TypeScript + Angular → public/)
npm run build

# Demo with auto-open browser
npm run demo

# Skip webapp rebuild (development iteration)
npm run demo:fast
```

### Build Architecture
- `tools/demo.js` - Orchestrates full demo: builds Angular→`public/`, compiles TS→`dist/`, starts all servers
- Angular builds to `webapp/dist/webrtc-demo/browser/` then copies to root `public/` for serving
- TypeScript compiles `src/` to `dist/` with separate server entry points

### Server Endpoints
- **STUN**: UDP port 3478 (`stun:127.0.0.1:3478`)
- **Signaling**: WebSocket port 8081 (`ws://localhost:8081`)
- **Metrics**: HTTP port 8791 (`http://localhost:8791/metrics`)
- **Static**: HTTP port 8080 (`http://localhost:8080/`)

## Key Implementation Patterns

### WebRTC Session Management
`PeerSession` class pattern in `rtc.service.ts`:
- Constructor takes `initiator: boolean`, `stunUrl`, and callbacks
- Callbacks: `onSignal`, `onIceState`, `onDcState`, `onDcMessage`
- Data channel configured for low latency: `ordered: true, maxRetransmits: 0`
- Built-in stats loop with `getStats()` filtering for ICE-related entries

### Protocol Message Types
All network protocols use discriminated unions:
```typescript
// Signaling WebSocket
type Inbound = { type: "join"; room: string } | { type: "signal"; data: any; from: string }
type Outbound = { type: "join"; room: string; nick?: string } | { type: "signal"; data: any; to?: string }

// WebRTC states
type IceState = 'new'|'checking'|'connected'|'completed'|'failed'|'disconnected'|'closed'
type DcState = 'connecting'|'open'|'closing'|'closed'
```

### Metrics & Monitoring
- `Metrics` class aggregates request counts by IPv4/IPv6 with recent request history
- STUN server records every binding request with timestamp/address
- Metrics exposed via simple HTTP JSON endpoint at `/metrics`

### Component Architecture
- `PeerPaneComponent` is fully self-contained with its own service providers
- Uses Angular standalone components with explicit service injection
- Two-peer demo (`HomeComponent`) simulates Alice/Bob scenarios

## Critical Files
- `webapp/src/app/shared/rtc.service.ts` - WebRTC session class with callback pattern
- `src/signaling/SignalingServer.ts` - Room-based WebSocket signaling with typed messages
- `src/stun/StunServer.ts` - UDP STUN server with dual IPv4/IPv6 sockets
- `tools/demo.js` - Complete build & run orchestration with environment setup

## Testing
No automated tests. Manual testing via demo UI with Alice/Bob peer simulation at `http://localhost:8080/`.