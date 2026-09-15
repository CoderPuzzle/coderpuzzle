/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function (nums) {
    // Two running optima over subsequences of the prefix: `even` is the best
    // alternating sum whose last picked element sits at an even reindexed
    // position, `odd` the best with one extra odd-position element. Every
    // sum stays within 1e5 * 1e5 = 1e10 < 2^53, so Number is exact.
    let even = 0;
    let odd = 0;
    for (const x of nums) {
        const nextEven = Math.max(even, odd + x);
        const nextOdd = Math.max(odd, even - x);
        even = nextEven;
        odd = nextOdd;
    }
    return even;
};
