/**
 * @param {number[]} nums
 * @return {number}
 */
var evenNumberBitwiseORs = function (nums) {
    // Fold each even value into the accumulator as the scan passes it; 0
    // is the OR identity, so an array with no evens returns 0.
    let result = 0;
    for (const value of nums) {
        if (value % 2 === 0) {
            result |= value;
        }
    }
    return result;
};
