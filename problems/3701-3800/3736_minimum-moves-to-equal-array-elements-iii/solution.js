/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function (nums) {
    // Only increments exist, so every element must climb to a common
    // target at least as high as the largest value already present;
    // the cheapest such target is that largest value itself.
    let target = nums[0];
    for (const num of nums) {
        if (num > target) {
            target = num;
        }
    }
    // Each element pays exactly its own deficit to reach it, and the moves
    // never interact, so the answer sums the deficits directly.
    let moves = 0;
    for (const num of nums) {
        moves += target - num;
    }
    return moves;
};
