/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultArray = function (nums, k) {
    // Removing a prefix and a suffix is the same as choosing the non-empty
    // contiguous middle that survives, so result[x] counts subarrays whose
    // product is x mod k. The running DP extends every subarray ending at
    // the previous element by nums[i] and adds the singleton [i]. Counts
    // reach 5,000,050,000 for n = 10^5, far below 2^53, so Number
    // arithmetic stays exact.
    let counts = new Array(k).fill(0);
    const result = new Array(k).fill(0);
    for (const num of nums) {
        const extended = new Array(k).fill(0);
        for (let r = 0; r < k; ++r) {
            if (counts[r] !== 0) {
                extended[(r * num) % k] += counts[r];
            }
        }
        extended[num % k] += 1;
        for (let r = 0; r < k; ++r) {
            result[r] += extended[r];
        }
        counts = extended;
    }
    return result;
};
