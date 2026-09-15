/**
 * @param {string} s
 * @param {number} k
 * @param {number} minLength
 * @return {number}
 */
var beautifulPartitions = function (s, k, minLength) {
    const MOD = 1000000007;
    const isP = (c) => c === "2" || c === "3" || c === "5" || c === "7";
    const n = s.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0));
    dp[0][0] = 1;
    for (let j = 1; j <= k; j++) {
        const prefix = new Array(n + 1).fill(0);
        for (let x = 0; x < n; x++) {
            prefix[x + 1] = prefix[x];
            if (isP(s[x])) {
                prefix[x + 1] += dp[x][j - 1];
            }
        }
        for (let i = 1; i <= n; i++) {
            if (isP(s[i - 1])) {
                continue;
            }
            const hi = i - minLength;
            if (hi >= 0) {
                dp[i][j] = prefix[hi + 1] % MOD;
            }
        }
    }
    return dp[n][k] % MOD;
};
