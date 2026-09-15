/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSquareStreak = function (nums) {
    // A sorted streak always steps v -> v*v, so scanning the distinct
    // values ascending makes each value extend at most one chain: the one
    // ending at its integer square root, when that root is itself present.
    // Values are below 10^5 (< 2^53), so Math.sqrt of a perfect square is
    // an exact integer and every product stays exact.
    const seen = new Set(nums);
    const values = [...seen].sort((a, b) => a - b);
    const length = new Map();
    for (const value of values) {
        const root = Math.floor(Math.sqrt(value));
        const extended = root * root === value && length.has(root);
        length.set(value, extended ? length.get(root) + 1 : 1);
    }
    let longest = 0;
    for (const value of length.values()) longest = Math.max(longest, value);
    return longest >= 2 ? longest : -1;
};
