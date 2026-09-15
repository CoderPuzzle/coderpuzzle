/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countPairs = function (nums, k) {
    // n <= 100, so the direct double loop over index pairs is the whole
    // story: equal values and (i * j) % k === 0.
    let count = 0;
    const n = nums.length;
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            if (nums[i] === nums[j] && (i * j) % k === 0) {
                ++count;
            }
        }
    }
    return count;
};
