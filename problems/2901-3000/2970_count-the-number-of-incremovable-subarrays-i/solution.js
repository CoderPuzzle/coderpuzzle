/**
 * @param {number[]} nums
 * @return {number}
 */
var incremovableSubarrayCount = function (nums) {
    // A subarray (i, j) is incremovable exactly when splicing it out
    // leaves a strictly increasing sequence. n <= 50, so every one of
    // the O(n^2) subarrays is checked directly: walk the surviving
    // elements (prefix nums[:i] then suffix nums[j+1:]) and require
    // each one to exceed its predecessor; values are positive, so a
    // sentinel of 0 seeds the comparison.
    const n = nums.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            let ok = true;
            let prev = 0;
            for (let idx = 0; idx < n; idx++) {
                if (idx >= i && idx <= j) {
                    continue;
                }
                if (nums[idx] <= prev) {
                    ok = false;
                    break;
                }
                prev = nums[idx];
            }
            if (ok) {
                count++;
            }
        }
    }
    return count;
};
