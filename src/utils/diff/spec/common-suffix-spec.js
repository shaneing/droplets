const commonSuffix = require('../lib/common-suffix');

describe('commonSuffix(text1, text2)', () => {
  it('computing common suffix', () => {
    const text1 = 'touch dog';
    const text2 = 'see dog';
    const mid = commonSuffix(text1, text2);
    expect(text1.substring(text1.length - mid, text1.length)).toEqual(' dog');
    expect(text2.substring(text2.length - mid, text2.length)).toEqual(' dog');
  });
});