#!/usr/bin/env node
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;
const net = require('net');

process.env.ELECTRON_START_URL = `http://localhost:${port}`;
process.env.DEV_MODE = true;

const client = new net.Socket();
client.setMaxListeners(0);

let startedElectron = false;
const tryConnection = () => client.connect({port}, () => {
  client.end();
  if (!startedElectron) {
    console.log('Starting electron');
    startedElectron = true;
    const exec = require('child_process').exec;
    exec('npm run electron');
  }
});

tryConnection();

client.on('error', () => {
  setTimeout(tryConnection, 1000);
});
