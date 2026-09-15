/**
 * @param {string} s
 * @return {number}
 */
var countGoodSubsequences = function (s) {
    // A good subsequence is generated exactly once by its shared
    // frequency m: each letter either sits out or contributes C(count, m)
    // index choices, so every per-m product counts one term of the answer
    // - plus the all-absent pick that surfaces in every product and is
    // dropped once per term. Modular products of two ~2^30 residues
    // exceed 2^53, so every multiply runs in BigInt; the final residue
    // fits a plain number.
    const MOD = 1000000007n;
    const modPow = (base, exp) => {
        let result = 1n;
        base %= MOD;
        while (exp > 0n) {
            if (exp & 1n) result = (result * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1n;
        }
        return result;
    };
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) {
        counts[s.charCodeAt(i) - 97]++;
    }
    const top = Math.max(...counts);
    const fact = new Array(top + 1).fill(1n);
    for (let i = 2n; i <= BigInt(top); ++i) {
        fact[i] = (fact[i - 1n] * i) % MOD;
    }
    const invFact = new Array(top + 1).fill(1n);
    invFact[top] = modPow(fact[top], MOD - 2n);
    for (let i = top; i > 0; --i) {
        invFact[i - 1] = (invFact[i] * BigInt(i)) % MOD;
    }
    const comb = (n, k) => (k > n ? 0n : (((fact[n] * invFact[k]) % MOD) * invFact[n - k]) % MOD);

    const present = [];
    for (const c of counts) {
        if (c > 0) present.push(BigInt(c));
    }
    let total = 0n;
    for (let m = 1n; m <= BigInt(top); ++m) {
        let prod = 1n;
        for (const c of present) {
            prod = (prod * (comb(c, m) + 1n)) % MOD;
        }
        total += prod - 1n;
    }
    return Number(total % MOD);
};
