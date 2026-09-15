function minOperations(nums: number[]): number {
    let total = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] > nums[i]) total += nums[i - 1] - nums[i];
    }
    // The total is below 10^14, so Number represents it exactly.
    return total;
}
