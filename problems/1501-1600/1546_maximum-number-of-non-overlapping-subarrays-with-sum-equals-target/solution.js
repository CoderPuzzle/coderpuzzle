/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maxNonOverlapping = function (nums, target) {
    // `seen` holds every prefix sum reachable from the start of the current
    // "segment" (the region after the last subarray taken). The moment the
    // running sum minus `target` is in `seen`, a subarray ending here sums
    // to `target`; taking it immediately and resetting (prefix sum back to
    // 0, `seen` back to just {0}) is optimal, because closing off a valid
    // subarray as early as possible never removes an opportunity a later
    // close would have had — it can only free up more room for subarrays
    // after it. JS numbers are exact well past any intermediate sum here
    // (roughly 10^9), so no separate 64-bit type is needed.
    let seen = new Set([0]);
    let prefixSum = 0;
    let count = 0;
    for (const x of nums) {
        prefixSum += x;
        if (seen.has(prefixSum - target)) {
            count++;
            seen = new Set([0]);
            prefixSum = 0;
        } else {
            seen.add(prefixSum);
        }
    }
    return count;
};
