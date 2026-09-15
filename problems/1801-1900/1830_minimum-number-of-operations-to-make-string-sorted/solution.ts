function makeStringSorted(s: string): number {
    // Each operation steps s to its previous lexicographic permutation, so
    // the operation count is the number of distinct permutations of the
    // multiset that are strictly smaller than s. That rank minus one splits
    // per position: with rem slots after i, any remaining letter smaller
    // than s[i] can lead them in rem! / prod(cnt!) arrangements — cnt of
    // the chosen letter one lower. Keeping den = prod(1/cnt!) incrementally
    // folds the multinomial into one multiply per step: the summed
    // contribution is fact[rem] * den * sum(smaller counts), and placing
    // s[i] itself multiplies den by its pre-placement count. Products of
    // two residues reach ~10^18, past 2^53, so BigInt carries every
    // multiplication; the final residue fits a Number exactly.
    const mod = 1_000_000_007n;
    const n = s.length;
    const fact: bigint[] = new Array(n + 1);
    fact[0] = 1n;
    for (let i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * BigInt(i)) % mod;
    }
    const invFact: bigint[] = new Array(n + 1);
    invFact[n] = modPow(fact[n], mod - 2n, mod);
    for (let i = n; i > 0; i--) {
        invFact[i - 1] = (invFact[i] * BigInt(i)) % mod;
    }
    const cnt: number[] = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        cnt[s.charCodeAt(i) - 97]++;
    }
    let den = 1n;
    for (const k of cnt) {
        den = (den * invFact[k]) % mod;
    }
    let ans = 0n;
    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        let smaller = 0;
        for (let a = 0; a < c; a++) {
            smaller += cnt[a];
        }
        ans = (ans + ((fact[n - 1 - i] * den) % mod) * BigInt(smaller)) % mod;
        den = (den * BigInt(cnt[c])) % mod;
        cnt[c]--;
    }
    return Number(ans);
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    base %= mod;
    while (exp > 0n) {
        if ((exp & 1n) === 1n) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp >>= 1n;
    }
    return result;
}
