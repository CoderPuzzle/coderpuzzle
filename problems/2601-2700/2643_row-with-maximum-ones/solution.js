/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var rowAndMaximumOnes = function (mat) {
    // One scan carries the best (count, row) pair seen so far; only a
    // strictly greater count replaces the incumbent, so among tied rows the
    // smallest index automatically survives.
    let bestRow = 0;
    let bestCount = -1;
    for (let rowIndex = 0; rowIndex < mat.length; ++rowIndex) {
        let count = 0;
        for (const value of mat[rowIndex]) {
            if (value === 1) ++count;
        }
        if (count > bestCount) {
            bestCount = count;
            bestRow = rowIndex;
        }
    }
    return [bestRow, bestCount];
};
