/**
 * @param {number[]} nums
 * @return {number}
 */
var largestUniqueNumber = function (nums) {
    const counts = new Array(1001).fill(0);
    for (const value of nums) counts[value]++;
    // Walk downward so the first singleton found is the largest.
    for (let value = 1000; value >= 0; --value) {
        if (counts[value] === 1) return value;
    }
    return -1;
};
