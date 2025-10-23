#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const out = path.resolve(__dirname, '..', 'dist');
try { fs.rmSync(out, { recursive: true, force: true }); } catch {}
