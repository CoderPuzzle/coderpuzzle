/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function (nums) {
    // An element counts only if it appears exactly once. Values are
    // bounded to 1..100, so a fixed frequency table settles every
    // element in one pass; a second sweep sums the singletons.
    const count = new Array(101).fill(0);
    for (const v of nums) {
        count[v]++;
    }
    let sum = 0;
    for (const v of nums) {
        if (count[v] === 1) {
            sum += v;
        }
    }
    return sum;
};
