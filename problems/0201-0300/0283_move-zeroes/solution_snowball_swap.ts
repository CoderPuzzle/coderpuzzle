function moveZeroes(nums: number[]): number[] {
    // Invariant: nums.slice(0, slow) is the stabilized prefix of non-zero
    // values in their original order; nums[slow..fast] holds only zeros.
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            // Swap the non-zero into its slot. While slow == fast (no zeros
            // seen yet) this is a self-exchange, so each element moves at
            // most once.
            const tmp = nums[slow];
            nums[slow] = nums[fast];
            nums[fast] = tmp;
            slow++;
        }
    }
    return nums;
}
