/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestPalindromicSubsequence = function (s, k) {
    const dist = (a, b) => {
        const d = Math.abs(a.charCodeAt(0) - b.charCodeAt(0));
        return Math.min(d, 26 - d);
    };

    const n = s.length;
    // dp[i][j][c] = longest palindromic subsequence of s[i..j] using at most c
    // operations.
    const dp = new Array(n);
    for (let i = 0; i < n; i++) {
        const row = new Array(n);
        for (let j = 0; j < n; j++) {
            row[j] = new Array(k + 1).fill(0);
        }
        dp[i] = row;
    }
    for (let i = 0; i < n; i++) {
        for (let c = 0; c <= k; c++) {
            dp[i][i][c] = 1;
        }
    }
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            for (let c = 0; c <= k; c++) {
                let best = dp[i + 1][j][c];
                if (dp[i][j - 1][c] > best) best = dp[i][j - 1][c];
                const d = dist(s[i], s[j]);
                if (d <= c) {
                    const val = dp[i + 1][j - 1][c - d] + 2;
                    if (val > best) best = val;
                }
                dp[i][j][c] = best;
            }
        }
    }
    return dp[0][n - 1][k];
};
