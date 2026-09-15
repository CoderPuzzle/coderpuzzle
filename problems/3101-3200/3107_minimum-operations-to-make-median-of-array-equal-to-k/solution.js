/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperationsToMakeMedianK = function (nums, k) {
    // After sorting, the median slot is floor(n / 2): the middle element
    // for odd n and the larger of the two middles for even n, matching
    // the statement's definition. Elements left of the slot above k must
    // come down to k; elements right of it below k must come up. The
    // total reaches ~2*10**14 at the constraint maximum -- beyond 32-bit
    // but safely under 2**53, so Number arithmetic stays exact.
    nums.sort((a, b) => a - b);
    const mid = Math.floor(nums.length / 2);
    let total = Math.abs(nums[mid] - k);
    for (let i = 0; i < mid; i++) {
        if (nums[i] > k) total += nums[i] - k;
    }
    for (let i = mid + 1; i < nums.length; i++) {
        if (nums[i] < k) total += k - nums[i];
    }
    return total;
};
