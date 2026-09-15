/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function (nums) {
    // ans is nums followed by a second copy of nums: each value lands at
    // index i and again at index i + n.
    return [...nums, ...nums];
};
