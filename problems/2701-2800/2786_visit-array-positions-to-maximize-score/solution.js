/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var maxScore = function (nums, x) {
    const unseen = -(2 ** 60);
    const best = [unseen, unseen];
    best[nums[0] % 2] = nums[0];

    for (let index = 1; index < nums.length; index++) {
        const value = nums[index];
        const parity = value % 2;
        const extended = best[parity] + value;
        const switched = best[parity ^ 1] + value - x;
        best[parity] = Math.max(extended, switched);
    }
    return Math.max(best[0], best[1]);
};
