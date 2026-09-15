/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
    const n = nums.length;
    // Left-to-right scan stopping at the first descent — the direct way to
    // return the leftmost peak, which binary search cannot guarantee.
    for (let i = 0; i < n; i++) {
        // Positions just outside the array count as -infinity, so the
        // boundary checks pass vacuously at the ends.
        const leftOk = i === 0 || nums[i] > nums[i - 1];
        const rightOk = i === n - 1 || nums[i] > nums[i + 1];
        if (leftOk && rightOk) {
            return i;
        }
    }
    // Unreachable: some peak always exists.
    return -1;
};
