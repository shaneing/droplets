const Menu = require('electron').Menu;

class ContextMenu {

  constructor({
    template = {},
    window,
    selector,
  }) {
    this.template = this.createClickHandlers(template, selector);
    const menu = Menu.buildFromTemplate(template);
    menu.popup(window);
  }

  createClickHandlers(template, selector) {
    return template.map((item) => {
      global.droplets.logger.info(`ContextMenu::createClickHandlers(template, selector) - Handle label = ${item.label}, type = ${item.type}, command = ${item.command}, selector = ${selector}`);
      if (item && item.command) {
        item.click = ((item, selector) => () => {
          global.droplets.sendCommandToWindow(item.command, selector);
        })(item, selector);
      } else if (item.submenu) {
        this.createClickHandlers(item.submenu);
      }
      return item;
    });
  }

}

module.exports = ContextMenu;
