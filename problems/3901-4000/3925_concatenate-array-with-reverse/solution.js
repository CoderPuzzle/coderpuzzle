/**
 * @param {number[]} nums
 * @return {number[]}
 */
var concatWithReverse = function (nums) {
    const n = nums.length;
    const answer = new Array(2 * n);
    for (let i = 0; i < n; i++) {
        answer[i] = nums[i];
        answer[n + i] = nums[n - i - 1];
    }
    return answer;
};
