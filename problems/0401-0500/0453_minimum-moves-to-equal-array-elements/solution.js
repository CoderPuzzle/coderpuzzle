/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function (nums) {
    // Incrementing n - 1 elements is, in relative terms, decrementing the one
    // element left out: every pairwise gap moves exactly as it would if that
    // single element had dropped by 1. So the question becomes how many unit
    // decrements make all elements equal, and since decrements never lift
    // anything, the common target is the current minimum.
    let total = 0;
    let minimum = nums[0];
    for (const value of nums) {
        total += value;
        if (value < minimum) {
            minimum = value;
        }
    }
    // The total spans n * |nums[i]|, up to 10^14, which doubles still hold
    // exactly inside their 53-bit integer range.
    return total - minimum * nums.length;
};
