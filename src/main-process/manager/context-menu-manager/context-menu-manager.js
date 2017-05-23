const FileSystemUtils = require('../../../utils/file-system-utils');
const fs = require('fs');

class ContextMenuManager {

  constructor({ resourcePath, logger }) {
    this.resourcePath = resourcePath;
    this.contextMenuItemSets = [];
    this.activeSelector = null;
    this.loadedPaths = null;
    this.logger = logger;
    this.isMatched = false;
    this.load(resourcePath);
  }

  load(resourcePath) {
    this.loadedPaths = FileSystemUtils.find({
      searchPath: resourcePath,
      pattern: new RegExp('menus(\\\\|/).*.json$'),
    });
    let map;
    this.loadedPaths.forEach((loadedPath) => {
      this.info(`ContextMenuManager::load(resourcePath) - Loading ${loadedPath} ... `);
      map = JSON.parse(fs.readFileSync(loadedPath));
      if (map['context-menu']) {
        this.addContextMenu(map['context-menu']);
      }
    });
  }

  addContextMenu(contextMenuBySelector) {
    this.info('ContextMenuManager::addContextMenu(contextMenuBySelector)');
    Object.keys(contextMenuBySelector).forEach((selector) => {
      this.contextMenuItemSets.push(
        new ContextMenuItemSet({
          selector,
          items: contextMenuBySelector[selector]
        })
      );
    });
  }


  info(message) {
    if (this.logger) {
      this.logger.info(message);
    }
  }

}


class ContextMenuItemSet {
  constructor({ selector, items }) {
    this.selector = selector;
    this.items = items;
  }

  toString() {
    return `{selector:${this.selector}, items:${this.items}}`;
  }
}

module.exports = ContextMenuManager;

