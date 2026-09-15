/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    // farthest is the largest index reachable using any sequence of
    // jumps among positions visited so far; an index is standable
    // exactly when index <= farthest (reachability grows continuously).
    let farthest = 0;
    const last = nums.length - 1;
    for (let index = 0; index < nums.length; index++) {
        const reach = nums[index];
        // Standability check first: a gap no jump can cross has opened,
        // so the last index is unreachable. Must run before the update.
        if (index > farthest) return false;
        // Extend the reach to index + nums[index] when it beats the
        // running maximum.
        if (index + reach > farthest) farthest = index + reach;
        // The reach now covers the last index: answer true on the spot
        // (also covers the single-element input, with farthest = 0).
        if (farthest >= last) return true;
    }
    return true;
};
