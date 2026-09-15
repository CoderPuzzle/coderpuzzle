/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
    // No interleaving can add or drop letters, so settle the length first.
    const m = s1.length;
    const n = s2.length;
    if (m + n !== s3.length) return false;
    // dp[i][j]: the first i letters of s1 and the first j letters of s2 can
    // interleave into the first i + j letters of s3.
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
    dp[0][0] = true;
    for (let i = 1; i <= m; ++i) {
        dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
    }
    for (let j = 1; j <= n; ++j) {
        dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
    }
    for (let i = 1; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            // The prefix's last letter came from one of the two strings:
            // keep whichever source still has a living reach.
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }
    return dp[m][n];
};
