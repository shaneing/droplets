const BoyerMoore = require('../');

const p = new BoyerMoore({
  pattern: 'NNAAMAN'
});

console.log(JSON.stringify(p.toObject()));

const t = 'NNAPMANNNANMANNNAAMAN';
console.log(p.indexOf(t));
console.log(t.substring(p.indexOf(t)));
