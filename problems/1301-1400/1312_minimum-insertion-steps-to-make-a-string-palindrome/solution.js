/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            if (s[i] === s[j]) {
                dp[i][j] = length > 2 ? dp[i + 1][j - 1] : 0;
            } else {
                dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    return n === 0 ? 0 : dp[0][n - 1];
};
