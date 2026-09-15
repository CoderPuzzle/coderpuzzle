/**
 * @param {number} n
 * @param {number} pos
 * @param {number} k
 * @return {number}
 */
var countVisiblePeople = function (n, pos, k) {
    // The number seen is (# left people choosing 'L') + (# right people
    // choosing 'R'), so Vandermonde's identity collapses the split sum to
    // 2 * C(n - 1, k). Modular products exceed 2^53, so every multiply runs
    // in BigInt; the final value fits a plain number.
    const MOD = 1000000007n;
    if (k > n - 1) return 0;
    const size = n - 1;
    const fact = new Array(size + 1);
    const invFact = new Array(size + 1);
    fact[0] = 1n;
    for (let i = 1; i <= size; i++) {
        fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
    }
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
    invFact[size] = modPow(fact[size], MOD - 2n);
    for (let i = size; i > 0; i--) {
        invFact[i - 1] = (invFact[i] * BigInt(i)) % MOD;
    }
    const comb = (a, b) => {
        if (b < 0 || b > a) return 0n;
        return (((fact[a] * invFact[b]) % MOD) * invFact[a - b]) % MOD;
    };
    return Number((2n * comb(n - 1, k)) % MOD);
};
