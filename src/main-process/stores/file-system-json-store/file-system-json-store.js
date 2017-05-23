const path = require('path');
const fs = require('fs');
const temp = require('temp');

class FileSystemJSONStore {
  constructor({
    storePath,
  }) {
    this.storePath = storePath || temp.mkdirSync('droplets-json-store');
    if (!fs.existsSync(this.storePath)) {
      fs.mkdirSync(this.storePath);
    }
    this.reading = null;
  }

  set(key, obj) {
    const json = JSON.stringify(obj);
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(this.storePath, `${key}.json`), json, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(json);
        }
      });
    });
  }

  setSync(key, obj) {
    const json = JSON.stringify(obj);
    fs.writeFileSync(path.join(this.storePath, `${key}.json`), json);
  }

  getSync(key) {
    const file = path.join(this.storePath, `${key}.json`);
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '{}');
    }
    let json = fs.readFileSync(file);
    if (!json) {
      json = '{}';
    }
    return JSON.parse(json);
  }

  hasAttribute({
    object,
    key,
    name
  }) {
    let o = null;
    if (object) {
      o = object;
    } else {
      o = this.getSync(key);
    }
    let flag = false;
    const keys = Object.keys(o);
    for (let i = 0; i < keys.length; i += 1) {
      if (name === keys[i]) {
        flag = true;
        break;
      }
    }
    return flag;
  }
}

module.exports = FileSystemJSONStore;
