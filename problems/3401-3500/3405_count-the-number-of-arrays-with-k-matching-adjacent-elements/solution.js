/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var countGoodArrays = function (n, m, k) {
    const MOD = 1000000007;
    // answer = m * C(n-1, k) * (m-1)^(n-1-k)  (mod 1e9+7)
    const fact = new Array(n + 1);
    fact[0] = 1;
    for (let i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * i) % MOD; // fact < MOD ~1e9, i <= 1e5 -> exact
    }
    const powmod = (base, exp, mod) => {
        let result = 1n;
        let b = BigInt(base);
        let e = BigInt(exp);
        const M = BigInt(mod);
        while (e > 0n) {
            if (e & 1n) result = (result * b) % M;
            b = (b * b) % M;
            e >>= 1n;
        }
        return Number(result);
    };
    const mulmod = (a, b) => Number((BigInt(a) * BigInt(b)) % BigInt(MOD));
    const inv_fact = new Array(n + 1);
    inv_fact[n] = powmod(fact[n], MOD - 2, MOD);
    for (let i = n; i >= 1; i--) {
        inv_fact[i - 1] = (inv_fact[i] * i) % MOD; // exact for same reason
    }

    const comb = (a, b) => {
        if (b < 0 || b > a) return 0;
        return mulmod(mulmod(fact[a], inv_fact[b]), inv_fact[a - b]);
    };

    return mulmod(mulmod(m % MOD, comb(n - 1, k)), powmod(m - 1, n - 1 - k, MOD));
};
