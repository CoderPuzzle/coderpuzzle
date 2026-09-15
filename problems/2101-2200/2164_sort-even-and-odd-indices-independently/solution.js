/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortEvenOdd = function (nums) {
    // Strides 2 and 1-from-2 split the array by index parity; sorting
    // each slice its own direction and writing back through the same
    // strides re-interleaves them without touching positions.
    const evens = nums.filter((_, index) => index % 2 === 0).sort((a, b) => a - b);
    const odds = nums.filter((_, index) => index % 2 === 1).sort((a, b) => b - a);
    const result = nums.slice();
    evens.forEach((value, index) => {
        result[2 * index] = value;
    });
    odds.forEach((value, index) => {
        result[2 * index + 1] = value;
    });
    return result;
};
