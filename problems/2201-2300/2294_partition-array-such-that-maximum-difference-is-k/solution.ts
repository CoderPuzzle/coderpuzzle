function partitionArray(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    let groups = 1;
    let start = nums[0];
    for (const value of nums) {
        if (value - start > k) {
            groups++;
            start = value;
        }
    }
    return groups;
}
