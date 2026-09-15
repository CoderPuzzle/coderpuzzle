/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
    // Feasibility of a fixed length: does any window of exactly L symbols
    // carry at most k distinct ones? One sweep maintains the multiplicities
    // of the current window, sliding its left edge out one step behind its
    // right edge.
    const feasible = (length) => {
        if (length === 0) {
            return true;
        }
        const counts = new Map();
        let distinct = 0;
        for (let i = 0; i < s.length; i++) {
            const incoming = s[i];
            const seen = (counts.get(incoming) || 0) + 1;
            counts.set(incoming, seen);
            if (seen === 1) {
                distinct++;
            }
            if (i >= length) {
                const outgoing = s[i - length];
                const left = counts.get(outgoing) - 1;
                counts.set(outgoing, left);
                if (left === 0) {
                    distinct--;
                }
            }
            if (i >= length - 1 && distinct <= k) {
                return true;
            }
        }
        return false;
    };
    // A substring of a valid window is valid too, so feasibility is
    // monotone in the length — binary search for the longest feasible.
    let lo = 0,
        hi = s.length;
    while (lo < hi) {
        const mid = lo + ((hi - lo + 1) >> 1);
        if (feasible(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
};
