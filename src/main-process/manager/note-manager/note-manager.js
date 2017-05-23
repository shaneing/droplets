const moment = require('moment');
const fsUtils = require('../../../utils/file-system-utils');
const p = require('path');
const fs = require('fs');

const META_FLAG = '---';
const REGEXP_TITLE = new RegExp('^title');
const REGEXP_DATE = new RegExp('^date');
const REGEXP_TAGS = new RegExp('^tags');
const REGEXP_AUTHOR = new RegExp('^author');

const STATUS = {
  DOWNLOAD: 1,
  UPLOAD: 2,
  OFF: 3,
  DONE: 4,
};


const STATE_KEY = 'note';
const FIELDS = {
  VERSION: 'version',
  NOTES: 'notes',
};

let dataStore;
let user;
let stateStore;

class NoteManager {
  constructor({
    fileSystemDataStore,
    userManager,
    fileSystemJsonStore,
  }) {
    dataStore = fileSystemDataStore;
    user = userManager;
    stateStore = fileSystemJsonStore;
  }

  search({
    searchPath = 'Note',
    keyword = '',
  }) {
    searchPath = dataStore.getAbsolutePath(searchPath);
    return new Promise((resolve, reject) => {
      const results = fsUtils.stringSearch({
        searchPath,
        keyword,
      });
      const notes = [];
      results.forEach((result, index) => {
        const meta = generateMeta(result.substring(result.indexOf('Note')), index, dataStore.path.basename(result));
        notes.push(meta);
      });
      if (results.length > 0) {
        resolve(notes);
      } else {
        reject(notes);
      }
    });
  }

  listNotes(path) {
    return new Promise((resolve, reject) => {
      if (path) {
        const notes = [];
        const results = dataStore.ls(path);
        results.forEach((result, index) => {
          if (dataStore.stat(dataStore.path.join(path, result)).isFile()) {
            const note = generateMeta(dataStore.path.join(path, result), index, result);
            notes.push(note);
          }
        });
        if (results.length > 0) {
          resolve(notes);
        } else {
          reject(notes);
        }
      }
    });
  }

  createNote(path, title) {
    return new Promise((resolve) => {
      if (path) {
        dataStore.writeSync(p.join(path, `${title}.md`), generateTemplate({title}));
        resolve();
      }
    });
  }

  persist({
    path,
    version,
    status,
  }) {
    const state = getState() || {};
    if (!Object.prototype.hasOwnProperty.call(state, FIELDS.NOTES)) {
      state[FIELDS.NOTES] = {};
    }
    const notes = state[FIELDS.NOTES];
    notes[path] = {
      version,
      status,
    };
    stateStore.setSync(STATE_KEY, state);
  }

  sync() {

  }

}

const generateTemplate = ({
  title,
}) => '' +
    '---\n' +
    `title: ${title}\n` +
    `date: ${moment().format('YYYY-MM-DD HH:mm:ss')}\n` +
    'tags: \n' +
    'author: \n' +
    '---\n';


/**
 * key:value
 */
const getValue = entity => entity.substring(entity.indexOf(':') + 1).trim();

const getState = () => stateStore.getSync(STATE_KEY);

// const getVersion = () => {
//   const state = getState();
//   if (Object.prototype.hasOwnProperty.call(state, FIELDS.VERSION)) {
//     return state[FIELDS.VERSION];
//   }
//   return null;
// };

const getNotes = () => {
  const state = getState();
  if (Object.prototype.hasOwnProperty.call(state, FIELDS.NOTES)) {
    return state[FIELDS.NOTES];
  }
  return null;
};

const getStatus = (relPath) => {
  if (user) {
    if (!user.currentUser) {
      return STATUS.OFF;
    }
    const notes = getNotes();
    if (notes) {
      if (!Object.prototype.hasOwnProperty.call(notes, relPath)) {
        return STATUS.UPLOAD;
      }
      if (Object.prototype.hasOwnProperty.call(notes, relPath)) {
        return notes[relPath].status;
      }
    }
    return STATUS.UPLOAD;
  }
  return STATUS.OFF;
};

const generateMeta = (relPath, id, name) => {
  const meta = {};
  meta.path = relPath;
  meta.selected = false;
  meta.id = id;
  meta.title = name;
  meta.author = '';
  meta.tags = [];
  meta.date = '';
  meta.status = getStatus();

  const rl = dataStore.readline.createInterface({
    input: dataStore.createReadStream(relPath),
  });
  let flag = 2;
  let count = 10;
  rl.on('line', (line) => {
    count -= 1;
    if (flag === 0 || count === 0) {
      rl.close();
    }

    if (line === META_FLAG) {
      flag -= 1;
    } else if (count > 0) {
      if (REGEXP_TITLE.test(line)) {
        meta.title = getValue(line);
      } else if (REGEXP_DATE.test(line)) {
        meta.date = getValue(line);
        if (meta.date === '') {
          fs.statSync(dataStore.getAbsolutePath(relPath), (err, stats) => {
            meta.date = stats.ctime;
          });
        }
      } else if (REGEXP_TAGS.test(line)) {
        meta.tags = getValue(line).split(' ').filter(tag => tag.length !== 0);
      } else if (REGEXP_AUTHOR.test(line)) {
        meta.author = getValue(line);
      }
    }
  });
  return meta;
};


module.exports = NoteManager;
