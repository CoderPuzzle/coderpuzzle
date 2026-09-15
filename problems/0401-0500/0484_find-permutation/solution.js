/**
 * @param {string} s
 * @return {number[]}
 */
var findPermutation = function (s) {
    // Ascending 1..n+1 is the lexicographically smallest arrangement of
    // the values, and it already satisfies every 'I' — so disturb it only
    // where a maximal run of 'D's demands a descent, by reversing exactly
    // the block that run covers.
    const n = s.length;
    const perm = [];
    for (let i = 0; i <= n; ++i) {
        perm.push(i + 1);
    }
    let i = 0;
    while (i < n) {
        if (s[i] === "D") {
            const start = i;
            while (i < n && s[i] === "D") {
                ++i;
            }
            for (let lo = start, hi = i; lo < hi; ++lo, --hi) {
                const tmp = perm[lo];
                perm[lo] = perm[hi];
                perm[hi] = tmp;
            }
        } else {
            ++i;
        }
    }
    return perm;
};
