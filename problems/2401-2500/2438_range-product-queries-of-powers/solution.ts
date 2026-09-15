function productQueries(n: number, queries: number[][]): number[] {
    // The minimum set of powers of two summing to n is exactly its set
    // bits (hint 1), so powers is the sorted list of 1 << b for each set
    // bit b. A range product of ascending powers of two is itself a power
    // of two — 2^(exponent sum) — but under the modulus the clean tool is
    // prefix products with one modular inverse per query (Fermat, MOD
    // prime): product(lo..hi) = pref[hi+1] * inv(pref[lo]). Modular
    // inverses need exact big-int arithmetic, hence BigInt throughout.
    const MOD = 1_000_000_007n;
    let rest = BigInt(n);
    const powers: bigint[] = [];
    for (let b = 0n; rest > 0n; ++b, rest >>= 1n) {
        if (rest & 1n) powers.push(1n << b);
    }
    const pref: bigint[] = [1n];
    for (const v of powers) {
        pref.push((pref[pref.length - 1] * v) % MOD);
    }
    return queries.map(([lo, hi]) => Number((pref[hi + 1] * powMod(pref[lo], MOD - 2n, MOD)) % MOD));
}

function powMod(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    while (exp > 0n) {
        if (exp & 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp >>= 1n;
    }
    return result;
}
