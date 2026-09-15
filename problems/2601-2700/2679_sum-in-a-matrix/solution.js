/**
 * @param {number[][]} nums
 * @return {number}
 */
var matrixSum = function (nums) {
    // Operation k removes the largest remaining number of every row, so
    // after each row is sorted in decreasing order the k-th column holds
    // exactly what that row gives up in operation k — the score is the sum
    // of the column maxima, with already-emptied rows skipped.
    let width = 0;
    for (const row of nums) {
        row.sort((a, b) => b - a);
        width = Math.max(width, row.length);
    }
    let score = 0;
    for (let column = 0; column < width; column++) {
        let best = -Infinity;
        for (const row of nums) {
            if (column < row.length && row[column] > best) {
                best = row[column];
            }
        }
        score += best;
    }
    return score;
};
