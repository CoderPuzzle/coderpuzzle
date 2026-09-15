function minimumPrefixLength(nums: number[]): number {
    // Elements stay within ±10^9 and the answer within 10^5 - 1, so plain
    // numbers hold every integer here exactly, far inside the 2^53 range.
    // What survives removal is a suffix, and a suffix is strictly
    // increasing exactly when none of its adjacent pairs violates the
    // order, so the best cut sits just past the LAST violating pair.
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] >= nums[i + 1]) {
            return i + 1;
        }
    }
    return 0;
}
