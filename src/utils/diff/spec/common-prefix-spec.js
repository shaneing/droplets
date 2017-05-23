const commonPrefix = require('../lib/common-prefix');

describe('commonPrefix(text1, text2)', () => {
  it('computing common prefix', () => {
    const text1 = 'the tiger';
    const text2 = 'the cat';
    const mid = commonPrefix(text1, text2);
    expect(text1.substring(0, mid)).toEqual('the ');
    expect(text2.substring(0, mid)).toEqual('the ');
  });
});