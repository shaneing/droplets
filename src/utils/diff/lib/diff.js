const commonPrefix = require('./common-prefix');
const commonSuffix = require('./common-suffix');

const DIFF_INSERT = '+';
const DIFF_DELETE = '-';
const DIFF_EQUAL = '=';

const compute = (text1, text2, checklines) => {
  if (text1.length === 0) {
    return [[DIFF_INSERT, text2]];
  }

  if (text2.length === 0) {
    return [[DIFF_DELETE], text1];
  }

  const longText = text1.length > text2.length ? text1 : text2;
  const shortText = text1.length > text2.length ? text2 : text1;
  const index = longText.indexOf(shortText);
  if (index !== -1) {
    const diffs = [
      [DIFF_INSERT, longText.substring(0, index)],
      [DIFF_EQUAL, shortText],
      [DIFF_INSERT, longText.substring(index + shortText.length)],
    ];

    if (text1.length > text2.length) {
      diffs[0][0] = DIFF_DELETE;
      diffs[2][0] = DIFF_DELETE;
    }

    return diffs;
  }

  const hm = halfMatch(text1, text2);
  if (hm) {
    const text1A = hm[0];
    const text1B = hm[1];
    const text2A = hm[2];
    const text2B = hm[3];
    const midCommon = hm[4];

    const diffsA = diff(text1A, text2A);
    const diffsB = diff(text1B, text2B);

    return diffsA.concat([[DIFF_EQUAL, midCommon]], diffsB);
  }

  if (checklines && text1.length > 100 && text2.length > 100) {
    return diffLineMode(text1, text2);
  }

  return diffBisect(text1, text2);

};

const diffBisect = (text1, text2) => {

};

const diffLineMode = (text1, text2) => {


};

const halfMatch = (text1, text2) => {
  const longText = text1.length > text2.length ? text1 : text2;
  const shortText = text1.length > text2.length ? text2 : text1;

  if (longText.length < 10 || shortText.length < 1) {
    return null;
  }

  const hm1 = halfMatchI(longText, shortText, Math.ceil(longText.length / 4));
  const hm2 = halfMatchI(longText, shortText, Math.ceil(longText.length / 2));

  let hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  let text1A;
  let text1B;
  let text2A;
  let text2B;
  if (text1.length > text2.length) {
    text1A = hm[0];
    text1B = hm[1];
    text2A = hm[2];
    text2B = hm[3];
  } else {
    text2A = hm[0];
    text2B = hm[1];
    text1A = hm[2];
    text1B = hm[3];
  }

  const midCommon = hm[4];

  return [
    text1A,
    text1B,
    text2A,
    text2B,
    midCommon,
  ];
};

const halfMatchI = (longText, shortText, i) => {
  const seed = longText.substring(i, i + Math.floor(longText.length / 4));
  let bestCommon = '';
  let bestLongTextA = '';
  let bestLongTextB = '';
  let bestShortTextA = '';
  let bestShortTextB = '';
  let j = shortText.indexOf(seed);
  while (j !== -1) {
    const prefixLength = commonPrefix(
      longText.substring(i),
      shortText.substring(j),
    );
    const suffixLength = commonSuffix(
      longText.substring(0, i),
      shortText.substring(0, j),
    );

    if (bestCommon.length < suffixLength + prefixLength) {
      bestCommon = shortText.substring(j - suffixLength, j)
        + shortText.substring(j, j + prefixLength);
      bestLongTextA = longText.substring(0, i - suffixLength);
      bestLongTextB = longText.substring(i + prefixLength);
      bestShortTextA = shortText.substring(0, j - suffixLength);
      bestShortTextB = shortText.substring(j + prefixLength);
    }
    j = shortText.indexOf(seed, j + 1);
  }
  if (bestCommon.length >= longText.length / 2) {
    return [
      bestLongTextA,
      bestLongTextB,
      bestShortTextA,
      bestShortTextB,
      bestCommon,
    ];
  } 
  return null;
};


const diff = (text1, text2, checklines) => {
  if (text1 === text2) {
    return null;
  }

  const commonPrefixLength = commonPrefix(text1, text2);
  const commonPrefix = text1.substring(0, commonPrefixLength);
  text1 = text1.substring(commonPrefixLength);
  text2 = text2.substring(commonPrefixLength);

  const commonSuffixLength = commonSuffix(text1, text2);
  const commonSuffix = text1.substring(text1.length - commonSuffixLength);
  text1 = text1.substring(0, text1.length - commonSuffixLength);
  text2 = text2.substring(0, text2.length - commonSuffixLength);

  const diffs = compute(text1, text2);

};

