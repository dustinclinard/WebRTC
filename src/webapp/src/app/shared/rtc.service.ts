import { Injectable } from '@angular/core';

export type IceState = 'new'|'checking'|'connected'|'completed'|'failed'|'disconnected'|'closed';
export type DcState = 'connecting'|'open'|'closing'|'closed';

export type SessionCallbacks = {
  onSignal: (data: any) => void;  // why: bubble up sdp/candidate
  onIceState?: (state: IceState) => void;
  onDcState?: (state: DcState) => void;
  onDcMessage?: (text: string) => void;
};

export class PeerSession {
  pc: RTCPeerConnection;
  dc?: RTCDataChannel;
  private statsTimer?: any;

  constructor(readonly initiator: boolean, stunUrl: string, private cb: SessionCallbacks){
    this.pc = new RTCPeerConnection({ iceServers: [{ urls: stunUrl }] });
    this.pc.onicecandidate = (e) => { if (e.candidate) this.cb.onSignal({ candidate: e.candidate }); };
    this.pc.oniceconnectionstatechange = () => {
      const s = this.pc.iceConnectionState as IceState;
      this.cb.onIceState?.(s);
    };
    this.pc.ondatachannel = (e) => this.attachDc(e.channel);
    if (initiator) {
      // Configure data channel for low latency
      const dc = this.pc.createDataChannel('chat', {
        ordered: true, // Guarantee message order
        maxRetransmits: 0 // Don't retry - better to show new messages than retry old ones
      });
      this.attachDc(dc);
    }
  }

  private attachDc(dc: RTCDataChannel){
    this.dc = dc;
    this.cb.onDcState?.(dc.readyState as DcState);
    dc.onopen = () => this.cb.onDcState?.(dc.readyState as DcState);
    dc.onclose = () => this.cb.onDcState?.(dc.readyState as DcState);
    dc.onmessage = (e) => this.cb.onDcMessage?.(String(e.data ?? ''));
  }

  async startOffer(){
    const offer = await this.pc.createOffer({ offerToReceiveAudio:false, offerToReceiveVideo:false });
    await this.pc.setLocalDescription(offer);
    this.cb.onSignal({ sdp: this.pc.localDescription });
  }

  async handleRemoteSdp(sdp: RTCSessionDescriptionInit){
    try {
      // Check if we're in the right state for this type of SDP
      if (sdp.type === 'offer') {
        // We can accept offers in stable, have-local-offer, or have-remote-pranswer states
        if (this.pc.signalingState === 'have-local-offer') {
          console.warn('[WebRTC] Received offer while we have local offer - possible glare, ignoring');
          return;
        }
      } else if (sdp.type === 'answer') {
        // We should only accept answers when we have a local offer
        if (this.pc.signalingState !== 'have-local-offer') {
          console.warn(`[WebRTC] Received answer in wrong state: ${this.pc.signalingState}, ignoring`);
          return;
        }
      }

      await this.pc.setRemoteDescription(new RTCSessionDescription(sdp));
      
      if (sdp.type === 'offer'){
        const answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);
        this.cb.onSignal({ sdp: this.pc.localDescription });
      }
    } catch (error) {
      console.error(`[WebRTC] Failed to handle remote SDP (${sdp.type}):`, error);
    }
  }

  async handleRemoteCandidate(candidate: RTCIceCandidateInit){
    try { 
      // Check if remote description is set before adding ICE candidates
      if (this.pc.remoteDescription) {
        await this.pc.addIceCandidate(new RTCIceCandidate(candidate)); 
      } else {
        console.warn('[WebRTC] Received ICE candidate before remote description, ignoring');
      }
    } catch (error) {
      console.error('[WebRTC] Failed to add ICE candidate:', error);
    }
  }

  send(text: string){
    if (!this.dc || this.dc.readyState !== 'open') return;
    try { this.dc.send(text); } catch {}
  }

  startStatsLoop(onStats: (value: any[]) => void){
    this.stopStatsLoop();
    this.statsTimer = setInterval(async () => {
      try{
        const stats = await this.pc.getStats();
        const arr: any[] = [];
        stats.forEach(s => {
          if (['local-candidate','remote-candidate','candidate-pair'].includes((s as any).type)) arr.push(s);
        });
        onStats(arr);
      }catch{}
    }, 1000);
  }
  stopStatsLoop(){ if (this.statsTimer) { clearInterval(this.statsTimer); this.statsTimer = null; } }

  close(){
    this.stopStatsLoop();
    try { this.dc?.close(); } catch {}
    try { this.pc.close(); } catch {}
  }
}

@Injectable()
export class RtcService {
  createSession(initiator: boolean, stunUrl: string, cb: SessionCallbacks){
    return new PeerSession(initiator, stunUrl, cb);
  }
}
