import MenuItemUtils from './menu-item-utils';

const electron = window.require('electron');

export const remote = electron.remote;
export const droplets = remote.getGlobal('droplets');
export const dialog = remote.dialog;

let activeSelector;
const templateForEvent = (e) => {
  const element = e.currentTarget;
  const match = droplets.contextMenu.contextMenuItemSets.filter(
    contextMenuItemSet => element.webkitMatchesSelector(contextMenuItemSet.selector),
  )[0];
  if (match) {
    activeSelector = match.selector;
    return MenuItemUtils.buildMenuItems({
      selector: match.selector,
      items: match.items,
    });
  }
  return null;
};

export const popupContextMenuByEvent = (e) => {
  const template = templateForEvent(e);
  if (template) {
    droplets.popupContextMenuBySelector({
      template,
      selector: activeSelector,
    });
  }
};

export const DIALOG = {
  MESSAGE_TYPE: {
    NONE: 'none',
    INFO: 'info',
    ERROR: 'error',
    QUESTION: 'question',
    WARNING: 'warning',
  },
};

export const popupMessageDialog = ({
  type,
  title,
  message,
  detail,
  buttons,
  callback,
}) => {
  const options = {
    type: type || DIALOG.MESSAGE_TYPE.INFO,
    title: title || '',
    message,
    buttons: buttons || [],
    detail,
  };
  if (callback) {
    dialog.showMessageBox(options, callback);
  } else {
    dialog.showMessageBox(options);
  }
};
