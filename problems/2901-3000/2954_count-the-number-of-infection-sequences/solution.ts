function numberOfSequence(n: number, sick: number[]): number {
    // The initially infected people split the line into blocks of
    // uninfected people. An edge block (touching index 0 or n - 1) has
    // only one infectable person per step, so its internal order is
    // forced; an interior block (sick people on both sides) may shed from
    // either endpoint, giving 2^(len - 1) internal orders. Blocks shed
    // independently, so the answer is the multinomial count of ways to
    // interleave the per-step picks across blocks, S! / prod len_i!, times
    // each interior block's 2^(len - 1), all mod 10^9 + 7. Products of two
    // mod-reduced residues reach (10^9 + 6)^2 ~ 10^18, past the double's
    // exact 2^53 range, so every multiplication runs on BigInt and the
    // final residue converts back to Number.
    const mod = 1000000007n;
    const fact = new Array<bigint>(n + 1).fill(1n);
    const pow2 = new Array<bigint>(n + 1).fill(1n);
    for (let i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * BigInt(i)) % mod;
        pow2[i] = (pow2[i - 1] * 2n) % mod;
    }
    const invFact = new Array<bigint>(n + 1).fill(1n);
    invFact[n] = modPow(fact[n], mod - 2n, mod);
    for (let i = n; i > 0; i--) {
        invFact[i - 1] = (invFact[i] * BigInt(i)) % mod;
    }

    let ans = fact[n - sick.length];
    if (sick[0] > 0) {
        ans = (ans * invFact[sick[0]]) % mod;
    }
    for (let i = 1; i < sick.length; i++) {
        const gap = sick[i] - sick[i - 1] - 1;
        if (gap > 0) {
            ans = (((ans * invFact[gap]) % mod) * pow2[gap - 1]) % mod;
        }
    }
    if (sick[sick.length - 1] < n - 1) {
        ans = (ans * invFact[n - 1 - sick[sick.length - 1]]) % mod;
    }
    return Number(ans);
}

function modPow(base: bigint, expo: bigint, mod: bigint): bigint {
    let result = 1n;
    while (expo > 0n) {
        if (expo & 1n) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        expo >>= 1n;
    }
    return result;
}
