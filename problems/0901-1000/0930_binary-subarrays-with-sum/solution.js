/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function (nums, goal) {
    // A subarray's sum is the difference of two prefix sums, so the
    // windows ending here with sum goal pair exactly with the earlier
    // prefixes worth prefix - goal. A hash map counting each prefix sum
    // seen so far answers that lookup in O(1) per position.
    let count = 0;
    let prefix = 0;
    const seen = new Map();
    seen.set(0, 1);
    for (const value of nums) {
        prefix += value;
        count += seen.get(prefix - goal) ?? 0;
        seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
    }
    return count;
};
