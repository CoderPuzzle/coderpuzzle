/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var sumIndicesWithKSetBits = function (nums, k) {
    let answer = 0;
    for (let index = 0; index < nums.length; index++) {
        let setBits = 0;
        for (let rest = index; rest > 0; rest &= rest - 1) {
            setBits++;
        }
        if (setBits === k) {
            answer += nums[index];
        }
    }
    return answer;
};
