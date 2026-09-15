/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minOperations = function (nums) {
    // The definition, read literally: widen the offset d = 0, 1, 2, ...
    // and stop at the first d where either neighbor is a binary
    // palindrome; that first hit costs exactly d operations and no
    // palindrome can be closer.
    const palindrome = (value) => {
        const bits = value.toString(2);
        for (let left = 0, right = bits.length - 1; left < right; left++, right--) {
            if (bits[left] !== bits[right]) {
                return false;
            }
        }
        return true;
    };
    const distance = (value) => {
        for (let d = 0; ; d++) {
            // the down side floors at 1: values below have no binary form
            // without leading zeros
            if (value - d >= 1 && palindrome(value - d)) {
                return d;
            }
            if (palindrome(value + d)) {
                return d;
            }
        }
    };
    return nums.map(distance);
};
