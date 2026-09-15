/**
 * @param {number[]} nums
 * @return {number[]}
 */
var orArray = function (nums) {
    const answer = [];
    for (let i = 0; i < nums.length - 1; ++i) {
        answer.push(nums[i] | nums[i + 1]);
    }
    return answer;
};
