/**
 * @param {string} s1
 * @param {string} s2
 * @param {number} x
 * @return {number}
 */
var minOperations = function (s1, s2, x) {
    // Only mismatched positions need a net flip, and both operations flip
    // exactly two positions, so an odd mismatch count is impossible.
    const diffs = [];
    for (let i = 0; i < s1.length; ++i) {
        if (s1[i] !== s2[i]) diffs.push(i);
    }
    const m = diffs.length;
    if (m % 2 === 1) return -1;
    const INF = 1e15;
    // pending[i][c]: mismatches before i are resolved, mismatch i is not,
    // and c = 1 when an already-paid x-op covers one future mismatch for
    // free. The credit may stay open across other pairs — nesting an
    // x-pair around an adjacent chain is exactly what beats pairing
    // consecutive mismatches when x is small.
    const pending = Array.from({ length: m + 1 }, () => [INF, INF]);
    pending[0][0] = 0;
    for (let i = 0; i < m; ++i) {
        const free = pending[i][0];
        const credited = pending[i][1];
        // Close a credit: mismatch i flips free with the earlier partner.
        if (credited < pending[i + 1][0]) pending[i + 1][0] = credited;
        // Open a credit: pay x, mismatch i pairs with a later mismatch.
        if (free + x < pending[i + 1][1]) pending[i + 1][1] = free + x;
        if (i + 2 <= m) {
            const pair = Math.min(x, diffs[i + 1] - diffs[i]);
            if (free + pair < pending[i + 2][0]) {
                pending[i + 2][0] = free + pair;
            }
            if (credited + pair < pending[i + 2][1]) {
                pending[i + 2][1] = credited + pair;
            }
        }
    }
    return pending[m][0];
};
