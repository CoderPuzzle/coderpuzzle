/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
    // Removing the minimum number of elements is keeping the maximum
    // non-decreasing subsequence, and with values confined to {1, 2, 3}
    // such a subsequence is a run of 1s, then 2s, then 3s. One pass
    // keeps three running best lengths ending in each value: appending
    // x may extend any subsequence ending in a value <= x, so each
    // update is one plus the largest eligible counter. n <= 100 keeps
    // every count far inside Number's exact range.
    let keep1 = 0;
    let keep2 = 0;
    let keep3 = 0;
    for (const x of nums) {
        if (x === 1) {
            keep1++;
        } else if (x === 2) {
            keep2 = Math.max(keep2, keep1) + 1;
        } else {
            keep3 = Math.max(Math.max(keep1, keep2), keep3) + 1;
        }
    }
    return nums.length - Math.max(keep1, keep2, keep3);
};
