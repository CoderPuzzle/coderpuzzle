/**
 * @param {number[]} nums
 * @return {number}
 */
var maxScore = function (nums) {
    // Operations only peel elements off the ends, so what remains is a
    // contiguous block: 1 element when n is odd, 2 adjacent when n is
    // even. Every removed element scores exactly once, so maximize the
    // score by leaving the cheapest possible block behind. Totals are at
    // most 1e9 in magnitude, exact as a JS number.
    let total = 0;
    for (const v of nums) {
        total += v;
    }
    if (nums.length % 2 === 1) {
        let keep = Infinity;
        for (const v of nums) {
            if (v < keep) {
                keep = v;
            }
        }
        return total - keep;
    }
    let keep = Infinity;
    for (let i = 0; i + 1 < nums.length; i++) {
        if (nums[i] + nums[i + 1] < keep) {
            keep = nums[i] + nums[i + 1];
        }
    }
    return total - keep;
};
