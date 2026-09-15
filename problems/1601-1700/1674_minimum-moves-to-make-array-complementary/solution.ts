function minMoves(nums: number[], limit: number): number {
    const n = nums.length;
    // Difference array over candidate target sums t in [2, 2*limit]: each
    // mirror pair's cost curve becomes range updates.
    const diff: number[] = new Array(2 * limit + 2).fill(0);
    for (let i = 0; i < n >> 1; i++) {
        const a = nums[i],
            b = nums[n - 1 - i];
        const lo = Math.min(a, b),
            hi = Math.max(a, b);
        // Base cost 2 everywhere; −1 across [lo+1, hi+limit], the sums one
        // changed element can reach; a further −1 exactly at t = a + b,
        // where no change is needed.
        diff[2] += 2;
        diff[lo + 1] -= 1;
        diff[a + b] -= 1;
        diff[a + b + 1] += 1;
        diff[hi + limit + 1] += 1;
    }
    // Prefix sums give the total cost per target; keep the minimum.
    let best = Infinity;
    let cur = 0;
    for (let target = 2; target <= 2 * limit; target++) {
        cur += diff[target];
        if (cur < best) best = cur;
    }
    return best;
}
