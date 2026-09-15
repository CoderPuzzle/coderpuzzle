/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var findPermutationDifference = function (s, t) {
    // Every character occurs exactly once in each string, so its share
    // of the sum is fixed by the two positions alone: one pass records
    // where each letter sits in s, and one pass over t reduces every
    // term to a lookup plus an absolute difference.
    const pos = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        pos[s.charCodeAt(i) - 97] = i;
    }
    let total = 0;
    for (let i = 0; i < t.length; i++) {
        total += Math.abs(i - pos[t.charCodeAt(i) - 97]);
    }
    return total;
};
