/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumRightShifts = function (nums) {
    const n = nums.length;
    let descents = 0;
    let pivot = -1;
    for (let i = 0; i < n; ++i) {
        const next = (i + 1) % n;
        if (nums[i] > nums[next]) {
            ++descents;
            pivot = i;
        }
    }
    if (descents === 0) return 0;
    if (descents > 1) return -1;
    return n - 1 - pivot;
};
