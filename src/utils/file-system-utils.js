const fs = require('fs');
const p = require('path');
const BoyerMoore = require('./boyer-moore/index');

class FileSystemUtils {

  static find({ searchPath = '.', pattern = new RegExp() }) {
    const results = [];
    const stack = [];
    stack.push(searchPath);
    while (stack.length > 0) {
      searchPath = stack.pop();
      fs.readdirSync(searchPath).forEach((result) => {
        result = p.join(searchPath, result);
        if (pattern.test(result)) {
          results.push(result);
        }
        if (fs.statSync(result).isDirectory()) {
          stack.push(result);
        }
      });
    }
    return results;
  }

  static stringSearch({
    searchPath = '.',
    keyword = '',
  }) {
    const pattern = new BoyerMoore({
      pattern: keyword,
    });

    const results = [];
    const stack = [];
    stack.push(searchPath);
    while (stack.length > 0) {
      searchPath = stack.pop();
      fs.readdirSync(searchPath).forEach((result) => {
        result = p.join(searchPath, result);
        if (fs.statSync(result).isFile()) {
          const text = fs.readFileSync(result, 'utf-8');
          if (pattern.indexOf(text) !== -1) {
            results.push(result);
          }
        } else if (fs.statSync(result).isDirectory()) {
          stack.push(result);
        }
      });
    }
    return results;
  }

  static countByRecursive({ searchPath = '.'}) {
    let cnt = 0;
    const stack = [];
    stack.push(searchPath);
    while (stack.length > 0) {
      searchPath = stack.pop();
      const results = fs.readdirSync(searchPath);
      for (let i = 0; i < results.length; i += 1) {
        const result = p.join(searchPath, results[i]);
        if (fs.statSync(result).isFile()) {
          cnt += 1;
        } else if (fs.statSync(result).isDirectory()) {
          stack.push(result);
        }
      }
    }
    return cnt;
  }

  static count({ searchPath = '.'}) {
    let cnt = 0;
    const results = fs.readdirSync(searchPath);
    for (let i = 0; i < results.length; i += 1) {
      const result = p.join(searchPath, results[i]);
      if (fs.statSync(result).isFile()) {
        cnt += 1;
      }
    }
    return cnt;
  }

  static deleteFolderRecursive(path) {
    let files = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach((file) => {
        const curPath = p.join(path, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          this.deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
}

module.exports = FileSystemUtils;
