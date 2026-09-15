/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} waitCost
 * @return {number}
 */
var minCost = function (m, n, waitCost) {
    // Between two consecutive moves a path waits once, on the cell it is
    // leaving — never before the first move or after the last. Totals stay
    // far below 2^53, so Number arithmetic is exact throughout.
    const dp = new Array(n).fill(0);
    // First row: reachable only from the left; entry cost is j + 1.
    dp[0] = 1;
    for (let j = 1; j < n; j++) {
        // The start's departure skips its wait; move 1 is immediate.
        const wait = j === 1 ? 0 : waitCost[0][j - 1];
        dp[j] = dp[j - 1] + wait + (j + 1);
    }
    for (let i = 1; i < m; i++) {
        const prev = dp.slice();
        // First column: reachable only from above.
        dp[0] = prev[0] + (i === 1 ? 0 : waitCost[i - 1][0]) + (i + 1);
        for (let j = 1; j < n; j++) {
            dp[j] = Math.min(prev[j] + waitCost[i - 1][j], dp[j - 1] + waitCost[i][j - 1]) + (i + 1) * (j + 1);
        }
    }
    return dp[n - 1];
};
