/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
    // Fix the right endpoint and extend left with a running OR of
    // nums[l..r]; the first l reaching k is the shortest special subarray
    // ending at r. Every value fits in six bits (k < 64 bounds the OR too),
    // so no intermediate escapes 32 bits, let alone Number precision.
    let best = -1;
    for (let r = 0; r < nums.length; r++) {
        let current = 0;
        for (let l = r; l >= 0; l--) {
            current |= nums[l];
            if (current >= k) {
                const length = r - l + 1;
                if (best === -1 || length < best) {
                    best = length;
                }
                break;
            }
        }
    }
    return best;
};
