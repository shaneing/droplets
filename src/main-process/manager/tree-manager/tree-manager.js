const Queue = require('../../../utils/queue');


class TreeManager {

  constructor({
    fileSystemDataStore,
  }) {
    this.dataStore = fileSystemDataStore;
  }

  generateTree() {
    return generateTree(this.dataStore);
  }

  addCount(tree, path, count) {
    const keys = Object.keys(tree);
    for (let i = 0; i < keys.length; i += 1) {
      const node = tree[keys[i]];
      if (node.path === path) {
        node.count += count;
        break;
      }
    }
    combineCount(tree, tree[0]);
    return tree;
  }

  refreshCount(tree) {
    combineCount(tree, tree[0]);
    return tree;
  }
}

const initTree = () => ({
  0: {
    id: 0,
    name: '',
    selected: false,
    expanded: false,
    path: '',
    count: 0,
    totalCount: 0,
    childIds: [],
  },
});

const generateTree = (dataStore) => {
  const tree = initTree();

  let count = 0;
  const queue = new Queue();
  queue.offer(tree[0]);
  while (!queue.empty()) {
    const node = queue.poll();
    const results = dataStore.ls(node.path);
    for (let i = 0; i < results.length; i += 1) {
      const result = dataStore.path.join(node.path, results[i]);
      if (dataStore.stat(result).isDirectory()) {
        count += 1;
        const child = {
          id: count,
          name: dataStore.path.basename(result),
          selected: false,
          expanded: false,
          path: result,
          isRoot: node.id === 0,
          totalCount: 0,
          count: dataStore.count(result),
          childIds: [],
        };
        tree[count] = child;
        node.childIds.push(count);
        queue.offer(child);
      }
    }
  }
  combineCount(tree, tree[0]);
  return tree;
};

const combineCount = (tree, node) => {
  node.totalCount = 0;
  for (let i = 0; i < node.childIds.length; i += 1) {
    node.totalCount += combineCount(tree, tree[node.childIds[i]]);
  }

  if (node.childIds.length === 0) {
    return node.count;
  }

  return node.totalCount + node.count;
};


module.exports = TreeManager;
