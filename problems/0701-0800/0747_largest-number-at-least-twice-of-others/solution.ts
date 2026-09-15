function dominantIndex(nums: number[]): number {
    // One pass for the top two values: the largest dominates exactly when
    // it is at least twice the runner-up, since every other element is at
    // most that runner-up.
    let best = 0;
    let second = -1;
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i] > nums[best]) {
            second = nums[best];
            best = i;
        } else if (nums[i] > second) {
            second = nums[i];
        }
    }
    // The boundary is inclusive: "at least twice" keeps max == 2 * second.
    return nums[best] >= 2 * second ? best : -1;
}
