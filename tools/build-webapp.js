#!/usr/bin/env node
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function runCapture(name, cmd, args, opts = {}){
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore','pipe','pipe'], ...opts });
    p.stdout.on('data', d => process.stdout.write(`[${name}] ${d}`));
    p.stderr.on('data', d => process.stderr.write(`[${name}][err] ${d}`));
    p.on('exit', code => code === 0 ? resolve(code) : reject(new Error(`${name} exited ${code}`)));
  });
}

function copyDir(src, dest){
  if (!fs.existsSync(src)) throw new Error(`copyDir src not found: ${src}`);
  if (fs.existsSync(dest)) {
    try { fs.rmSync(dest, { recursive: true, force: true }); } catch {}
  }
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const e of entries){
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else if (e.isFile()) fs.copyFileSync(s, d);
  }
}

function detectDistDir(appDir){
  const base = path.join(appDir, 'dist', 'webrtc-demo');
  const browser = path.join(base, 'browser');
  return fs.existsSync(browser) ? browser : base;
}

function cleanPublic(){
  const publicDir = path.resolve(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) return;
  const entries = fs.readdirSync(publicDir);
  for (const name of entries){
    const p = path.join(publicDir, name);
    // why: ensure Angular index becomes default; remove prior static demo files
    fs.rmSync(p, { recursive: true, force: true });
  }
  console.log('[webapp] cleaned /public');
}

async function buildAngularToPublic({ cleanFirst = true } = {}){
  const appDir = path.resolve(__dirname, '..', 'webapp');
  if (!fs.existsSync(path.join(appDir, 'package.json'))) {
    console.warn('[webapp] Angular app not found at', appDir);
    return;
  }
  const env = { ...process.env };
  if (cleanFirst) cleanPublic();

  // ensure dependencies
  const nodeModules = path.join(appDir, 'node_modules');
  if (!fs.existsSync(nodeModules)) {
    const hasLock = fs.existsSync(path.join(appDir, 'package-lock.json'));
    console.log('[webapp] installing deps (', hasLock ? 'npm ci' : 'npm i', ') ...');
    const ncmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await runCapture('npm', ncmd, [hasLock ? 'ci' : 'i'], { cwd: appDir, env });
  }
  console.log('[webapp] building Angular app...');
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  await runCapture('ng', npx, ['ng', 'build'], { cwd: appDir, env });
  const distDir = detectDistDir(appDir);
  const publicDir = path.resolve(__dirname, '..', 'public');
  console.log(`[webapp] copying ${distDir} => ${publicDir}`);
  copyDir(distDir, publicDir);
  console.log('[webapp] done.');
}

module.exports = { buildAngularToPublic, cleanPublic };

if (require.main === module){
  const noClean = process.argv.includes('--no-clean');
  buildAngularToPublic({ cleanFirst: !noClean }).catch(err => {
    console.error('[webapp] error:', err && err.stack || err);
    process.exit(1);
  });
}
