/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function (nums) {
    // Squares erase signs, so sort the squared magnitudes and put the
    // largest ceil(n / 2) on the plus slots, the rest on minus slots. The
    // numeric comparator matters: the default sort is lexicographic.
    const squares = nums.map((value) => value * value);
    squares.sort((a, b) => a - b);
    const minus = Math.floor(squares.length / 2);
    let score = 0;
    for (let index = 0; index < squares.length; ++index) {
        score += index < minus ? -squares[index] : squares[index];
    }
    return score;
};
