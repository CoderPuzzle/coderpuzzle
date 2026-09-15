function isMonotonic(nums: number[]): boolean {
    // Two hypotheses survive until refuted: a rise kills the decreasing
    // one, a drop kills the increasing one, equals keep both standing.
    let increasing = true;
    let decreasing = true;
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i] > nums[i - 1]) {
            decreasing = false;
        } else if (nums[i] < nums[i - 1]) {
            increasing = false;
        }
    }
    return increasing || decreasing;
}
