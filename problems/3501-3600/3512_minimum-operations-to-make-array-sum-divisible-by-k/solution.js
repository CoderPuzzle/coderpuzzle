/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
    // Every operation lowers the total sum by exactly 1, and the elements
    // only bound how many operations are even possible (sum in total),
    // never the residue. So the cheapest reachable sum that is divisible
    // by k is the largest multiple of k not exceeding the sum, and the
    // answer is the distance down to it: sum % k. The sum is at most
    // 1000 * 1000 = 1e6, far below 2^53, so doubles are exact.
    let total = 0;
    for (const v of nums) total += v;
    return total % k;
};
