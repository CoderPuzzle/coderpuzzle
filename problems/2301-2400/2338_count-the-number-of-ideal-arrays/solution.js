/**
 * @param {number} n
 * @param {number} maxValue
 * @return {number}
 */
var idealArrays = function (n, maxValue) {
    const MOD = 1000000007;
    const mulmod = (a, b) => {
        let r = 0;
        a %= MOD;
        b %= MOD;
        while (b > 0) {
            if (b % 2 === 1) {
                r += a;
                if (r >= MOD) r -= MOD;
            }
            a += a;
            if (a >= MOD) a -= MOD;
            b = Math.floor(b / 2);
        }
        return r;
    };
    const powmod = (base, exp) => {
        let r = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp % 2 === 1) r = mulmod(r, base);
            base = mulmod(base, base);
            exp = Math.floor(exp / 2);
        }
        return r;
    };

    // dp[v] = number of chains of the current length ending at value v
    let dp = new Array(maxValue + 1).fill(1);
    dp[0] = 0;
    let comb = 1; // C(n-1, 0)
    let ans = 0;
    for (let chainLen = 1; chainLen <= n; chainLen++) {
        let total = 0;
        for (const x of dp) total = (total + x) % MOD;
        ans = (ans + mulmod(total, comb)) % MOD;
        if (chainLen === n) break;
        // C(n-1, chainLen) = C(n-1, chainLen-1) * (n - chainLen) / chainLen
        comb = (comb * (n - chainLen)) % MOD;
        comb = mulmod(comb, powmod(chainLen, MOD - 2));
        const ndp = new Array(maxValue + 1).fill(0);
        for (let v = 1; v <= maxValue; v++) {
            const cv = dp[v];
            if (cv === 0) continue;
            for (let m = v + v; m <= maxValue; m += v) {
                ndp[m] = (ndp[m] + cv) % MOD;
            }
        }
        dp = ndp;
        let s = 0;
        for (const x of dp) s += x;
        if (s === 0) break;
    }
    return ans % MOD;
};
