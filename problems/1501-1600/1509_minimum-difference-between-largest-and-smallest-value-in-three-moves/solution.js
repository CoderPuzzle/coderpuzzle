/**
 * @param {number[]} nums
 * @return {number}
 */
var minDifference = function (nums) {
    const n = nums.length;
    // Four or fewer elements can all be pulled to one value in at most
    // three moves.
    if (n <= 4) {
        return 0;
    }
    const sorted = [...nums].sort((a, b) => a - b);
    // Try each of the four ways to split three removals between the low
    // end and the high end of the sorted array.
    let best = Infinity;
    for (let i = 0; i < 4; ++i) {
        best = Math.min(best, sorted[n - 4 + i] - sorted[i]);
    }
    return best;
};
