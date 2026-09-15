function distanceSum(m: number, n: number, k: number): number {
    // Fix an unordered pair of cells: both carry a piece in exactly
    // C(m*n - 2, k - 2) arrangements, so the answer is (pairwise distance
    // sum over all cell pairs) * C(m*n - 2, k - 2) mod 10^9 + 7. By axis
    // separation the board sum is n^2 * T(m) + m^2 * T(n) with
    // T(M) = M * (M - 1) * (M + 1) / 6, exact for M <= 10^5 since M^3
    // <= 10^15 < 2^53. But multiplying two mod-reduced residues reaches
    // (10^9 + 6)^2 ~ 10^18, past the double's exact 2^53 range, so all
    // residue arithmetic -- the factorial tables and both products --
    // runs on BigInt and converts back only after the final reduction.
    const mod = 1000000007n;
    const total = m * n;

    const fact: bigint[] = [1n];
    for (let i = 1; i <= total; i++) {
        fact.push((fact[i - 1] * BigInt(i)) % mod);
    }
    const invFact: bigint[] = new Array(total + 1).fill(1n);
    invFact[total] = modPow(fact[total], mod - 2n, mod);
    for (let i = total; i > 0; i--) {
        invFact[i - 1] = (invFact[i] * BigInt(i)) % mod;
    }

    const tri = (dim: number): bigint => ((BigInt(dim) * BigInt(dim - 1) * BigInt(dim + 1)) / 6n) % mod;
    const pairs = (((BigInt(n) * BigInt(n)) % mod) * tri(m) + ((BigInt(m) * BigInt(m)) % mod) * tri(n)) % mod;
    const choose = (((fact[total - 2] * invFact[k - 2]) % mod) * invFact[total - k]) % mod;
    return Number((pairs * choose) % mod);
}

function modPow(base: bigint, exponent: bigint, mod: bigint): bigint {
    let result = 1n;
    let b = base % mod;
    let e = exponent;
    while (e > 0n) {
        if (e % 2n === 1n) {
            result = (result * b) % mod;
        }
        b = (b * b) % mod;
        e /= 2n;
    }
    return result;
}
