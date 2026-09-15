function subsets(nums: number[]): number[][] {
    const n: number = nums.length;
    const subsets: number[][] = [];
    // Count masks upward from all bits clear ([]) to all bits set (the
    // whole array): bit i set means nums[i] is in the subset.
    for (let mask = 0; mask < 1 << n; ++mask) {
        const current: number[] = [];
        for (let i = 0; i < n; ++i) {
            // Bit i set: nums[i] joins, in input order within the subset.
            if (mask & (1 << i)) {
                current.push(nums[i]);
            }
        }
        subsets.push(current);
    }
    return subsets;
}
