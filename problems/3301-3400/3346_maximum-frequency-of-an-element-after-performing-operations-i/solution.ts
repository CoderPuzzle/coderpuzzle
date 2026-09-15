function maxFrequency(nums: number[], k: number, numOperations: number): number {
    // A target v collects every element in [v-k, v+k]: elements already
    // equal to v cost nothing, any other costs one operation, and surplus
    // operations can always be spent as +0 elsewhere because
    // numOperations <= n. So the best frequency at v is
    // min(window(v), count(v) + numOperations). Elements are >= 1, so
    // targets below 1 never beat v = 1, and targets above max+k see an
    // empty window; a sliding window over every integer v in
    // [1, max(nums)+k] therefore evaluates all candidates.
    nums.sort((a, b) => a - b);
    const count = new Map<number, number>();
    for (const x of nums) count.set(x, (count.get(x) ?? 0) + 1);
    let best = 0;
    let lo = 0;
    let hi = 0;
    const n = nums.length;
    for (let v = 1; v <= nums[n - 1] + k; v++) {
        while (hi < n && nums[hi] <= v + k) hi++;
        while (lo < hi && nums[lo] < v - k) lo++;
        best = Math.max(best, Math.min(hi - lo, (count.get(v) ?? 0) + numOperations));
    }
    return best;
}
