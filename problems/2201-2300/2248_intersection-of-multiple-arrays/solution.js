/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var intersection = function (nums) {
    // Count how many arrays contain each value; a value present in every
    // array (nums[i] holds distinct values) is counted exactly nums.length
    // times, and the statement asks for those values sorted ascending.
    const counts = new Map();
    for (const arr of nums) {
        for (const v of arr) {
            counts.set(v, (counts.get(v) || 0) + 1);
        }
    }
    const result = [];
    for (const [v, c] of counts) {
        if (c === nums.length) result.push(v);
    }
    result.sort((a, b) => a - b);
    return result;
};
