/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var targetIndices = function (nums, target) {
    let smaller = 0;
    let equal = 0;
    for (const value of nums) {
        if (value < target) smaller++;
        else if (value === target) equal++;
    }
    return Array.from({ length: equal }, (_, offset) => smaller + offset);
};
