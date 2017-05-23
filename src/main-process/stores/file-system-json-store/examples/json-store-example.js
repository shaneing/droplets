const JsonStore = require('../');

const store = new JsonStore({
  storePath: './',
});

const key = 'test.data';


store.setSync(key, {
  keywords: [
    'material',
    'fuck you !!!!',
  ],
});
console.log('has attribute:');
console.log(store.hasAttribute(key, 'keywords'));
console.log('sync save: ');
console.log(store.getSync(key));

store.set(key, {
  keywords: [
    'material',
    'fuck',
  ],
}).then((data) => {
  console.log(`save ${data} already, and next to get data: `);
  console.log(store.getSync(key));
  const d = store.getSync(key);
  console.log(d);
  console.log(d.keywords.filter(k => k.indexOf('m') !== -1));
}).catch((err) => {
  console.log(111);
  console.log(err);
});

