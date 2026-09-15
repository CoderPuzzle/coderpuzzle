function smallestRangeII(nums: number[], k: number): number {
    // Sorted, a best plan lifts a prefix by k and lowers the rest by k;
    // everyone moving together just keeps the raw span.
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let best = nums[n - 1] - nums[0];
    for (let i = 1; i < n; ++i) {
        // Cut after i elements: the extremes can only be the four boundary
        // values around the cut.
        const high = Math.max(nums[i - 1] + k, nums[n - 1] - k);
        const low = Math.min(nums[0] + k, nums[i] - k);
        best = Math.min(best, high - low);
    }
    return best;
}
