/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function (nums) {
    // A pair differs at a bit position exactly when one value has the bit
    // set and the other does not. If c of the n values carry the bit, the
    // position therefore contributes c * (n - c) differing pairs, and
    // summing that over all positions counts every (pair, bit) difference
    // exactly once. Values are at most 10^9, below 2^30, so 31 fixed
    // passes cover every position that can ever hold a set bit. Shifts
    // coerce to signed 32-bit two's complement, which values and totals
    // below 2^31 never leave.
    const n = nums.length;
    let total = 0;
    for (let bit = 0; bit < 31; bit++) {
        let setCount = 0;
        for (const value of nums) {
            setCount += (value >> bit) & 1;
        }
        total += setCount * (n - setCount);
    }
    return total;
};
