const electron = require('electron');
const path = require('path');
const fs = require('fs');

const getUserDataPath = () => (electron.app || electron.remote.app).getPath('userData');

const getDataStoreDirectory = ({
  userManager,
}) => {
  let dataStorePath = path.join(getUserDataPath(), 'visitor');
  if (userManager.currentUser) {
    dataStorePath = path.join(getUserDataPath(), userManager.currentUser.username);
  }
  if (!fs.existsSync(dataStorePath)) {
    fs.mkdirSync(dataStorePath);
  }
  return dataStorePath;
};

const info = ({
  logger, message
}) => {
  if (logger) {
    logger.info(message);
  }
};

const error = ({
  logger, message
}) => {
  if (logger) {
    logger.error(message);
  }
};

module.exports = {
  getUserDataPath,
  getDataStoreDirectory,
  info,
  error,
};
