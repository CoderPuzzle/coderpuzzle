/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    // The direct reading the follow-up names: square every element in
    // place, then let the language's sort produce the order. The input's
    // own arrangement is never consulted — squaring kills the sign, so
    // negatives need no case of their own.
    const squares = nums.map((value) => value * value);
    squares.sort((a, b) => a - b);
    return squares;
};
