const commonPrefix = (text1, text2) => {
  if (!text1 || !text2 || text1.charCodeAt(0) !== text2.charCodeAt(0)) {
    return 0;
  }

  let left = 0;
  let right = Math.min(text1.length, text2.length);
  let mid = right;
  let start = 0;
  while (left < mid) {
    if (text1.substring(start, mid) === text2.substring(start, mid)) {
      left = mid;
      start = left;
    } else {
      right = mid;
    }
    mid = Math.floor(((right - left) / 2) + left);
  }

  return mid;
};

module.exports = commonPrefix;
