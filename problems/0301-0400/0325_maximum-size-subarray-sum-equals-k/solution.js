/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubArrayLen = function (nums, k) {
    // first[prefix] = earliest index that prefix value occurred; the
    // seed 0: -1 lets a subarray starting at index 0 be found.
    const first = new Map();
    first.set(0, -1);
    let acc = 0;
    let best = 0;
    for (let i = 0; i < nums.length; i++) {
        acc += nums[i];
        // Subarray (j, i] sums to k exactly when the earlier prefix
        // equals acc - k; earliest j gives the longest subarray.
        if (first.has(acc - k) && i - first.get(acc - k) > best) {
            best = i - first.get(acc - k);
        }
        // Keep only the first occurrence per prefix value — a later
        // duplicate would only shorten future subarrays.
        if (!first.has(acc)) {
            first.set(acc, i);
        }
    }
    return best;
};
