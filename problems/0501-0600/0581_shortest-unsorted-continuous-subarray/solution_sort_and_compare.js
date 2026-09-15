/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    // Sort a copy and compare position by position: everything outside
    // the reorder window already sits where the sorted order puts it,
    // so the FIRST and LAST disagreeing positions are the window's edges.
    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    let start = 0;
    while (start < n && nums[start] === sorted[start]) {
        start++;
    }
    if (start === n) {
        return 0;
    }
    let end = n - 1;
    while (nums[end] === sorted[end]) {
        end--;
    }
    return end - start + 1;
};
