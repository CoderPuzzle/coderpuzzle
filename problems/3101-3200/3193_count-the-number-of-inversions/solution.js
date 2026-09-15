/**
 * @param {number} n
 * @param {number[][]} requirements
 * @return {number}
 */
var numberOfPermutations = function (n, requirements) {
    const MOD = 1000000007;
    const req = new Map();
    let maxCnt = 0;
    for (const [end, cnt] of requirements) {
        req.set(end, cnt);
        if (cnt > maxCnt) maxCnt = cnt;
    }

    // dp[j] = number of permutations of length i with j inversions.
    // Growing length i -> i+1 adds between 0 and i new inversions.
    let dp = new Array(maxCnt + 1).fill(0);
    dp[0] = 1;
    const prefix = new Array(maxCnt + 2).fill(0);
    const ndp = new Array(maxCnt + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        if (i > 1) {
            let s = 0;
            for (let j = 0; j <= maxCnt; j++) {
                s = (s + dp[j]) % MOD;
                prefix[j + 1] = s;
            }
            for (let j = 0; j <= maxCnt; j++) {
                const lo = Math.max(0, j - (i - 1));
                ndp[j] = (prefix[j + 1] - prefix[lo] + MOD) % MOD;
            }
            dp = ndp.slice();
        }
        if (req.has(i - 1)) {
            const c = req.get(i - 1);
            for (let j = 0; j <= maxCnt; j++) {
                if (j !== c) dp[j] = 0;
            }
        }
    }
    return dp[req.get(n - 1)] % MOD;
};
