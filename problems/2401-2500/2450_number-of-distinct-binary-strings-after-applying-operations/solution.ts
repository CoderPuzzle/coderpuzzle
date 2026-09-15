function countDistinctStrings(s: string, k: number): number {
    // Only the number of size-k windows matters: e = n - k + 1. Flipping
    // a window is an independent yes/no choice and each combination gives
    // a distinct string (hint 2), so the answer is 2^e mod 1e9+7. A modular
    // product of two values below 1e9+7 exceeds Number's exact 2^53 integer
    // range, so the multiplications run in BigInt.
    const MOD = 1000000007n;
    let e = BigInt(s.length - k + 1);
    let base = 2n;
    let res = 1n;
    while (e > 0n) {
        if (e % 2n === 1n) res = (res * base) % MOD;
        base = (base * base) % MOD;
        e >>= 1n;
    }
    return Number(res);
}
