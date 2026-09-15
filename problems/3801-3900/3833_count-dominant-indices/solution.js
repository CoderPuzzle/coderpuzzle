/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndices = function (nums) {
    // Suffix sums stay within 99 * 100 = 9900 and cross-products within
    // 100 * 99 = 9900, so plain numbers hold every integer here exactly,
    // far inside the 2^53 safe range.
    const n = nums.length;
    let count = 0;
    // Walk backward from the second-to-last index, carrying the sum of
    // the strict suffix after i; the comparison nums[i] > sum / (n - 1 - i)
    // is exactly nums[i] * (n - 1 - i) > sum in integer arithmetic.
    let suffix = 0;
    for (let i = n - 2; i >= 0; i--) {
        suffix += nums[i + 1];
        if (nums[i] * (n - 1 - i) > suffix) {
            count += 1;
        }
    }
    return count;
};
