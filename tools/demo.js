#!/usr/bin/env node
const { spawn } = require('node:child_process');
const { access } = require('node:fs/promises');
const path = require('node:path');
const { buildAngularToPublic } = require('./build-webapp');

const env = { ...process.env };
env.STUN_PORT = env.STUN_PORT || "3478";
env.STUN_HTTP_PORT = env.STUN_HTTP_PORT || "8791";
env.WS_PORT = env.WS_PORT || "8081";
env.STATIC_PORT = env.STATIC_PORT || "8080";

function run(name, cmd, args, extraEnv = {}) {
  const p = spawn(cmd, args, { env: { ...process.env, ...env, ...extraEnv }, stdio: ['ignore', 'pipe', 'pipe'] });
  p.stdout.on('data', d => process.stdout.write(`[${name}] ${d}`));
  p.stderr.on('data', d => process.stderr.write(`[${name}][err] ${d}`));
  p.on('exit', c => console.log(`[${name}] exited ${c}`));
  return p;
}

function runp(name, cmd, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const p = run(name, cmd, args, extraEnv);
    p.once('exit', code => code === 0 ? resolve() : reject(new Error(`${name} failed with code ${code}`)));
    p.once('error', reject);
  });
}

(async () => {
  // 0) Build Angular into /public so it serves by default
  await buildAngularToPublic({ cleanFirst: true });

  // 1) Build TS services
  const tsc = path.resolve(__dirname, '..', 'node_modules/typescript/lib/tsc.js');
  await runp('build', 'node', [tsc, '-p', 'tsconfig.json']);

  // 2) Verify outputs exist
  const stunOut = path.resolve(__dirname, '..', 'dist', 'stun', 'server.js');
  const sigOut  = path.resolve(__dirname, '..', 'dist', 'signaling', 'server.js');
  try { await access(stunOut); await access(sigOut); } catch (e) {
    console.error('[demo] build outputs missing:', e && e.message || e);
    process.exit(1);
  }

  // 3) Launch processes
  const stun = run('stun', 'node', [stunOut]);
  const sig  = run('signal', 'node', [sigOut]);
  const web  = run('static', 'node', [path.resolve(__dirname, 'serve-public.js'), path.resolve(__dirname, '..', 'public'), env.STATIC_PORT]);

  // 4) Announce
  console.log('Demo up:');
  console.log(`  STUN : udp://0.0.0.0:${env.STUN_PORT}`);
  console.log(`  STUN metrics : http://localhost:${env.STUN_HTTP_PORT}/metrics`);
  console.log(`  WS   : ws://localhost:${env.WS_PORT}`);
  console.log(`  Web  : http://localhost:${env.STATIC_PORT}/`);

  // 5) Open browser
  setTimeout(() => {
    const url = `http://localhost:${env.STATIC_PORT}/`;
    openURL(url);
  }, 800);
})().catch(err => {
  console.error('[demo] error:', err && err.stack || err);
  process.exit(1);
});

function openURL(u){
  const isWin = process.platform === 'win32';
  const isMac = process.platform === 'darwin';
  const cmd = isMac ? 'open' : isWin ? 'cmd' : 'xdg-open';
  const args = isWin ? ['/c', 'start', '', u] : [u];
  try { spawn(cmd, args, { detached:true, stdio:'ignore' }).unref(); } catch {}
}
