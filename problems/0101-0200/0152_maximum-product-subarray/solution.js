/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    // Seed with the first element so a single-element array returns itself.
    let best = nums[0];
    // Extremes of subarray products ending exactly at the current index; the
    // minimum must be carried too because a negative factor reverses the
    // order and can turn the worst product into the next best.
    let curMax = nums[0];
    let curMin = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const value = nums[i];
        // A negative incoming value swaps the extremes so the usual
        // candidate rules apply unchanged.
        if (value < 0) {
            const tmp = curMax;
            curMax = curMin;
            curMin = tmp;
        }
        // Either start a fresh subarray at this value or extend.
        curMax = Math.max(value, curMax * value);
        curMin = Math.min(value, curMin * value);
        best = Math.max(best, curMax);
    }
    return best;
};
