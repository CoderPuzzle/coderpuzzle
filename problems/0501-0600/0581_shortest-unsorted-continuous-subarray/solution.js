/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    // Scan left to right carrying the running max: an element below the
    // running max is out of place, and the LAST such index is the
    // window's right edge; a right-to-left pass with the running min
    // finds the left edge. Strict < and > keep equal values out.
    const n = nums.length;
    let start = -1;
    let end = -1;
    let runningMax = -Infinity;
    for (let i = 0; i < n; ++i) {
        if (nums[i] < runningMax) {
            end = i;
        } else {
            runningMax = nums[i];
        }
    }
    let runningMin = Infinity;
    for (let i = n - 1; i >= 0; --i) {
        if (nums[i] > runningMin) {
            start = i;
        } else {
            runningMin = nums[i];
        }
    }
    return end === -1 ? 0 : end - start + 1;
};
