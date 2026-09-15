/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumTripletValue = function (nums) {
    // One pass with two running prefix maxima: while treating the current
    // element as k, bestDiff already holds the largest nums[i] - nums[j]
    // over i < j before it, so extending that best pair by nums[k] covers
    // every triplet ending here without ever re-scanning the prefix.
    // The answer is bounded by (10^6 - 1) * 10^6 < 2^53, so a plain Number
    // carries it exactly.
    let best = 0; // all-negative answers collapse to 0 by the statement
    let bestDiff = 0; // max nums[i] - nums[j] over pairs already passed
    let maxPrefix = 0; // max nums[i] over indices already passed
    for (const x of nums) {
        best = Math.max(best, bestDiff * x);
        bestDiff = Math.max(bestDiff, maxPrefix - x);
        maxPrefix = Math.max(maxPrefix, x);
    }
    return best;
};
