/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[][]}
 */
var divideArray = function (nums, k) {
    // Sorting is forced: the global minimum may only share a group with
    // the two values closest above it, and inductively every valid
    // division groups consecutive sorted values — so sort and check each
    // consecutive triple's spread (last minus first is the widest).
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i + 2 < nums.length; i += 3) {
        if (nums[i + 2] - nums[i] > k) {
            return [];
        }
        result.push(nums.slice(i, i + 3));
    }
    return result;
};
