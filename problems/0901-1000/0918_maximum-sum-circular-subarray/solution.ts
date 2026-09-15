function maxSubarraySumCircular(nums: number[]): number {
    const total = nums.reduce((a, b) => a + b, 0);
    // One pass runs Kadane twice: bestMax for the non-wrapping case, and
    // bestMin because a wrapping subarray is total minus the omitted
    // middle chunk, which must be minimized. Seeding with nums[0] keeps
    // every candidate non-empty.
    let curMax = nums[0],
        bestMax = nums[0];
    let curMin = nums[0],
        bestMin = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const x = nums[i];
        curMax = x + Math.max(curMax, 0);
        bestMax = Math.max(bestMax, curMax);
        curMin = x + Math.min(curMin, 0);
        bestMin = Math.min(bestMin, curMin);
    }
    if (bestMax < 0) {
        // All negative: the wrap candidate degenerates to the empty
        // subarray, which is not allowed — answer is the best run.
        return bestMax;
    }
    return Math.max(bestMax, total - bestMin);
}
