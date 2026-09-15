function selfDivisiblePermutationCount(n: number): number {
    // Position i (1-indexed) may receive value v exactly when gcd(v, i) is 1.
    // Precompute that compatibility grid once, then count valid permutations
    // with a subset DP: dp[mask] is the number of ways to fill the first
    // popcount(mask) positions using exactly the values in mask, so extending
    // by the last-placed value v gives dp[mask] = sum over compatible v in
    // mask of dp[mask without v]. The count never exceeds 12! (~4.8e8), well
    // inside exact-integer range for a Number.
    const compat: boolean[][] = [];
    for (let i = 1; i <= n; ++i) {
        const row: boolean[] = [];
        for (let v = 1; v <= n; ++v) {
            let a = v;
            let b = i;
            while (b !== 0) {
                const t = a % b;
                a = b;
                b = t;
            }
            row.push(a === 1);
        }
        compat.push(row);
    }
    const full = 1 << n;
    const dp: number[] = new Array(full).fill(0);
    dp[0] = 1;
    for (let mask = 1; mask < full; ++mask) {
        let pos = 0;
        for (let bits = mask; bits !== 0; bits &= bits - 1) ++pos; // 1-indexed position now
        const row = compat[pos - 1];
        let total = 0;
        for (let v = 0; v < n; ++v) {
            if ((mask >> v) & 1 && row[v]) total += dp[mask ^ (1 << v)];
        }
        dp[mask] = total;
    }
    return dp[full - 1];
}
