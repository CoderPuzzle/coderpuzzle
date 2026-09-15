/**
 * @param {string} s
 * @return {number}
 */
var firstMatchingIndex = function (s) {
    // The smallest matching index can never sit past the middle: once i
    // exceeds n-1-i the pair is a repeat of one already tested. Scan the
    // outward-in pairs from index 0 and return the first equal one.
    const n = s.length;
    for (let i = 0; i < (n + 1) >> 1; i++) {
        if (s[i] === s[n - 1 - i]) return i;
    }
    return -1;
};
