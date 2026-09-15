/**
 * @param {string} s
 * @return {number}
 */
var countGoodSubstrings = function (s) {
    // A length-3 window is good iff its three characters are pairwise
    // distinct; slide the center and count.
    let count = 0;
    for (let i = 1; i + 1 < s.length; i++) {
        if (s[i - 1] !== s[i] && s[i] !== s[i + 1] && s[i - 1] !== s[i + 1]) {
            count++;
        }
    }
    return count;
};
