/**
 * @param {number[]} nums
 * @return {number}
 */
var sortPermutation = function (nums) {
    // A displaced value must take part in a swap, and every swap it joins
    // pins k inside that value's bits, so no k can exceed the AND of the
    // displaced values themselves.
    let ans = -1; // all bits set: the AND identity
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) {
            ans &= nums[i];
        }
    }
    // Sorting displaces nothing; the untouched sentinel clamps to the
    // required 0, and a real AND over values below n never goes negative.
    return Math.max(ans, 0);
};
