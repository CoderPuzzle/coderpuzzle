/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kInversePairs = function (n, k) {
    // dp[j] counts the arrangements of the numbers placed so far that have
    // exactly j inverse pairs; inserting the new maximum m into any of its
    // m slots adds between 0 and m-1 pairs, so row m at j is the sliding-
    // window sum of row m-1 over [j-m+1, j]. The raw pre-reduction window
    // stays below 3 * (10^9 + 7), which doubles hold exactly — every
    // integer up to 2^53 does.
    const MOD = 1_000_000_007;
    let dp = new Array(k + 1).fill(0);
    let next = new Array(k + 1).fill(0);
    dp[0] = 1;
    for (let m = 2; m <= n; ++m) {
        let window = 0;
        for (let j = 0; j <= k; ++j) {
            window += dp[j];
            if (j >= m) window += MOD - dp[j - m];
            window %= MOD;
            next[j] = window;
        }
        [dp, next] = [next, dp];
    }
    return dp[k];
};
