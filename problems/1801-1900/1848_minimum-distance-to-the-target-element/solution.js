/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function (nums, target, start) {
    // One scan: the closest occurrence of target is whichever index
    // minimizes abs(i - start).
    let best = nums.length;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            best = Math.min(best, Math.abs(i - start));
        }
    }
    return best;
};
