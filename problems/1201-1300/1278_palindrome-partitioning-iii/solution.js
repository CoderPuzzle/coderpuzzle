/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var palindromePartition = function (s, k) {
    const n = s.length;
    // cost[i][j] = min changes to make s[i..j] a palindrome
    const cost = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let len = 2; len <= n; ++len) {
        for (let i = 0; i + len <= n; ++i) {
            const j = i + len - 1;
            // each mismatched outer pair costs one change; the
            // interior cost is already known (lengths grow)
            cost[i][j] = cost[i + 1][j - 1] + (s[i] === s[j] ? 0 : 1);
        }
    }
    // dp[c][i] = min changes to split prefix of length i into c parts
    const INF = (n >> 1) + 1; // any interval costs at most n / 2
    const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(INF));
    for (let i = 1; i <= n; ++i) {
        dp[1][i] = cost[0][i - 1];
    }
    for (let c = 2; c <= k; ++c) {
        // i starts at c: c non-empty parts need at least c characters
        for (let i = c; i <= n; ++i) {
            let best = INF;
            // the last part is s[j..i-1] — try every left boundary
            for (let j = c - 1; j < i; ++j) {
                const cand = dp[c - 1][j] + cost[j][i - 1];
                if (cand < best) {
                    best = cand;
                }
            }
            dp[c][i] = best;
        }
    }
    return dp[k][n];
};
