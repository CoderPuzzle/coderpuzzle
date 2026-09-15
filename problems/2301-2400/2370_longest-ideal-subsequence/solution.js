/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestIdealString = function (s, k) {
    // best[c] = longest ideal subsequence so far ending with letter c.
    // Each character extends the best chain among letters within +/-k;
    // the window is at most 51 wide, so each step is constant time.
    const best = new Array(26).fill(0);
    for (const ch of s) {
        const c = ch.charCodeAt(0) - 97;
        const lo = Math.max(0, c - k);
        const hi = Math.min(25, c + k);
        let candidate = 0;
        for (let d = lo; d <= hi; ++d) {
            candidate = Math.max(candidate, best[d]);
        }
        if (candidate + 1 > best[c]) {
            best[c] = candidate + 1;
        }
    }
    return Math.max(...best);
};
