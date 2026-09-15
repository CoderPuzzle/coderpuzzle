/**
 * @param {string} num
 * @return {boolean}
 */
var isStrobogrammatic = function (num) {
    // A 180-degree turn reverses digit order and rotates each digit, and
    // only 0, 1, 8 (to themselves) and 6, 9 (to each other) survive it.
    const rotated = { 0: "0", 1: "1", 8: "8", 6: "9", 9: "6" };
    let left = 0;
    let right = num.length - 1;
    while (left <= right) {
        // Each digit must be the rotation of the digit standing opposite.
        const turn = rotated[num[left]];
        if (turn === undefined || turn !== num[right]) return false;
        ++left;
        --right;
    }
    return true;
};
