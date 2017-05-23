
class CommandManager {

  constructor({ logger }) {
    this.selectors = {};
    this.logger = logger;
  }

  info(message) {
    if (this.logger) {
      this.logger.info(message);
    }
  }

  register(selector, commandName, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Can\'t register command with non-function callback');
    }
    if (typeof this.selectors[selector] === 'undefined') {
      this.selectors[selector] = [];
    }
    const commands = this.selectors[selector];
    const isExist = commands.some(command => command.name === commandName);
    if (!isExist) {
      commands.push(new Command({
        name: commandName,
        callback,
      }));
    }
  }

  add(selector, commands = {}) {
    Object.keys(commands).forEach((commandName) => {
      this.register(selector, commandName, commands[commandName]);
    });
  }

  findCommand(selector, commandName) {
    const commands = this.selectors[selector];
    this.info(`CommandManager::findCommand(selector, commandName) - The ${selector} has ${commands.length} command`);
    let command;
    for (let i = 0; i < commands.length; i += 1) {
      command = commands[i];
      if (command.name === commandName) {
        this.info(`CommandManager::findCommand(selector, commandName) - Find command of ${command.name}`);
        return command;
      }
    }
    return null;
  }
}

class Command {
  constructor({ name, callback }) {
    this.name = name;
    this.callback = callback;
  }

  exec(args) {
    return this.callback(args);
  }
}


module.exports = CommandManager;
