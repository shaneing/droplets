const fs = require('fs');
const path = require('path');
const readline = require('readline');

const FileSystemUtils = require('../../../utils/file-system-utils');

class FileSystemDataStore {

  constructor({ storePath }) {
    this.storePath = storePath;
    if (!fs.existsSync(storePath)) {
      fs.mkdirSync(this.storePath);
    }
    this.path = path;
    this.readline = readline;
  }

  createReadStream(relPath) {
    return fs.createReadStream(this.getAbsolutePath(relPath));
  }

  exists(relPath) {
    return fs.existsSync(this.getAbsolutePath(relPath));
  }


  mkdir(relPath) {
    return new Promise((resolve, reject) => {
      fs.mkdir(this.getAbsolutePath(relPath), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(relPath);
        }
      });
    });
  }

  rm(relPath) {
    return new Promise((resolve, reject) => {
      fs.unlink(this.getAbsolutePath(relPath), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  rmSync(relPath) {
    return fs.unlinkSync(this.getAbsolutePath(relPath));
  }

  rmdir(relPath) {
    return new Promise((resolve, reject) => {
      fs.rmdir(this.getAbsolutePath(relPath), (err) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  rmdirSync(relPath) {
    return fs.rmdirSync(this.getAbsolutePath(relPath));
  }

  rmdirRecursive(relPath) {
    return new Promise((resolve) => {
      FileSystemUtils.deleteFolderRecursive(this.getAbsolutePath(relPath));
      resolve();
    });
  }

  write(relPath, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.getAbsolutePath(relPath), data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(relPath);
        }
      });
    });
  }

  writeSync(relPath, data) {
    return fs.writeFileSync(this.getAbsolutePath(relPath), data);
  }

  read(relPath) {
    return fs.readFileSync(this.getAbsolutePath(relPath), 'utf-8');
  }

  ls(relPath) {
    return fs.readdirSync(this.getAbsolutePath(relPath));
  }

  stat(relPath) {
    return fs.statSync(this.getAbsolutePath(relPath));
  }

  rename(oldRelPath, newRelPath) {
    return fs.renameSync(this.getAbsolutePath(oldRelPath), this.getAbsolutePath(newRelPath));
  }

  count(relPath) {
    return FileSystemUtils.count({
      searchPath: this.getAbsolutePath(relPath)
    });
  }

  countByRecursive(relPath) {
    return FileSystemUtils.countByRecursive({
      searchPath: this.getAbsolutePath(relPath)
    });
  }

  getAbsolutePath(relPath) {
    if (typeof relPath === 'undefined') {
      return this.storePath;
    }
    return path.join(this.storePath, relPath);
  }
}

module.exports = FileSystemDataStore;
