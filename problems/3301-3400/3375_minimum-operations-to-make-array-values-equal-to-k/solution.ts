// Values can only ever be lowered, so any element below k makes the goal
// impossible. Otherwise each operation flattens every level above some h
// down to h, which removes exactly one value level: the current maximum,
// using h = the next level down (hint 3). The minimum count is therefore
// the number of distinct values strictly above k (hint 4), found in one
// pass with a set.
function minOperations(nums: number[], k: number): number {
    const above = new Set<number>();
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < k) return -1;
        if (nums[i] > k) above.add(nums[i]);
    }
    return above.size;
}
