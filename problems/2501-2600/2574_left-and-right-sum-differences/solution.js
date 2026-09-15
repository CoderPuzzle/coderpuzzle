/**
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function (nums) {
    // rightSum[i] is just total - leftSum[i] - nums[i], so one running
    // prefix replaces both arrays: pay one pass for the total, then a
    // second that walks left forward and emits each absolute difference.
    let total = 0;
    for (const value of nums) total += value;
    const answer = [];
    let left = 0;
    for (const value of nums) {
        answer.push(Math.abs(left - (total - left - value)));
        left += value;
    }
    return answer;
};
