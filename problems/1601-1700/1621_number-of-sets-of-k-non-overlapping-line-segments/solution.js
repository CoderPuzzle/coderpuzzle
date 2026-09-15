/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfSets = function (n, k) {
    // Sort the k segments by left endpoint: l_1 < r_1, l_2 < r_2, ..., l_k
    // < r_k, with r_i <= l_(i+1) (equality allowed, since segments may
    // touch at a shared endpoint but not overlap). Shift the i-th pair by
    // (i - 1): a_i = l_i + (i - 1), b_i = r_i + (i - 1). Each
    // within-segment inequality l_i < r_i stays strict after an equal
    // shift, and each between-segment inequality r_i <= l_(i+1) becomes
    // b_i = r_i + (i - 1) < l_(i+1) + i = a_(i+1), now strict too. So
    // (a_1, b_1, ..., a_k, b_k) is a strictly increasing sequence of 2k
    // integers drawn from [0, n - 1 + (k - 1)], a range of n + k - 1
    // values, and this shift is a bijection onto strictly increasing
    // sequences there. Choosing which 2k of those n + k - 1 values appear
    // determines the whole set, so the answer is C(n + k - 1, 2k).
    // BigInt keeps every product exact through the modular reduction.
    const mod = 1_000_000_007n;
    const total = n + k - 1;
    const pick = 2 * k;
    const fact = new Array(total + 1);
    fact[0] = 1n;
    for (let i = 1; i <= total; i++) {
        fact[i] = (fact[i - 1] * BigInt(i)) % mod;
    }
    const invPick = modPow(fact[pick], mod - 2n, mod);
    const invRest = modPow(fact[total - pick], mod - 2n, mod);
    return Number((((fact[total] * invPick) % mod) * invRest) % mod);
};

function modPow(base, exp, mod) {
    let result = 1n;
    base %= mod;
    while (exp > 0n) {
        if (exp & 1n) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp >>= 1n;
    }
    return result;
}
