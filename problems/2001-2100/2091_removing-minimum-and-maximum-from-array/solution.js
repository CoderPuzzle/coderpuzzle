/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeletions = function (nums) {
    let minimumIndex = 0;
    let maximumIndex = 0;
    for (let index = 1; index < nums.length; index++) {
        if (nums[index] < nums[minimumIndex]) {
            minimumIndex = index;
        }
        if (nums[index] > nums[maximumIndex]) {
            maximumIndex = index;
        }
    }

    const left = Math.min(minimumIndex, maximumIndex);
    const right = Math.max(minimumIndex, maximumIndex);
    return Math.min(right + 1, nums.length - left, left + 1 + nums.length - right);
};
