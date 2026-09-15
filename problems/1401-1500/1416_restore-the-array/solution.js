/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfArrays = function (s, k) {
    const MOD = 1000000007;
    const n = s.length;
    const maxLen = String(k).length;
    const dp = new Array(n + 1).fill(0);
    dp[n] = 1;
    for (let i = n - 1; i >= 0; i--) {
        if (s[i] === "0") {
            continue;
        }
        let total = 0;
        let value = 0;
        const limit = Math.min(maxLen, n - i);
        for (let len = 1; len <= limit; len++) {
            value = value * 10 + (s.charCodeAt(i + len - 1) - 48);
            if (value > k) {
                break;
            }
            total = (total + dp[i + len]) % MOD;
        }
        dp[i] = total;
    }
    return dp[0];
};
