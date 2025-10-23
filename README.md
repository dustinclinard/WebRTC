# WebRTC STUN Demo

A complete WebRTC demonstration featuring a custom STUN server, WebSocket signaling server, and Angular web application for peer-to-peer connectivity testing.

## Architecture

This project consists of three integrated components:

### 1. STUN Server (`src/stun/`)
- **Purpose**: ICE candidate gathering for WebRTC connections
- **Protocol**: UDP on port 3478 with dual IPv4/IPv6 support
- **Features**: Real-time metrics collection and HTTP metrics endpoint
- **Key Files**: `StunServer.ts`, `StunCodec.ts`, `Metrics.ts`

### 2. Signaling Server (`src/signaling/`)
- **Purpose**: WebSocket-based signaling for WebRTC handshaking
- **Protocol**: WebSocket on port 8081 with room-based messaging
- **Features**: Client connection management, room isolation, typed message protocols
- **Key Files**: `SignalingServer.ts`, `ClientConnection.ts`, `RoomManager.ts`

### 3. Angular Web App (`src/webapp/`)
- **Purpose**: Interactive UI for testing WebRTC peer connections
- **Features**: Dual-peer simulation (Alice/Bob), real-time connection monitoring, data channel messaging
- **Architecture**: Standalone components with service isolation pattern
- **Key Files**: `rtc.service.ts`, `signaling.service.ts`, `peer-pane.component.ts`

## Quick Start

```bash
# Install dependencies
npm install

# Build and start all servers with demo UI
npm run demo
```

This will:
1. Build the Angular app and copy it to `public/`
2. Compile TypeScript servers to `dist/`
3. Start STUN server (UDP :3478)
4. Start signaling server (WebSocket :8081)
5. Start static file server (:8080)
6. Open browser to http://localhost:8080

## Development Commands

```bash
# Full rebuild (TypeScript + Angular)
npm run build

# Quick demo restart (skip Angular rebuild)
npm run demo:fast

# Clean public directory
npm run clean:public

# Build only Angular app
npm run webapp:build
```

## Server Endpoints

| Service | Protocol | Port | URL | Purpose |
|---------|----------|------|-----|---------|
| STUN Server | UDP | 3478 | `stun:127.0.0.1:3478` | ICE candidate gathering |
| Signaling | WebSocket | 8081 | `ws://localhost:8081` | WebRTC handshaking |
| Metrics | HTTP | 8791 | `http://localhost:8791/metrics` | STUN server metrics |
| Demo UI | HTTP | 8080 | `http://localhost:8080/` | Web application |

## Key Design Patterns

### Service Isolation
Each `PeerPaneComponent` gets its own `SignalingService` provider, creating isolated WebSocket connections:

```typescript
@Component({
  providers: [SignalingService, RtcService, MetricsService],
  // ... component definition
})
```

### Callback-Based WebRTC Sessions
The `PeerSession` class encapsulates RTCPeerConnection lifecycle with clear callbacks:

```typescript
const session = new PeerSession(initiator, stunUrl, {
  onSignal: (data) => signaling.sendSignal(data),
  onIceState: (state) => console.log('ICE:', state),
  onDcState: (state) => console.log('DataChannel:', state),
  onDcMessage: (text) => handleMessage(text)
});
```

### Typed Protocol Messages
All network protocols use discriminated union types for type safety:

```typescript
// Signaling WebSocket messages
type Inbound = { type: "join"; room: string } | { type: "signal"; data: any; from: string };
type Outbound = { type: "join"; room: string; nick?: string } | { type: "signal"; data: any; to?: string };
```

## Build System

The project uses custom Node.js tools for orchestrated builds:

- **`tools/demo.js`** - Complete demo orchestration (build + serve + launch)
- **`tools/build-webapp.js`** - Angular build with copy to `public/`
- **`tools/build.js`** - TypeScript compilation cleanup
- **`tools/serve-public.js`** - Static file server for demo

Angular builds to `src/webapp/dist/webrtc-demo/browser/` then copies to root `public/` for serving.

## WebRTC Configuration

### Data Channel Settings
Configured for low-latency messaging:
```typescript
const dc = pc.createDataChannel('chat', {
  ordered: true,          // Guarantee message order
  maxRetransmits: 0      // Don't retry - show new messages instead
});
```

### ICE Configuration
Uses local STUN server for candidate gathering:
```typescript
const pc = new RTCPeerConnection({ 
  iceServers: [{ urls: 'stun:127.0.0.1:3478' }] 
});
```

## Monitoring & Metrics

The STUN server provides real-time metrics at `http://localhost:8791/metrics`:

```json
{
  "startedAt": 1698123456789,
  "totalRequests": 42,
  "ipv4": 38,
  "ipv6": 4,
  "last": [
    {"addr": "192.168.1.100", "port": 54321, "ts": 1698123456789, "family": "IPv4"}
  ]
}
```

## Project Structure

```
├── src/                    # TypeScript servers and Angular app
│   ├── signaling/         # WebSocket signaling server
│   ├── stun/              # STUN server with metrics
│   └── webapp/            # Angular application
│       └── src/app/
│           ├── pages/     # Route components (home, monitor)
│           └── shared/    # Services and reusable components
├── tools/                 # Custom build orchestration
├── public/                # Built Angular app (served at :8080)
└── dist/                  # Compiled TypeScript servers
```

## Debugging

VS Code debugging is fully configured for all three projects:

### Available Debug Configurations
- **Debug Angular App** - Launch Angular dev server with Chrome debugger
- **Debug STUN Server** - Debug TypeScript STUN server with breakpoints
- **Debug Signaling Server** - Debug TypeScript signaling server with breakpoints
- **Debug All Projects** - Launch all three projects with debugging enabled
- **Debug Backend (STUN + Signaling)** - Launch both servers for debugging
- **Attach to Angular (Chrome)** - Attach to running Angular app

### Quick Start Debugging
1. **F5** to launch "Debug All Projects" - starts all three with debugging
2. Set breakpoints in TypeScript source files (`src/stun/`, `src/signaling/`, `src/webapp/src/`)
3. Breakpoints work in original TypeScript files thanks to source maps

### Individual Project Debugging
- Press **Ctrl+Shift+P** → "Debug: Select and Start Debugging"
- Choose the specific project configuration you want to debug
- Source maps are enabled for stepping through TypeScript code

## Testing

No automated tests currently exist. Manual testing is performed through the demo UI:

1. Navigate to http://localhost:8080
2. Use Alice/Bob peer simulation in `HomeComponent`
3. Test WebRTC connection establishment
4. Send messages via data channels
5. Monitor ICE connection states
6. View STUN metrics at the metrics endpoint

## Dependencies

### Runtime
- **ws** - WebSocket server implementation
- **rimraf** - Cross-platform file removal

### Development  
- **TypeScript 5.4+** - Language and compiler
- **Angular 18** - Web application framework
- **Node.js types** - TypeScript definitions

## Environment Variables

The demo script accepts these environment variables:

- `STUN_PORT=3478` - STUN server UDP port
- `STUN_HTTP_PORT=8791` - Metrics HTTP server port  
- `WS_PORT=8081` - WebSocket signaling port
- `STATIC_PORT=8080` - Static file server port

## License

Private project - see package.json for details.