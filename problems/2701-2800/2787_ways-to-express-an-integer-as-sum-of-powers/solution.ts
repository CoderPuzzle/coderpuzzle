function numberOfWays(n: number, x: number): number {
    // A set of unique bases is exactly a choice of which distinct xth
    // powers to take, each at most once -- a counting knapsack.
    const mod = 1e9 + 7;
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let base = 1; ; ++base) {
        let power = 1;
        for (let e = 0; e < x; ++e) power *= base;
        if (power > n) break;
        // Walking the sums downward reads dp[sum - power] at its pre-power
        // value, so no subset takes this power twice.
        for (let total = n; total >= power; --total) {
            dp[total] = (dp[total] + dp[total - power]) % mod;
        }
    }
    return dp[n];
}
