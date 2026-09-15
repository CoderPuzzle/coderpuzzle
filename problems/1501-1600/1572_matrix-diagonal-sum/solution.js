/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function (mat) {
    const n = mat.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += mat[i][i];
        const j = n - 1 - i;
        // the two diagonals meet at the center of an odd-sized matrix;
        // only add the mirror cell when it is a different position
        if (j !== i) {
            total += mat[i][j];
        }
    }
    return total;
};
