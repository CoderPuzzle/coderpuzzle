/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxValidPairSum = function (nums, k) {
    let bestLeft = nums[0];
    let answer = -Infinity;
    for (let j = k; j < nums.length; j++) {
        bestLeft = Math.max(bestLeft, nums[j - k]);
        answer = Math.max(answer, bestLeft + nums[j]);
    }
    return answer;
};
