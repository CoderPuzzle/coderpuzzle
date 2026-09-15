/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumCount = function (nums) {
    // The statement defines the answer outright: neg counts the entries
    // below zero, pos counts the entries above zero, and zeros join
    // neither camp. One walk over nums tallies both counts.
    let neg = 0;
    let pos = 0;
    for (const value of nums) {
        if (value < 0) {
            neg++;
        } else if (value > 0) {
            pos++;
        }
    }
    return Math.max(neg, pos);
};
