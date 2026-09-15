/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var largestSubarray = function (nums, k) {
    // Distinct values mean two length-k windows never tie: their first
    // elements differ, and the comparison is decided at index 0 by that
    // pair alone. The answer is therefore the window starting at the
    // maximum of nums[0..n-k] — one scan for that position, then take
    // the k elements from it.
    let best = 0;
    for (let i = 1; i + k <= nums.length; i++) {
        if (nums[i] > nums[best]) {
            best = i;
        }
    }
    return nums.slice(best, best + k);
};
