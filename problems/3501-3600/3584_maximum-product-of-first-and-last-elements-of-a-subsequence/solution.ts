function maximumProduct(nums: number[], m: number): number {
    // A size-m subsequence with first index i and last index j exists
    // iff j >= i + m - 1. For m == 1 first and last are the same
    // element, so the answer is the best square. Otherwise sweep i
    // downward: the eligible window nums[i + m - 1:] grows by one entry
    // per step, so its max and min update in O(1), and one of those two
    // extremes is always the best partner for nums[i]. Products stay
    // within 1e5 * 1e5 = 1e10 < 2^53, so Number arithmetic is exact.
    const n = nums.length;
    if (m === 1) {
        let best = -Infinity;
        for (const v of nums) best = Math.max(best, v * v);
        return best;
    }
    let smax = nums[n - 1];
    let smin = nums[n - 1];
    let best = nums[n - m] * nums[n - 1];
    for (let i = n - m - 1; i >= 0; --i) {
        const v = nums[i + m - 1];
        if (v > smax) smax = v;
        else if (v < smin) smin = v;
        best = Math.max(best, nums[i] * smax, nums[i] * smin);
    }
    return best;
}
