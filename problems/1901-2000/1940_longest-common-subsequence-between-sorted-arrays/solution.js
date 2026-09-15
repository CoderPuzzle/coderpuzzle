/**
 * @param {number[][]} arrays
 * @return {number[]}
 */
var longestCommonSubsequence = function (arrays) {
    // Each array is strictly increasing, so a value appears at most once
    // per array; it is common to all arrays exactly when it is counted
    // arrays.length times. Values are bounded by 1..100, so a fixed-size
    // count array replaces the map and yields ascending order for free.
    const counts = new Array(101).fill(0);
    for (const arr of arrays) {
        for (const value of arr) {
            counts[value]++;
        }
    }
    const result = [];
    for (let v = 1; v <= 100; ++v) {
        if (counts[v] === arrays.length) result.push(v);
    }
    return result;
};
