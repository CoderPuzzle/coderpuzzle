/**
 * @param {number[]} nums
 * @return {number}
 */
var semiOrderedPermutation = function (nums) {
    const n = nums.length;
    let i = 0;
    let j = 0;
    for (let k = 0; k < n; k++) {
        if (nums[k] === 1) {
            i = k;
        }
        if (nums[k] === n) {
            j = k;
        }
    }
    return i + (n - 1 - j) - (i > j ? 1 : 0);
};
