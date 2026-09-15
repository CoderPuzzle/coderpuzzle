/**
 * @param {number[]} nums
 * @return {number}
 */
var countElements = function (nums) {
    // An element qualifies exactly when it sits strictly between the
    // array's minimum and maximum: a strictly smaller witness exists
    // iff x > min, a strictly larger one iff x < max.
    let lo = Infinity;
    let hi = -Infinity;
    for (const x of nums) {
        if (x < lo) lo = x;
        if (x > hi) hi = x;
    }
    let count = 0;
    for (const x of nums) {
        if (x > lo && x < hi) count++;
    }
    return count;
};
