/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (nums, k) {
    const n = nums.length;
    const results = new Array(n - k + 1);
    let run = 1;
    for (let i = 0; i < n; i++) {
        if (i > 0 && nums[i] === nums[i - 1] + 1) {
            run++;
        } else {
            run = 1;
        }
        if (i >= k - 1) {
            results[i - k + 1] = run >= k ? nums[i] : -1;
        }
    }
    return results;
};
