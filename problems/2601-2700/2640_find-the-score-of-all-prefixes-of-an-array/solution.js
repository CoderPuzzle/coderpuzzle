/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findPrefixScore = function (nums) {
    // ans is the prefix sum of the conversion array, so one fused pass keeps
    // a running max and a running total, never storing conver itself. Totals
    // peak at n * 2*10^9 = 2*10^14 < 2^53, so plain numbers stay exact.
    const result = new Array(nums.length);
    let runningMax = 0;
    let total = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (nums[i] > runningMax) runningMax = nums[i];
        total += nums[i] + runningMax;
        result[i] = total;
    }
    return result;
};
