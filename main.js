const electron = require('electron');
const path = require('path');
const url = require('url');

const DropletApplication = require('./src/main-process/droplets-application');

const app = electron.app;

app.on('ready', () => {
  const droplets = new DropletApplication({
    devMode: process.env.DEV_MODE || false,
    startUrl: process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, 'build/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
    menusResourcePath: path.join(__dirname, 'src'),
  });
  global.droplets = droplets;
});

