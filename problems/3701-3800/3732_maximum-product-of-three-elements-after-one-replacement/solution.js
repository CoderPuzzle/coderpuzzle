/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    // One sweep keeps the two largest and the two smallest values. Those
    // four slots always contain the two elements of largest magnitude:
    // absolute values are V-shaped across a sorted array, so both winners
    // come off its ends.
    let max1 = -Infinity,
        max2 = -Infinity,
        min1 = Infinity,
        min2 = Infinity;
    for (const value of nums) {
        if (value > max1) {
            max2 = max1;
            max1 = value;
        } else if (value > max2) {
            max2 = value;
        }
        if (value < min1) {
            min2 = min1;
            min1 = value;
        } else if (value < min2) {
            min2 = value;
        }
    }
    // The optimal triple is the mandatory replacement pushed to +-10^5 (its
    // sign matched to the pair) times the most extreme pair product. Pair
    // products reach 10^10 and the answer 10^15, inside exact double range.
    const extremes = [max1, max2, min1, min2];
    let bestPair = 0;
    for (let i = 0; i < 4; ++i) {
        for (let j = i + 1; j < 4; ++j) {
            bestPair = Math.max(bestPair, Math.abs(extremes[i] * extremes[j]));
        }
    }
    return 100000 * bestPair;
};
