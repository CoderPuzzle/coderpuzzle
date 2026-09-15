/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverage = function (nums) {
    // Every round pairs the current minimum with the current maximum;
    // after sorting, those are exactly nums[k] and nums[n-1-k]. All
    // values lie in 1..50, so each pair sum is <= 100 and the /2 is
    // exact in binary floating point (a sum is either an integer or
    // lands on x.5).
    nums.sort((a, b) => a - b);
    let best = Infinity;
    const n = nums.length;
    for (let k = 0; k < n / 2; k++) {
        best = Math.min(best, (nums[k] + nums[n - 1 - k]) / 2);
    }
    return best;
};
