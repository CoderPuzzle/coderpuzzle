/**
 * @param {number[][]} mat
 * @return {number}
 */
var smallestCommonElement = function (mat) {
    const tally = new Array(10001).fill(0);
    for (const row of mat) {
        for (const value of row) {
            tally[value]++;
        }
    }
    for (let value = 1; value <= 10000; value++) {
        if (tally[value] === mat.length) {
            // Strictly increasing rows never repeat a value, so only a
            // value present in every row can reach count m.
            return value;
        }
    }
    return -1;
};
