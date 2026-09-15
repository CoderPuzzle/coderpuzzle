/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var countValidSequences = function (n, k) {
    const MOD = 1000000007;
    // Split multiplication: (MOD - 1)^2 exceeds Number's exact range, so a
    // product is reduced by add-doubling instead of multiplying directly.
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

    // Factorials and inverse factorials up to n; the single modular
    // inverse comes from Fermat's little theorem (p prime), no floats.
    // The plain products here stay exact: both factors are below 2^53.
    const fact = new Array(n + 1).fill(1);
    for (let i = 1; i <= n; i++) fact[i] = (fact[i - 1] * i) % MOD;
    const invFact = new Array(n + 1).fill(1);
    invFact[n] = powmod(fact[n], MOD - 2);
    for (let i = n; i >= 1; i--) invFact[i - 1] = (invFact[i] * i) % MOD;

    const comb = (a, b) => {
        if (b < 0 || b > a) return 0;
        return mulmod(mulmod(fact[a], invFact[b]), invFact[a - b]);
    };

    let total = comb(n - 1, k - 1);
    // All-odd compositions exist iff n - k is even; substituting each
    // part x_i = 2*y_i + 1 leaves (n-k)/2 spread over k non-negative y_i.
    if ((n - k) % 2 === 0) {
        total = (total - comb((n + k) / 2 - 1, k - 1) + MOD) % MOD;
    }
    return total % MOD;
};
