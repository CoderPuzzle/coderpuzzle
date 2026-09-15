/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {boolean}
 */
var isPossibleToRearrange = function (s, t, k) {
    // The rearrangement exists exactly when the two chunk multisets
    // match: any order of t's chunks is reachable, and every piece of s
    // must be consumed whole. Hash-counting makes the comparison a
    // single O(n) pass over the two chunk sequences.
    const size = s.length / k;
    const counts = new Map();
    for (let i = 0; i < k; ++i) {
        const chunk = s.substring(i * size, (i + 1) * size);
        counts.set(chunk, (counts.get(chunk) || 0) + 1);
    }
    for (let i = 0; i < k; ++i) {
        const chunk = t.substring(i * size, (i + 1) * size);
        const left = counts.get(chunk) || 0;
        if (left === 0) return false;
        counts.set(chunk, left - 1);
    }
    return true;
};
