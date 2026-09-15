function wiggleSort(nums: number[]): number[] {
    // One pass: each pair demands its own relation, and repairing a
    // violated pair with a single swap never re-breaks the pair before it.
    for (let i = 1; i < nums.length; ++i) {
        // Odd i demands nums[i-1] <= nums[i]; even i demands nums[i-1] >= nums[i].
        if ((i % 2 === 1 && nums[i - 1] > nums[i]) || (i % 2 === 0 && nums[i - 1] < nums[i])) {
            [nums[i - 1], nums[i]] = [nums[i], nums[i - 1]];
        }
    }
    return nums;
}
