/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfGoodPartitions = function (nums) {
    // A value may not straddle a cut, so every free cut sits at an index
    // that has already seen the last occurrence of every value to its left;
    // each such gap independently doubles the count, giving 2^(number of
    // gaps). The running product stays below 2^53, so Number is exact.
    const MOD = 1000000007;
    const last = new Map();
    for (let i = 0; i < nums.length; i++) {
        last.set(nums[i], i);
    }
    let result = 1;
    let reach = 0;
    for (let i = 0; i + 1 < nums.length; i++) {
        reach = Math.max(reach, last.get(nums[i]));
        if (reach === i) {
            result = (result * 2) % MOD;
        }
    }
    return result;
};
