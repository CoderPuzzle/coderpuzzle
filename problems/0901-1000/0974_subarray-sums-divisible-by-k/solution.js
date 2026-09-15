/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function (nums, k) {
    // A subarray's sum is the difference of two prefix sums, and that
    // difference is divisible by k exactly when both prefixes leave the
    // same remainder. An array counting each normalized remainder seen
    // so far, seeded with the empty prefix's 0, answers the lookup in
    // O(1) per step.
    let count = 0;
    let prefix = 0;
    const remainders = new Array(k).fill(0);
    remainders[0] = 1;
    for (const value of nums) {
        prefix += value;
        const r = ((prefix % k) + k) % k;
        count += remainders[r];
        remainders[r]++;
    }
    return count;
};
