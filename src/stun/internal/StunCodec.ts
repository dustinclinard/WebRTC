/**
 * Minimal STUN Binding codec.
 * Only handles Binding Request and responds with XOR-MAPPED-ADDRESS.
 */
const MAGIC_COOKIE = 0x2112A442;

function readUInt16BE(buf: Buffer, off: number) { return (buf[off] << 8) | buf[off+1]; }
function writeUInt16BE(buf: Buffer, val: number, off: number) { buf[off] = (val>>>8)&0xff; buf[off+1] = val&0xff; }
function writeUInt32BE(buf: Buffer, val: number, off: number) {
  buf[off] = (val>>>24)&0xff; buf[off+1] = (val>>>16)&0xff; buf[off+2] = (val>>>8)&0xff; buf[off+3] = val&0xff;
}

export type BindingInfo = {
  family: 'IPv4'|'IPv6';
  port: number;
  address: string;
};

export function isBindingRequest(buf: Buffer): boolean {
  if (buf.length < 20) return false;
  const msgType = readUInt16BE(buf, 0);
  const len = readUInt16BE(buf, 2);
  const cookie = buf.readUInt32BE(4);
  // STUN message type: 0x0001 = Binding Request
  // Message length shouldn't exceed buffer-20 and is multiple of 4
  return msgType === 0x0001 && cookie === MAGIC_COOKIE && (20 + len) <= buf.length && (len % 4) === 0;
}

export function buildBindingSuccess(buf: Buffer, info: BindingInfo): Buffer {
  // Reuse transaction id from request (12 bytes at offset 8)
  const txid = buf.subarray(8, 20);

  // Attribute: XOR-MAPPED-ADDRESS (0x0020)
  // Value: 1 byte zero, 1 byte family, 2 bytes x-port, 4|16 bytes x-address
  const attrHeader = 4;
  const addrBytes = info.family === 'IPv4' ? 4 : 16;
  const valueLen = 4 + addrBytes;
  const totalLen = 20 + (attrHeader + valueLen + pad4(0)) /* single attribute, already multiple of 4 */;

  const out = Buffer.alloc(totalLen);
  // Type: 0x0101 Binding Success Response
  writeUInt16BE(out, 0x0101, 0);
  writeUInt16BE(out, attrHeader + valueLen, 2);
  writeUInt32BE(out, MAGIC_COOKIE, 4);
  txid.copy(out, 8);

  // Write attribute header
  writeUInt16BE(out, 0x0020, 20);
  writeUInt16BE(out, valueLen, 22);

  // Write attribute value
  const off = 24;
  out[off] = 0; // reserved
  out[off+1] = info.family === 'IPv4' ? 0x01 : 0x02;

  const xPort = info.port ^ (MAGIC_COOKIE >>> 16);
  writeUInt16BE(out, xPort, off+2);

  if (info.family === 'IPv4') {
    const parts = info.address.split('.').map(n => Number(n) & 0xff);
    const cookieBuf = Buffer.alloc(4); writeUInt32BE(cookieBuf, MAGIC_COOKIE, 0);
    for (let i=0; i<4; i++) out[off+4+i] = parts[i] ^ cookieBuf[i];
  } else {
    // IPv6: xor with (magic cookie || txid)
    const addrBuf = Buffer.from(info.address.split(':').flatMap(h => {
      const v = parseInt(h || '0', 16);
      return [ (v>>>8)&0xff, v&0xff ];
    }));
    const xorPad = Buffer.alloc(16);
    writeUInt32BE(xorPad, MAGIC_COOKIE, 0);
    txid.copy(xorPad, 4);
    for (let i=0; i<16; i++) out[off+4+i] = addrBuf[i] ^ xorPad[i];
  }

  return out;
}

function pad4(n: number) { return (4 - (n % 4)) % 4; }
