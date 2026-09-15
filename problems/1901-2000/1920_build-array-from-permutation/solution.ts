function buildArray(nums: number[]): number[] {
    // One pass of nested indexing: nums is a permutation of 0..n-1, so
    // every value is itself a valid index and nums[nums[i]] is in range.
    return nums.map((x) => nums[x]);
}
