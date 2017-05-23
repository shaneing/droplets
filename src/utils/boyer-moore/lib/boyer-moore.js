class BoyerMoore {

  constructor({
    pattern = '',
  }) {
    this.pattern = pattern;
    this.table = createMap(pattern);
  }

  indexOf(t = '') {
    const m = t.length;
    const n = this.pattern.length;

    if (n === 0) {
      return 0;
    }

    for (let i = n - 1; i < m;) {
      let j;
      for (j = n - 1;
           t[i].toLocaleLowerCase() === this.pattern[j].toLocaleLowerCase();
           i -= 1, j -= 1
      ) {
        if (j === 0) {
          return i;
        }
      }
      const array = this.table.get(t[i].toLocaleLowerCase());
      if (!array) {
        i += n;
      } else {
        // i += array[j];
        i += array[j] === -1 ? (n - j) : ((n - 1 - j) + array[j]);
      }
    }

    return -1;
  }

  toObject() {
    const obj = {};
    this.table.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
}

/**
 * the bad character rule
 */
const createMap = (p) => {
  const map = new Map();
  for (let i = 0; i < p.length; i += 1) {
    if (!map.has(p[i].toLocaleLowerCase())) {
      const key = p[i].toLocaleLowerCase();
      const array = [];
      for (let j = 0; j < p.length; j += 1) {
        // array[j] = p.length - j;
        array[j] = -1;
        if (key !== p[j].toLocaleLowerCase()) {
          for (let k = j - 1; k >= 0; k -= 1) {
            if (key === p[k].toLocaleLowerCase()) {
              // array[j] = p.length - 1 - k;
              array[j] = j - k;
              break;
            }
          }
        }
      }
      map.set(key, array);
    }
  }
  return map;
};

module.exports = BoyerMoore;
