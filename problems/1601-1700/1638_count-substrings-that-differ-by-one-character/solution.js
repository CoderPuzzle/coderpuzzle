/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var countSubstrings = function (s, t) {
    // same[j] = length of the exact-match run ending at s[i-1], t[j-1].
    // diff[j] = length of the run ending there with exactly one mismatch,
    // counted directly: the mismatch count along a fixed pair of starts is
    // monotone non-decreasing, so this length is exact.
    const n = s.length;
    const m = t.length;
    let samePrev = new Array(m + 1).fill(0);
    let diffPrev = new Array(m + 1).fill(0);
    let total = 0;
    for (let i = 1; i <= n; i++) {
        const sameCurr = new Array(m + 1).fill(0);
        const diffCurr = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (s[i - 1] === t[j - 1]) {
                // A matching pair of last characters carries the diagonal
                // counts forward unchanged.
                sameCurr[j] = samePrev[j - 1] + 1;
                diffCurr[j] = diffPrev[j - 1];
            } else {
                // This position is the single mismatch, so it can only
                // extend back through a run that matched perfectly.
                sameCurr[j] = 0;
                diffCurr[j] = samePrev[j - 1] + 1;
            }
            total += diffCurr[j];
        }
        samePrev = sameCurr;
        diffPrev = diffCurr;
    }
    return total;
};
