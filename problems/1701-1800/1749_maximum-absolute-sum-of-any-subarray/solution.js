/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
    // The max of |subarray sum| is realized at one of the two
    // extremes: the max subarray sum or the negated min subarray
    // sum. Track both running extremes in one sweep, each starting
    // fresh whenever extending the run would only hurt it. Sums stay
    // below 1e9 < 2^53, so double arithmetic is exact here.
    let best = 0,
        worst = 0,
        curMax = 0,
        curMin = 0;
    for (const v of nums) {
        curMax = Math.max(curMax + v, v);
        best = Math.max(best, curMax);
        curMin = Math.min(curMin + v, v);
        worst = Math.min(worst, curMin);
    }
    return Math.max(best, -worst);
};
