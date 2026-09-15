/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    // Smallest index whose value is >= limit; nums.length if none. The kept
    // half always contains that boundary, so the window halves until only the
    // boundary is left.
    const lowerBound = function (limit) {
        let lo = 0;
        let hi = nums.length;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (nums[mid] < limit) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    // The run of targets starts at the first index >= target...
    const start = lowerBound(target);
    if (start === nums.length || nums[start] !== target) {
        return [-1, -1];
    }
    // ...and ends one slot before the first index >= target + 1: the
    // upper bound of target is exactly the lower bound of target + 1.
    return [start, lowerBound(target + 1) - 1];
};
