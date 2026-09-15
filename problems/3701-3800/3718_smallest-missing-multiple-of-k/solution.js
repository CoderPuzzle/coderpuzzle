/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingMultiple = function (nums, k) {
    // The question is pure membership: drop every value into a hash set,
    // then walk the multiples of k upward until one is absent.
    const seen = new Set(nums);
    let candidate = k;
    while (seen.has(candidate)) {
        candidate += k;
    }
    return candidate;
};
