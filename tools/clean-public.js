#!/usr/bin/env node
const { cleanPublic } = require('./build-webapp');
try { cleanPublic(); } catch (e) { console.error('[clean-public] error', e && e.stack || e); process.exit(1); }
