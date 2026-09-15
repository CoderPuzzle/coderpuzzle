/**
 * @param {number[]} nums
 * @return {number}
 */
var subsequencePairCount = function (nums) {
    const MOD = 1000000007;
    const gcd = (a, b) => {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };
    // dp[g1][g2] = ways to split the processed prefix into a sequence with
    // gcd g1 and a sequence with gcd g2 (gcd 0 denotes an empty sequence).
    const maxVal = 200;
    let dp = Array.from({ length: maxVal + 1 }, () => new Array(maxVal + 1).fill(0));
    dp[0][0] = 1;
    for (const x of nums) {
        const ndp = dp.map((row) => row.slice());
        for (let g1 = 0; g1 <= maxVal; g1++) {
            const row = dp[g1];
            for (let g2 = 0; g2 <= maxVal; g2++) {
                const cur = row[g2];
                if (cur === 0) continue;
                const ng1 = gcd(g1, x);
                ndp[ng1][g2] = (ndp[ng1][g2] + cur) % MOD;
                const ng2 = gcd(g2, x);
                ndp[g1][ng2] = (ndp[g1][ng2] + cur) % MOD;
            }
        }
        dp = ndp;
    }

    let total = 0;
    for (let g = 1; g <= maxVal; g++) {
        total = (total + dp[g][g]) % MOD;
    }
    return total;
};
