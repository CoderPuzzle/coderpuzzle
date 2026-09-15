/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
    // +1 for L, -1 for R: every return to zero is one more balanced
    // piece, and cutting at each is the finest valid split.
    let balance = 0;
    let pieces = 0;
    for (const ch of s) {
        balance += ch === "L" ? 1 : -1;
        if (balance === 0) ++pieces;
    }
    return pieces;
};
