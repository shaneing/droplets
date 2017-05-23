const common = require('./common');

const CONFIG_KEY = {
  USERS: 'users',
  CURRENT_USER: 'current_user',
};

class UserManager {

  constructor({
    config,
    logger,
  }) {
    this.config = config;
    this.users = config.get(CONFIG_KEY.USERS) || {};
    this.currentUser = config.get(CONFIG_KEY.CURRENT_USER);
    this.logger = logger;
  }

  setCurrentUser({
    username,
    password,
  }) {
    this.currentUser = {
      username,
      password,
    };
    common.info({
      logger: this.logger,
      message: `UserManager::setCurrentUser(username, password) - ${username} and ${password}`,
    });
    this.config.set(CONFIG_KEY.CURRENT_USER, this.currentUser);
  }

  clearCurrentUser() {
    this.currentUser = {};
    common.info({
      logger: this.logger,
      message: 'UserManager::clearCurrentUser()',
    });
    this.config.delete(CONFIG_KEY.CURRENT_USER, this.currentUser);
  }


  add({
    username,
    password,
  }) {
    this.users[username] = {
      username,
      password,
    };
    this.save();
  }

  delete({
    username,
  }) {
    Object.keys(this.users).forEach((key) => {
      if (key === username) {
        delete this.users[username];
      }
    });
    this.save();
  }

  save() {
    common.info({
      logger: this.logger,
      message: `UserManager::save() - ${JSON.stringify(this.users)}`,
    });
    this.config.set(CONFIG_KEY.USERS, this.users);
  }
}


module.exports = UserManager;
