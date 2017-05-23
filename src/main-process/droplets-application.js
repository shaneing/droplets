const Config = require('electron-config');
const electron = require('electron');
const winston = require('winston');
const path = require('path');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const ContextMenuManager = require('./manager/context-menu-manager');
const CommandManager = require('./manager/command-manager');
const FileSystemDataStore = require('./stores/file-system-data-store');
const UserManager = require('./user-manager');
const DropletsApi = require('./api/droplets/droplets-api');
const AutoComplete = require('./auto-complete');
const FileSystemJSONStore = require('./stores/file-system-json-store');
const NoteManager = require('./manager/note-manager');
const TreeManager = require('./manager/tree-manager');
const constants = require('../config/constants');
const common = require('./common');

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

class DropletsApplication {

  constructor({ devMode = false, startUrl, menusResourcePath }) {
    this.startUrl = startUrl;
    this.level = constants.LEVEL.NO;
    this.devMod = devMode;

    this.initialization();

    this.loadResources({
      menusResourcePath,
    });


    if (this.devMod) {
      installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => this.logger.info(`Added Extension:  ${name}`))
      .catch(err => this.logger.error(`An error occurred: ${err}`));
    }

    if (!this.user.currentUser) {
      this.createFramelessWindow(startUrl);
    } else {
      this.createUserLevelMainWindow();
    }
  }

  initialization() {
    this.baseInitialization();
    this.commonManagerInitialization();
    this.storeInitialization();
  }

  baseInitialization() {
    this.initLogger();
    this.initConfig();
    this.initUser();
    this.initApi();
  }

  loadResources({
    menusResourcePath,
  }) {
    this.initContextMenuManager(menusResourcePath);
  }

  commonManagerInitialization() {
    this.initCommandManager();
  }

  storeInitialization() {
    this.dataStoreDirectory = common.getDataStoreDirectory({
      userManager: this.user,
    });
    this.initDataStore();
    this.initJSONStore();
    this.initAutoComplete();
    this.initNoteManager();
    this.initTreeManager();
  }

  initTreeManager() {
    this.tree = new TreeManager({
      fileSystemDataStore: this.dataStore,
    });
  }

  initDataStore() {
    this.dataStore = new FileSystemDataStore({
      storePath: path.join(this.dataStoreDirectory, 'data'),
    });
  }

  initNoteManager() {
    if (!this.dataStore.exists('Note')) {
      this.dataStore.mkdir('Note');
    }
    this.note = new NoteManager({
      fileSystemDataStore: this.dataStore,
      userManager: this.user,
      fileSystemJsonStore: new FileSystemJSONStore({
        storePath: path.join(this.dataStoreDirectory, 'state'),
      }),
    });
  }

  initJSONStore() {
    this.jsonStore = new FileSystemJSONStore({
      storePath: path.join(this.dataStoreDirectory, 'json-store'),
    });
  }

  initAutoComplete() {
    this.auto = new AutoComplete({
      storage: this.jsonStore,
      logger: this.logger,
    });
    this.logger.info('DropletsApplication::initAutoComplete() - Finish!');
  }

  initApi() {
    this.api = new DropletsApi({});
  }

  initConfig() {
    this.config = new Config({
      name: 'preferences',
      defaults: {
        windowBounds: { width: 800, height: 600 },
      },
    });
  }

  initUser() {
    this.user = new UserManager({
      config: this.config,
      logger: this.logger,
    });
  }

  initCommandManager() {
    this.command = new CommandManager({
      logger: this.logger,
    });
  }

  initLogger() {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: 'verbose',
        }),
        new winston.transports.File({
          level: 'verbose',
          filename: path.join((electron.app || electron.remote.app).getPath('userData'), 'droplets.out'),
        }),
      ],
    });
    this.logger.info('DropletsApplication::initLogger() - Finish!');
    process.logger = this.logger;
  }

  initContextMenuManager(menusResourcePath) {
    this.logger.info(`DropletApplication::initContextMenuManager(menusResourcePath) - Args ${menusResourcePath}`);
    this.contextMenu = new ContextMenuManager({
      resourcePath: menusResourcePath,
      logger: this.logger,
    });
    this.logger.info('DropletsApplication::initContextMenuManager(menusResourcePath) - Finish!');
  }

  isLogin() {
    if (this.user) {
      if (this.user.password) {
        return true;
      }
    }
    return false;
  }

  createFramelessWindow(startUrl = this.startUrl) {
    let framelessWindow = new BrowserWindow({
      width: 400,
      height: 600,
      frame: false,
      resizable: false,
      movable: true,
    });
    framelessWindow.loadURL(startUrl);
    // if (this.devMod) {
    //   framelessWindow.webContents.openDevTools();
    // }
    framelessWindow.on('closed', () => {
      framelessWindow = null;
    });
    this.framelessWindow = framelessWindow;
  }

  closeFrameLessWindow() {
    this.initialization();
    this.framelessWindow.close();
  }

  closeMainWindow() {
    this.initialization();
    this.level = constants.LEVEL.NO;
    this.mainWindow.close();
  }

  createVisitorLevelMainWindow() {
    this.logger.info(`DropletApplication::createVisitorLevelMainWindow() - Open Url ${this.startUrl}`);
    this.level = constants.LEVEL.VISITOR;
    this.createMainWindow(this.startUrl);
  }

  createUserLevelMainWindow() {
    this.level = constants.LEVEL.USERS;
    this.createMainWindow(this.startUrl);
  }

  createMainWindow(startUrl) {
    const { width, height } = this.config.get('windowBounds');
    let mainWindow = new BrowserWindow({
      width,
      height,
      'web-preference': {
        'web-security': false,
      },
    });
    mainWindow.loadURL(startUrl);
    // if (this.devMod) {
    //   mainWindow.webContents.openDevTools();
    // }
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
    mainWindow.on('resize', () => {
      const { width, height } = mainWindow.getBounds();
      this.config.set('windowBounds', { width, height });
    });
    const logger = this.logger;
    app.on('browser-window-created', () => {
      mainWindow.on('context-menu', (contextMenuTemplate) => {
        logger.info(`DropletApplication::createMainWindow(startUrl) - on context-menu - ${contextMenuTemplate}`);
        new ContextMenuManager.ContextMenu({
          template: contextMenuTemplate,
          mainWindow,
        });
      });
    });
    this.mainWindow = mainWindow;
  }

  popupContextMenuBySelector({
    template,
    selector,
  }) {
    this.logger.info(`DropletApplication::popupContextMenuBySelector(template, selector) - The selector ${selector}`);
    const window = this.mainWindow;
    new ContextMenuManager.ContextMenu({
      template,
      window,
      selector,
    });
  }

  sendCommandToWindow(command, selector) {
    this.logger.info(`DropletApplication::sendCommandToWindow(command) - The command = ${command} and activeSelector = ${this.contextMenu.activeSelector}`);
    this.command.findCommand(selector, command).exec();
  }

  exit(status) {
    app.exit(status);
  }
}

module.exports = DropletsApplication;
