function smallestRangeI(nums: number[], k: number): number {
    // Only the two ends matter: each element can travel at most k, so the
    // best plan lifts the minimum and lowers the maximum by k each.
    let low = nums[0];
    let high = nums[0];
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i] < low) {
            low = nums[i];
        } else if (nums[i] > high) {
            high = nums[i];
        }
    }
    // The span shrinks by 2k at best and a score can never go below zero.
    return Math.max(0, high - low - 2 * k);
}
