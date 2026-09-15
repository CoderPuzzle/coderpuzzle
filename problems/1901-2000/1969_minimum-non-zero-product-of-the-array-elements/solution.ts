function minNonZeroProduct(p: number): number {
    // Every integer in [1, 2^p - 1] pairs with its bitwise complement
    // 2^p - 1 - x: the two use exactly opposite bits, so swapping can push
    // all the 1s onto one of them and each pair collapses to (1, 2^p - 2)
    // with product 2^p - 2. The unpaired all-ones 2^p - 1 stays untouched
    // (reducing it would force a zero). With 2^(p-1) - 1 pairs the minimum
    // non-zero product is (2^p - 2)^(2^(p-1) - 1) * (2^p - 1), folded by
    // iterative square-and-multiply — p up to 60 costs ~60 squarings.
    // BigInt is mandatory: (2^p - 2) ~ 1.15e18 and its square overflow
    // Number's exact 2^53 range.
    const MOD = 1000000007n;
    const full = (1n << BigInt(p)) - 1n;
    const base = full - 1n;
    let exp = (1n << BigInt(p - 1)) - 1n;
    let result = 1n;
    let b = base % MOD;
    while (exp > 0n) {
        if ((exp & 1n) !== 0n) result = (result * b) % MOD;
        b = (b * b) % MOD;
        exp >>= 1n;
    }
    return Number((result * (full % MOD)) % MOD);
}
