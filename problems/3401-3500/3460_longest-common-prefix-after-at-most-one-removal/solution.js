/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var longestCommonPrefix = function (s, t) {
    const n = s.length;
    const m = t.length;
    // Walk to the first mismatch (or whichever string ends first).
    let i = 0;
    while (i < n && i < m && s[i] === t[i]) {
        ++i;
    }
    // Removing s[i] is the only deletion worth trying: an earlier one
    // shifts the alignment for no gain, a later one cannot repair the
    // mismatch at i.
    let j = i + 1;
    let k = i;
    while (j < n && k < m && s[j] === t[k]) {
        ++j;
        ++k;
    }
    return k;
};
