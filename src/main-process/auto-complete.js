const FIELDS = {
  KEYWORDS: 'keywords',
};

/**
 * The storage file - key.json
 * and the storage structure - { fields .... }
 */
const CONSTANTS = {
  NOTE_SEARCH_AUTO: {
    key: 'note',
    fields: FIELDS,
  },
};

class AutoComplete {
  constructor({
    storage,
  }) {
    this.storage = storage;
  }

  getData(key) {
    return this.storage.getSync(key);
  }

  getMatchedKeywords({
    key,
    keyword,
  }) {
    if (!keyword) {
      return [];
    }
    const d = this.getData(key);
    if (d) {
      const keywords = d[FIELDS.KEYWORDS] || [];
      return keywords.filter(k => k.indexOf(keyword) === 0);
    }
    return null;
  }

  saveKeyword({
    key,
    keyword,
  }) {
    keyword = keyword.toLocaleLowerCase();
    const data = this.getData(key);

    if (!Object.prototype.hasOwnProperty.call(data, FIELDS.KEYWORDS)) {
      data[FIELDS.KEYWORDS] = [];
    }

    const keyWords = data[FIELDS.KEYWORDS];
    let isExist = false;
    keyWords.forEach((k) => {
      if (k === keyword) {
        isExist = true;
      }
    });

    if (!isExist) {
      keyWords.push(keyword);
      this.storage.setSync(key, data);
    }
  }

  get CONSTANTS() {
    return CONSTANTS;
  }

}

module.exports = AutoComplete;
