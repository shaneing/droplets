const _ = require('underscore');

class MenuItemUtils {
  static buildMenuItems({ template = [], items, selector }) {
    if (items.length <= 0) return null;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      template.push(MenuItemUtils.buildMenuItem({
        item,
        selector,
      }));
    }
    return template;
  }

  static buildMenuItem({ item }) {
    /**
     * Return a copy of the object, filtered to only have values for the whitelisted keys
     */
    item = _.pick(item, 'label', 'type', 'command', 'role', 'submenu');
    if (item.submenu) {
      item.submenu = item.submenu.map(submenuItem => MenuItemUtils.buildMenuItem({ submenuItem }));
    }
    return item;
  }
}

module.exports = MenuItemUtils;
