const commonSuffix = (text1, text2) => {
  if (!text1 || !text2 || text1.charCodeAt(text1.length - 1) !==
    text2.charCodeAt(text2.length - 1)) {
    return 0;
  }

  let left = 0;
  let right = Math.min(text1.length, text2.length);
  let mid = right;
  let start = 0;
  while (left < mid) {
    if (text1.substring(text1.length - mid, text1.length - start) ===
      text2.substring(text2.length - mid, text2.length - start)) {
      left = mid;
      start = left;
    } else {
      right = mid;
    }
    mid = Math.floor(((right - left) / 2) + left);
  }

  return mid;
};

module.exports = commonSuffix;
