/**
 * @param {number[]} nums
 * @return {number}
 */
var scoreDifference = function (nums) {
    // Totals stay within 1000 * 1000 = 10^6 and the difference within
    // ±10^6, so plain numbers hold every integer here exactly, far inside
    // the 2^53 safe range.
    // One pass with a signed turn: +1 while the first player is active,
    // -1 while the second is. Each rule that fires flips the sign — odd
    // points flip once, a 6th-game index flips once — and when both fire
    // on the same game the flips cancel, exactly the sequential double
    // swap. The active player's points then enter the first-minus-second
    // difference as turn * points.
    let diff = 0;
    let turn = 1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 1) {
            turn = -turn;
        }
        if (i % 6 === 5) {
            turn = -turn;
        }
        diff += turn * nums[i];
    }
    return diff;
};
