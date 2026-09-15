/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
    const reach = new Array(nums.length).fill(0);
    for (let i = 1; i < nums.length; i++) {
        reach[i] = nums[i - 1] % 2 === nums[i] % 2 ? i : reach[i - 1];
    }
    return queries.map(([from, to]) => reach[to] <= from);
};
