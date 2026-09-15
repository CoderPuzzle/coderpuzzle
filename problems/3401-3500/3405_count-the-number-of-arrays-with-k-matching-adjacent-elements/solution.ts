function countGoodArrays(n: number, m: number, k: number): number {
    const MOD = 1000000007;
    // answer = m * C(n-1, k) * (m-1)^(n-1-k)  (mod 1e9+7)
    const fact: number[] = new Array(n + 1);
    fact[0] = 1;
    for (let i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * i) % MOD; // fact < MOD ~1e9, i <= 1e5 -> exact
    }
    const powmod = (base: number, exp: number, mod: number): number => {
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
    const mulmod = (a: number, b: number): number => Number((BigInt(a) * BigInt(b)) % BigInt(MOD));
    const inv_fact: number[] = new Array(n + 1);
    inv_fact[n] = powmod(fact[n], MOD - 2, MOD);
    for (let i = n; i >= 1; i--) {
        inv_fact[i - 1] = (inv_fact[i] * i) % MOD; // exact for same reason
    }

    const comb = (a: number, b: number): number => {
        if (b < 0 || b > a) return 0;
        return mulmod(mulmod(fact[a], inv_fact[b]), inv_fact[a - b]);
    };

    return mulmod(mulmod(m % MOD, comb(n - 1, k)), powmod(m - 1, n - 1 - k, MOD));
}
