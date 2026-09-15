/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function (nums) {
    // Read the array as a ring: a sorted-then-rotated array
    // descends at most once, at the rotation seam.
    const n = nums.length;
    let descents = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] > nums[(i + 1) % n]) {
            descents++;
            if (descents > 1) {
                return false;
            }
        }
    }
    return true;
};
