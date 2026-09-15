/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumPartition = function (s, k) {
    // Greedy from the left: extend the current piece while its value stays
    // <= k, since splitting as late as possible is optimal. The tentative
    // value is at most k * 10 + 9 <= 10^10 < 2^53, so Number stays exact.
    let pieces = 1;
    let value = 0;
    for (let i = 0; i < s.length; ++i) {
        const digit = s.charCodeAt(i) - 48;
        const candidate = value * 10 + digit;
        if (candidate <= k) {
            value = candidate;
        } else {
            // This digit must open a new piece; fail if it cannot stand
            // alone either.
            if (digit > k) return -1;
            ++pieces;
            value = digit;
        }
    }
    return pieces;
};
