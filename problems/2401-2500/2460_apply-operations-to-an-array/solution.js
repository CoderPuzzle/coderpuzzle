/**
 * @param {number[]} nums
 * @return {number[]}
 */
var applyOperations = function (nums) {
    // Phase 1: apply the n-1 operations left to right; doubling an element
    // zeroes its right neighbor, which the next comparison sees.
    const result = nums.slice();
    for (let i = 0; i + 1 < result.length; ++i) {
        if (result[i] === result[i + 1]) {
            result[i] *= 2;
            result[i + 1] = 0;
        }
    }
    // Phase 2: stable-compact non-zero values to the front, then pad.
    let write = 0;
    for (const value of result) {
        if (value !== 0) result[write++] = value;
    }
    while (write < result.length) result[write++] = 0;
    return result;
};
