/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var numOfArrays = function (n, m, k) {
    const MOD = 1000000007;
    if (k <= 0 || k > n || k > m) {
        return 0;
    }
    let dp = Array.from({ length: k + 1 }, () => new Array(m + 1).fill(0));
    for (let j = 1; j <= m; j++) {
        dp[1][j] = 1;
    }
    for (let step = 2; step <= n; step++) {
        const ndp = Array.from({ length: k + 1 }, () => new Array(m + 1).fill(0));
        for (let c = 1; c <= k; c++) {
            const prev = dp[c - 1];
            const pref = new Array(m + 1).fill(0);
            for (let j = 1; j <= m; j++) {
                pref[j] = (pref[j - 1] + prev[j]) % MOD;
            }
            const cur = dp[c];
            const row = ndp[c];
            for (let j = 1; j <= m; j++) {
                row[j] = (cur[j] * j + pref[j - 1]) % MOD;
            }
        }
        dp = ndp;
    }
    let total = 0;
    for (let j = 1; j <= m; j++) {
        total = (total + dp[k][j]) % MOD;
    }
    return total;
};
