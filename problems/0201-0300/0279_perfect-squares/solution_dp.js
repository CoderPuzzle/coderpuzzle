/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    // The squares i*i up to sqrt(n), precomputed once.
    const squares = [];
    for (let i = 1; i * i <= n; i++) squares.push(i * i);
    // dp[i] = fewest perfect squares summing to i: any decomposition ends
    // with some square s <= i, leaving the subproblem dp[i - s], so
    // dp[i] = 1 + min(dp[i - s]).
    const dp = new Array(n + 1).fill(Infinity);
    // dp[0] = 0 anchors the induction (zero squares sum to zero); Infinity
    // sentinels lose every comparison until a real value lands.
    dp[0] = 0;
    // Filling i in increasing order means every dp[i - s] consulted is
    // already final.
    for (let i = 1; i <= n; i++) {
        for (const s of squares) {
            if (s > i) break;
            if (dp[i - s] + 1 < dp[i]) dp[i] = dp[i - s] + 1;
        }
    }
    return dp[n];
};
