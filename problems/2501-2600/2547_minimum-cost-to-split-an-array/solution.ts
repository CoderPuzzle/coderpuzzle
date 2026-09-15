function minCost(nums: number[], k: number): number {
    // dp[r] = min cost to split the first r elements. For each r, sweep
    // l downward from r-1 while extending one frequency table: a value
    // seen for the first time adds nothing, its second occurrence adds
    // 2 to the trimmed length (the missed first occurrence plus this
    // one), later ones add 1 each. The cost is bounded by
    // n*(k+n) = 10^12 + 10^6 << 2^53, so plain numbers stay exact.
    const n = nums.length;
    const dp: number[] = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    for (let r = 1; r <= n; ++r) {
        const freq = new Map<number, number>();
        let trimmed = 0;
        let best = Infinity;
        for (let l = r - 1; l >= 0; --l) {
            const count = (freq.get(nums[l]) ?? 0) + 1;
            freq.set(nums[l], count);
            if (count === 2) {
                trimmed += 2;
            } else if (count > 2) {
                ++trimmed;
            }
            best = Math.min(best, dp[l] + k + trimmed);
        }
        dp[r] = best;
    }
    return dp[n];
}
